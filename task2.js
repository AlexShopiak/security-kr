const username = 'Shopiak';
const password = '1331';

// Зконкатенуємо логін та пароль у форматі логін:пароль
const credentials = `${username}:${password}`;

// Закодуємо стрічку у форматі Base64
const encodedCredentials = btoa(credentials);

// Вставимо закодовану стрічку в Authorization header
const authorizationHeader = `Basic ${encodedCredentials}`;

console.log(authorizationHeader);
