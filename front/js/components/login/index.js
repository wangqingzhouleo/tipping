import React, { Component } from "react";
import { View,Text,TouchableOpacity,TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import ScIcon from 'react-native-vector-icons/EvilIcons';

import styles from './styles'

const text = require('../../../localization/en.json').login;

class Header extends Component{
  render(){
    return (
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.loginText}></Text>
        </View>
      </View>
    )
  }
}

class BodyForm extends Component{
  render(){
    return (
      <View style={styles.body}>
        <View style={{flex:1,paddingTop:10,paddingRight:20,alignItems:'flex-end'}}>
          {/* <Text style={{fontSize:20}}>Sign up </Text> */}
        </View>
        <View style={{flex:2,justifyContent:'space-between',padding:15}}>
          <View style={styles.inputView}>
            <Icon name="md-person" size={30} style={{padding: 10}}/>
            <TextInput placeholder={text.email} style={{flex:1}}/>
          </View>
          <View style={styles.inputView}>
            <Icon name="md-lock" size={30} style={{padding: 10}}/>
            <TextInput placeholder={text.password} style={{flex:1}}/>
          </View>

        </View>
        <View style={{flex:3}}>

        </View>
      </View>
    );
  };
}


export default class Login extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Header/>
        <BodyForm/>
        <View style={styles.footer}>
          <View style={{flexDirection:'row',justifyContent:'center',paddingBottom:20}}>
            <ScIcon style={styles.scIcons} name="sc-twitter" size={60}/>
            <ScIcon style={styles.scIcons} name="sc-facebook" size={60}/>
            <ScIcon style={styles.scIcons} name="sc-google-plus" size={60}/>
          </View>
          <View style={{flex:1}}>

          </View>
          <TouchableOpacity>
            <View style={{backgroundColor:'#3490de',padding:10, alignItems:'center'}}>
              <Text style = {styles.loginText}>{text.login}</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}
