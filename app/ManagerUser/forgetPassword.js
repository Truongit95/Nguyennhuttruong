

/*
'use strict';
var React = require('react');
var {
  AppRegistry
} = React;

import DemoScreen from './app/screens/login/Login1';
*/
'use strict';
import React, { Component } from 'react';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

import  {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert
} from 'react-native';
var dk= require('./SignUp');
class forgetPassword extends Component{
  constructor(props){
    super(props);
    this.state= {
      username: "",
      email: ""
    }
  }
     gosignup(routeName){
        this.props.navigator.push({
            component:dk      
        })
    }
    _navigate(){
        this.props.navigator.pop({    
        })
    }
  render() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg}  source={require('../images/user.png')} />
            <View style={styles.header}>
                 <TouchableOpacity>
                     <Image style={styles.mark} source={require('../images/ic.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.inputs}>
                    <View style={{ flexDirection: 'row',}}>   
                        <Image style={styles.inputemail} source={require('../images/user_email.png')}/>
                        <TextInput
                            password={true}
                            style={[styles.inputText,styles.whiteFont]}
                            placeholder="Email@email.com"
                            placeholderTextColor="yellow"
                            value={this.state.email}
                            onChangeText={(email)=> this.setState({ email}) } 
                        />
                    </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.forget}>
                   <TouchableHighlight onPress={() => {Alert.alert('Thông báo','Chức năng hiện đang xây dựng vui lòng thử lại!')}} style={styles.button}>
                        <Text style={{color:'#FFF'}}>Lấy lại mật khẩu? </Text>
                    </TouchableHighlight>
                </View>
                <View style={{flex:1/4,marginTop:20}}>
                     <View style={styles.signup}>
                        <Text>Có tài khoản? </Text>
                        <TouchableOpacity onPress={this._navigate.bind(this)}>
                            <Text style={styles.whiteFont} >đăng nhập ngay?</Text>
                        </TouchableOpacity>
                     </View>
                     <View style={styles.signup}>
                        <Text >Không có tài khoản? </Text>
                        <TouchableOpacity  onPress={this.gosignup.bind(this)}>
                            <Text style={styles.whiteFont}>đăng ký ngay?</Text>
                        </TouchableOpacity>                 
                     </View>
                </View>
            </View>
        </View>
    )
  }
}
var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1/3,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
     footer:{
        flex:1/3,
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center',
        marginRight:50,
        marginLeft:50,
        

    },
    forget:{
        padding: 20,
        alignItems: 'center',
        marginRight:50,
        marginLeft:50,
        flex:1/4
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15,
      flexDirection: 'row',
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1/3,
        marginRight:20
    },
    inputUsername: {
      marginLeft: 15,
      width: 30,
      height: 30,
      marginTop:15
    },
    inputemail:{
        marginLeft: 13,
        width: 30,
        height: 30,
         marginTop:15
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    inputText: {
        color:'blue',
        flex:.8,
        marginTop:-10,
        marginLeft:20
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
       color: '#290AF6'
    },
    button:{
        width:200,
        height:50,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        borderRadius:20,
        borderWidth:1
    }
})
module.exports=forgetPassword;


