'use strict';

var React = require('react-native');

var {
	StyleSheet,
	Text,
	View,
	Component,
	TouchableHighlight,
	ScrollView
} = React;

var styles = StyleSheet.create({
	contentContainer:{},
	scrollView:{},

	container: {
		marginTop:100,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
	},
	content: {
		fontSize: 20,
		backgroundColor: 'white',
	},
	button: {
	  	height: 36,
	  	flex: 1,
	  	flexDirection: 'row',
	  	backgroundColor: '#48BBEC',
	  	borderColor: '#48BBEC',
	  	borderWidth: 1,
	  	borderRadius: 8,
	  	marginBottom: 10,
	  	alignSelf: 'stretch',
	  	justifyContent: 'center'
	},
	buttonText: {
	  	fontSize: 18,
	  	color: 'white',
	  	alignSelf: 'center'
	},
	description: {
		marginBottom: 20,
		fontSize: 18,
		textAlign: 'center',
		color: '#656565'
	},

});


// API call data 
function urlBuilder(){

	var data = {
		q: '#trinitymayball',
		result_type: 'recent',
		count: '15'
	};

	var url = 'http://localhost:8081/twResponseDemo.json';

	var querystring = Object.keys(data)
	    .map(key => key + '=' + encodeURIComponent(data[key]))
	    .join('&');

	return url ;
}


class InstagramFeedList extends Component {

	constructor(props){
		super(props);
		this.state = {
			searchString: '',
			isLoading: false,
			message: '',
			jsonData: '',
		};
	}

	/**/
	_executeQuery(query){

		this.setState({ isLoading: true });

		fetch(query)
			.then(response => response.json())
			.then(responseData => this._handleResponse(responseData))
			.catch(error => 
				this.setState({
					isLoading: false,
					message: this.state.message + ' --- ' + 'Something bad happened' + error
				})
			);
	}

	_handleResponse(response){
		this.setState({ 
			isLoading: false,
			jsonData: response.statuses[0].id_str,
		});
	}

	onSearchPressed(){
		var query = urlBuilder();
		this.setState({ message: query + '' });
		this._executeQuery(query);
	}

	render(){
		return(
			<ScrollView
			  contentContainerStyle={styles.contentContainer}
			  style={styles.scrollView}>

				<View style={styles.container}>
					<Text style={styles.content}>
						Instagram Feed
					</Text>

					{/* Go button */}
						<TouchableHighlight style={styles.button} 
							underlayColor='#99d9f4'
							onPress={this.onSearchPressed.bind(this)} >
						    	<Text style={styles.buttonText}>remote file fetch</Text>
						</TouchableHighlight>

						<TouchableHighlight style={styles.button} 
							underlayColor='#99d9f4'
							onPress={this.extractFile.bind(this)} >
						    	<Text style={styles.buttonText}>local file</Text>
						</TouchableHighlight>

					{/* Messages Text element */}
					<Text style={styles.description} > {this.state.message} </Text>
					<Text style={styles.description} > {this.state.jsonData} </Text>

				</View>
			</ScrollView>
		);
	}

	/* only for local file test */
	extractFile(){

		var twResponseDemo = require('./twResponseDemo.json');
		this.setState({ 
			message: 'local process',
			jsonData: twResponseDemo.statuses[0].created_at,
		});

		this._handleResponse( twResponseDemo );
	}
}

module.exports = InstagramFeedList;


