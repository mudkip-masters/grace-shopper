// const { OrderProduct } = require("../db");
const OrderProduct = require('../db/models/OrderProduct');
// const Product = require("../db/models/Product");

const router = require('express').Router();

// getting the user's current cart items that match the order Id
router.get('/:orderId', async (req, res, next) => {
  try {
    const cart = await OrderProduct.findOne({
      where: {
        orderId: req.params.orderId,
      },
      // include: {
      //   model: Product,
      //   where: {
      //     id: req.params.orderId,
      //   },
      // },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const cartItem = await OrderProduct.create(req.body);
    res.json(cartItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
