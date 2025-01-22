# 🛠 Eleição do Líder Comunista da Bolha Dev do Bluesky
Bem-vindo ao repositório do Eleição do Líder Comunista! Este projeto é uma aplicação web divertida para simular eleições dentro da bolha dev, com uma interface amigável e bem humorada.

Link: https://novocomunista.vercel.app/

## Sobre o Projeto
A eleição permite que os camaradas escolham o próximo líder comunista da bolha dev no Bluesky. A página apresenta:

- Candidatos com avatares personalizados
- Visualização de resultados em tempo real

O projeto foi usado: 
- MongoDB
- React
- Next
- Typescript

Deseja participar como candidato para as pessoas votarem em você como o novo líder comunista da Bolha dev?

Você precisa ter o nome instalado, e fazer aquele ```run node dev```

Mas você vai precisar criar um arquivo ```.env``` passando a variável de ambiente de seu MongoDB.

O sistema está criado para que ao rodar, seja criado uma coleção automaticamente passando os candidatos que você deseja utilizar em sua votação.

Ao iniciar o mongo e criar um ```DataBase``` vai ser lançado uma ```String de conexão``` é ela que você vai passar no arquivo .env

Sua String de conexão é algo como

```DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database_name>?retryWrites=true&w=majority```

No arquivo ```page``` tem a interface ```VoteCount```, nela tem nosso componente que você deve alterar para seu contexto de votação com base no que você precisa.

Boa sorte na sua votação e qualquer dúvida

Contato: marlonjerold@outlook.com.br
