/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
const montlimartbrand = require('./eshops/montlimartbrand');
const circlebrand = require('./eshops/circlebrand');

const dedicated = ['dedicated', "https://www.dedicatedbrand.com/en/men/t-shirts", dedicatedbrand];
const montlimard = ['montlimard', "https://www.montlimart.com/99-vetements", montlimartbrand];
const circle = ['circle', "https://shop.circlesportswear.com/collections/collection-homme", circlebrand];

const eshops = [dedicated,montlimard ,circle];

async function sandbox (brand = 'dedicated') {
  try {
    var products;
    var eshop;
    switch(brand) {
      case('dedicated'):
        eshop = "https://www.dedicatedbrand.com/en/men/t-shirts";
        products = await dedicatedbrand.scrape(eshop);
        break;
      case('montlimard'):
        eshop = "https://www.montlimart.com/99-vetements";
        products = await montlimartbrand.scrape(eshop);
        break;
      case('circle'):
        eshop = "https://shop.circlesportswear.com/collections/collection-homme";
        products = await circlebrand.scrape(eshop);
        break;
    }

    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

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
