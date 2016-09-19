import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './reducers';
import App from './components/App';

//store stores all the data
//reducers tell store what to store
const store = createStore(allReducers);
//use Provider tab to allow the app to access the store data
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
    document.getElementById('root')
);
