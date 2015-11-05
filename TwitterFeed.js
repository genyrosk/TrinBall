'use strict';

var React = require('react-native');
var TwitterFeedList = require('./TwitterFeedList.js');

var {
	StyleSheet,
	Text,
	View,
	Component,
	NavigatorIOS
} = React;

var styles = StyleSheet.create({

	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	content: {
		fontSize: 20,
		backgroundColor: 'white',
	}

});



class TwitterFeed extends Component {
	render(){
		return (

			<NavigatorIOS
	               style={{flex:1}}
	               initialRoute={{
	          		title: 'Twitter Feed',
	          		component: TwitterFeedList
	     	}}/>

		);
	}
}

module.exports = TwitterFeed;