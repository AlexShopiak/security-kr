const { SignedXml } = require('xml-crypto');
const xmlbuilder = require('xmlbuilder');
const crypto = require('crypto');
const fs = require('fs');

const now = new Date();
let requestIdCopy = null;

// Функція для генерації унікального ID
const generateId = () => {
    return '_' + crypto.randomBytes(16).toString('hex'); // Генеруємо випадковий ID
};

// Функція для створення елемента Issuer в XML
const createIssuer = (xml, issuerUrl) => {
    xml.ele('saml:Issuer', {
        'xmlns:saml': 'urn:oasis:names:tc:SAML:2.0:assertion'
    }, issuerUrl); // Додаємо Issuer з URL
};

// Функція для створення статусу в XML
const createStatus = (xml, statusCodeValue) => {
    const status = xml.ele('samlp:Status'); // Створюємо елемент Status
    status.ele('samlp:StatusCode', { Value: statusCodeValue }); // Додаємо код статусу
};

// Функція для створення атрибута в XML
const createAttribute = (xml, name, value) => {
    const attribute = xml.ele('saml:Attribute', { Name: name }); // Створюємо атрибут
    attribute.ele('saml:AttributeValue', value); // Додаємо значення атрибута
};

// Функція для підписування XML
const signXml = (xml, xpathToSign) => {
    const sig = new SignedXml({ privateKey: fs.readFileSync('./task6_private.key') }); // Створюємо підпис
    sig.addReference({
        xpath: xpathToSign,
        digestAlgorithm: "http://www.w3.org/2000/09/xmldsig#sha1",
        transforms: ["http://www.w3.org/2001/10/xml-exc-c14n#"],
    });
    sig.canonicalizationAlgorithm = "http://www.w3.org/2001/10/xml-exc-c14n#";
    sig.signatureAlgorithm = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
    sig.computeSignature(xml); // Обчислюємо підпис
    
    return sig.getSignedXml(); // Повертаємо підписаний XML
};

// Функція для створення запиту
const buildRequest = () => {
    const requestId = generateId(); // Генеруємо ID запиту
    requestIdCopy = requestId; // Копіюємо ID для використання в відповіді
    const samlRequest = xmlbuilder.create('samlp:AuthnRequest', { encoding: 'UTF-8' }) // Створюємо XML запиту
        .att('xmlns:samlp', 'urn:oasis:names:tc:SAML:2.0:protocol')
        .att('ID', requestId)
        .att('Version', '2.0')
        .att('IssueInstant', now.toISOString()) // Додаємо час видачі
        .att('Destination', 'https://dev-7sfm4dwi0agzg42e.us.auth0.com/samlp/2rt9zMZergxHgi7SqMDSo2nBLXw2gHV3') // Додаємо URL призначення
        .att('AssertionConsumerServiceURL', 'https://dev-7sfm4dwi0agzg42e.us.auth0.com/callback'); // Додаємо URL служби споживання

    createIssuer(samlRequest, 'https://dev-7sfm4dwi0agzg42e.us.auth0.com'); // Додаємо Issuer

    samlRequest.ele('samlp:NameIDPolicy', {
        'xmlns:samlp': 'urn:oasis:names:tc:SAML:2.0:protocol',
        'Format': 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
        'AllowCreate': 'true'
    });

    const unsignedXml = samlRequest.end({ pretty: true }); // Завершуємо XML запит
    return signXml(unsignedXml, "//*[local-name(.)='AuthnRequest']"); // Підписуємо запит
};

// Функція для створення відповіді
const buildResponse = () => {
    const responseId = generateId(); // Генеруємо ID відповіді
    const assertionId = generateId(); // Генеруємо ID асершн
    const samlResponse = xmlbuilder.create('samlp:Response', { encoding: 'UTF-8' }) // Створюємо XML відповіді
        .att('xmlns:samlp', 'urn:oasis:names:tc:SAML:2.0:protocol')
        .att('ID', responseId)
        .att('Version', '2.0')
        .att('IssueInstant', now.toISOString()) // Додаємо час видачі
        .att('Destination', 'https://dev-7sfm4dwi0agzg42e.us.auth0.com/callback') // Додаємо URL призначення
        .att('InResponseTo', requestIdCopy); // Додаємо ID запиту на який відповідаємо

    createIssuer(samlResponse, 'https://dev-7sfm4dwi0agzg42e.us.auth0.com'); // Додаємо Issuer
    createStatus(samlResponse, 'urn:oasis:names:tc:SAML:2.0:status:Success'); // Додаємо статус успіху

    const assertion = samlResponse.ele('saml:Assertion', { // Додаємо асершн
        'xmlns:saml': 'urn:oasis:names:tc:SAML:2.0:assertion',
        'ID': assertionId,
        'IssueInstant': now.toISOString(),
        'Version': '2.0'
    });

    const attributes = assertion.ele('saml:AttributeStatement');
    createAttribute(attributes, 'email', 'alshop2004@gmail.com'); // Додаємо атрибут email
    createAttribute(attributes, 'studentID', '1331'); // Додаємо атрибут studentID

    const unsignedXml = samlResponse.end({ pretty: true }); // Завершуємо XML відповідь
    return signXml(unsignedXml, "//*[local-name(.)='Response']"); // Підписуємо відповідь
};

const req = buildRequest();
const res = buildResponse();

console.log("=====Request======");
console.log(req);
console.log("=====Response======");
console.log(res);
