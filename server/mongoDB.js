const fs = require('fs');
const {MongoClient} = require('mongodb');


async function getClient() {
  const MONGODB_URI = 'mongodb+srv://asmadja:EAveVGPvYlYepK8g@clear-fashion.wwjougk.mongodb.net/test?retryWrites=true&writeConcern=majority';
  const MONGODB_DB_NAME = 'clear-fashion';
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  return client;
}


const client = getClient