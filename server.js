const express = require('express');
const hbs = require('hbs');
const path = require('path');

// Abrindo caminho para as pastas
const views_path = path.resolve(__dirname, 'views');
const public_path = path.resolve(__dirname, 'public');
const app = express();

// Conectando os diretorios
const routes = require('./routes/routes');
const connection = require('./database');
require('../src/config/database');

app.use(express.urlencoded());
app.use('/', routes);

 //Template Engine
 app.set('view engine', 'hbs');
 app.use(express.static(public_path));
 app.set('views', views_path);


app.listen(5500, function (req, res) {
    console.log('Server running http://localhost:5500');
});