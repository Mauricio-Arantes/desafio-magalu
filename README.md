<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Desafio proposto pela luizalabs que utiliza do framework nestJs </p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
  </p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Sobre

O projeto ?? um desafio proposta pela [luizalabs](https://www.linkedin.com/company/luizalabs/)!

O desafio consiste em criar um backend que inicia uma aplica????o de comunica????o, que consista na cria????o de sua base para que outros desenvolvedores possam trabalhar nesta base e evoluir o projeto

Para realizar o objetivo, utilizei do framework [Nest](https://nestjs.com/) para criar a base da aplica????o, [PostgreSql](https://www.postgresql.org/) como banco de dados principal, [Jest](https://jestjs.io/pt-BR/) para realizar os testes e tudo isso utilizando [Typescript](https://www.typescriptlang.org/)

# Instala????o

```bash
$ yarn
```

## Preparando o ambiente
```bash
# alterar nome do .env.sample para .env
$ .env

# inserir valor a para DATABASE_URL
$ DATABASE_URL="postgresql://root:root@localhost:5432/magalu_db"

# infraestrutura
$ yarn infra:up
```

## Rodando a aplica????o

```bash
A aplica????o roda no docker, importante checar l??!!!
```

## Testes

```bash
# testes unit??rios
$ yarn test

# testes funcionais
$ yarn test:functional

# cobertura dos testes
$ yarn test:cov
```

## Documenta????o da aplica????o

```bash
# iniciar a aplica????o
$ yarn start:dev

# acessar a url
$ http://localhost:3000/api/
```

# Principais comandos

- `start:dev`: inicia a aplica????o em `localhost:3000`
- `build`: cria a build para produ????o
- `start`: inicia um server com o c??digo da build
- `lint`: roda o eslint na pasta src
- `test`: roda os testes
- `test:watch`: roda os testes no watch mode

# Licen??a

Este projeto est?? sob licen??a MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.


Feito com :heart: por <a href="https://github.com/Mauricio-Arantes" target="_blank">Mauricio Arantes</a>

&#xa0;

<a href="#top">Voltar para o topo</a>
