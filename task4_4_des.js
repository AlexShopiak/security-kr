const crypto = require('crypto');

function desEncrypt(text, key) {
    const cipher = crypto.createCipheriv('des-ede3-cbc', Buffer.from(key), Buffer.alloc(8));
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function desDecrypt(text, key) {
    const decipher = crypto.createDecipheriv('des-ede3-cbc', Buffer.from(key), Buffer.alloc(8));
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const text = '1331, Oleksii Shopiak, alshop2004@gmail.com';
const desKey = crypto.randomBytes(24); // Генерація 192-бітного ключа
const desEncrypted = desEncrypt(text, desKey);
const desDecrypted = desDecrypt(desEncrypted, desKey);
console.log(`DES Encrypted: ${desEncrypted}`);
console.log(`DES Decrypted: ${desDecrypted}`);
console.log(`KEY: ${desKey}`);
