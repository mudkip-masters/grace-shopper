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
