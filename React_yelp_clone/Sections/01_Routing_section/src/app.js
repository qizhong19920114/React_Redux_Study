import React from 'react'
import ReactDOM from 'react-dom'

import 'font-awesome/css/font-awesome.css'
import './app.css'

import {browserHistory, Router, Route} from 'react-router'

import App from './containers/App/App'

const Home = React.createClass({
  render: function() {
    return (<div>Hello world</div>)
  }
})

const routes = (
    <Route path="/" component={Home} />
)


//this is weird, it's usually document.getElementById ... I guess it has to do with this tutorial using hjs-webpack
const mountNode = document.querySelector('#root');
ReactDOM.render(<App routes={routes} history={browserHistory} />, mountNode);

