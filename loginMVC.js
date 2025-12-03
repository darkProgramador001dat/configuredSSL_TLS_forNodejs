const express = require("express");
const router = express.Router();

const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");


router.use(bodyParser.urlencoded({ extended: true }));			// configurar para receber o corpo da requisição via POST, realize um parser dos dados.
router.use(bodyParser.json());						// Converter todos os POST que serão enviado da requisição em json.
router.use(express.static(path.join(__dirname, "../../public")));	// Torna um diretorio dinamico. renderize img, css, videos. etc.


// ROTA paginal inicial.
router.get("/", (request, response) => {
   response.statusCode = 200;
   response.setHeader("Content-Type", "text/html");
   response.sendFile(path.join(__dirname, "../../views/home", "index.html"));
});




// Aqui temos 2(dois) Objeto chave e valor, que serão usados como condicionais de acesso privilegiado.
const flag = [{ document: "43822186830", hash: "$2b$13$nBSSBGDW4.KPWsy61n/x8eAkCpG7jlXo5lqIbwUB5hf8DrKLTRU7i" }];	// Usuarios já registrado no sistema.

const new_flag = [{ document: "", password: "" }];									// Acrescentar um novo usuario ao dicionario.
// O primeiro é um usuario criptografado, o segundo é inserido ao sistema manualmente atráves do usuario, não contem criptografia.



// ROTA para admin.
router.get("/login", (request, response) => {
   response.statusCode = 200;
   response.setHeader("Content-Type", "text/html");
   response.sendFile(path.join(__dirname, "../../views/login", "login.html"));
});

// ROTA para criar um novo usuario, renderizar na URL
router.get("/register", (request, response) => {
   response.statusCode = 200;
   response.setHeader("Content-Type", "text/html");		// Cabeçalho do tipo HTML
   response.sendFile(path.join(__dirname, "../../views/register", "register.html"));	// encaminhando o diretorio e abrindo um arquivo.html
});

// recebendo o envia do formulario.
router.post("/register", (request, response) => {
   const { document, password } = request.body;                                 // recebendo os dados do formulario.

   response.setHeader("Content-Type", "text/html");
   new_flag.push({ document, password });					// adicionando ao objeto new_flag.

   response.sendFile(path.join(__dirname, "../../views/register", "user.html"));
});


// ROTA para login
router.post("/login", (request, response) => {

   const { document, password } = request.body;		// recebendo o corpo da requisicao via POST.

   // Etapa 1.
   // procurando um usuario no objeto flag, e realizando a comparação via post, se contém em nosso Objeto.
   const compare_credentials = flag.find(d => d.document === document);			// Usuario já cadastrado pelo admin. flag, usuario fica gravado no sistema atraves do codigo fonte.

   // Etapa 2.
   // procurando um usuario e verificando se contem dentro do objeto new_flag.
   const new_user_connection = new_flag.find(user => user.document === document && user.password === password);		// Usuario registrado pelo proprio usuario. new_flag, assim que o navegador fechar, sera perdido.

   // 1. realizando a verificação com bcrypt.
   if(compare_credentials)
   {
      bcrypt.compare(password, compare_credentials.hash, (err, result) => {
         if(result)
         {
            response.sendFile(path.join(__dirname, "../../views/admin", "admin.html"));
         } else {
            response.status(401).send(`<h1> Password incorrect </h1>`);			// Se a senha estiver incorreta.
         }
      });
   }

   // Ou passa,

   // 2. realizando a verificação com new_flag.
   else if(new_user_connection) {
      response.status(200).send(`<h1> Login successfully 200! </h1>`);
   } else {
      response.status(401).send(`<h1> Error username or password incorrect </h1>`);
   }

});


module.exports = router;
