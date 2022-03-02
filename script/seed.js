"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");
const Order = require("../server/db/models/Order");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "345" }),
  ]);
  // Ccreatinf Product
  const products = await Promise.all([
    Product.create({
      name: "Taco",
      imageURL: "mexcian food pictures",
      description:
        "crispy or soft corn or wheat tortilla that is folded or rolled and stuffed with a mixture",
      price: 13,
      calories: 500,
    }),
    Product.create({
      name: "Ramen",
      imageURL: " Japanese food pictures",
      description:
        "fish-based broth, often flavored with soy sauce or miso, and uses toppings such as sliced pork ",
      price: 14,
      calories: 750,
    }),
    Product.create({
      name: "Kebab",
      imageURL: "Turkish food pictures",
      description: "Tender Lamb skewer, served with Bulgur and Fries",
      price: 11,
      calories: 800,
    }),
    Product.create({
      name: "Chicken Curry",
      imageURL: "Indian food pictures",
      description: "Grilled chiken,served with Rice and Salad",
      price: 11,
      calories: 800,
    }),
  ]);

  const OrderOne = Order.create({
    userId: 1,
    productId: 1,
    isFulfilled: true,
  });

  await users[0].addProduct(products[0]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
