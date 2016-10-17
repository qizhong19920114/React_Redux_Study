import React, { Component } from 'react';

//defactoring these two tags from react native
import {
	View,
	Text, 
	StyleSheet
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
	render(){
		console.log(this.props.userInfo);
		return(
			<View style={styles.container}>
				<Text> This is the dashboard </Text>
				<Text> {this.props.userInfo.bio} </Text>
			</View>
		)
	}

};

module.exports=Dashboard; 