const crypto = require('crypto');

function sha256Hash(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
}

const text = '1331, Oleksii Shopiak, alshop2004@gmail.com';
const sha256Hashed = sha256Hash(text);
console.log(`SHA-256 Hash: ${sha256Hashed}`);
