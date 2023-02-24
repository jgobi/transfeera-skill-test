# Transfeera Backend Developer Test

## Dependências

Este software depende apenas do Node.JS versão 18 LTS e do seu respectivo gerenciador de pacotes (NPM).

Com o Node instalado, execute `npm install` na raiz do projeto para instalar as bibliotecas necessárias.

Em seguida, execute `cp .env.example .env` na raiz do projeto para criar o arquivo de variáveis de ambiente.

# Como executar?

Após configurar as variáveis de ambiente necessárias no arquivo `.env`, execute `npm start` na raiz do projeto para ligar o servidor.

Para popular o banco com dados aleatórios de teste, execute `npm run populate`.

# Como executar?

Após configurar as variáveis de ambiente necessárias no arquivo `.env`, execute na raíz do projeto:

- `npm test` para executar os testes de unidade e de integração;
- `npm run unit` para executar apenas os testes de unidade;
- `npm run integration` para executar apenas os testes de integração.
