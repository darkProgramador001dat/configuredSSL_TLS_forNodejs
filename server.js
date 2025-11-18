const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();

const privateKey = fs.readFileSync(path.join(__dirname, 'private-key.pem'), 'utf-8');
const certificate = fs.readFileSync(path.join(__dirname, 'certificate.pem'), 'utf-8');
const credentials = { key: privateKey, cert: certificate };

app.get('/', (request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.send(`
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>page</title>
</head>
<body>
  <h2>Hi, visitant!</h2>
</body>
</html>
  `);
});

https.createServer(credentials, app).listen(443, () => {
  console.log('https://localhost:443');
});
