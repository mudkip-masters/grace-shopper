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
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
});

//DELETE productId
router.delete('/:productId', async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(req.params.productId);
    if (!productToDelete) throw new Error(404);
    await product.destroy({
      where: {
        id: req.params.productId,
      },
    });
    res.json(productToDelete);
  } catch (err) {
    next(err);
  }
});

router.put('/:productId', async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.productId);
    if (!productToUpdate) throw new Error(404);
    const updatedProduct = await productToUpdate.update(req.body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});
