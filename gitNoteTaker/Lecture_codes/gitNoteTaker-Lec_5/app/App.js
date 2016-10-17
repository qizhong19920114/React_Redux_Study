var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router; 
var routes = require('./config/routes');


// Damn, it took me quite long to figure out but some warning I saw are just because package version. 
//Instead of passing in a component here, we are going to pass in our router
ReactDOM.render(
	<Router>{routes}</Router>,
	document.getElementById('app')
)