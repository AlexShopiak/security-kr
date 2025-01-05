const crypto = require('crypto');

// Генерація ключів
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

function rsaEncrypt(text) {
    return crypto.publicEncrypt(publicKey, Buffer.from(text)).toString('base64');
}

function rsaDecrypt(encrypted) {
    return crypto.privateDecrypt(privateKey, Buffer.from(encrypted, 'base64')).toString('utf8');
}

const text = '1331, Oleksii Shopiak, alshop2004@gmail.com';
const rsaEncrypted = rsaEncrypt(text);
const rsaDecrypted = rsaDecrypt(rsaEncrypted);
console.log(`RSA Encrypted: ${rsaEncrypted}`);
console.log(`RSA Decrypted: ${rsaDecrypted}`);


// Отримання ключів у PEM-форматі
const publicKeyPem = publicKey.export({ type: 'spki', format: 'pem' });
const privateKeyPem = privateKey.export({ type: 'pkcs8', format: 'pem' });

console.log(publicKeyPem, privateKeyPem);