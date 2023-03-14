/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
const montlimartbrand = require('./eshops/montlimartbrand');
const circlebrand = require('./eshops/circlebrand');

const fs = require('fs');
const { json } = require('stream/consumers');


async function sandbox (brand = 'dedicated') {
  try {
    var products;
    var eshop;
    var filename;
    switch(brand) {
      case('dedicated'):
        eshop = "https://www.dedicatedbrand.com/en/men/t-shirts";
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        products = await dedicatedbrand.scrape(eshop);
        filename = "dedicated_export.json"
        break;
      case('montlimart'):
        eshop = "https://www.montlimart.com/99-vetements";
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        products = await montlimartbrand.scrape(eshop);
        filename = "montlimart_export.json"
        break;
      case('circle'):
        eshop = "https://shop.circlesportswear.com/collections/collection-homme";
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        products = await circlebrand.scrape(eshop);
        filename = "circle_export.json"
        break;
    }

    const toJson=JSON.stringify(products);
        fs.writeFileSync('./exports/' + filename, toJson, (err)=>{
            if(err) throw err;
        })
    

    console.log(products);
    console.log('done');

    

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



const [,, eshop] = process.argv;

sandbox(eshop);
