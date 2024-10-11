# Product Parser

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

No desenvolvimento do server, optei por utilizar ferramentas com as quais estou acostumado no meu dia a dia. Tenho uma preferência por TypeScript devido à padronização e à segurança que ele proporciona à aplicação. Isso também influenciou minha escolha pelo NestJS, um framework com o qual tenho familiaridade e que se alinha perfeitamente aos requisitos do projeto, oferecendo diversos pacotes que atendem a grande parte das necessidades.

Além disso, já configurei o Docker para o ambiente de produção, com a intenção de publicar a aplicação e implementar pipelines de CI/CD utilizando o GitHub Actions.

> This is a challenge by [Coodesh](https://coodesh.com/)
