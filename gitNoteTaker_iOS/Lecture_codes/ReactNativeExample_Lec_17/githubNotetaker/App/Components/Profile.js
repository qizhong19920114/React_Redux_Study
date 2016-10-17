import React, { Component } from 'react';
var Badge = require('./Badge');
var Seperator = require('./Helpers/Seperator');



//defactoring these two tags from react native
import {
	View,
	Text,
	StyleSheet, 
	ScrollView
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    rowContainer: {
        padding: 10
    },
    rowTitle: {
        color: '#48BBEC',
        fontSize: 16
    },
    rowContent: {
        fontSize: 19
    }
});

// the userInfo prop will be passed in from the parent component
class Profile extends Component{
	//capitalize the title, also remove the underscore from public_repos
	getRowTitle(user, item){
		item = (item === 'public_repos')? item.replace('_', ' '): item; 
		return item[0] ? item[0].toUpperCase() + item.slice(1):item; //if the first letter is a string then capitalize the first letter

	}

	render(){
		var userInfo = this.props.userInfo; 
		var topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];

		console.log("userInfo: " + userInfo['bio']);

		var list = topicArr.map((item,index)=> {
			if(!userInfo[item]){ // in case the user from bio doesn't have certain atrribut (eg. doesn't have email info)
				return <View key={index} /> // the key is just a React thing of optimizing the rendering
			}
			else{
				return(
					<View key={index}>
						<View style={styles.rowContainer}>
							<Text style={styles.rowTitle}> {this.getRowTitle(userInfo, item)} </Text>
							<Text style={styles.rowContainer}> {userInfo[item]} </Text>
						</View>
						<Seperator />
					</View>
				)
			}
		});
		return(
			<ScrollView style={styles.container}>
				<Badge userInfo={this.props.userInfo}/>
				{list}
			</ScrollView>
		)

	}
};

module.exports = Profile; 




