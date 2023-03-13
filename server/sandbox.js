/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
const montlimartbrand = require('./eshops/montlimartbrand');
const circlebrand = require('./eshops/circlebrand');

const dedicated = ['dedicated', "https://www.dedicatedbrand.com/en/men/t-shirts"];
const montlimard = ['montlimard', "https://www.montlimart.com/99-vetements"];
const circle = ['circle', "https://shop.circlesportswear.com/collections/collection-homme"];

const eshops = [dedicated,montlimard /*,circle*/];

async function sandbox (eshop = 'https://shop.circlesportswear.com/collections/collection-homme') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await circlebrand.scrape(eshop);

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
