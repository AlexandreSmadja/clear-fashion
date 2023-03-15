/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
const montlimartbrand = require('./eshops/montlimartbrand');
const circlebrand = require('./eshops/circlebrand');

const fs = require('fs');
const { json } = require('stream/consumers');

const brands = ['dedicated', 'circle','montlimart'];

async function sandbox (brand = 'all') {
  try {
    var products = {};
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
      case('all'):
        eshop = "https://www.dedicatedbrand.com/en/men/t-shirts";
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        const productsDedicated = await dedicatedbrand.scrape(eshop);
        eshop = "https://www.montlimart.com/99-vetements";
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        const productsMontlimart = await montlimartbrand.scrape(eshop);
        eshop = "https://shop.circlesportswear.com/collections/collection-homme";
        console.log(`🕵️‍♀️  browsing ${eshop} eshop`);
        const productsCircle = await circlebrand.scrape(eshop);

        
        products = productsDedicated.concat(productsMontlimart, productsCircle)
        filename = "products.json";
    }

    const toJson=JSON.stringify(products);
        fs.writeFileSync('C:/Users/alexa/Documents/td/S08/web app/clear-fashion/server/exports/' + filename, toJson, (err)=>{
            if(err) throw err;
        })
    

    console.log(products);
    console.log(products.length);
    console.log(typeof(products))
    console.log('done');

    

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



const [,, eshop] = process.argv;

sandbox(eshop);
