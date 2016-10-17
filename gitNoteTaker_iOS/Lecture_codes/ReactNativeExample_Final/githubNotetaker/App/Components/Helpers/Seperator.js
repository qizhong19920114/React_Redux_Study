import React, { Component } from 'react';

import {
	View,
	StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    marginLeft: 15,
    marginRight: 15
  },
});

class Seperator extends Component {
	render(){
		return (
			<View style={styles.seperator} />
		);
	}
};

module.exports = Seperator; 