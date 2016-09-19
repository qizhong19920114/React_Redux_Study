import fetch from 'isomorphic-fetch'

export const SELECT_REDDIT = 'SELECT_REDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

// the reddit variable is the reddit type (here is react or front-end)
// below are two actions governed by the user interaction
export function selectReddit(reddit){
  return {
    type: SELECT_REDDIT, 
    reddit
  }
}


export function invalidateReddit(reddit) {
  return {
      type: INVALIDATE_REDDIT,
      reddit
  }
}

//now comes the action governed by the network requests: 
function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}

// the action when the network request comes through
function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit, 
    posts: json.data.children.map(child=> child.data), // only return child data instead of child object
    receivedAt: Date.now()
  }
}

// .then is a promise function that allows async calls and wait until fetch finish to execute
// but it doesn't block the proceeding function. 
// Dispatch is used to send payload of information from action to the store

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit))

    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}

function shouldFetchPosts (state, reddit) {

  const posts = state.postsByReddit[reddit]
  if(!posts){
    return true
  }
  if(posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }

}










