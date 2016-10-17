//The module import part is slightly different than the tutorial 
import React, { Component } from 'react';
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');

//defactoring these two tags from react native
import {
	View,
	Text,
	StyleSheet, 
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS
} from 'react-native';

//define the style sheet
var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});



class Main extends Component{
	constructor(props){
		super(props); // use the props from parent class 
		this.state = { 
			username: '',
			isLoading: false,
			error: false 
		}
	}

	handleChange(event){
		this.setState({

			username: event.nativeEvent.text.toLowerCase()
		})
	}
	// command + D on the simulator and select Debug JS remostely, then you can view the console log on the browser
	handleSubmit(){

		//update our indicatorIOS spinner
		this.setState({
			isLoading: true 
		});
		console.log('SUBMIT', this.state.username);

		api.getBio(this.state.username)
			.then((res)=> {
				//this is because we already know the json response is going to respond Not Found when response goes wrong
				if(res.message === 'Not Found'){
					this.setState({
						error: 'User not found',
						isLoading: false

					})
				}
				else {
					//push a new route; we can use this because we link the NavigatorIOS component to the Main.js in the Index.ios.js file 
					//the title is the name we return but if it doesn't exist then we use Select an Option as an title; the component is Dashboard which means that's the component we gonna route to

					//passProps pass the res as the userInfo prop to the Dashboard  component
					this.props.navigator.push({
						title: res.name || "Select an Option",
						component: Dashboard,
						passProps: {userInfo: res}
					});
					//clear the username to empty so the input box is empty after we submit the name
					this.setState({
						isLoading: false,
						error: false,
						username:''
					})

				}
			
			});

		//fetch data from github

		//reroute to the next passing that github information
	}

	render(){
		// the value prop for TextInput is to show the text that's being typed in
		// I'm guessing the onChange changes the state and the React virtual dom diff recgonize that and then change the value prop of the style (so it's uni-directional dat}a flow)
		return(
			<View style={styles.mainContainer}>
				<Text style={styles.title}> Search for a Github User</Text>
				<TextInput
					style={styles.searchInput}
					value={this.state.username}
					onChange={this.handleChange.bind(this)}
				/>
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="white">
						<Text style={styles.buttonText}> SEARCH </Text>
				</TouchableHighlight>

			</View>
		)
	}
};

module.exports = Main; 