import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import Profile from'../components/Profile';
import {Route, IndexRoute} from 'react-router';
 


// This means when the user goes to the root path, the component that's going to be served is this Main component.
//Index Route is like a default route when other route don't match 

// the child route component means go to profile component if someone try to access /profile/:username
export default (
	<Route path = "/" component={Main}>
		<Route path="profile/:username" component={Profile} />
		<IndexRoute component={Home} />
	</Route>

);