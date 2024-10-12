# Product Parser

**Product** Parser é uma aplicação dedicada à listagem de produtos alimentícios, utilizando como fonte de dados o banco da OpenFood Project.

A aplicação é composta por dois componentes principais:

 - **Worker**: Responsável por atualizar a base de dados diariamente, às 00:00 UTC, aplicando o arquivo delta mais recente da OpenFood Project.
 - **Servidor**: Fornece endpoints para realizar operações como a atualização e listagem detalhada de produtos alimentícios.

Essa arquitetura permite que a base de dados esteja sempre atualizada com as últimas informações, garantindo maior precisão na consulta e exibição dos produtos.

### Technologies:
 - NodeJS
 - Typescript
 - Serverless
 - NestJS
 - Docker

### Project setup

```bash
$ npm install
```

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running with docker

```bash
# build and run container
$ docker compose up --build
```

### Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## About development

Durante o desenvolvimento do worker, optei pelo Serverless Framework devido à sua praticidade no processo de deploy. Como minha stack é baseada em AWS, utilizei AWS Lambda para execução das funções e SNS para comunicação com o tópico de notificação do worker para o e-mail. Além disso, configurei uma pipeline de CI/CD para automatizar o processo de deploy do worker.

No desenvolvimento do servidor, escolhi o NestJS pela familiaridade com o framework e pela sua capacidade de atender a muitos dos requisitos do desafio. Com ele, implementei testes integrados, utilizei o driver do MongoDB, configurei a documentação da API com Swagger (OpenAPI 3), e implementei um sistema de autenticação para garantir a segurança das operações.

Embora meu objetivo fosse também implementar uma pipeline de CI/CD para o servidor, devido ao tempo limitado e à falta de domínio nesse aspecto, decidi priorizar outras funcionalidades e deixar essa parte de lado. Contudo, deixei um Docker configurado que seria utilizado para o deploy.

![image](https://github.com/user-attachments/assets/10223a7a-ecda-425e-a3d5-820702bc187a)

Aqui está um vídeo com mais detalhes sobre o projeto: https://youtu.be/iwQ2D-NySr4.


> This is a challenge by [Coodesh](https://coodesh.com/)
