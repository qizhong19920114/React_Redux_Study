import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';

//We can render multiple components in a single route using something called named component
const Home = () => <h1>Home</h1>
const HomeBody = () => <h1>HomeBody</h1>
const Other = () => <h1>Other</h1>
const OtherBody = () => <h1>OtherBody</h1>

const Container=(props) =>
	<div>{props.header}{props.body}<Links /></div>

const Links = () => 
	<nav>
		<Link to="/">Home</Link>
		<Link to="/other">Other</Link>
	</nav>



//notice here we can pass multiple component to a ROUTE;
//we use double {} here because the outer {} is how we refer to an object in the html syntax, the inner {} is how we create an object to map the components to the props of the parent component assigned to the route. 
class App extends React.Component {
	render(){
		return(
			<Router history={hashHistory}>
				<Route path="/" component={Container}>
					<IndexRoute components={{header: Home, body: HomeBody}}></IndexRoute>
					<Route path="/other" components={{header:Other, body: OtherBody}}></Route>
 				</Route>
			</Router>
			
		);
	}

}


export default App; 