// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

/*
Description of the available api
GET https://clear-fashion-api.vercel.app/

Search for specific products

This endpoint accepts the following optional query string parameters:

- `page` - page of products to return
- `size` - number of products to return

GET https://clear-fashion-api.vercel.app/brands

Search for available brands list
*/

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectReleased = document.querySelector('#recent-select');
const selectReasonable =document.querySelector('#reasonable-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

async function fetchBrands() {
  try {
    const response= await fetch(
      'https://clear-fashion-api.vercel.app/brands'
    );
    const body = await response.json();
    
    if (body.success !== true) {
      console.error(error);
    }
    else {
      var brands = body.data.result;
      const nbBrands = brands.length;
      brands.splice(0,0, "None");
      return brands;
    } 
    } catch (error) {
      console.error(error);
    }

};


/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}" target="_blank">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

const renderBrands = brands => {
  const options = Array.from(
    brands,
    (value) => `<option value="${value}">${value}</option>`
  ).join('');
  document.getElementById('nbBrands').innerHTML = brands.length;
  selectBrand.innerHTML = options;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectPage.addEventListener('change', async (event) => {
  const products = await fetchProducts(parseInt(event.target.value), currentPagination.pageSize);
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectBrand.addEventListener('change', async (event) => {
  let productsFiltered = [];
  const selectedBrand = event.target.value;
  if (selectedBrand !== "None") {
    productsFiltered = currentProducts.filter(products => products.brand == selectedBrand);
  }
  else {
    productsFiltered = currentProducts;
  }
  currentPagination.brand = event.target.value;
  renderProducts(productsFiltered)
})

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  

  const brands = await fetchBrands();
  renderBrands(brands);

  setCurrentProducts(products);
  render(currentProducts, currentPagination);

  const allProducts = await fetchProducts(1, currentPagination.count);
});


// Feature 3
selectReleased.addEventListener("click", async (event) => {
  const products = await fetchProducts(1, currentPagination.count);
  products.result = products.result.filter(product => {
    const date = new Date(product.released);
    return date > Date.now() - 12096e5;
  });
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
})




// Feature 4
