import {combineReducers} from 'redux';

import ActiveUserReducer from './reducer-active-user';

import UserReducer from './reducer-users';

//user combineReducers to combine all the data to one object
const allReducers = combineReducers({

	users: UserReducer,
	activeUser: ActiveUserReducer
});

export default allReducers;
