const express = require('express');
const app = express();
const PORT = 8080;

const Container = require('./container');
const container = new Container();

const server = app.listen(PORT, () => {
  console.log(`Servidor http://localhost:${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');


app.get('/products', async(req, res) => {
  const products = await container.getAll()
  res.render('pages/products', { products });
});

app.get('/', (req, res) => {
  res.render('pages/form', {});
});


app.post('/', (req, res) => {
  const {
      body
  } = req;
  try {
  container.save(body);
  res.send('Product uploaded');
  } catch {
  res.send('Product not saved');
  }
});