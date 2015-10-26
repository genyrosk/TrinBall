'use strict';

var React = require('react-native');

var {
	StyleSheet,
	Text,
	View,
	Component,

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


class MapPlan extends Component {
	render(){
		return(

			<View style={styles.container}>
				<Text style={styles.content}>
					MapPlan
				</Text>
			</View>
		);
	}
}

module.exports = MapPlan;






