import {v4} from 'node-uuid'

// This is a fake in-memory implementation of something 
// that would be implemented by calling a REST server. 

const fakeDatabase = { 
	todos: [{
		id: v4(),
		text: 'hey',
		completed: true,

	},{
		id: v4(),
		text: 'ho',
		completed: true,

	},{
		id: v4(),
		text:'let\'s go', 
		completed: false,
	}],
};

const delay = (ms) => 
	new Promise(resolve => setTimeout(resolve,ms));

//Let's increase the delay to 5 sec to crease a race condition case; 
// We don't check if the tag is already loaded before starting a request, 
// and then a bunch of receive request comes back which potential result in race condition. 
export const fetchTodos = (filter) =>
	delay(500).then(() => {
		// throw error randomly
		// if (Math.random() > 0.5)
		// {
		// 	throw new Error('Boom!'); // try to add an error
		// }	
		
		switch(filter) {
			case 'all':
				return fakeDatabase.todos;
			case 'active':
				return fakeDatabase.todos.filter(t=> !t.completed);
			case 'completed':
				return fakeDatabase.todos.filter(t=> t.completed);
			default: 
				throw new Error(`Unknown filter: ${filter}`);

		}
	});

export const addTodo = (text) => 
	delay(500).then(()=> {
		const todo = {
			id: v4(),
			text, 
			completed: false,
		};
		fakeDatabase.todos.push(todo);
		return todo; 
	});

export const toggleTodo = (id) => 
	delay(500).then(()=> {
		const todo = fakeDatabase.todos.find(t=> t.id === id);
		todo.completed = !todo.completed;
		return todo; 
	});













