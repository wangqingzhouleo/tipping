
const React = require('react-native');
const { StyleSheet, Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    flex:1
  },
  header:{
    flex:2,
    backgroundColor:'#3490de'
  },
  headerTextContainer:{
    flex:1,
    justifyContent:'flex-end',
    paddingBottom:10,
    paddingLeft:10
  },
  loginText:{
    fontSize:30,
    color:'white'
  },
  body:{
    flex:6
  },
  footer:{
    flex:1,
    justifyContent:'flex-end'
  },
  inputView:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scIcons:{
    padding:20,
    color:'#3490de'
  }

};
