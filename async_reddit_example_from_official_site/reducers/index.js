import { combineReducers} from 'redux'
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'


function selectedReddit(state = 'reactjs', action){
  switch (action.type) {
    case SELECT_REDDIT: 
      return action.reddit 
    default: 
      return state
  }  
}

//Don't get confused, this post function is just for internal use
// it's used in postsByReddit function below
function posts(state = {
  isFetching: false, 
  didInvalidate: false, 
  items: []
}, action ) {

  switch (action.type) {
    case INVALIDATE_REDDIT: 
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS: 
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS: 
      return Object.assign({}, state, {
        isFetching: false, 
        didInvalidate: false, 
        items: action.posts,
        lastUpdate: action.receiveAt
      })
    default: 
      return state
  }
}

function postsByReddit(state={}, action){
  switch (action.type){
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.reddit]: posts(state[action.reddit], action)
      })
    default: 
      return state
  }

}

const rootReducer = combineReducers({
  postsByReddit, 
  selectedReddit
})

export default rootReducer








