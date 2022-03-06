const router = require('express').Router();
module.exports = router;

<<<<<<< HEAD
router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/cart', require('./cart'));
router.use('/OrderProduct', require('./orderProduct'));
=======
router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/cart", require("./cart"));
router.use("/OrderProduct", require("./orderProduct"));
>>>>>>> 78ae052aafe01db3c2d3d43e8f1f3a2f1a489554

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
