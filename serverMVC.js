// Este codigo, foi construido com base em Model View Controller(MVC).
// Public: responsavel por armazenar os style.css
// Views: responsavel por armazenar os templates(HTML).
// Routes: responsavel por criar nossa rotas dentro do servidor.
// Config: responsavel pelas configurações para o servidor(Frameworks). 

const express = require("./config/express/express");     // Importando: acessando o diretorio das configurações, segue o mesmo exemplo para os demais.
const ssl = require("./config/ssl/configured_ssl");      // Importando: diretorio aonde contêm o SSL certificado.
const routes = require("./routes/index");                // Importando: ROTAS do projeto (templates html).

require("dotenv").config({ path: "./config/env/.env" });  // Importando: diretorio, endereço do servidor.

const helmet = require("helmet");                          // Importando: biblioteca para proteção contra cabeçalhos, auxilio para middleware.
const https = require("https");                            // Importando: bibloteca para auxiliar na construção do servidor e o SSL construir(necessario para SSL)
const path = require("path");                              // Importando: biblioteca para configurações de caminho.
const fs = require("fs");                                  // Importando: biblioteca para abrir arquivos, etc.(CRUD)
const bodyParser = require("body-parser");                 // Importando: biblioteca para receber corpo de requisições POST. 

const app = express();  // Instancia do servidor, configurado no caminho ./config/express/express

// Middleware para retorna as GETs feito pelo usuario.
const simpleMiddleware = (request, reponse, next) => {
   const addr = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
   console.log(`GET HTTP/1.1\t\t${addr}`);
   next();
};
app.use(helmet());    // Utilizando a biblioteca
app.use(simpleMiddleware);    // Utilizando o middleware.


// ROTAS.
app.use(express.static(path.join(__dirname, "public")));    // Utilizando o diretorio estatico para renderizar, CSS. etc.
app.use(bodyParser.urlencoded({ extended: true }));         // Receber o corpo da requisição. frontend
app.use(bodyParser.json());                                 // converter em json 

app.use("/", routes);    // Utilizando a rota vindo do diretorio ./routes/index na aplicação do codigo. 


// Instancia do servidor, IP || PORTA vindo do .env
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Construindo o servidor, vinculando IP || PORTA e inicinado.
https.createServer(ssl, app).listen(PORT, HOST, () => {
   console.clear();
   console.log("oOo.... NodeJS rodando com Framework Express 5.1 ....oOo");
   console.log(` servidor online, na  https://${HOST}:${PORT}\n Ctrl + C pare o serviço.\n`);
});
