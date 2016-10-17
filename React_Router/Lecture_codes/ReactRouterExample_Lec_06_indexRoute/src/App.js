import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';


const Outer = (props)=> <div><h1>Our Site</h1><Links />{props.children}</div>; 
const About = () => <div><h1>About</h1></div>; 
const Contact = () => <div><h1>Contact</h1></div>; 

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

		//I think the purpose of IndexRoute is more for structural purpose because it's like a default route for that level of hierachy
		return(
			<Router history={hashHistory}>
				<Route path="/" component={Outer}>
					<IndexRoute component={About}></IndexRoute>
					<Route path="/contact" component={Contact}></Route>	
				</Route>			
			</Router>
			
		);
	}

}


export default App; 