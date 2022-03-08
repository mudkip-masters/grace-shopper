'use strict';

const { isAdmin } = require('../server/api/securityCheck');
const {
  db,
  models: { User, Product },
} = require('../server/db');
const Order = require('../server/db/models/Order');
const OrderProduct = require('../server/db/models/OrderProduct');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', isAdmin: false }),
    User.create({ username: 'murphy', password: '345', isAdmin: false }),
    User.create({ username: 'sulaiman', password: '321', isAdmin: true }),
  ]);
  // Ccreatinf Product
  const products = await Promise.all([
    Product.create({
      name: 'Lamb Kebab',
      imageURL:
        'https://s3-media0.fl.yelpcdn.com/bphoto/KC1qSLczwNDRF90QX2ycWQ/o.jpg',
      description: 'Tender Lamb skewer, served with Bulgur and Fries',
      price: 20,
      calories: 800,
    }),
    Product.create({
      name: 'Chicken Curry',
      imageURL:
        'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      description:
        'Sauteed chicken with onion,zucchini,garbonzo,spanich served with rice',
      price: 19,
      calories: 900,
    }),
    Product.create({
      name: 'Pomegranate Kebab',
      imageURL:
        'https://s3-media0.fl.yelpcdn.com/bphoto/1D_UOB-0h4_EEfmowqD4rA/o.jpg',
      description:
        'Ground Lamb and beef stuffed w/spanich topped over garlic yogurt',
      price: 20,
      calories: 900,
    }),
    Product.create({
      name: 'Divan',
      imageURL:
        'https://s3-media0.fl.yelpcdn.com/bphoto/zbHi_1MdVED82JutTNZ6zg/o.jpg',
      description:
        'Oven Baked spicy lamb&beef in a lavash 2/fresh tomatoes &mozeralla served w/ spanich&garlic yogurt',
      price: 22,
      calories: 1200,
    }),
    Product.create({
      name: 'Falafel',
      imageURL:
        'https://s3-media0.fl.yelpcdn.com/bphoto/3B1TDwlr8cffrMM3d9Ejbg/o.jpg',
      description:
        'Fried mashed garbanzo beans w/ parsley sesame seeds spices served w/ hummus **gf',
      price: 22,
      calories: 1200,
    }),
    Product.create({
      name: 'Beyti',
      imageURL:
        'https://s3-media0.fl.yelpcdn.com/bphoto/bMr0E0mWR5xr2aQSYj1IvA/o.jpg',
      description:
        'Minced lamb & beef, lavash, Served w/ yogurt & tomato sauce',
      price: 22,
      calories: 1200,
    }),
    Product.create({
      name: 'Adana',
      imageURL:
        'https://images.pexels.com/photos/6419704/pexels-photo-6419704.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description:
        'Seasoned spicy ground lamb & beef grilled and served w/bulgur and organic mix greens (also available in chicken)',
      price: 24,
      calories: 1500,
    }),
    Product.create({
      name: 'Musakka',
      imageURL:
        'https://media.istockphoto.com/photos/portion-of-moussaka-with-eggplant-on-a-plate-macro-horizontal-picture-id511068964',
      description:
        'Layers of eggplant & potatoes w/ ground lamb & beef topped in béchamel sauce served w/rice',
      price: 24,
      calories: 1500,
    }),
    Product.create({
      name: 'Kofte',
      imageURL:
        'https://s3-media0.fl.yelpcdn.com/bphoto/MY8WCZp-uvSMB7dVs-hheg/o.jpg',
      description:
        'Layers of eggplant & potatoes w/ ground lamb & beef topped in béchamel sauce served w/rice',
      price: 24,
      calories: 1500,
    }),
    Product.create({
      name: 'Gyro wrap',
      imageURL:
        'https://s3-media0.fl.yelpcdn.com/bphoto/lTJo63zyeal3qmcOiEYynQ/o.jpg',
      description:
        'Wrapped in lavash with greens, onion, tomatoes, and tahini sauce',
      price: 24,
      calories: 1500,
    }),

    Product.create({
      name: 'Margarita Pizza',
      imageURL:
        'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description:
        'crushed San Marzano tomato sauce, fresh mozzarella and basil, a drizzle of olive oil, and a sprinkle of salt',
      price: 18,
      calories: 1200,
    }),
    Product.create({
      name: 'Spaghetti Bolognese',
      imageURL:
        'https://images.pexels.com/photos/6287523/pexels-photo-6287523.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      description: 'Prepared with traditional meat sauce with spaghetti pasta.',
      price: 21,
      calories: 1200,
    }),
    Product.create({
      name: 'Penne with Chicken',
      imageURL:
        'https://irepo.primecp.com/2018/05/371955/Chicken-Penne-Pasta-With-Vodka-Sauce_ExtraLarge1000_ID-2732698.jpg?v=2732698',
      description:
        'Sautéed with sundried tomatoes, sweet corn, marinara, basil pesto, cream. ',
      price: 23,
      calories: 1120,
    }),
    Product.create({
      name: 'Pesto Gnocchi',
      imageURL:
        'https://images.pexels.com/photos/4748542/pexels-photo-4748542.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description:
        'Homemade potato dumplings with homemade pesto cream sauce and fresh tomatoes',
      price: 21,
      calories: 1200,
    }),
    Product.create({
      name: 'Bruschetta',
      imageURL:
        'https://media.istockphoto.com/photos/bruschetta-with-tomato-and-basil-picture-id469381932',
      description:
        'from Italy consisting of grilled bread rubbed with garlic and topped with olive oil and salt. Variations may include toppings of tomato, vegetables, beans, cured meat, or cheese.',
      price: 10,
      calories: 300,
    }),
    Product.create({
      name: 'Beef Carpaccio',
      imageURL:
        'https://images.pexels.com/photos/6488856/pexels-photo-6488856.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      description:
        'Thinly sliced filet mignon, capers, red onions, arugula, Parmigiano Reggiano and whole grain mustard sauce.',
      price: 16,
      calories: 560,
    }),
    Product.create({
      name: 'Fried Calamari.',
      imageURL:
        'https://images.pexels.com/photos/6036950/pexels-photo-6036950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description:
        'With fried green beans and artichokes served with chipotle aioli and lemon caper aioli.',
      price: 16,
      calories: 890,
    }),
    Product.create({
      name: 'Eggplant Parmesan',
      imageURL:
        'https://eatthegains.com/wp-content/uploads/2019/03/Instant-Pot-Eggplant-Parmesan-12.jpg',
      description:
        'Served with balsamic reduction, spaghetti pasta and marinara sauce.',
      price: 24,
      calories: 892,
    }),
    Product.create({
      name: 'Wild Mushroom Risotto',
      imageURL:
        'https://assets.epicurious.com/photos/54b315763edeef84363ba718/master/pass/361309_wild-mushroom-risotto_1x1.jpg',
      description: 'Sautéed wild mushrooms topped white truffle oil.',
      price: 24,
      calories: 892,
    }),
    Product.create({
      name: 'Veal Piccata',
      imageURL:
        'https://media.istockphoto.com/photos/veal-piccata-picture-id163163104',
      description:
        'Served over garlic mash potatoes, sautéed spinach, capers, garlic white wine sauce',
      price: 24,
      calories: 892,
    }),

    Product.create({
      name: 'Kimchi',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Korean_Gimchi01.jpg/1200px-Korean_Gimchi01.jpg',
      description:
        'a spicy Korean side dish created from salted, fermented vegetables, served with cabbage and radishes',
      price: 19,
      calories: 930,
    }),
    Product.create({
      name: 'Bibimbap',
      imageURL:
        'https://media.istockphoto.com/photos/bibimbap-picture-id492494788',
      description:
        'a Korean dish of rice with cooked vegetables,  meat, and often a raw or fried egg',
      price: 26,
      calories: 1220,
    }),
    Product.create({
      name: 'Red rice cakes (tteokbokki)',
      imageURL:
        'https://media.istockphoto.com/photos/tteokbokki-with-eggs-in-gray-bowl-on-concrete-table-top-tteokbokki-is-picture-id1253629795',
      description:
        'chewy rice cakes cooked in a sweet and spicy sauce made of Korean red pepper paste, also called gochujang',
      price: 17,
      calories: 965,
    }),
    Product.create({
      name: 'Bulgogi',
      imageURL:
        'https://media.istockphoto.com/photos/homemade-barbecue-korean-beef-bulgogi-picture-id926774114',
      description:
        'thinly sliced beef marinated in a sauce that is a mix of soy sauce, sugar or honey, sesame oil, garlic, onion, and often pureed Asian pear',
      price: 33,
      calories: 1235,
    }),
    Product.create({
      name: 'Korean stew (jjigae)',
      imageURL:
        'https://www.maangchi.com/wp-content/uploads/2007/11/kimchijjigae.jpg',
      description:
        'also known as kimchi stew or kimchi soup is probably the most common way of consuming some aged kimchi',
      price: 31,
      calories: 835,
    }),
    Product.create({
      name: 'Jajangmyeon',
      imageURL:
        'https://a.cdn-hotels.com/gdcs/production143/d643/67be50c8-3460-4544-b47a-e60f1d071340.jpg?impolicy=fcrop&w=1600&h=1066&q=medium',
      description:
        'jjajangmyeon (짜장면) is a Korean noodle dish topped with a thick sauce made of chunjang, diced pork, and vegetables',
      price: 29,
      calories: 735,
    }),
    Product.create({
      name: 'Samgyeopsal',
      imageURL:
        'https://assets-metrostyle.abs-cbn.com/prod/metrostyle/attachments/fa017f0c-cdb2-4e90-85ac-95e37da63932_samgyupsabahay.jpg',
      description:
        "samgyeop-sal (삼겹살) means 'three layer flesh,' referring to striations of lean meat and fat in the pork belly that appear as three layers when cut.",
      price: 35,
      calories: 1450,
    }),
    Product.create({
      name: 'Korean fried chicken',
      imageURL:
        'https://a.cdn-hotels.com/gdcs/production148/d1217/691c7201-0ede-467c-acaf-8bb2903356f1.jpg?impolicy=fcrop&w=1600&h=1066&q=medium',
      description:
        'Yangnyeom chicken is double deep fried chicken that is coated with sticky, spicy and sweet sauce',
      price: 28,
      calories: 990,
    }),
    Product.create({
      name: 'Spicy cold noodle (bibim nengmyun)',
      imageURL:
        'https://a.cdn-hotels.com/gdcs/production17/d515/6683396a-7dff-41d0-acd0-e13c00c5c67c.jpg?impolicy=fcrop&w=1600&h=1066&q=medium',
      description:
        'Bibim nengmyun is served in a stainless steel bowl with a cold broth, julienned cucumbers, Korean pear slices, boiled egg, and slices of cold boiled beef.',
      price: 29,
      calories: 820,
    }),
    Product.create({
      name: 'Ginseng chicken soup (samgyetang)',
      imageURL:
        'https://a.cdn-hotels.com/gdcs/production147/d1051/8bc6d80d-36d3-4a76-a495-1447aeb26c84.jpg?impolicy=fcrop&w=1600&h=1066&q=medium',
      description:
        'This nourishing soup consists of a small spring chicken stuffed with chestnuts, garlic, dried jujubes, ginseng, glutinous rice, and gingko nuts',
      price: 29,
      calories: 820,
    }),
  ]);

  const orders = await Promise.all([
    //Order 1 for murphy
    Order.create({
      userId: 1,
      isFulfilled: false,
    }),

    //Order 2 for cole
    Order.create({
      userId: 2,
      isFulfilled: false,
    }),
  ]);

  const orderProduct = await Promise.all([
    //add 4 tacos to murphy's order 1
    OrderProduct.create({
      orderId: 1,
      productId: 1,
      quantity: 4,
    }),
    // //add 3 chicken curry to murphy's order 1
    // OrderProduct.create({
    //   orderId: 1,
    //   productId: 4,
    //   quantity: 3,
    // }),
    //add 10 ramen to cole's order 2
    OrderProduct.create({
      orderId: 2,
      productId: 2,
      quantity: 10,
    }),
    //add 2 kebabs to cole's order 2
    OrderProduct.create({
      orderId: 2,
      productId: 3,
      quantity: 2,
    }),
  ]);

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
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
