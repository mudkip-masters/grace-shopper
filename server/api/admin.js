const router = require('express').Router();
const Sequelize = require('sequelize');
const { isAdmin, isUser } = require('./securityCheck');
const {
  models: { Product },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    await product.update(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post('/', isUser, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});
