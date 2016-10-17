var React = require('react');
var Main = require('../components/Main');
var Home = require('../components/Home');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute; 


// This means when the user goes to the root path, the component that's going to be served is this Main component.
//Index Route is like a default route when other route don't match 
module.exports = (
	<Route path = "/" component={Main}>
		<IndexRoute component={Home} />
	</Route>

);