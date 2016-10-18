import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'

const App = React.createClass({
	render: function(){
		return (<div className={styles.container}>
					<h1>Environment: {__NODE_ENV__}</h1>
				</div>
		);
	}
});


//this is weird, it's usually document.getElementById ... I guess it has to do with this tutorial using hjs-webpack
const mountNode = document.querySelector('#root');
ReactDOM.render(<App/>, mountNode);