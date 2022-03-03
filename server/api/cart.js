const router = require('express').Router();
const {
  models: { Order },
} = require('../db');
module.exports = router;

// posting a card to order models
router.post('/', async (req, res, next) => {
  try {
    const cart = await Order.create(req.body);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});
