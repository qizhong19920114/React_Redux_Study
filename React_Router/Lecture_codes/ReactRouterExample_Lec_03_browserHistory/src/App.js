import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';

const Home = ()=> <div><h1>Home</h1><Links /></div>; 
const About = () => <div><h1>About</h1><Links /></div>; 
const Contact = () => <div><h1>Contact</h1><Links /></div>; 

// create the link component for menu navigation
// Link component changes the path and the Router direct the path to the content pages
const Links = () => 
	<nav>
		<Link to="/">Home </Link>
		<Link to="/about">About </Link>
		<Link to="/contact">Contact </Link>
	</nav>


class App extends React.Component {
	render(){

		//use browserHistory to get a clear readable url
		//the downside is if we refresh the page we navigate to, we will get, for example "Cannot GET /about"
		//So if we are using browserHistory, then we need to configure a express server
		//when we use hashHistory, we don't need to set up a server because the keys after # keep track of the broswing history
		return(
			<Router history={browserHistory}>
				<Route path="/" component={Home}></Route>
				<Route path="/about" component={About}></Route>
				<Route path="/contact" component={Contact}></Route>
			</Router>
		);
	}

}


export default App; 