import React from 'react';
import {Router, Route, Link, hashHistory} from 'react-router';


//The nested routing; Interesting to notice that, when we go to the contact route, because the route is structred in a hierarchy way, the page will render Home, About and Contact all three
const Home = (props)=> <div><h1>Home</h1><Links />{props.children}</div>; 
const About = (props) => <div><h1>About</h1>{props.children}</div>; 
const Contact = () => <div><h1>Contact</h1></div>; 

// create the link component for menu navigation
// Link component changes the path and the Router direct the path to the content pages
const Links = () => 
	<nav>
		<Link activeStyle={{color: 'green'}} to="/">Home </Link>
		<Link activeStyle={{color: 'green'}} to="/about">About </Link>
		<Link activeClassName="active" to="/about/contact">Contact </Link>
	</nav>


class App extends React.Component {
	render(){

		//use browserHistory to get a clear readable url
		//the downside is if we refresh the page we navigate to, we will get, for example "Cannot GET /about"
		//So if we are using browserHistory, then we need to configure a express server
		//when we use hashHistory, we don't need to set up a server because the keys after # keep track of the broswing history
		return(
			<Router history={hashHistory}>
				<Route path="/" component={Home}>
					<Route path="/about" component={About}>
						<Route path="/about/contact" component={Contact}></Route>
					</Route>
				</Route>
			</Router>
		);
	}

}


export default App; 