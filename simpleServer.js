const express = require('express');  // Biblioteca Framework Express
const https = require('https');      // Biblioteca Auxilio para criar um servidor(necessario para SSL)
const path = require('path');        // Biblioteca para redirecionar os caminhos no servidor
const fs = require('fs');            // Biblioteca para CRUD

const app = express();    // Instancia do servidor.

// Criando uma instancia, utilizando o FileSystem para abrir o diretorio e acessar o SSL
const privateKey = fs.readFileSync(path.join(__dirname, 'private-key.pem'), 'utf-8');
const certificate = fs.readFileSync(path.join(__dirname, 'certificate.pem'), 'utf-8');
const credentials = { key: privateKey, cert: certificate };    // Criando um Objeto que assegura-ra o SSL

// ROTA raiz.
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
      <h2> Hi, visitant! </h2>
    </body>
  </html>
  `);
});

// Colocando o Objeto(SSL) no codigo junto ao servidor.
https.createServer(credentials, app).listen(443, () => {
  console.log('https://localhost:443');
});
