const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const Order = require('../db/models/Order');
const OrderProduct = require('../db/models/OrderProduct');
const Product = require('../db/models/Product');
const { isUser, isAdmin } = require('./securityCheck');
module.exports = router;

router.get('/', isUser, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//get a single user, and eager load its orders and orderProducts
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//GET /api/users/:userId/order/
//find all for a user's fulfilled orders

//GET /api/users/:userId/order/:orderId
//search for a user's fulfilled orders

//GET /api/users/:userId/cart, load an unfilled order (cart) based on the user's orders
router.get('/:userId/cart', async (req, res, next) => {
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

router.post('/:userId/cart', async (req, res, next) => {
  try {
    //find a cart if it already exists, OR create a new cart if there is no cart for user/guest
    const cart = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isFulfilled: false,
      },
      include: {
        model: Product,
      },
    });

    req.body.orderId = cart[0].id;
    console.log(req.body.orderId);

    const newItem = await OrderProduct.create({
      orderId: req.body.orderId,
      productId: req.body.productId,
      quantity: req.body.quantity,
    });

    // OrderProduct.create({
    //   orderId: 2,
    //   productId: 3,
    //   quantity: 2,
    // }),

    res.json(cart);
  } catch (err) {
    next(err);
  }
});
