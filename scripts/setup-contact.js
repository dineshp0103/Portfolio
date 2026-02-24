// Creates the 'contacts' table in Supabase using the REST API
// and tests the full contact form flow

const SUPABASE_URL = 'https://obyqrspjrepujwuctezc.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ieXFyc3BqcmVwdWp3dWN0ZXpjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTg2NDYxOSwiZXhwIjoyMDg3NDQwNjE5fQ._ShwvPNHqvF8Zc7l-h2p6-Ugn-eLKClaRXMWtm_R4Xs';

const headers = {
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'apikey': SERVICE_ROLE_KEY,
    'Content-Type': 'application/json',
};

async function createTable() {
    // Use Supabase's pg RPC endpoint for raw SQL
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query: `
      CREATE TABLE IF NOT EXISTS contacts (
        id         BIGSERIAL PRIMARY KEY,
        name       TEXT NOT NULL,
        email      TEXT NOT NULL,
        message    TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    ` }),
    });
    const data = await res.json();
    return { status: res.status, data };
}

async function testInsert() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
        method: 'POST',
        headers: { ...headers, 'Prefer': 'return=representation' },
        body: JSON.stringify({ name: 'Test User', email: 'test@example.com', message: 'Test from setup script' }),
    });
    const data = await res.json();
    return { status: res.status, data };
}

async function testResend() {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer re_geThgPUq_3mVuAUfbELyGDXPYZ71Uo1mR',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Sky-Dev Portfolio <onboarding@resend.dev>',
            to: ['dineshpolamarasetti0103@gmail.com'],
            subject: 'Portfolio Contact from Test User',
            html: '<p>Test email from contact API setup script.</p>',
        }),
    });
    const data = await res.json();
    return { status: res.status, data };
}

async function main() {
    console.log('\n1. Testing direct Supabase insert (table existence check)...');
    const ins = await testInsert();
    console.log('   Status:', ins.status);
    console.log('   Response:', JSON.stringify(ins.data));

    if (ins.status === 404 || (Array.isArray(ins.data) === false && ins.data?.code === '42P01')) {
        console.log('\n⚠ Table does not exist. Please create it manually:\n');
        console.log('Go to: https://supabase.com/dashboard/project/obyqrspjrepujwuctezc/sql/new');
        console.log('Run this SQL:\n');
        console.log(`CREATE TABLE IF NOT EXISTS contacts (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`);
    } else if (ins.status === 201) {
        console.log('\n✅ Table exists and insert worked!');
    } else {
        console.log('\n? Insert status:', ins.status, '— check response above');
    }

    console.log('\n2. Testing Resend email API...');
    const email = await testResend();
    console.log('   Status:', email.status);
    console.log('   Response:', JSON.stringify(email.data));
    if (email.status === 200) {
        console.log('\n✅ Resend is working!');
    } else {
        console.log('\n❌ Resend error:', email.data?.message);
    }
}

main().catch(console.error);
