import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';

//react router allows us to pass in query strings as props to any component that's gonna be rendered in a specific route

const Page = (props) =>
	<div><h1>{props.location.query.message || 'Hello'}</h1><Links/></div>

const Links = () => 
	<nav>
		<Link to={{pathname:'/', query: {message: 'Yo'}}}>Yo</Link>
	</nav>


class App extends React.Component {
	render(){
		return(
				<Router history={hashHistory}>
					<Route path="/" component={Page}></Route>
				</Router>
		)
	}
}

export default App; 