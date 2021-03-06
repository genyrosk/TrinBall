'use strict';

var React = require('react-native');
var styles2 = require('./src/stylesheets/style.js'); 
var DateFormat = require('./src/plugins/dateFormat.js');

var {
	StyleSheet,
	Text,
	View,
	Component,
	TouchableHighlight,
	ScrollView,
	ListView,
	Image,
} = React;

var styles = StyleSheet.create({
	contentContainer:{},
	scrollView:{
		backgroundColor: 'white',
	},

	listView: {
		borderWidth: 1,
		borderColor: 'black',
	},


	tweet:{	flexDirection: 'row', },
		tw_img_container:{
			flex: 1,
			flexDirection: 'column',
		},
			tw_img:{
				height:100,
				width:100,
			},
		tw_content:{
			flex: 5,
			flexDirection: 'column',
		},
			tw_details:{
				flex: 1, 
				flexDirection: 'row',
			},
				tw_user:{
					flexDirection: 'row'
				},
					tw_name:{

					},
					tw_screen_name:{

					},
				tw_date:{

				},
			tw_text_container:{

			},
				tw_text:{

				},
			tw_count:{

			},
				tw_fav:{

				},
				tw_retweet:{

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

function dateBuilder(date){

	var now = new Date();
	console.log(now.date);

	



	date = new Date(date).format('j/m');

	return date;
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

	renderRow(tweet) {
	 	

		var profile_image_url = tweet.user.profile_image_url;
		var name = tweet.user.name;
		var screen_name = tweet.user.screen_name;
		var created_at = tweet.user.created_at;

		//var myDate = new Date(created_at).format('j/m');
		console.log(created_at);
		var myDate = new Date(created_at).getTime();
		console.log(myDate);

		var now = new Date().getTime();
		console.log(now);


		var text = tweet.text;

		var retweet_count = tweet.retweet_count;
		var favourites_count = tweet.favourites_count;


		return (


	     	<View style={styles.tweet}>

	     		{/* User profile image */}
	     		<View style={styles.tw_img_container}>
	     			<Image
				        style={styles.tw_img}
				        source={{uri: profile_image_url}}
				    />
		     	</View>
		     	<View style={styles.tw_content}>


		     		{/* User details + date */}
		     		<View style={styles.tw_details}>
			    		<View style={styles.tw_user}>
		     				<Text style={styles.tw_name}>
		     					{name}</Text>
		     				<Text style={styles.tw_screen_name}>
		     					@{screen_name}</Text>
		     			</View>
		     			<Text style={styles.tw_date}>
		     				{created_at}</Text>
		     		</View>

		     		{/* Tweet text */}
		     		<View style={styles.tw_text_container}>
		     			<Text>{text}</Text>
		     		</View>

		     		{/* retweets + favourites  counters*/}
		     		<View style={styles.tw_count}>
		     			<View style={styles.tw_fav}>
		     				<Text>favourites_count</Text>
		     			</View>
		     			<View style={styles.tw_retweet}>
			     			<Text>retweet_count</Text>
			     		</View>
		     		</View>
	     		</View>
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
			  automaticallyAdjustContentInsets={true}
			  showsHorizontalScrollIndicator={false}
			  contentContainerStyle={styles.contentContainer}
			  style={styles.scrollView}>

				{/*
			  	<View>
					
					<Text style={styles.description} > Message: {this.state.message} </Text>
					<Text style={styles.description} > JsonData: {this.state.jsonData} </Text>

				</View>*/}

			  	{/*
				<ListView 
				  style={styles.listView}
				  dataSource={this.state.dataSource}
				  renderRow={ (rowData) => <Text style={styles.description} >{rowData}</Text> }/>
*/}
				  <ListView 
				  automaticallyAdjustContentInsets={false}
				  style={styles.listView}
				  dataSource={this.state.dataSource}
				  renderRow={ this.renderRow.bind(this) }/>
				
			</ScrollView>
		);
	}
}

module.exports = TwitterFeedList;






