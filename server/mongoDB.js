const fs = require('fs');
const {MongoClient} = require('mongodb');

const MONGODB_DB_NAME = 'clear-fashion';
const MONGODB_URI = 'mongodb+srv://asmadja:EAveVGPvYlYepK8g@clear-fashion.wwjougk.mongodb.net/test?retryWrites=true&writeConcern=majority';


async function insertProducts() {
  
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db = client.db(MONGODB_DB_NAME);

  var data = fs.readFileSync("C:/Users/alexa/Documents/td/S08/web app/clear-fashion/server/exports/products.json");
  const products = JSON.parse(data);
  
  const collection = db.collection('products');
  await collection.deleteMany({});
  const result = await collection.insertMany(products);

  console.log(result)

  process.exit(0);
}
//insertProducts();

async function findProductsBrand(brand = "dedicated") {
  var result;
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db = client.db(MONGODB_DB_NAME);
  const collection = db.collection('products');

  result = await db.collection('products').find({brand}).toArray()
  console.log(result);
  process.exit(0);
}

async function findProductsLessThanPrice(price = 50) {
  var result;
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db = client.db(MONGODB_DB_NAME);
  const collection = db.collection('products');

  result = await collection.find({price:{"$lte":price}}).toArray()
  console.log(result);
  process.exit(0);
}


async function productsSortedByPrice(order = "default") {
  if (order=="asc"){order = 1}
  else if (order == "desc") {order = -1}
  else {
    order = 1;
    console.log("By default the order is ascending")
  }
  var result;
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db = client.db(MONGODB_DB_NAME);
  const collection = db.collection('products');

  result = await db.collection('products').find({}).sort({"price":order}).toArray()
  console.log(result);
  process.exit(0);
}


async function productsSortedByDate(order = "default") {
  if (order=="asc"){order = 1}
  else if (order == "desc") {order = -1}
  else {
    order = 1;
    console.log("By default the order is ascending")
  }
  var result;
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db = client.db(MONGODB_DB_NAME);
  const collection = db.collection('products');

  result = await db.collection('products').find({}).sort({"date":order}).toArray()
  console.log(result);
  process.exit(0);
}
const [,, order] = process.argv;
productsSortedByDate(50);
