const crypto = require('crypto');

function aesEncrypt(text, key) {
    const iv = crypto.randomBytes(16); // Генерація вектора ініціалізації
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Повертаємо IV разом з шифротекстом
}

function aesDecrypt(text, key) {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const text = '1331, Oleksii Shopiak, alshop2004@gmail.com';
const aesKey = crypto.randomBytes(32); // Генерація 256-бітного ключа
const aesEncrypted = aesEncrypt(text, aesKey);
const aesDecrypted = aesDecrypt(aesEncrypted, aesKey);
console.log(`AES Encrypted: ${aesEncrypted}`);
console.log(`AES Decrypted: ${aesDecrypted}`);
console.log(`KEY: ${aesKey}`);
