import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers';
//import promise from 'redux-promise';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';



//import {loadState, saveState} from './localStorage';
//import throttle from 'lodash/throttle';

// comment this shit out because the debug logger is in the redux package 
// const logger = (store) => (next) =>{
// 		if(!console.group) {
// 			return next;
// 		}

// 		return (action) => {

// 			console.group(action.type);
// 			console.log('%c prev state','color:grey', store.getState());
// 			console.log('%c action', 'color:blue',action);
// 			const returnValue = next(action);
// 			console.log('%c next state', 'color:green', store.getState());
// 			console.groupEnd(action.type);
// 			return returnValue;
// 		}
// 	};

// Comment this shit out because the promise middleware can be found in the redux package as well
// // now this is a function that returns a function and returns a function
// const promise = (store) =>  (next) => (action) => {
// 			// if the action.then type is a function that means we are passing in 
// 			// the promise so we need to wait until it finishes then dispatch
// 			if(typeof action.then === 'function'){

// 				//I don't quite understand this will somehow wait until data being fetched and then dispatch the receiveTodos in the action index.js file. 
// 				//ok I see, so the action here is a promise and it returns a action object 
// 				// that is receiveTodo and it's chained to the .then(next), which means the
// 				// receivedTodo is passed into next as an argument so it's like 
// 				// store.dispatch(next)
// 				return action.then(next);
// 			}
// 			return next(action);
// 		};
	

// Removing this middleware because we are using the middleware from the library!!!
// const wrapDispatchWithMiddlewares = (store,middlewares)=> {
// 	//we put in the promise support first
// 	// but we want to do the logger first so we just reverse 
// 	// the order so the newer one gets run first

// 	// the purpose of middleware is to replace the original dispatch funciton
// 	// with a chain of composible dispatch functions with each can do something with an action  
// 	// we use reverse so the final dispatch function being called is the first middleware being put in
// 	// which is promise support function in this case

// 	// the way we evoke middleware is a very special syntax; 
// 	// understand it as, for example for the promise middleware, we pass the store as its
// 	// first layer function argument and store.dispatch as its second layer function argument; 
// 	// the next layer function input for promise is the next middleware which is the logger; 
// 	// simliarly, for the logger, the store is passed in as the first layer function input and the store.dispatch which
// 	// in this case is the original store.dispatch 
// 	middlewares.slice().reverse().forEach(middlewares=>
// 			store.dispatch=middlewares(store)(store.dispatch)

// 		);

// }


//if the action is not an action but an function we gonna assume this is a thunk 
// and we want to inject the dispatch function into it. (for example the fetchTodos function in the action index.js)
//we also inject the store.getState function because the fetchTodos function in the action index.js needs it. 
// otherwise we can just pass the result to the next middle ware chain. 
// comment this out. We gonna use the package from redux-thunk 
// const thunk = (store) => (next) => (action) => 
// 	typeof action === 'function'?
// 		action(store.dispatch, store.getState) :
// 		next(action);



const configureStore = () => {

	//it's like a default state that stays even after refresh. 
	//const persistedState = loadState();

	//The second argument overwrites the first one except for the undefined items
	//const store = createStore(todoApp, persistedState);

	

	//since we don't want to overwrite the store.dispatch 
	// we create an array here
	// we put promise as the first one because we want the middleware array to 
	// be in the order of how action travel through them. 
	const middlewares = [thunk];

	//only log out store info when it's not in production mode
	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger());

	}

	//save State to local storage everytime there's a state change
	// store.subscribe(throttle(() => {
	//   saveState({todos: store.getState().todos}); //only save the todos list because we don't want to save the filter
	// },1000));

	//so this one actually fires three different dispatch functions instead just the default one. 
	//wrapDispatchWithMiddlewares(store, middlewares);
	
	// the second function of this is called an enhancer
	// the ... pass each middleware in the middleware arrays to the function as seperate arguments instead of a whole array
	

	if(module.hot) {

	    //Enable Webpack hot module replacement for reducers to make sure the current state is kept after the re-building
	    module.hot.accept('./reducers', ()=> {
	      const nextRootReducer = require('./reducers').default
	      store.replaceReducer(nextRootReducer)

	    })

	  }

	 return createStore(todoApp, applyMiddleware(...middlewares));
};

export default configureStore;