/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TwitterFeed = require('./TwitterFeed.js');
var InstagramFeed = require('./InstagramFeed.js');
var Program = require('./Program.js');
var Map = require('./Map.js');
var Settings = require('./Settings.js');


var {
  AppRegistry,
  Component,
  TabBarIOS,
} = React;


class TrinBall extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'twitterFeed'
    };
  }

  setTab(tabId){
    this.setState({
      selectedTab: tabId
    })
  }

  render(){
    return(
      <TabBarIOS /*selectedTab={this.state.selectedTab}*/
        tintColor="white"
        barTintColor="#091864">

        <TabBarIOS.Item
          title="Twitter"
          icon={{uri:'Twitter2'}}

          selected={this.state.selectedTab === 'twitterFeed'}
          onPress={() => {
            this.setTab('twitterFeed')
          }}>
        <TwitterFeed/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Instagram"
          icon={{uri:'Instagram2'}}

          selected={this.state.selectedTab === 'instagramFeed'}
          onPress={() => {
            this.setTab('instagramFeed')
          }}>
        <InstagramFeed/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Programme"
          icon={{uri:'List2'}}
          selected={this.state.selectedTab === 'program'}
          onPress={() => {
            this.setTab('program')
          }}>
        <Program/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Map"
          icon={{uri:'Compass2'}}
          selected={this.state.selectedTab === 'map'}
          onPress={() => {
            this.setTab('map')
          }}>
        <Map/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Settings"
          icon={{uri:'Settings'}}
          selected={this.state.selectedTab === 'settings'}
          onPress={() => {
            this.setTab('settings')
          }}>
        <Settings/>
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  }
}



AppRegistry.registerComponent('TrinBall', () => TrinBall);