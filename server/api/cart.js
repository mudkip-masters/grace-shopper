const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
module.exports = router;

// '/cart/:userId' getting the user's current cart that isn't fulfilled
router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isFulfilled: false,
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
