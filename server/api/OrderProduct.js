// const { OrderProduct } = require("../db");
const OrderProduct = require("../db/models/OrderProduct");
// const Product = require("../db/models/Product");

const router = require("express").Router();

// getting the user's current cart items that match the order Id
router.get("/:orderId", async (req, res, next) => {
  try {
    // o: maybe I am mistaken here but shouldn't you be returning all 
    //  order products by orderId instead of just 1?
    const cart = await OrderProduct.findOne({
      where: {
        orderId: req.params.orderId,
      },
      // o: remove if not using
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

router.post("/", async (req, res, next) => {
  // o: one thing to consider is that req.body can store anything in there
  //  so one thing you may want to do in the future is check if OrderProduct
  //  matches the logged in user so you can't add products to someone else's
  //  order
  try {
    const cartItem = await OrderProduct.create(req.body);
    res.json(cartItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
