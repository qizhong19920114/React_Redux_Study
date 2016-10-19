import React, { PropTypes } from 'react'
import { Router,Route } from 'react-router';

import styles from './styles.module.css'


class App extends React.Component {

  	static propTypes = {
  		routes: PropTypes.object.isRequired,
    	history: PropTypes.object.isRequired
  	}	


	// class getter, it's used in the render method
	get content() {
	   console.log("in the content")
	   return (
	   		<Router history={this.props.history} routes={this.props.routes} />
	   	)
	}

	render(){
		console.log("in the render")
		return(
			<div style={ { height: '100%' } }>
        		{this.content}
      		</div>
		)		
	}
}

module.exports = App;