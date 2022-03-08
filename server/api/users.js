const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const Order = require('../db/models/Order');
const OrderProduct = require('../db/models/OrderProduct');
const Product = require('../db/models/Product');
const { requireToken, isAdmin } = require('./securityCheck');
module.exports = router;

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'isAdmin'],
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

//POST /api/users/:userId/cart (CREATE A NEW CART)
router.post('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Order.create({
      userId: req.params.userId,
      isFulfilled: false,
    });

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

//POST /api/users/:userId/cart (FIND OR CREATE)
router.post('/:userId/addToCart', async (req, res, next) => {
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

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

//PUT /api/users/:userId/cart request update quantites
router.put('/:userId/cart', async (req, res, next) => {
  try {
    const orderId = req.body.orderId;
    const productId = req.body.productId;
    const type = req.body.type;
    const singleOrderProduct = await OrderProduct.findOne({
      where: {
        orderId,
        productId,
      },
    });
    // console.log("singleProduct", singleOrderProduct);
    let currentQuantity = singleOrderProduct.quantity;
    if (type === 'increase') {
      currentQuantity = currentQuantity + 1 >= 10 ? 10 : currentQuantity + 1;
    }
    if (type === 'decrease') {
      currentQuantity = currentQuantity - 1 <= 1 ? 1 : currentQuantity - 1;
    }
    console.log(req.body.quantity);
    res.send(await singleOrderProduct.update({ quantity: currentQuantity }));
  } catch (err) {
    console.log(err);
  }
});

//PUT /api/users/:userId/order, set a cart to isFulfilled: true
router.put('/:userId/order', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isFulfilled: false,
      },
    });
    await cart.update({ isFulfilled: true });
  } catch (err) {
    next(err);
  }
});

//DELETE /api/users/:userId/cart/:orderId/:productId delete a orderProduct row (delete an item from cart)
router.delete('/:userId/cart/:orderId/:productId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    const singleOrderProduct = await OrderProduct.findOne({
      where: {
        orderId,
        productId,
      },
    });
    await singleOrderProduct.destroy();
    res.send(singleOrderProduct);
  } catch (err) {
    console.log(err);
  }
});
