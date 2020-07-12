<div align="">
    <h1>Show Twitter Hashtag - BackEnd</h1>
    BackEnd de um aplicativo para aprovação de tweets de uma determinada hashtag e visualização dos mesmos em um telão.
</div>
 


## Sobre
### Desafio
Um diretor de TV precisa exibir em um telão, os tweets que chegam contendo uma determinada hashtag que varia diariamente. Foi pedido que esses tweets fossem inseridos no telão por um controle: Através de um sistema web que seria comandado pelo pessoal de operações do estúdio, neste caso o mesmo deveria aprovar os tweets que estão chegando para que o mesmo seja exibido. Para essa exibição, deverá obrigatoriamente ter efeito de transição entre os tweets que foram aprovados no sistema de controle.

### Importante
Para o funcionamento desse repositório é necessário criar um App no [Twitter Development Platform](https://developer.twitter.com/en/docs/basics/getting-started) e um banco de dados MongoDB.

## Intalaçao e Inicialização
### Instalação
#### Clonar o repositório:

```
git clone https://github.com/kaueemanuel/show-twitter-hashtag-backend.git

cd show-twitter-hashtag-backend
```

#### Dependências:

#### `npm install`
ou
#### `yarn` 

#### ENV:
Na raiz do projeto crie um arquivo `.env` e nele escreva aa seguintes variáveis:

```
MONGO_URL=<String de conexão com o bando de dados>

CONSUMER_KEY=<Consumer key do twitter>
CONSUMER_SECRET=<Consumer secret do twitter>
ACCSESS_TOKEN=<Accsess token do twitter>
ACCSESS_TOKEN_SECRET=<Accsess token secret do twitter>
```
Obs.: substituia os campos em `<>`.

### Inicialização

#### `npm run start`
ou 
#### `yarn start` 

Após executar os comandos, basta acessar o [FrontEnd](https://github.com/kaueemanuel/show-twitter-hashtag-frontend).


## Contato


Kauê Malheiros - [GitHub](https://github.com/kaueemanuel) - [Linkedin](https://www.linkedin.com/in/kaue-malheiros).

Email: kaue.malheiros@gmail.com