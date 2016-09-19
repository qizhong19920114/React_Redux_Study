 import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/index';


//container is look like mostly components but it contains data from store class
class UserList extends Component {

	createListItems(){

		//map users to a list
		// we need to use ()=> to call the prop function
		return this.props.users.map((user) => {
			return (
					<li key={user.id} onClick={() => this.props.selectUser(user)}>
						{user.first} {user.last}
					</li>
				);
		});
	}

	render() {

		return (
				<ul>
					{this.createListItems()}
				</ul>
			);
	}
}

//what this function does is it allows you to pass your data to your component as properties
//"users" is mentioned in the reducers/index.js file. 
// we can access users because store data is pass down from the parent component. 
function mapStateToProps(state) {

	return {
		users: state.users
	}
}


//we can pass the action direct to the component but it's better if we do it in a redux way to use the redux framework
function matchDispatchToProps(dispatch){

	return bindActionCreators({selectUser: selectUser}, dispatch)
}


//taking that component and make it aware of the application user data
export default connect(mapStateToProps, matchDispatchToProps)(UserList);



