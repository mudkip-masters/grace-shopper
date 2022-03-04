const router = require("express").Router();
const {
  models: { OrderProduct },
} = require("../db");
module.exports = router;

// getting the user's current cart items that match the order Id
router.get("/:orderId", async (req, res, next) => {
  try {
    const cart = await OrderProduct.findAll({
      where: {
        orderId: req.params.orderId,
      },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const cartItem = await OrderProduct.create(req.body);
    res.json(cartItem);
  } catch (err) {
    next(err);
  }
});
