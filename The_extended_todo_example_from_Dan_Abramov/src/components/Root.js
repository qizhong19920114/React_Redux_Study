import React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import {Router, Route, browserHistory} from 'react-router';

//use <Route> to tell the Router to use App component as root 
// use browserHistory so that the url won't use the hash url which is # followed by gibberish
// add a option filter to the path so the url changes as the visibilityFilter changes
const Root = ({store}) => (
		<Provider store = {store}>
			<Router history={browserHistory}>
				<Route path='/(:filter)' component={App} />
			</Router>
		</Provider>
	);

export default Root; 
