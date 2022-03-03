const router = require('express').Router();
const {
  models: { OrderProduct },
} = require('../db');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const cartItem = await OrderProduct.create(req.body);
    res.json(cartItem);
  } catch (err) {
    next(err);
  }
});
