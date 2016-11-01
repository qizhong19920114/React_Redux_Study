import React from 'react';
import ReactDOM from 'react-dom'; 
import FilterableProductTable from './App';
import PRODUCTS from './products';

//this is the main entry as defined in the webpack.config.js file
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('app')
);