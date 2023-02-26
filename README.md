# Transfeera Backend Developer Test

## Descrição da implementação do projeto

Este projeto foi estruturado pensando em facilidade de escrita e manutenção futura, e foi organizado nas seguintes pastas:

- **handlers**: scripts responsáveis por processar as requisições à API, extraindo os dados necessários delas e invocando os _controllers_ conforme necessário.
- **validations**: contém os scripts com as funções de validação de dados recebidos pelas requisições. São usados pelos _handlers_.
- **controllers**: scripts responsáveis pela lógica de negócio. Eles não têm acesso às requisições e podem ser reutilizados em vários _handlers_ se necessário.
- **dal**: abreviação de **D**ata **A**cess **Layer**, são os scripts responsáveis por fazer a interface entre os _controllers_ e o banco de dados.

Além disso, existem alguns outros arquivos importantes na raiz do projeto:

- **database.js**: lida com a conexão ao banco de dados.
- **router.js**: faz a conexão entre os handlers e as rotas HTTP.
- **index.js**: o ponto de entrada da aplicação.
- **populate.js**: script para inserir no banco de dados um conjunto de 30 _Recebedores_ aleatórios.

O **banco de dados** usado neste projeto foi o SQLite, devido à sua portabilidade e simplicidade de uso. O banco de dados é criado e inicializado pelo próprio aplicativo durante a sua primeira inicialização, ou ao usar o script para popular o banco. Esta inicialização usa o arquivo **setup.sql** como semente.

Para facilitar a gestão de algumas configurações, é possível gerenciar as variáveis de ambiente usadas pelo software editando o arquivo **.env**. No arquivo **.env.example** estão escritas todas as variáveis usadas, junto com valores padrão para elas.

## Configuração e execução

Antes de executar este software é necessário possuir instalado o Node.JS versão 18 LTS no seu ambiente de trabalho.

Com o Node instalado e configurado no _PATH_ do computador, execute na raiz do projeto os seguintes comandos:

```
npm install
cp .env.example .env
npm run populate
npm start
```

Esses comandos irão preparar e executar o projeto usando valores padrão para as variáveis de ambiente necessárias, além de popular o banco de dados com 30 Recebedores aleatórios. Caso você precise costumizar alguma variável de ambiente, por favor edite o arquivo **.env** antes de executar `npm run populate`.

## Testando

Os testes deste projeto foram organizados em arquivos **\*.test.js**, disponíves ao lado dos arquivos que estão sendo testados.

Devido a uma limitação causada pelo uso do driver do SQLite e por questão de tempo, não foram desenvolvidos testes de integração usando o banco de dados. Explicações sobre esta limitação e sobre como ela poderia ser contornada em um sistema real podem ser questionadas em uma entrevista futura, caso seja interessante.

Para executar os testes implementados, basta executar `npm test` na raíz deste projeto. É imprescindível que um arquivo **.env** exista antes da execução dos testes.
