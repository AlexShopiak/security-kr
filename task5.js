const { v1: uuidv1, v3: uuidv3, v4: uuidv4, v5: uuidv5, v6: uuidv6, v7: uuidv7 } = require('uuid');
const crypto = require('crypto');

// UUID версія 1
const uuid1 = uuidv1();
console.log("UUID версії 1: " + uuid1);

// UUID версія 2
// -

// UUID версія 3
const namespaceV3 = uuidv3('namespace', uuidv3.URL);
const uuid3 = uuidv3('example', namespaceV3);
console.log("UUID версії 3: " + uuid3);

// UUID версія 4
const uuid4 = uuidv4();
console.log("UUID версії 4: " + uuid4);

// UUID версія 5
const namespaceV5 = uuidv5('namespace', uuidv5.URL);
const uuid5 = uuidv5('example', namespaceV5);
console.log("UUID версії 5: " + uuid5);

// UUID версія 6
const uuid6 = uuidv6();
console.log("UUID версії 6: " + uuid6);

// UUID версія 7
const uuid7 = uuidv7();
console.log("UUID версії 7: " + uuid7);

// UUID версія 8 
const uuidv8 = customData => {
    if (customData.length > 15) {
        throw new Error("Custom data must not exceed 15 bytes (122 bits).");
    }

    const data = new Uint8Array(16);
    data.set(customData, 0);
    data[6] = (data[6] & 0x0F) | 0x80;
    data[8] = (data[8] & 0x3F) | 0x80;

    return [...data]
        .map((byte, index) =>
            byte.toString(16).padStart(2, '0') + ([3, 5, 7, 9].includes(index) ? '-' : '')
        )
        .join('');
}

const customData = new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde]);
const uuid8 = uuidv8(customData);
console.log("UUID версії 8:", uuid8);

