var React = require('react');
var SearchGithub = require('./SearchGithub');

//This this.props.children is going to be swapped out by whatever the child component is, in this case it's the Home component if you look at the routes.js file
var Main = React.createClass({
	render: function(){
		return (
				<div className="main-container">
					<nav className = "navbar navbar-default" role = "navigation">
						<div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
							<SearchGithub/>
						</div>
					</nav>
					<div className="container">
						{this.props.children}
					</div>
				</div>
		)
	}

});


module.exports = Main; 