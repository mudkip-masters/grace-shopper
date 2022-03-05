const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const Order = require("../db/models/Order");
const OrderProduct = require("../db/models/OrderProduct");
const Product = require("../db/models/Product");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//get a single user, and eager load its orders and orderProducts
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//GET /api/users/:userId/order

//GET /api/users/:userId/cart, load an unfilled order (cart) based on the user's orders
router.get("/:userId/cart", async (req, res, next) => {
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

//POST /api/users/:userId/cart (FIND OR CREATE)

router.post("/:userId/cart", async (req, res, next) => {
  try {
    const cart = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isFulfilled: false,
      },
      include: {
        model: OrderProduct,
      },
    });

    req.body.orderId = cart[0].id;
    const newItem = await OrderProduct.create(req.body, {
      include: Product,
    });
    res.json(newItem);
  } catch (err) {
    next(err);
  }
});
