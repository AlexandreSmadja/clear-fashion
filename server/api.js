const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {ObjectId} = require('mongodb')

const {MongoClient} = require('mongodb');

const MONGODB_DB_NAME = 'clear-fashion';
const MONGODB_URI = 'mongodb+srv://asmadja:EAveVGPvYlYepK8g@clear-fashion.wwjougk.mongodb.net/test?retryWrites=true&writeConcern=majority';

const PORT = 8092;

const app = express();

module.exports = app;



app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

async function getProduct() {
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db = client.db(MONGODB_DB_NAME);
  const collection = db.collection('products');

  app.get('/products/:idProd', async (request, response) => {
    try {
      const {idProd} = request.params;
      const result = await collection.findOne({_id:ObjectId(idProd)});
      
      response.send(result)
    }
    catch(err) {
      console.error(err.message);
    }    
  });

  app.get('/products/search/', async (request, response) => {
    try {

    }
    catch(err) {
      console.error(err.message);
    }
  })
}



app.get('/', (request, response) => {
  response.send({'ack': true});
});


app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
getProduct();