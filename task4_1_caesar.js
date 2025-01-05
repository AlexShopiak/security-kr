function caesarEncrypt(text, shift) {
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) { // Верхній регістр
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) { // Нижній регістр
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        return char; // Не змінені символи
    }).join('');
}

function caesarDecrypt(text, shift) {
    return caesarEncrypt(text, (26 - shift) % 26); // Зворотний зсув
}

const text = '1331, Oleksii Shopiak, alshop2004@gmail.com';
const caesarEncrypted = caesarEncrypt(text, 3);
const caesarDecrypted = caesarDecrypt(caesarEncrypted, 3);
console.log(`Caesar Encrypted: ${caesarEncrypted}`);
console.log(`Caesar Decrypted: ${caesarDecrypted}`);
