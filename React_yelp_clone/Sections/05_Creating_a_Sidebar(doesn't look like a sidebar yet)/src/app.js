import React from 'react'
import ReactDOM from 'react-dom'

import 'font-awesome/css/font-awesome.css'
import './app.css'

import {browserHistory, Router, Route} from 'react-router'

import App from './containers/App/App'

import makeRoutes from './routes'

const routes = makeRoutes()


//this is weird, it's usually document.getElementById ... I guess it has to do with this tutorial using hjs-webpack
const mountNode = document.querySelector('#root');
ReactDOM.render(<App routes={routes} history={browserHistory} />, mountNode);

