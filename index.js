const { createApolloFetch } = require('apollo-fetch');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const uri = 'http://localhost:3000/graphql';
const apolloFetch = createApolloFetch({ uri });

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Ola mundo');
});

app.get('/types', (req, res) => {
  apolloFetch({ query: '{ __schema { types { name } } }' })
    .then((result) => {
      const { data } = result;
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(7000, () => {
  console.log('Server listening on port 7000');
});
