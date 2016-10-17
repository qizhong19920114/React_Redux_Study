import React from 'react';
import {Router, Route, Link, hashHistory} from 'react-router';

const Home = ()=> <div><h1>Home</h1><Links /></div>; 
const About = () => <div><h1>About</h1><Links /></div>; 
const Contact = () => <div><h1>Contact</h1><Links /></div>; 

// create the link component for menu navigation
// Link component changes the path and the Router direct the path to the content pages
const Links = () => 
	<nav>
		<Link activeStyle={{color: 'green'}} to="/">Home </Link>
		<Link activeStyle={{color: 'green'}} to="/about">About </Link>
		<Link activeClassName="active" to="/contact">Contact </Link>
	</nav>


class App extends React.Component {
	render(){

		//use browserHistory to get a clear readable url
		//the downside is if we refresh the page we navigate to, we will get, for example "Cannot GET /about"
		//So if we are using browserHistory, then we need to configure a express server
		//when we use hashHistory, we don't need to set up a server because the keys after # keep track of the broswing history
		return(
			<Router history={hashHistory}>
				<Route path="/" component={Home}></Route>
				<Route path="/about" component={About}></Route>
				<Route path="/contact" component={Contact}></Route>
			</Router>
		);
	}

}


export default App; 