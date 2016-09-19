//import {v4} from 'node-uuid';
import {getIsFetching} from '../reducers';
import * as api from '../api';
import {normalize} from 'normalizr';
import * as schema from './schema';

// const requestTodos = (filter) => ({});


// const receiveTodos = (filter,response) => ();


// export const addTodo = (text) => ({
//   type: 'ADD_TODO',
//   id: v4(),
//   text,
// });

// we are not using this because we are using the react router and filter is passed in from there. 
// export const setVisibilityFilter = (filter) => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter,
// });

// we use promises here instead of an object so we need to teach redux how to recgonize promises in the configureStore
// return a fucntion that takes dispatch as an argumetn so we can fire dispatch multiple times. 
// a function returns other funciton is called a "thunk" 
export const fetchTodos = (filter) => (dispatch, getState) => {
	//try to fix the race condition here. if it returns true, which means
	// we are loading currently tab, then we exit early from thunk without dispatch any actions 
	// we will inject the getState function from the thunk middleware
	// by doing this, now we prevent it from produce more than three concurrent api request 
	// this is a good way to avoid unnecessary network operation and potential race condition
	if(getIsFetching(getState(),filter)){

		return Promise.resolve();  
	}

	dispatch({
		type: 'FETCH_TODOS_REQUEST',
		filter,
	});

	//wait until data being fetched, and then return an action creater. 
	return api.fetchTodos(filter).then(
		response => {
			// console.log(
			// 		'normalized response',
			// 		normalize(response, schema.arrayOfTodos)
			// 	);
			dispatch({
					type: 'FETCH_TODOS_SUCCESS',
					filter, 
					response: normalize(response, schema.arrayOfTodos),
				});
			}, //add a rejection handler below
			error => {
				dispatch({
					type: 'FETCH_TODOS_FAILURE',
					filter, 
					message: error.message || 'Something went wrong.'
				});
			}
		);
};

export const addTodo = (text) => (dispatch) => 
	api.addTodo(text).then(response => {
		// console.log(
		// 		'normalized response',
		// 		normalize(response, schema.todo)
		// 	);

		dispatch({
			type: 'ADD_TODO_SUCCESS',
			response: normalize(response, schema.todo),
		});
	});


export const toggleTodo = (id) => (dispatch) => 
	api.toggleTodo(id).then(response => {
		dispatch({
			type: 'TOGGLE_TODO_SUCCESS',
			response: normalize(response, schema.todo)
		});
	});








