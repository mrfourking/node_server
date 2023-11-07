const express = require('express');
const app = express();

const host = '127.0.0.1';
const port = 8000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Greetings from Pug',
    content: 'Node js Pug description',
    type: 'h3'
  });
});

app.post('/api/admin', (req, res) => {
  res.status(200).type('text/plain');
  res.send('Create admin request');
});

app.post('/api/user', (req, res) => {
  res.status(200).type('text/plain');
  res.send('Create user request');
});

app.use(
  '/uploads',
  express.static(`${__dirname}/assets/images`)
);

app.use((req, res, next) => {
  res.status(404).type('text/plain');
  res.send('Not found');
});

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});
