const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;

//GET all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//GET productId
router.get('/:productId', async (req, res, next) => {
  try {
    const products = await Product.findByPk(req.params.productId);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//POST product
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

//DELETE productId
router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    await product.destroy();
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});
