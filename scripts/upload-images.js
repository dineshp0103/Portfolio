// scripts/upload-images.js
// Uploads hero images to Supabase Storage and prints public URLs
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://obyqrspjrepujwuctezc.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ieXFyc3BqcmVwdWp3dWN0ZXpjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTg2NDYxOSwiZXhwIjoyMDg3NDQwNjE5fQ._ShwvPNHqvF8Zc7l-h2p6-Ugn-eLKClaRXMWtm_R4Xs';
const BUCKET = 'hero-images';
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const IMAGES = ['hero1.jpg', 'hero2.jpg', 'hero3.jpg'];

const headers = {
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'apikey': SERVICE_ROLE_KEY,
};

async function createBucket() {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }),
    });
    const data = await res.json();
    if (res.ok || data.error === 'The resource already exists') {
        console.log('✓ Bucket ready:', BUCKET);
        return true;
    }
    throw new Error('Bucket create failed: ' + JSON.stringify(data));
}

async function uploadFile(filename) {
    const filepath = path.join(IMAGES_DIR, filename);
    if (!fs.existsSync(filepath)) {
        console.error('✗ File not found:', filepath);
        return null;
    }
    const buffer = fs.readFileSync(filepath);
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${filename}`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'image/jpeg', 'x-upsert': 'true' },
        body: buffer,
    });
    if (!res.ok) {
        const err = await res.text();
        console.error('✗ Upload failed for', filename, err);
        return null;
    }
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filename}`;
    console.log('✓ Uploaded:', filename, '->', publicUrl);
    return publicUrl;
}

async function main() {
    await createBucket();
    const urls = {};
    for (const img of IMAGES) {
        const url = await uploadFile(img);
        if (url) urls[img] = url;
    }
    console.log('\n=== UPDATE Hero.tsx heroImages array with: ===');
    console.log(JSON.stringify(Object.values(urls), null, 2));
}

main().catch(console.error);
