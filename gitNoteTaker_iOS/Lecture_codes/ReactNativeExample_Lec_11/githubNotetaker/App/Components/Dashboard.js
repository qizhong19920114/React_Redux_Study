import React, { Component } from 'react';
var Profile = require('./Profile');


//defactoring these two tags from react native
import {
	View,
	Text, 
	StyleSheet, 
	Image,
	TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends Component {
	// add this function so we can change the btn color based on the id passed in
	makeBackground(btn){

		var obj = {
			flexDirection: 'row',
			alignSelf: 'stretch',
			justifyContent: 'center',
			flex: 1
		}

		if(btn===0){
			obj.backgroundColor = '#48BBEC';
		}
		else if (btn===1){
			obj.backgroundColor = '#E77AAE';
		}
		else
		{
			obj.backgroundColor = '#758BF4';
		}
		return obj; 
	}

	goToProfile(){
		console.log('Going ot Profile Page');
		//user navigator for routine
		this.props.navigator.push({
			component: Profile,
			title: 'Profile Page',
			passProps: {userInfo: this.props.userInfo}
		})
	}
	goToRepos(){
		console.log('Going ot Repos');
	}
	goToNotes(){
		console.log('Going ot Notes');
	}	

	render(){
		console.log(this.props.userInfo);
		return(
			<View style={styles.container}>
				<Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />
				<TouchableHighlight 
					style = {this.makeBackground(0)}
					onPress={this.goToProfile.bind(this)}
					underlayColor='#88D4F5'>
						<Text style={styles.buttonText}> View Profile </Text>
				</TouchableHighlight>
				<TouchableHighlight 
					style = {this.makeBackground(1)}
					onPress={this.goToRepos.bind(this)}
					underlayColor='#88D4F5'>
						<Text style={styles.buttonText}> View Repos </Text>
				</TouchableHighlight>
				<TouchableHighlight 
					style = {this.makeBackground(2)}
					onPress={this.goToNotes.bind(this)}
					underlayColor='#88D4F5'>
						<Text style={styles.buttonText}> View Notes </Text>
				</TouchableHighlight>
			</View>
		)
	}

};

module.exports=Dashboard; 