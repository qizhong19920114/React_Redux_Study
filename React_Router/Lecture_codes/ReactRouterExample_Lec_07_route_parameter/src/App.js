import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';


const Message = (props) =>
	<div><h1>{props.params.message || 'Hello'}</h1><Links /></div>

const Links = () =>
	<nav>
		<Link to="/">Hello</Link>
		<Link to="/Hi"> Hi </Link>
		<Link to="/Yo"> Yo </Link>
	</nav>



//Route parameter allows us to pass a portion of our path as a prop of our component. 
//This is a very handy feature especially when, for example, we need to display the page title based on the path
class App extends React.Component {
	render(){
		return(
			<Router history={hashHistory}>
				<Route path="/(:message)" component={Message}></Route>
			</Router>
			
		);
	}

}


export default App; 