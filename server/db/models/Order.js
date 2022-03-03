const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");
const User = require("./User");

const Order = db.define("order", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
  },

  isFulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
