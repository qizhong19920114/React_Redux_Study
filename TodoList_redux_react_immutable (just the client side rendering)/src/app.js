import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {TodoList} from './containers';
import reducer from './reducer';
import {Provider} from 'react-redux';

const store = createStore(reducer);


render(
  <Provider store={store}>
  	<TodoList />
  </Provider>,

  document.getElementById('app')
);