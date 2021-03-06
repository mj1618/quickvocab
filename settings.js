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
  Component,
  TextInput
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');
var styles=require('./styles');

var store = require('react-native-simple-store');

var SettingsPage = React.createClass({
  getInitialState() {
  	return {
      language: null,
      nwords:null
    };
  },

  componentDidMount(){
  	store.get('language').then((language)=>{
		this.setState({
	  		language:language==null?'Italian':language
	  	});
  	});
  	store.get('nwords').then((nwords)=>{
		this.setState({
	  		nwords:nwords==null?1000:parseInt(nwords)
	  	});
  	});
  },

  _back(){
  	this.props.navigator.pop();
  },

  _language(language) {
  	store.save('language',language).then(()=>{
  		this.setState({language: language});
  	});
  },
	_nwords(nwords){
		
	  	store.save('nwords',nwords).then(()=>{
	  		this.setState({nwords: nwords});
	  	});
	},
  render() {
  	var that=this;

  	var italianIcon = that.state.language=='Italian' ? 
  		<Icon name="check"  size={20} color='#000000' /> : <Icon name="check"  size={20} color='#fff' />;
  	var germanIcon = that.state.language=='German' ? 
  		<Icon name="check"  size={20} color='#000000' /> : <Icon name="check"  size={20} color='#fff' />;
  	var frenchIcon = that.state.language=='French' ? 
  		<Icon name="check"  size={20} color='#000000' /> : <Icon name="check"  size={20} color='#fff' />;
  	var spanishIcon = that.state.language=='Spanish' ? 
  		<Icon name="check"  size={20} color='#000000' /> : <Icon name="check"  size={20} color='#fff' />;


    return (
      <View style={styles.wrapper}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>
        <TouchableOpacity onPress={this._back}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <ScrollView
           style={[styles.scrollView,{marginTop:20}]} >
        <View style={{padding:20,marginTop:20}}>
        	<Text style={{fontSize:24,paddingBottom:10,textAlign:'left',fontWeight:'bold'}}>Select a Language:</Text>
	        <TouchableOpacity onPress={ () => that._language('Italian') }>
	        	<Text style={styles.option}>
	        		{italianIcon}
	        		Italian
        		</Text>
    		  </TouchableOpacity>
	        <TouchableOpacity onPress={ () => that._language('German') }>
	        	<Text style={styles.option}>
		        	{germanIcon}
	        		German
        		</Text>
    		  </TouchableOpacity>
	        <TouchableOpacity onPress={ () => that._language('French') }>
	        	<Text style={styles.option}>
		        	{frenchIcon}
	        		French
        		</Text>
    		  </TouchableOpacity>
	        <TouchableOpacity onPress={ () => that._language('Spanish') }>
	        	<Text style={styles.option}>
		        	{spanishIcon}
	        		Spanish
        		</Text>
    		  </TouchableOpacity>
        </View>
        <View style={{padding:20}}>
          <Text style={{fontSize:24,paddingBottom:5,textAlign:'left',fontWeight:'bold'}}>How many words?</Text>
          <Text style={{fontSize:12,paddingBottom:10,textAlign:'left'}}>The app chooses the most frequent words in the language, choose how many of the top words the app should choose from.</Text>
          <TouchableOpacity onPress={ () => that._nwords(100) }>
            <Text style={styles.option}>
              {that.state.nwords==100 ? 
              <Icon name="check"  size={20} color='#000000' /> 
              : <Icon name="check"  size={20} color='#fff' />}
              100 (Beginner)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => that._nwords(1000) }>
            <Text style={styles.option}>
              {that.state.nwords==1000 ? 
              <Icon name="check"  size={20} color='#000000' /> 
              : <Icon name="check"  size={20} color='#fff' />}
              1,000 (Intermediate)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => that._nwords(10000) }>
            <Text style={styles.option}>
              {that.state.nwords==10000 ? 
              <Icon name="check"  size={20} color='#000000' /> 
              : <Icon name="check"  size={20} color='#fff' />}
              10,000 (Advanced)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => that._nwords(100000) }>
            <Text style={styles.option}>
              {that.state.nwords==100000 ? 
              <Icon name="check"  size={20} color='#000000' /> 
              : <Icon name="check"  size={20} color='#fff' />}
              100,000 (Expert)
            </Text>
          </TouchableOpacity>
       </View>
       </ScrollView>
      </View>
    )
  },
});

module.exports=SettingsPage;