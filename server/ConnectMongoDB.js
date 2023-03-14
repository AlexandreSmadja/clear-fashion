const fs = require('fs');

const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://asmadja:EAveVGPvYlYepK8g@clear-fashion.wwjougk.mongodb.net/test?retryWrites=true&writeConcern=majority';
const MONGODB_DB_NAME = 'clear-fashion';


const client = new MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
client.connect(err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db('test');
    
    // Perform database operations here
    
    client.close();
  });

/*
var products=[];
const dedicated = JSON.parse(fs.readFileSync("C:/Users/alexa/Documents/td/S08/web app/clear-fashion/server/exports/dedicated_export.json"));
const montlimart = JSON.parse(fs.readFileSync("C:/Users/alexa/Documents/td/S08/web app/clear-fashion/server/exports/montlimart_export.json"));
const circle = JSON.parse(fs.readFileSync("C:/Users/alexa/Documents/td/S08/web app/clear-fashion/server/exports/circle_export.json"));

products = Object.assign(products, dedicated);
products = Object.assign(products, montlimart);
products = Object.assign(products, circle);




// const client = new MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});

client.connect(async () => {
    const collection = client.db("clear-fashion").collection("products");
    const result = await collection.insertMany(products);
    console.log(result);
  client.close();
}); */