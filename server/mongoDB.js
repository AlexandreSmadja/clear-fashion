const fs = require('fs');
const {MongoClient} = require('mongodb');




async function getProducts(brand) {
  const MONGODB_DB_NAME = 'clear-fashion';
  const MONGODB_URI = 'mongodb+srv://asmadja:EAveVGPvYlYepK8g@clear-fashion.wwjougk.mongodb.net/test?retryWrites=true&writeConcern=majority';
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db = client.db(MONGODB_DB_NAME);

  

}
