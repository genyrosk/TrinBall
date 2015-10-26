'use strict';

var React = require('react-native');
var InstagramFeedList = require('./InstagramFeedList.js');

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




class InstagramFeed extends Component {
	render(){
		return (

			<NavigatorIOS
	               style={{flex:1}}
	               initialRoute={{
	          		title: 'Instagram Feed',
	          		component: InstagramFeedList
	     	}}/>

		);
	}
}

module.exports = InstagramFeed;