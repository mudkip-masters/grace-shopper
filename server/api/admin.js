const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { Product, User },
} = require('../db');
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
router.get('/users', requireToken, async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const users = await User.findAll();
      res.send(users);
    } catch (error) {
      next(error);
    }
  } else {
    res.send('not autherticated');
  }
});

router.get('/', requireToken, async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const allProducts = await Product.findAll();
      res.send(allProducts);
    } catch (error) {
      next(error);
    }
  } else {
    res.send('not autherticated');
  }
});

router.get('/:id', requireToken, async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const product = await Product.findByPk(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  } else {
    res.send('not autherticated');
  }
});

router.put('/:productId', requireToken, async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const product = await Product.findByPk(req.params.productId);
      await product.update(req.body);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  } else {
    res.send('not autherticated');
  }
});

router.post('/', requireToken, async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const product = await Product.create(req.body);
      res.send(product);
    } catch (error) {
      next(error);
    }
  } else {
    res.send('not autherticated');
  }
});

router.delete('/:productId', requireToken, async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const product = await Product.findByPk(req.params.productId);
      await product.destroy();
      res.send(product);
    } catch (err) {
      next(err);
    }
  } else {
    res.send('not autherticated');
  }
});
