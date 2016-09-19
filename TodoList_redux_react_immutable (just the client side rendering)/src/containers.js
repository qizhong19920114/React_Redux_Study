// src/containers.js

import {connect} from 'react-redux';
import * as components from './components';
import { addTodo, toggleTodo} from './actions';

// the todos object is passed in from provider from store and from reducer 
export const TodoList = connect(
	function mapStateToProps(state){
		return { todos: state};
	},

	function mapDispatchToProps(dispatch){
		return {
			addTodo: text => dispatch(addTodo(text)),
			toggleTodo: id => dispatch(toggleTodo(id))
		};
	}

)(components.TodoList);