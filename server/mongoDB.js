const fs = require('fs');
const {MongoClient} = require('mongodb');




async function insertProducts() {
  const MONGODB_DB_NAME = 'clear-fashion';
  const MONGODB_URI = 'mongodb+srv://asmadja:EAveVGPvYlYepK8g@clear-fashion.wwjougk.mongodb.net/test?retryWrites=true&writeConcern=majority';
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
