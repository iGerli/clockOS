const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'data')));

app.get('/', (req, res) => {
  res.sendfile(`${__dirname}/data/index.html`);
});

app.listen(3333);
