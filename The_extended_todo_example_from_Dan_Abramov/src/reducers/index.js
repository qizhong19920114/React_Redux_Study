import {combineReducers} from 'redux';
//import todo from './todo';
import byId, * as fromById from './byId';

import createList, * as fromList from './createList';

//This is removed because the createList function does it all
//this allId function define the structure of the allIds sub-state which is an array of item IDs
// const allIds = (state =[], action)=> {


// };

//This is removed because the createList function does it all
// const activeIds = (state = [], action) => {

//   if (action.filter !== 'active'){

//     return state; 
//   }

//   switch(action.type){
//     case 'RECEIVE_TODOS':
//       return action.response.map(todo=> todo.id);
//     default: 
//       return state; 
//   }
// };

//This is removed because the createList function does it all
// const completedIds = (state = [], action) => {

//   if (action.filter !== 'completed'){

//     return state; 
//   }

//   switch(action.type){
//     case 'RECEIVE_TODOS':
//       return action.response.map(todo=> todo.id);
//     default: 
//       return state; 
//   }
// };



const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

export default todos;

// now comment this method out assuming that we won't have access of all the todos in the client
//this returns an array of by Id lookup tables of items
// const getAllTodos = (state) => 
//   state.allIds.map(id => state.byId[id]);

// this is called a selector in redux
// this filter logic only works if all the data available in the server is already is already in the client
// but this is usually not the case
export const getVisibleTodos = (state, filter) => {
    // the getIds and getTodo are there to encapusulate the knowledge of the state shape
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId,id));

  // we comment this out because we are moving the filter to the server. 
  //const allTodos = getAllTodos(state);

  //this can be a little confusing here. the filter in the switch statement is the filter from the top react-router
  // the filter after the allTodos is an js function to produce an new array based on the criteria in the filter function. 
  // switch (filter) {
  //   case 'all':
  //     return allTodos;
  //   case 'completed':
  //     return allTodos.filter(t => t.completed);
  //   case 'active':
  //     return allTodos.filter(t => !t.completed);
  //   default:
  //     throw new Error(`Unknown filter: ${filter}.`);
  //}
};



export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);


