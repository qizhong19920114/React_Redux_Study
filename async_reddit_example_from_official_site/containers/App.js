import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {selectReddit, fetchPostsIfNeeded, invalidateReddit} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  constructor(props) {
    super(props) // Here is calls parents constructor (Component) with props provided for parents props
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  //Invoked once, 
  //only on the client (not on the server), immediately after the initial rendering occurs.
  // It appears to be that selectedReddit is from the reducer and it's passed to the action 
  // which is conflict to the dataflow diagram that data should flow from action to the reducer. 
  // however, the selectedReddit is not from reducer is on the the field from the state tree 
  // that gets passed to the container through store and provider. It's just a convention that the 
  // name of the state field is the same as the corresponding reducer function

  componentDidMount(){
    const {dispatch, selectedReddit} = this.props
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  //Invoked when a component is receiving new props. This method is not called for the initial render.
  //Use this as an opportunity to react to a prop transition before render() is called by updating the state using
  componentWillReceiveProps(nextProps){
    if (nextProps.selectedReddit !== this.props.selectedReddit){
      const {dispatch, selectedReddit} = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }

  handleChange(nextReddit){
    this.props.dispatch(selectReddit(nextReddit))
  }

  handleRefreshClick(e){
    // Here is my guess: 
    // use this because the click event is the same as an enter event, and we don't want enter key to trigger the event.  
    e.preventDefault() 

    const {dispatch, selectedReddit} = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }


  render() {

    const {selectedReddit, posts, isFetching, lastUpdated} = this.props 
    const isEmpty = posts.length === 0
    return(
        <div>
          <Picker value={selectedReddit}
                  onChange={this.handleChange}
                  options={['reactjs', 'frontend']} />

          <p>
            {lastUpdated && 
              <span> 
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                {' '}
              </span>
            }
            {!isFetching &&
              <a href = "#"
                onClick={this.handleRefreshClick}>
                Refresh
              </a>
            }
          </p>
          
          {isEmpty
            ? (isFetching ? <h2> Loading ...</h2> : <h2> Empty.</h2>)
            : <div style = {{opacity: isFetching ? 0.5: 1}}>
                <Posts posts={posts} />
              </div>
          }

        </div>
    )
  }

}


App.propTypes = {
  selectedReddit: PropTypes.string.isRequired, 
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){

 //console.log("state: " + JSON.stringify(state, null, 2) )

 const {selectedReddit, postsByReddit} = state

  const {
    isFetching, 
    lastUpdated, 
    items: posts 
  } = postsByReddit[selectedReddit] || {
    isFetching: true, 
    items: []
  }
// This should return how states in reducer map to the props in containers.
 console.log({
    selectedReddit, 
    posts, 
    isFetching,
    lastUpdated
  })

 return {
    selectedReddit, 
    posts, 
    isFetching,
    lastUpdated
  }

}

export default connect(mapStateToProps)(App)






