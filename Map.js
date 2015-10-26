'use strict';

var React = require('react-native');
var MapPlan = require('./MapPlan.js');

var {
	StyleSheet,
	Text,
	View,
	Component,
	TouchableHighlight,
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
	},

	button: {
	  	height: 36,
	  	width: 100,
	  	backgroundColor: '#48BBEC',
	  	borderColor: '#48BBEC',
	  	borderWidth: 1,
	  	borderRadius: 8,
	  	marginBottom: 10,
	  	justifyContent: 'center'
	},
	buttonText: {
	  	fontSize: 18,
	  	color: 'white',
	  	alignSelf: 'center'
	},

});


class Map extends Component {

	constructor(props){
		super(props);
		this.state = {
			locationString: 'london',
		}
	}

	onLocationPressed() {
		/*this.setState({ locationString: 'paris' });*/
		navigator.geolocation.getCurrentPosition(
			location => {
				var coordinates = location.coords.latitude + ',' + location.coords.longitude;
				var coordinates2 = 'barcelona';
				this.setState({ locationString: coordinates });
			},
			error => {
				this.setState({
					locationString: 'There was a problem with obtaining your location: ' + error
				});
			}
		);
	}


	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.content}>
					Map of the premises
				</Text>
				<TouchableHighlight style={styles.button}
					underlayColor='#99d9f4'
					onPress={this.onLocationPressed.bind(this)}>
					<Text style={styles.buttonText}>Location</Text>
				</TouchableHighlight>
				<Text
					style={styles.content}>
					{this.state.locationString}
				</Text>
				
			</View>
		);
	}
}

module.exports = Map;