var React = require('react');

var Repos = React.createClass({

	//Add type checking
	propTypes: {
		username: React.PropTypes.string.isRequired,
		repos: React.PropTypes.array.isRequired

	},

	render: function(){
		//console.log('repos:', this.props.repos);
		//whenever you map anything, React requires an key otherwise, it will just throw an error
		// if repos has html_url property, then represent is as a href link 
		var repos =this.props.repos.map(function(repo,index){
			return (
				<li className="list-gropu-item" key={index}>
					{repo.html_url && <h4><a href={repo.html_url}>{repo.name}</a></h4>}
					{repo.description && <p> {repo.description}</p>}
				</li>
			);
		});
		return (
				<div> 
					<h3> User Repos </h3>
					<ul className="list-group">
						{repos}
					</ul> 
				</div>
		)		
	}

});

module.exports = Repos;