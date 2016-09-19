//this is file for layout
import React from 'react';

import UserList from '../containers/user-list';

import UserDetails from '../containers/user-detail';

//add the style to the top layout so all the component can use it. 
require('../../scss/style.scss');

const App = () => (
		<div>
			<h2>Username List: </h2>
			<UserList />
			<hr/>
			<h2>User Details: </h2>
			<UserDetails />
		</div>
	);

export default App;

// somehow I think this folder should be called containers instead of components;
// just a quick note here