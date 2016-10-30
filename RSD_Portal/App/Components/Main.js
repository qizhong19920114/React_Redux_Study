import React, { Component } from 'react';
var Web_View = require('./Helpers/WebView');

//defactoring these two tags from react native
import {
	View,
	Text,
	StyleSheet, 
	TextInput,
	Image,
	TouchableHighlight,
	ActivityIndicatorIOS
} from 'react-native';


//define the style sheet
var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 1,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#808080'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#0077b3'
    },
    rowContainer: {
    	marginTop: 100,
        marginLeft: 25,
        flexDirection: 'column',
        flex: 1,
        padding: 10
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
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch', 
    },
    name: {
        color: '#260C0C',
        fontSize: 18,
        paddingBottom: 5
    },
    bubblechoice: {
	    height: 80,
	    borderRadius: 8,
	    marginRight: 2,
	    width: 300,
	    marginBottom: 10,
        marginTop: 10,
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
    }
  	// so the binding to repos[index].html_url pass the url as an input to this function, just like how this is passed in
	openPage(url){

		console.log('the url is', url);
		this.props.navigator.push({
			component: Web_View,
			title: 'Web View',
			passProps: {url}

		});
	}

  render() {
  	console.log("In the Main")
  	var urls = { 
  		'text_and_date':'http://www.textanddatesmachine.com/wp-login.php',
  		'VU': 'http://valentineuniversity.com/login/',
  		'Natural':  'http://becomingthenatural.com/members/'		
  	}
  	console.log(urls.text_and_date)
    return (
    	<View style={styles.mainContainer}>
            <Image style={styles.backgroundImage} source={{uri: 'http://i.imgur.com/wz1PFBf.png'}}>
        	    <View style={styles.rowContainer}>
    	 		 	<TouchableHighlight
    	 		 	    style={styles.bubblechoice}
    					onPress={this.openPage.bind(this, urls.text_and_date)}
    					underlayColor='transparent'>
    			      <Image style={styles.bubblechoice} source={{uri: 'http://i.imgur.com/yv9DAsF.png'}}/>
                      

    		          
    				</TouchableHighlight>

    	 		 	<TouchableHighlight
    	 		 	    style={styles.bubblechoice}
    					onPress={this.openPage.bind(this, urls.VU)}
    					underlayColor='transparent'>
    			      <Image style={styles.bubblechoice} source={{uri: 'http://i.imgur.com/TJtvmBv.png'}}/>
    				</TouchableHighlight>

    	 		 	<TouchableHighlight
    	 		 	    style={styles.bubblechoice}
    					onPress={this.openPage.bind(this, urls.Natural)}
    					underlayColor='transparent'>
    			      <Image style={styles.bubblechoice} source={{uri: 'http://i.imgur.com/zz396MA.png'}}/>
    				</TouchableHighlight>
    			</View>
            </Image>
 		</View>
    );
  }
};
module.exports = Main;