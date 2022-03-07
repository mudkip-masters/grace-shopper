const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/cart', require('./cart'))

// o: your routes are usually always lowercase
// o: also, make sure to use the EXACT name when requiring since this breaks on
//  linux meaning heroku (not orderProduct)
router.use('/OrderProduct', require('./OrderProduct'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
