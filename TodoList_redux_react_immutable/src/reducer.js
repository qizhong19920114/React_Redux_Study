// src/reducer.js

import {List, Map} from 'immutable';

const init = List([]);

// the todos=init is to setup default state
export default function(todos=init, action) {

	switch(action.type){
		case 'ADD_TODO':
			//Notice that we’re also converting the todo object into an immutable map before it’s pushed onto the list.
			return todos.push(Map(action.payload));
		case 'TOGGLE_TODO':
			return todos.map( t => {
					//Since we use immutable Map above, the objects are immutable object, so when we
					// access them, we use t.get()
					console.log("id: " + t.get('id'));
					
					if (t.get('id') === action.payload){
						return t.update('isDone', isDone => !isDone);
					}
					else {
						return t; 
					}
				}

			);
		default:
			return todos; 
	}
}