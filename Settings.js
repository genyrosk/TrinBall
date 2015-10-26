'use strict';

var React = require('react-native');
var SettingsList = require('./SettingsList.js');

var {
	StyleSheet,
	Text,
	View,
	Component,
	NavigatorIOS,
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


class Settings extends Component {
	render(){
		return(
			<NavigatorIOS
	               style={{flex:1}}
	               initialRoute={{
	          		title: 'Settings',
	          		component: SettingsList
	     		}}/>
		);
	}
}

module.exports = Settings;






