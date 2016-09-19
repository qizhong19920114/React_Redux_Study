import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserDetail extends Component {

	render(){
		//this if statement is because at the start, nothing is selected yet, so we need a default display. 
		if(!this.props.user){

			return (<h4> Select a user .. </h4>);
		}
		return(
				<div>
					<img src = {this.props.user.thumbnail}/>
					<h2> {this.props.user.first} {this.props.user.last} </h2>
					<h3> Age: {this.props.user.age} </h3>
					<h3> Description: {this.props.user.description} </h3>
				</div>
		);
	}
}
//damn I mapped it to users instead of user which causes errors..
//now i got it!!!
function mapStateToProps(state) {

	return {
		user: state.activeUser
	}
}

export default connect(mapStateToProps)(UserDetail);