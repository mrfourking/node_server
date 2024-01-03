const express = require('express');
const fs = require('fs');

const app = express();
const cookieParser = require('cookie-parser');

const host = '127.0.0.1';
const port = 8000;

app.use(cookieParser('secret key'));

app.set('views', './views');
app.set('view engine', 'pug');


app.use(
  '/uploads',
  express.static(`${__dirname}/assets/images`)
);

app.get('/', (req, res) => {

  fs.appendFile(
    'files/data.txt',
    '\nFile Content 2',
    'utf8',
    (err) => {
      if (err) throw err;

      console.log('Done');
    }
  );

  try {
    const content = fs.readFileSync(
      'files/data.txt',
      'utf8'
    );
    console.log(content);
  } catch (e) {
    console.log(e);
  }

  res.render('home');
});

app.get('/get-cookie', (req, res) => {
  console.log('Cookie: ', req.cookies);
  res.send('Get Cookie');
});

app.get('/set-cookie', (req, res) => {
  res.cookie('token', '12345ABCDE');
  res.send('Set Cookie');
});

app.post('/api/admin', (req, res) => {
  res.status(200).type('text/plain');
  res.send('Create admin request');
});

app.post('/api/user', (req, res) => {
  res.status(200).type('text/plain');
  res.send('Create user request');
});

app.use((req, res, next) => {
  res.status(404).type('text/plain');
  res.send('Not found');
});

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});
