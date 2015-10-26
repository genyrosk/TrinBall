'use strict';

var React = require('react-native');

var {
	StyleSheet,
	Text,
	View,
	Component,
	TouchableHighlight,
	ScrollView,
	ListView,
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
		color: '#656565',
		flexDirection: 'row',
	     padding: 10
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


class TwitterFeedList extends Component {

	constructor(props){
		super(props);

		var dataSource = new ListView.DataSource({
			rowHasChanged	: (r1, r2) => r1 !== r2,
		});
		this.state = {
			searchString: '',
			isLoading: false,
			message: '',
			jsonData: '',
			data: dataSource.cloneWithRows(['row 1', 'row 2', 'row3', 'row4']),
		};
	}


	_fetchData(query){

		console.log(query);
		this.setState({ isLoading: true });

		/*
		fetch(query)
			.then((response) => response.json())
			.then((responseData) => {
		     	this.setState({
		     		dataSource: this.state.dataSource.cloneWithRows(responseData.statuses),
		     	});
		     }).done();
		*/
		fetch(query)
			.then(response => response.json())
			.then(responseData => {
				this._handleResponse(responseData);
				this.setState({
					message: 'seems like it worked!',
		     		//dataSource: this.state.dataSource.cloneWithRows(responseData.statuses),
		     	});
			})
			.catch(error => 
				this.setState({
					isLoading: false,
					message: this.state.message + ' --- ' + 'Something bad happened' + error
				})
			).done(); 

	}

	_handleResponse(response){
		this.setState({ 
			isLoading: false,
			jsonData: response.statuses[0].id_str,
		});
	}
/*	
_handleResponse(responseData){
	var users = responseData.statuses,
            dataBlob = {},
            rowIDs = [],
            user,
            userLength,
            i,
            j;

        
            userLength = users.length;

            for(j = 0; j < userLength; j++) {
                user = users[j].user;
                this.setState({ message: this.state.message + j });
                // Add Unique Row ID to RowID Array for Section
                rowIDs[j] = users[j].id_str;

                // Set Value for unique Section+Row Identifier that will be retrieved by getRowData
                dataBlob[users[j].id_str] = user;
            }
        
}*/
	renderRow(tweet) {
	 
		return (
	     	<View> 
	     		<Text style={styles.description}> tweet </Text>
	     	</View>
	  );
	}

	componentDidMount() {
		var query = urlBuilder();
		this.setState({ message: query + '' });
		this._fetchData(query);
	}

	render(){
		return(
			<ScrollView
			  contentContainerStyle={styles.contentContainer}
			  style={styles.scrollView}>

				{/* Text elements */}
				<Text style={styles.description} > {this.state.message} </Text>
				<Text style={styles.description} > {this.state.jsonData} </Text>

			  	{/**/}
				<ListView 
				dataSource={this.state.data}
				renderRow={ (rowData) => <Text style={styles.description} >{rowData}</Text> }/>
				
			</ScrollView>
		);
	}
}

module.exports = TwitterFeedList;



/*	
	

	_handleResponse(response){
		this.setState({ isLoading: false });

	}

	onSearchPressed(){
		var query = urlBuilder();
		this.setState({ message: this.state.message + query });
		this._executeQuery(query);
	}
*/
