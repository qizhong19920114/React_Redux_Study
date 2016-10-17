import React from 'react';
import {Router, Route, Link, Redirect, IndexRoute, hashHistory} from 'react-router';

const Home = () => <h1>Home</h1>
const NewPage = (props) =>  <div><h1>New Page {props.params.id}</h1></div>
const Container = (props) => <div><Links />{props.children}</div>

const Links = () =>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/old/oldId">Old</Link>
    <Link to="/new/newId">New</Link>
  </nav>

// This example shows that we can use redirect to redirect the legacy page to our new page
class App extends React.Component {
  render(){
    //Below is trying to prove that the old page being directed to the new page and the id from the link remains. (the old id is "oldId", based on the /old/:id format)
    return (
      <Router history={ hashHistory }>
        <Route path="/" component={Container}>
          <IndexRoute component={ Home }></IndexRoute>
          <Route path="/new/:id" component={NewPage}></Route>
          <Redirect from='/old/:id' to='/new/:id'></Redirect>
        </Route>
      </Router>
    )
  }
}

export default App; 