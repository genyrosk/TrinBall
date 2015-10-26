'use strict';

var React = require('react-native');
var ProgramList = require('./ProgramList.js');

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


class Program extends Component {
	render(){
		return(
			<NavigatorIOS
	               style={{flex:1}}
	               initialRoute={{
	          		title: 'Program',
	          		component: ProgramList
	     		}}/>

		);
	}
}

module.exports = Program;