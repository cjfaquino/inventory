#! /usr/bin/env node

const Item = require('./dist/models/Item').default;
const Category = require('./dist/models/Category').default;

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const createHttpError = require('http-errors');

console.log(
  'This script populates some test items and categories to your database'
);

dotenv.config();
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));

const items = [];
const categories = [];

async function main() {
  if (!mongoDB) {
    throw createHttpError(404, 'MongDB not found');
  }
  console.time('MongoDB connected');
  await mongoose.connect(mongoDB);
  console.timeEnd('MongoDB connected');

  // for resetting the db
  console.log('Cleaning db');
  await mongoose.connection.db.dropDatabase((err, result) => {
    if (err) console.log(err);
    console.log(result);
  });

  await createCategories();
  await createItems();

  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function categoryCreate({ name, description }) {
  const category = new Category({
    name,
    description,
  });
  await category.save();
  categories.push(category);
  console.log(`Added category: ${name}`);
}

async function itemCreate({ name, description, category, price, stock }) {
  const detail = { name, description, price, stock };
  if (category !== undefined) detail.category = category;

  const item = new Item(detail);
  await item.save();
  items.push(item);
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log('Adding categories');

  await categoryCreate({
    name: 'CPU',
    description:
      'Each CPU is available in different speeds, cores, and cache sizes, allowing you to choose the one that best suits your needs.',
  });

  await categoryCreate({
    name: 'GPU',
    description:
      'A GPU, or Graphics Processing Unit, is a specialized processor that handles complex visual calculations, such as rendering images and videos, to produce high-quality graphics and enhance overall performance of computers.',
  });

  await categoryCreate({
    name: 'RAM',
    description:
      "A variety of high-speed and reliable RAM modules to boost your computer's performance.",
  });

  await categoryCreate({
    name: 'Cases',
    description:
      'PC cases come in different sizes, styles, and colors, allowing you to choose the one that best suits your needs and preferences.',
  });

  await categoryCreate({
    name: 'Power Supply',
    description:
      'Power supplies (PSUs) come in different wattages, efficiency ratings, and form factors, allowing you to choose the one that best suits your needs and budget.',
  });

  await categoryCreate({
    name: 'SSD',
    description:
      'An SSD, or Solid State Drive, is an essential component of your computer that uses flash memory to store data, unlike traditional hard drives that use spinning disks.',
  });
}

async function createItems() {
  console.log(`Adding items`);
  await Promise.all([
    //
    // CPU
    //
    itemCreate({
      name: 'Intel Core i9-11900K',
      description: 'Rocket Lake 8-Core 3.5 GHz LGA 1200 125W Desktop Processor',
      price: 599.99,
      stock: 50,
      category: categories[0],
    }),
    itemCreate({
      name: 'AMD Ryzen 9 5950X',
      description: 'Zen 3 16-Core 3.4 GHz Socket AM4 105W Desktop Processor',
      price: 799.99,
      stock: 30,
      category: categories[0],
    }),
    itemCreate({
      name: 'Intel Core i7-11700K',
      description: 'Rocket Lake 8-Core 3.6 GHz LGA 1200 125W Desktop Processor',
      price: 399.99,
      stock: 75,
      category: categories[0],
    }),
    itemCreate({
      name: 'AMD Ryzen 7 5800X',
      description: 'Zen 3 8-Core 3.8 GHz Socket AM4 105W Desktop Processor',
      price: 449.99,
      stock: 100,
      category: categories[0],
    }),
    itemCreate({
      name: 'Intel Core i5-11600K',
      description: 'Rocket Lake 6-Core 3.9 GHz LGA 1200 125W Desktop Processor',
      price: 279.99,
      stock: 125,
      category: categories[0],
    }),
    //
    // GPU
    //
    itemCreate({
      name: 'Nvidia GeForce RTX 3090',
      description: '24GB GDDR6X 384-Bit Graphics Card',
      price: 1499.99,
      stock: 25,
      category: categories[1],
    }),
    itemCreate({
      name: 'AMD Radeon RX 6900 XT',
      description: '16GB GDDR6 256-Bit Graphics Card',
      price: 999.99,
      stock: 50,
      category: categories[1],
    }),
    itemCreate({
      name: 'Nvidia GeForce RTX 3080',
      description: '10GB GDDR6X 320-Bit Graphics Card',
      price: 699.99,
      stock: 75,
      category: categories[1],
    }),
    itemCreate({
      name: 'AMD Radeon RX 6800 XT',
      description: '16GB GDDR6 256-Bit Graphics Card',
      price: 649.99,
      stock: 100,
      category: categories[1],
    }),
    itemCreate({
      name: 'Nvidia GeForce RTX 3070',
      description: '8GB GDDR6 256-Bit Graphics Card',
      price: 499.99,
      stock: 125,
      category: categories[1],
    }),
    //
    // RAM
    //
    itemCreate({
      name: 'Corsair Vengeance LPX 16GB DDR4 3200MHz',
      description: '16GB (2 x 8GB) DDR4 3200MHz Desktop Memory',
      price: 89.99,
      stock: 100,
      category: categories[2],
    }),
    itemCreate({
      name: 'G.Skill Ripjaws V 32GB DDR4 3600MHz',
      description: '32GB (2 x 16GB) DDR4 3600MHz Desktop Memory',
      price: 179.99,
      stock: 50,
      category: categories[2],
    }),
    itemCreate({
      name: 'Crucial Ballistix 16GB DDR4 3200MHz RGB',
      description:
        '16GB (2 x 8GB) DDR4 3200MHz Desktop Memory with RGB Lighting',
      price: 99.99,
      stock: 75,
      category: categories[2],
    }),
    itemCreate({
      name: 'Kingston HyperX Predator 32GB DDR4 3600MHz',
      description: '32GB (2 x 16GB) DDR4 3600MHz Desktop Memory',
      price: 189.99,
      stock: 25,
      category: categories[2],
    }),
    itemCreate({
      name: 'Team T-Force Vulcan Z 16GB DDR4 3200MHz',
      description: '16GB (2 x 8GB) DDR4 3200MHz Desktop Memory',
      price: 79.99,
      stock: 125,
      category: categories[2],
    }),
    //
    // Cases
    //
    itemCreate({
      name: 'NZXT H510i',
      description: 'Compact ATX Mid-Tower PC Gaming Case',
      price: 109.99,
      stock: 50,
      category: categories[3],
    }),
    itemCreate({
      name: 'Fractal Design Meshify C',
      description: 'Compact ATX Mid-Tower PC Case',
      price: 89.99,
      stock: 75,
      category: categories[3],
    }),
    {
      name: 'Lian Li O11 Dynamic XL ROG Certified',
      description: 'Full Tower ATX Gaming Case',
      price: 199.99,
      stock: 25,
      category: categories[3],
    },
    itemCreate({
      name: 'Phanteks Eclipse P400A Digital',
      description: 'ATX Mid-Tower Gaming Case with Tempered Glass',
      price: 119.99,
      stock: 100,
      category: categories[3],
    }),
    itemCreate({
      name: 'Corsair Obsidian Series 500D RGB SE',
      description: 'Premium Mid-Tower ATX Case with Tempered Glass',
      price: 249.99,
      stock: 10,
      category: categories[3],
    }),
    //
    // PSU
    //
    itemCreate({
      name: 'Corsair RM750x',
      description: '750W 80+ Gold Fully Modular Power Supply',
      price: 129.99,
      stock: 50,
      category: categories[4],
    }),
    itemCreate({
      name: 'EVGA SuperNOVA 850 G5',
      description: '850W 80+ Gold Fully Modular Power Supply',
      price: 169.99,
      stock: 75,
      category: categories[4],
    }),
    itemCreate({
      name: 'Seasonic FOCUS GX-650',
      description: '650W 80+ Gold Fully Modular Power Supply',
      price: 99.99,
      stock: 25,
      category: categories[4],
    }),
    itemCreate({
      name: 'Thermaltake Toughpower PF1 ARGB 850W',
      description:
        '850W 80+ Platinum Fully Modular Power Supply with ARGB Lighting',
      price: 199.99,
      stock: 100,
      category: categories[4],
    }),
    itemCreate({
      name: 'be quiet! Straight Power 11 Platinum 750W',
      description: '750W 80+ Platinum Fully Modular Power Supply',
      price: 149.99,
      stock: 10,
      category: categories[4],
    }),
    //
    // SSD
    //
    itemCreate({
      name: 'Samsung 970 EVO Plus',
      description: '1TB NVMe SSD',
      price: 229.99,
      stock: 50,
      category: categories[5],
    }),
    itemCreate({
      name: 'Western Digital WD Blue SN550',
      description: '1TB NVMe SSD',
      price: 129.99,
      stock: 75,
      category: categories[5],
    }),
    itemCreate({
      name: 'Crucial MX500',
      description: '1TB SATA SSD',
      price: 109.99,
      stock: 25,
      category: categories[5],
    }),
    itemCreate({
      name: 'ADATA XPG SX8200 Pro',
      description: '1TB NVMe SSD',
      price: 149.99,
      stock: 100,
      category: categories[5],
    }),
    itemCreate({
      name: 'Sabrent Rocket Q4',
      description: '2TB NVMe SSD',
      price: 399.99,
      stock: 10,
      category: categories[5],
    }),
  ]);
}
