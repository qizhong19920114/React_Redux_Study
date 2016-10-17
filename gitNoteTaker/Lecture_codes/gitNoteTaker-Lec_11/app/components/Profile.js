var React = require('react');
var Route = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var helpers = require("../utils/helpers");

// all these new features only applies to the new firebase 3.4.0
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBpL3ikZRVR1Q2ezPqa5JKsjz1SpK0xe-Q",
	authDomain: "github-note-taker-cc2b5.firebaseapp.com",
	databaseURL: "https://github-note-taker-cc2b5.firebaseio.com",
	storageBucket: "github-note-taker-cc2b5.appspot.com",
	messagingSenderId: "52907761689"
};
firebase.initializeApp(config);



var Profile = React.createClass({
	mixins: [ReactFireMixin],
	getInitialState: function(){
		return {
			notes: [1, 2, 3, 4],
			bio: {

				name: 'Trey Zhong'
			}, 
			repos: ['a', 'b', 'c']
		}
	},

	componentDidMount: function(){

		//create a firebase reference
		this.ref = firebase.database().ref();
		this.init(this.props.params.username);
		
	},

	//this is called when we receive new props
	componentWilllReceiveProps: function(nextProps){
		this.unbind('notes');
		console.log('the next props are', nextProps);
		this.init(nextProps.params.username);
	},

	componentWillUnmount: function(){
		//unbind the firebase reference and the react property once the component is unmonted
		this.unbind('notes');
	},

	init: function(username){
		//we use this.props.params.username because it's passed in from router
		console.log("tihs.props.params.username: " + username);

		//Look directly at the child nodes based on the username passed in by route
		var childRef = this.ref.child(username);
		
		// have to use .bind(this) here so that we can use setState. without the bind, then "this" refers to the global scope which doesn't have the setState. The bind(this) change the "this" to the componentDidMount scope in which "this" refers to parent scope which is the react class instance which has setState method.
		childRef.on("value", function(snapshot) {
		  console.log(snapshot.val());
		  this.setState({notes: snapshot.val()});

		}.bind(this), function (errorObject) {
		  // print out error message if fail to fetch the data from Firebase
		  console.log("The read failed: " + errorObject.code);

		});


		//chose which property we want to bind to, in this case it's the notes property
		//this.bindAsArray(childRef, 'notes');
		//use bind(this), so the this inside the promise function refers to the "this" in the helpers.getGithubInfo function which is the "this" for the class
		helpers.getGithubInfo(username)
			.then(function(data){
				this.setState({
					bio: data.bio,
					repos: data.repos
				})

			}.bind(this))

	},

	handleAddNote: function(newNote){
		// update firebase with the newNote 
		// this.ref is tied to the firebase database as we did in the componentDidMount
		//It seems like child function is to access the child node and if it doesn't exist then it creates one; An array in firebase is stored in a way that its keys are index; By using the length, we always append the new note at the end of current array because the index starts from zero; 
		this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote);
	},


	// pass the props to the child component UserProfile, Repos and Notes
	render: function(){
		return (
			<div className = "row">
				<div className="col-md-4">
					<UserProfile username={this.props.params.username} bio={this.state.bio}/>
				</div>
				<div className="col-md-4">
					<Repos username={this.props.params.username} repos={this.state.repos}/>
				</div>
				<div className="col-md-4">
					<Notes username={this.props.params.username} notes={this.state.notes} addNote={this.handleAddNote}/>
				</div>
			</div>

		)
	}


});

module.exports = Profile;