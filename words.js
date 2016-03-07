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
var styles=require('./styles');
var Spinner = require('react-native-spinkit');
var EventEmitter = require('EventEmitter');
var SegmentedView = require('./segmented');

var store = require('react-native-simple-store');

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
var Icon = require('react-native-vector-icons/FontAwesome');
var data = [];
var eventEmitter = new EventEmitter();
var Subscribable = require('Subscribable');
function encodeLanguage(lang){
  switch(lang){
    case 'Italian':return 'it';
    case 'German':return 'de';
    case 'French':return 'fr';
    case 'Spanish':return 'es';
    default:return 'it';
  }
}
function decodeLanguage(lang){
  switch(lang){
    case 'it':return 'Italian';
    case 'de':return 'German';
    case 'fr':return 'French';
    case 'es':return 'Spanish';
    default:return 'Italian';
  }
}
function fetchWord(language,nwords){
  return fetch('https://quickvocab.clubsmatter.com/api/word?language='+encodeLanguage(language)+'&nwords='+nwords);
}

function nextWord(){
  return store.get('language').then((language)=>{
    return store.get('nwords').then((nwords)=>{
      if(language==null)language='Italian';
      if(nwords==null)nwords=1000;
      fetchWord(language,nwords)
        .then( res => {
          return res.json();
        })
        .then(json => {
          data.push(json);
          eventEmitter.emit('data');
        });
    });
  });
}

var decodeHtmlEntity = function(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
};
function unicodeToChar(text) {
   return text.replace(/\\u[\dA-F]{4}/gi, 
          function (match) {
               return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
          });
}

function decode(str){
  return decodeHtmlEntity(unicodeToChar(str));
}
var WordPage = React.createClass({
    mixins: [Subscribable.Mixin],
  getInitialState() {
    return {index: 0,data:null}
  },

  componentDidMount(){
    var that=this;
    
    if(data.length>0){
      this.setState({data:data.pop()});
    } else {
      this.addListenerOn(eventEmitter, 'data', this.dataAvailable);
    }
    nextWord();
  },

  dataAvailable(){
    if(this.state.data==null){
      this.setState({data:data.pop()});
      nextWord();
    }
  },


  render() {

    var content;

    var d = this.state.data;
    if(d==null){
      return <View style={{flex:1,alignItems:'center',justifyContent:'center',marginBottom:100}}>
          <Spinner isVisible={true} size={100} type={'ThreeBounce'} color={'#E91E63'}/>
        </View>
    }

    switch(this.state.index){
      case 0:
        content = 
          <View style={styles.content}>
            {this.state.data.translations.map( (t,i) => {
              return <Text key={i} style={styles.translation}>{i+1}. {decode(t)}</Text>;
            })}
          </View>;
        break;
      case 1:
        content = 
          <View style={styles.content}>
            {this.state.data.meanings.map( (t,i) => {
              
              return <View key={i}>
                  <Text style={styles.translation}><Icon name="circle"  size={8} color='#000000' /> {decode(t)}</Text>
                </View>;
            })}
          </View>;
        break;
      case 2:
        content = 
          <View style={styles.content}>
            {this.state.data.examples.map( (e,i) => {
              if(i>10)return;
              return <View key={i} style={{borderBottomWidth:1,borderColor:'#eee'}}>
                  <Text style={styles.example}>{decode(e.first)}</Text>
                  <Text style={styles.example}>{decode(e.second)}</Text>
                </View>
            })}
          </View>;
        break;

    }

    return (
      <View style={{flex:1,paddingBottom:100}}>
        <Text style={{textAlign:'right',fontSize:12,marginRight:20,marginTop:40,color:'#9C27B0'}}>{decodeLanguage(d.language)}</Text>
        <Text style={styles.word}>{d.word}</Text>

        <SegmentedView
          titles={["Translations", "Meanings", "Examples"]}
          index={this.state.index}
          stretch
          onPress={index => this.setState({ index })} />

        <ScrollView
           style={styles.scrollView} >
            {content}
        </ScrollView>
      </View>
    )
  },
});

var Words = React.createClass({

  getInitialState() {
    return {page: 0,language:null,nwords:null}
  },

  _renderScene(route, navigator) {
      return <WordPage page={route.page} navigator={navigator} />
  },
  componentDidMount(){
  },

  _configureScene(route) {
    return CustomSceneConfig;
  },

  _next() {
    console.log(this.refs.navigator.getCurrentRoutes());
    this.refs.navigator.push({page: this.state.page});
    this.setState({page:this.state.page+1});
  },

  _settings(){
    console.log('navigator:'+this.props.navigator);
    this.props.navigator.push({name:'settings'});
  },

  render() {
    return (
      <View style={styles.wrapper}>

        <View style={styles.header}>
          <Text style={styles.headerText}>QuickVocab</Text>
        </View>
        <TouchableOpacity onPress={this._settings}>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
        <Navigator
          ref='navigator'
          initialRoute={{id: 1, }}
          renderScene={this._renderScene}
          configureScene={this._configureScene} />
        
        <View style={styles.footer}>
          <TouchableOpacity onPress={this._next}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

module.exports = Words;