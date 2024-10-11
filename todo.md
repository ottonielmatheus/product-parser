## O projeto

- [X] Criar um banco de dados MongoDB;
- [X] Criar uma REST API com as melhores práticas de desenvolvimento, Design Patterns, SOLID e DDD.
- [X] Integrar a API com o banco de dados criado para persistir os dados
- [X] Recomendável usar Drivers oficiais para integração com o DB
- [ ] Desenvolver Testes Unitários

### Modelo de Dados:

- `imported_t`: campo do tipo Date com a dia e hora que foi importado;
- `status`: campo do tipo Enum com os possíveis valores draft, trash e published;

### Sistema do CRON

- [X] Collection para controle das importações
- [X] Todos os produtos deverão ter os campos personalizados `imported_t` e `status`.
- [X] Limitar a importação a somente 100 produtos de cada arquivo.

### A REST API

- [X] `GET /`: Detalhes da API, se conexão leitura e escritura com a base de dados está OK, horário da última vez que o CRON foi executado, tempo online e uso de memória.
- [X] `PUT /products/:code`: Será responsável por receber atualizações do Projeto Web
- [X] `DELETE /products/:code`: Mudar o status do produto para `trash`
- [X] `GET /products/:code`: Obter a informação somente de um produto da base de dados
- [X] `GET /products`: Listar todos os prod utos da base de dados, adicionar sistema de paginação para não sobrecarregar o `REQUEST`.

## Extras

- [ ] **Diferencial 1** Configuração de um endpoint de busca com Elastic Search ou similares;
- [X] **Diferencial 2** Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;
- [X] **Diferencial 3** Configurar um sistema de alerta se tem algum falho durante o Sync dos produtos;
- [X] **Diferencial 4** Descrever a documentação da API utilizando o conceito de Open API 3.0;
- [ ] **Diferencial 5** Escrever Unit Tests para os endpoints  GET e PUT do CRUD;
- [X] **Diferencial 6** Escrever um esquema de segurança utilizando `API KEY` nos endpoints. Ref: https://learning.postman.com/docs/sending-requests/authorization/#api-key

## Melhorias

- [X] Publicar o worker com pipeline de CI/CD
- [ ] Publicar o server com pipeline de CI/CD

## Readme do Repositório

- Deve conter o título do projeto
- Uma descrição sobre o projeto em frase
- Deve conter uma lista com linguagem, framework e/ou tecnologias usadas
- Como instalar e usar o projeto (instruções)
- Não esqueça o [.gitignore](https://www.toptal.com/developers/gitignore)
- Se está usando github pessoal, referencie que é um challenge by coodesh:

> This is a challenge by [Coodesh](https://coodesh.com/)

## Finalização e Instruções para a Apresentação

1. Adicione o link do repositório com a sua solução no teste
2. Adicione o link da apresentação do seu projeto no README.md.
3. Verifique se o Readme está bom e faça o commit final em seu repositório;
4. Envie e aguarde as instruções para seguir. Sucesso e boa sorte. =)
