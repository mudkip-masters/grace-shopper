const Sequelize = require("sequelize");
const db = require("../db");
const Order = require("./Order");
const Product = require("./Product");

const OrderProduct = db.define("orderProduct", {
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
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

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = OrderProduct;
