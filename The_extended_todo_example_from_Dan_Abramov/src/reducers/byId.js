//this byId function defines the structure of the byId sub-state which is a lookup table
//we changed the state object from an array to a look up table so it looks more like a database or json 
const byId = (state = {}, action) => {
  // comment out all these below because we use the Normalizer. 
  // switch (action.type) {
  //   // return a lookup table here for the todo list instead of an array
  //   case 'FETCH_TODOS_SUCCESS':
  //     const nextState = {...state};
  //     // it appears like we are violate the immutable rule but in fact nextState is a shallow copy so we did violate the rule. 
  //     action.response.forEach(todo => {
  //         nextState[todo.id] = todo; 

  //     });
  //     return nextState;
  //   case 'ADD_TODO_SUCCESS':
  //     return {
  //       ...state,
  //       [action.response.id]: action.response,
  //     };

  //   default:
  //     return state;

    // if the response is an action type, return a new version of the lookup table contains all the existing entries 
    // as well as any entries inside entities todos in the normilize response 
    if (action.response){
      return {
        ...state, 
        ...action.response.entities.todos,
      }; 
    }

    return state; 
  
};

export default byId; 

export const getTodo = (state, id) => state[id];