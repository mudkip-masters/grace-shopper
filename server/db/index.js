//this is the access point for all things database related!

const db = require("./db");
const Order = require("./models/Order");
const Product = require("./models/Product");
const User = require("./models/User");
const OrderProduct = require("./models/OrderProduct");

//associations could go here!

User.belongsToMany(Product, { through: Order });
Product.belongsToMany(User, { through: Order });

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderProduct,
  },
};
