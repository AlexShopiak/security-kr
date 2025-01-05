const crypto = require('crypto');

function md5Hash(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

const text = '1331, Oleksii Shopiak, alshop2004@gmail.com';
const md5Hashed = md5Hash(text);
console.log(`MD5 Hash: ${md5Hashed}`);
