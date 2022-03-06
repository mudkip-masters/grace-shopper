const router = require("express").Router();
const {
  models: { Order },
<<<<<<< HEAD
} = require('../db');
const Product = require('../db/models/Product');
module.exports = router;

// '/cart/:userId' getting the user's current cart that isn't fulfilled
router.get('/:userId', async (req, res, next) => {
=======
} = require("../db");
const Product = require("../db/models/Product");
module.exports = router;

// '/cart/:userId' getting the user's current cart that isn't fulfilled
router.get("/:userId", async (req, res, next) => {
>>>>>>> 78ae052aafe01db3c2d3d43e8f1f3a2f1a489554
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isFulfilled: false,
      },
      include: {
        model: Product,
      },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// posting a card to order models
router.post("/", async (req, res, next) => {
  try {
    const cart = await Order.create(req.body.userId);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});
