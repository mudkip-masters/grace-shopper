const {
  models: { User },
} = require('../db');

const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('Nice Try..');
  }
};

module.exports = {
  isAdmin,
  isUser,
};
