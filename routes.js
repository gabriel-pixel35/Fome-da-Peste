const { Router } = require('express');
const router = Router();
const UserController = require('../controller/UserController');
const { authUser, createUser, updateUser } = require('../controller/UserController');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/cadastro', function(req, res) {
    res.render('cadastro');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/cardapio', function(req, res) {
    res.render('cardapio');
});

router.get('/cardapio_bebidas', function(req, res) {
    res.render('cardapio_bebidas');
});

router.get('/cardapio_churrasco', function(req, res) {
    res.render('cardapio_churrasco');
});

router.get('/cardapio_hamburguer', function(req, res) {
    res.render('cardapio_hamburguer');
});

router.get('/cardapio_lanches', function(req, res) {
    res.render('cardapio_lanches');
});

router.get('/cardapio_pizzas', function(req, res) {
    res.render('cardapio_pizzas');
});

router.get('/cardapio_sorvetes', function(req, res) {
    res.render('cardapio_sorvetes');
});

router.get('/carrinho', function(req, res) {
    res.render('carrinho');
});

router.get('/update', function(req, res) {
    res.render('update');
});

router.get('/mapa', function(req, res) {
    res.render('mapa');
});

router.post('/cadastro', createUser);
router.post('/update', updateUser);

router.post('/login', authUser)

module.exports = router;