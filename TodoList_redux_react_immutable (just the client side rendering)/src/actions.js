// src/actions.js

// succinct hack for generating passable unique ids

// This is the ES6 way of creating a function that takes no params 
// 34 is the redix
// the line below is the same as: 
// const uid = function() {return Math.random().toString(34).slice(2)};
// you don't need to write return if you pass a value to a function in your return
const uid = () => Math.random().toString(34).slice(2);

// so I guess the uid() function is called onece the payload object is passed to the reducers
export function addTodo(text) {
	
	return {

		type: 'ADD_TODO',
		payload: {
			id: uid(),
			isDone: false,
			text: text
		}
	};
}

export function toggleTodo(id){
	return {

		type: 'TOGGLE_TODO',
		payload: id
	};
}