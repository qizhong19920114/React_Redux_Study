import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';


// use the fake api 
// fetchTodos('all').then(todos =>
// 		console.log(todos)
// 	);

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
);
