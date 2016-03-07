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
var styles = StyleSheet.create({
  wrapper:{
    flex:1,
    backgroundColor: '#fff'
  },
  scrollView: {

  },
  header:{
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0,
    paddingVertical: 10, 
    height:55, 
    paddingHorizontal: 20, 
    backgroundColor: '#ff9800'
  },
  footer:{
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 20,
    paddingVertical: 10, 
    paddingHorizontal: 20,
    margin:20, 
    backgroundColor: '#2196f3'
  },
  container: {
    backgroundColor: '#fff'
  },
  content:{
    padding:20,
  },
  buttonText: {
    textAlign:'center',
    fontSize: 30,
    color:'white'
  },
  headerText: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 10,
    alignItems: 'center',
    textAlign:'center',
    fontSize: 24,
    color:'white'
  },
  option:{
    fontSize:16,
    marginTop:10
  },
  settingsText: {
    textAlign:'right',
    fontSize: 16,
    marginTop:16,
    marginRight:10,
    color:'white',
  },
  backText: {
    textAlign:'left',
    fontSize: 16,
    marginTop:16,
    marginLeft:10,
    color:'white',
  },
  word: {
    fontSize: 30,
    textAlign: 'center',
    margin:50,
    marginTop:40,
    color: 'black',
  },
  translation: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
    color: 'black',
  },
  example: {
    fontSize: 12,
    textAlign: 'left',
    margin: 5,
    color: 'black',
  },
});
module.exports = styles;