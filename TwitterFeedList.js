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
	scrollView:{
		backgroundColor: 'white',
	},

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
		flex: 1,
		flexDirection: 'row',
	     padding: 10
	},
	listView: {
		borderWidth: 1,
		borderColor: 'black',
		height:1000,
	},
	divContainer: {
	}

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

		this.state = {
			searchString: '',
			isLoading: false,
			message: '',
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2,
			}),
			//data: dataSource.cloneWithRows(['row 1', 'row 2', 'row3', 'row4']),
		};
	}


	_fetchData(query){

		console.log(query);
		this.setState({ isLoading: true });

		fetch(query)
			.then(response => response.json())
			.then(responseData => {
		     	this._handleResponse(responseData);
			})
			.catch(error => 
				this.setState({
					isLoading: false,
					message: this.state.message + ' --- ' + 'Something bad happened' + error
				})
			).done(); 

	}

	_handleResponse(responseData){
		this.setState({ 
			message: 'sucessful delivery',
			isLoading: false,
			dataSource: this.state.dataSource.cloneWithRows(responseData.statuses),

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
	 	
		var text = tweet.text;
		var created_at = tweet.created_at;
		var retweet_count = tweet.retweet_count;
		var favourites_count = tweet.favourites_count;
		var screen_name = tweet.user.screen_name;
		var profile_image_url = tweet.user.profile_image_url;
		// created_at 
		// retweet_count 
		// favourites_count 
		// user.screen_name 
		// user.profile_image_url



		return (
	     	<View> 
	     		<Text style={styles.description}> 
	     			{text}
	     			{created_at}
	     			{retweet_count}
	     			{favourites_count}
	     			{screen_name}
	     			{profile_image_url}
	     		</Text>
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
			  automaticallyAdjustContentInsets={false}
			  contentContainerStyle={styles.contentContainer}
			  style={styles.scrollView}>

			  	<View>
					{/* Text elements */}
					<Text style={styles.description} > Message: {this.state.message} </Text>
					<Text style={styles.description} > JsonData: {this.state.jsonData} </Text>
				</View>
			  	{/*
				<ListView 
				  style={styles.listView}
				  dataSource={this.state.dataSource}
				  renderRow={ (rowData) => <Text style={styles.description} >{rowData}</Text> }/>
*/}
				  <ListView 
				  style={styles.listView}
				  dataSource={this.state.dataSource}
				  renderRow={ this.renderRow.bind(this) }/>
				
			</ScrollView>
		);
	}
}

module.exports = TwitterFeedList;






