import React, { Component } from "react";
import { View,Text,TouchableOpacity,TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import ScIcon from 'react-native-vector-icons/EvilIcons';

import styles from './styles'


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
            <TextInput placeholder="Email" style={{flex:1}}/>
          </View>
          <View style={styles.inputView}>
            <Icon name="md-lock" size={30} style={{padding: 10}}/>
            <TextInput placeholder="Password" style={{flex:1}}/>
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
              <Text style = {styles.loginText}>Login</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

// import { connect } from "react-redux";
// import {
//   Container,
//   Content,
//   Footer,
//   FooterTab,
//   Item,
//   Input,
//   Button,
//   Icon,
//   View,
//   Text
// } from "native-base";
// import { Field, reduxForm } from "redux-form";
// import styles from "./styles";
// const background = require("../../../images/shadow.png");
//
// const validate = values => {
//   const error = {};
//   error.email = "";
//   error.password = "";
//   var ema = values.email;
//   var pw = values.password;
//   if (values.email === undefined) {
//     ema = "";
//   }
//   if (values.password === undefined) {
//     pw = "";
//   }
//   if (!ema.includes("@") && ema !== "") {
//     error.email = "@ not included";
//   }
//   return error;
// };
//
// class Login extends Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: ""
//     };
//     this.renderInput = this.renderInput.bind(this);
//   }
//   renderInput({
//     input,
//     label,
//     type,
//     meta: { touched, error, warning },
//     inputProps
//   }){
//     let hasError = false;
//     if (error !== undefined) {
//       hasError = true;
//     }
//     return (
//       <Item error={hasError}>
//         <Icon active name={input.name === "email" ? "person" : "unlock"} />
//         <Input
//           placeholder={input.name === "email" ? "EMAIL" : "PASSWORD"}
//           {...input}
//         />
//         {hasError
//           ? <Item style={{ borderColor: "transparent" }}>
//               <Icon active style={{ color: "red", marginTop: 5 }} name="bug" />
//               <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
//             </Item>
//           : <Text />}
//       </Item>
//     );
//   }
//   render() {
//   return (
//     <Container>
//       <View style={styles.container}>
//         <Content>
//             <View style={styles.bg}>
//               <Field name="email" component={this.renderInput} />
//               <Field name="password" component={this.renderInput} />
//               <Text style={styles.forget}>Forget password ?</Text>
//             </View>
//         </Content>
//         <Footer>
//             <FooterTab>
//                 <Button full>
//                     <Text>Log in</Text>
//                 </Button>
//             </FooterTab>
//         </Footer>
//       </View>
//     </Container>
//   );
//   }
// }
//
//
// const LoginSwag = reduxForm(
//   {
//     form: "test",
//     validate
//   },
//   function bindActions(dispatch) {
//     return {
//       setUser: name => dispatch(setUser(name))
//     };
//   }
// )(Login);
// LoginSwag.navigationOptions = {
//   header: null
// };
//
// export default LoginSwag;
