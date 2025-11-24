Como configurar SSL/TLS com openssl, linux utilizando NodeJS e Express
No início do projeto, começar como modo administrador(root). projetos
assim, precisam de desempenho maior.

(0). Verifique a instalação com: apt install openssl
(1). comece criando a chave: openssl genpkey -algorithm RSA -out private-key.pem -aes256
(2). Gerar o certificado CSR: openssl req -new private-key.pem -out request.csr
(3). Realizar assinatura: openssl x509 -req -in request.csr -signkey private-key.pem -out certificate.epm -days 365

O que é o SSL(Secure Socket Layer)
  O SSL, camada de soquetes seguros é um protocolo de segurança que proporciona privacidade de segurança
e integridade as comunicações na Ethernet. Eventuamente o SSL acabou evoluindo para o TLS, segurança da
camada de transporte.
  Um site que implementa SSL/TLS apresenta um "https" na url em vez de "http".

Como funciona o SSL/TLS
  Para proporcionar um alto grau de privacidade, o SSL criptograda os dados que são trafegados/transmitidos na Ethernet
  Isso significa qualquer atacante, que tentar interceptar esses dados. Vera apenas uma combinação de numeros
embaralhados, quase impossivel de descriptografar.
