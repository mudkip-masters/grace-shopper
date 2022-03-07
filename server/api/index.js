const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/cart', require('./cart'));
router.use('/OrderProduct', require('./orderProduct'));
router.use('./admin', require('./admin'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
