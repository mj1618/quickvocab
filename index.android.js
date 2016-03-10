'use strict';
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} = React;

var SettingsPage = require('./settings');
var WordPage = require('./words');

var SegmentedView = require('./segmented');

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A very tighly wound spring will make this transition fast
  springTension: 100,
  springFriction: 1,
  // Use our custom gesture defined above
  gestures: {
    pop: CustomLeftToRightGesture,
  }
});


var QuickVocab = React.createClass({
  _renderScene(route, navigator) {
      if(route.name=='words'){
        return <WordPage navigator={navigator} /> ;
      } else {
        return <SettingsPage navigator={navigator} /> ;
      }
      
  },
  _configureScene(route) {
    return CustomSceneConfig;
  },
  render() {
    return (
        <Navigator
          ref='navigator'
          initialRoute={{name: 'words'}}
          renderScene={this._renderScene}
          configureScene={this._configureScene} />
    );
  }
});

AppRegistry.registerComponent('quickvocab', () => QuickVocab);

module.exports = QuickVocab;  