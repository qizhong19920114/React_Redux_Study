import React, { Component } from 'react';
var api = require('../Utils/api');
var Seperator = require('./Helpers/Seperator');
var Badge = require('./Badge');
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer'; 

import {
	View,
	Text,
	ListView,
	TextInput, 
	StyleSheet, 
	TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    containerInput:{
    	flex:1
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 10
    },
    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

class Notes extends Component {
	//we use the constructor function because we need to use the state for this component
	constructor(props){
		
		super(props);

		//ds stands for data source
		this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => (row1 !== row2)});

		console.log("initialize the ListView")
		console.log("notes: ", this.props.notes);
		//note is for holding temporary data input 
		this.state = {
			dataSource: this.ds.cloneWithRows(this.props.notes),
			note: '',
			error: ''
		}
	}

	handleChange(e){
		//capture the input box note
		this.setState({
			note: e.nativeEvent.text
		})
	}

	//I guess the reason we need to use the .bind(this) in the OnPress in the rendering secion but we don't need to use bind(this) in the callback function below is because we use arrow function so we don't have scope issue. 
	handleSubmit(){
		var note = this.state.note;
		//clear the inputbox note
		this.setState({
			note:''
		});
		api.addNote(this.props.userInfo.login, note)
			.then((data)=> {
				api.getNotes(this.props.userInfo.login)
					.then((data)=> {
						this.setState({
							dataSource: this.ds.cloneWithRows(data)
						})
					});

			})
			.catch((error)=>{
				console.log('Request failed at addNote', error);
				this.setState({error})
			});

	}

	renderRow(rowData){
		//console.log("in the renderRow ", rowData)
		return (
			<View>
				<View style={styles.rowContainer}>
					<Text> {rowData} </Text> 
				</View>
				<Seperator/>
			</View>
		)
	}

	footer(){
		return (
			
			<View style={styles.footerContainer}>
				<TextInput
					style={styles.searchInput}
					value={this.state.note}
					onChange={this.handleChange.bind(this)}
					placeholder="New Note" />
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="#88D4F5">
						<Text style={styles.buttonText}> Submit </Text>
				</TouchableHighlight>
			</View>
			
		)
	}
	render(){
		return(
			// renderRow is basic the UI of every item in our data source
			// use KeyboardSpacer so when test on the phone, the keyboard won't cover the input box
			<View style={styles.container}>	
				<ListView
					enableEmptSections={true}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderHeader={()=> <Badge userInfo={this.props.userInfo}/>}
				/>
				{this.footer()}
				<KeyboardSpacer/>
			</View>

			
		)
	}

};

Notes.propTypes = {
    userInfo: React.PropTypes.object.isRequired,
    notes: React.PropTypes.object.isRequired
};

module.exports = Notes;