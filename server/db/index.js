//this is the access point for all things database related!

const db = require("./db");
const Product = require("./models/Product");
const User = require("./models/User");

//associations could go here!

// o: how do you make orders have more than one product?
User.belongsToMany(Product, { through: "Orders" });
Product.belongsToMany(User, { through: "Orders" });

module.exports = {
  db,
  models: {
    User,
    Product,
  },
};
