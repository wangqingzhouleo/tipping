/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  Button,
  Dimensions,
  TextInput,
  View
} from 'react-native';

export default class front extends Component {
  render() {
    let width = Dimensions.get('window').width;
    width = width * 0.9;
    let height = Dimensions.get('window').height;
    let email = '\u2709';
    let pass = '\uD83D\uDD12';
    return (
      <View style={styles.container}>
        <View style={styles.footHeader}/>
        <Image
          source={require('./logo.png')}
          style={{flex:1,height:100,width:300,resizeMode: 'contain'}}
        />
        <View
          style={{flex:4,width:width}}
        >
          <View style={{flex:1}}></View>
          <View style={{flex:2}}>
            <TextInput style = {styles.inputBox} placeholder="Email/User name" placeholderTextColor="grey">
            </TextInput>
          </View>
          <View style={{flex:2}}>
            <TextInput style = {styles.inputBox} placeholder="Password" placeholderTextColor="grey">
            </TextInput>
          </View>
        </View>
        <View
          style={{flex:3,width:width}}
        >
          <Button
            title="Login"
            color='#393e46'
          />
          <View style={{flexDirection:'row'}}>
            <Text
              style={{paddingTop:30,color:'white'}}
            >Don't have an account?</Text>
            <Text
              style={{paddingTop:30,color:'white',fontWeight:'bold',textDecorationLine:'underline'}}
            >Sign Up</Text>
          </View>
        </View>
        <View
          style={{flex:1}}
        >

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222831',
  },
  footHeader:{
    flex:1
  },
  icon:{
    fontSize:30,
    color:'white'
  },
  inputBox:{
    fontSize:20,
    color:'white'
  }

});

AppRegistry.registerComponent('front', () => front);
