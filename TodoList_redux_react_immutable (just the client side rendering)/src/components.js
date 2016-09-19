import React from 'react';

export function Todo(props) {

	const {todo} = props; // the properties is passed in when you use the Todo component
	if(todo.isDone){
		return <strike> {todo.text} </strike>;
	}
	else{
		return <span>{todo.text}</span>;
	}
}

export function TodoList(props){
	//The addTodo and toggleTodo are functions passed in from actions.js
	// the todos, toggleTodo, addTodo properties are created with those two map function and the connect function
	const {todos, toggleTodo, addTodo} = props;

	const onSubmit = (event) => {
		const input = event.target;
		const text = input.value; 
		const isEnterKey = (event.which == 13);
		const isLongEnough = text.length > 0;
		if(isEnterKey && isLongEnough) {
			input.value = '';
			addTodo(text);
		}
	};
	//the js equivalent of the es6 below is :
	//var toggleClick = function toggleClick(id) {
	//   return function (event) {
	//     return toggleTodo(id);
	//   };
	// };
	const toggleClick = id => event => toggleTodo(id);

	// We need to use .toJS because t is a immutableJS object
	return (
			<div className = 'todo' >
				<input type='text' 
						className = 'todo__entry'
						placeholder = 'Add todo' 
						onKeyDown = {onSubmit}/>

				<ul className='todo__list'>
					{
						todos.map(t => (
								<li key={t.get('id')} 
									className='todo__item'
									onClick={toggleClick(t.get('id'))}>
									<Todo todo={t.toJS()} />
								</li>
							)
						)
					}
				</ul>
			</div>
		);
}