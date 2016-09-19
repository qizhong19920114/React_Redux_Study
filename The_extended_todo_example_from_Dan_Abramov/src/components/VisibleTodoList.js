import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TodoList from './TodoList';
import {withRouter} from 'react-router';
import {getVisibleTodos, getErrorMessage, getIsFetching} from '../reducers';
// import {fetchTodos} from '../api';
import FetchError from './FetchError';


//The only purpose of adding this class is to add the life cycle hook so we can load the data from the fake api
class VisibleTodoList extends Component {
	//this life cycle hook load the data at the initial render
	componentDidMount() {
		this.fetchData();
	}
	//this lifecycle hook is called when the component has been updated
	componentDidUpdate(prevProps){
		if(this.props.filter !== prevProps.filter){
			this.fetchData();
		}
	}

	fetchData() {
		//un-destructoring the props from this.props
		const {filter, fetchTodos} =this.props; 

		

		//use this method from action injected by connect
		fetchTodos(filter).then(()=> console.log('done!!'));
	}

	render(){

		const {toggleTodo, errorMessage, todos, isFetching} = this.props

		if (isFetching && !todos.length) {

			return <p>Loading...</p>;
		}
		//if we have an error and we have no todos to display
		if (errorMessage && !todos.length){
			return (
				<FetchError
					message={errorMessage}
					onRetry={()=>this.fetchData()}
				/>
			);
		}

		return <TodoList 
					todos ={todos}
					onTodoClick={toggleTodo}
				/>;
	}

}

VisibleTodoList.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  errorMessage: PropTypes.string,
  todos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

const mapStateToProps = (state,{params}) => {
  const filter = params.filter || 'all';	
  return {
  			todos: getVisibleTodos(state, filter),
  			errorMessage: getErrorMessage(state, filter),
  			isFetching: getIsFetching(state, filter), 
			filter, 
	};
};


// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   },
// });

// we can just pass the from the action directly to the connect without using mapDispatchToProps.

//The argument in the second parenthesis is what the target is; In other words, it's where the mapped props are passed to; 
// In this case, they are, todos and onTodoClick; If you look at TodoList.js, those are teh exact two props needed, one is the data prop, the other is the method prop
// VisibleTodoList is what we called a smart redux component because it's taking the store from the redux dataflow. 

//use withRouter to access the top root router option without having to pass the option, in this case the filter from top to the grand grand child components.
// with router is convenient when we need to use the router option deep in the component tree. 


VisibleTodoList = withRouter( connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;
