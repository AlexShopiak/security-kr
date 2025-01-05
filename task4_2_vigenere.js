function vigenereEncrypt(text, key) {
    key = key.toLowerCase();
    let keyIndex = 0;

    return text.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            const offset = key[keyIndex % key.length].charCodeAt(0) - 'a'.charCodeAt(0);
            keyIndex++;
            const charCode = char.charCodeAt(0);
            const base = charCode >= 'a'.charCodeAt(0) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            return String.fromCharCode((charCode - base + offset) % 26 + base);
        }
        return char;
    }).join('');
}

function vigenereDecrypt(text, key) {
    key = key.toLowerCase();
    let keyIndex = 0;

    return text.split('').map(char => {
        if (char.match(/[a-zA-Z]/)) {
            const offset = key[keyIndex % key.length].charCodeAt(0) - 'a'.charCodeAt(0);
            keyIndex++;
            const charCode = char.charCodeAt(0);
            const base = charCode >= 'a'.charCodeAt(0) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            return String.fromCharCode((charCode - base - offset + 26) % 26 + base);
        }
        return char;
    }).join('');
}

const text = '1331, Oleksii Shopiak, alshop2004@gmail.com';
const vigenereEncrypted = vigenereEncrypt(text, 'KEY');
const vigenereDecrypted = vigenereDecrypt(vigenereEncrypted, 'KEY');
console.log(`Vigenere Encrypted: ${vigenereEncrypted}`);
console.log(`Vigenere Decrypted: ${vigenereDecrypted}`);
