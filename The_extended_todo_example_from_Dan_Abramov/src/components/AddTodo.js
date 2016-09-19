import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';


const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          //We use preventDefault because we don't want the onSubmit to submit a form in jquery way, 
          // we want to get the data through dispatch action the redux way
          e.preventDefault();
          //trim() get rid of the white space; this if statement does is to make sure that no action is dispatched when input is not empty
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = ''; // clear the input box; the input value is not one of the store data in redux so we can just clear it instantly without going through data flow
        }}
      >
        <input ref={node => { input = node; }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
};

AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// this make todo an smart redux component so it can access to the store data and store methods; in this case only need the dispatch method from store so we don't do the map thing. 
export default connect()(AddTodo);
