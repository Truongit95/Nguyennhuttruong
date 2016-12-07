'use strict';
import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';

import Button from '../components/Button';
import Header from '../components/Header';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import Signup from './SignUp';
import Account from './UsedAccount';
import Firebase from 'firebase';
import forget from './forgetPassword';
import Spinner from 'react-native-loading-spinner-overlay';
let app = new Firebase("scorching-inferno-4078.firebaseio.com");

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true,
      visible: false
    }
  }
  _focusNextField(nextField) {
        this.refs[nextField].focus()
    }
    goToSignup(){
      this.props.navigator.pop({
      });
    }
    registry(){
        this.props.navigator.push({component:forget});
    }
  login(){

    this.setState({
      loaded: true, visible:true
    });
    app.authWithPassword({
      "email": this.state.email,
      "password": this.state.password
    }, (error, user_data) => {

      this.setState({
        loaded: true,
       
      });

      if(error){
         Alert.alert('Thông Báo','Đăng nhập thất bại. Vui lòng thử lại sau!');
        this.setState({
        email: '',
        password: '',
        visible:false
      });
      }else{
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        this.setState({
            email: '',
            password: '',
            visible:false}),
        this.props.navigator.push({
          component: Account
        });
      }
    });
  }
 render() {
    return (
        <View style={styles.container}>
         <Spinner visible={this.state.visible} />
            <Image style={styles.bg} source={require('../images/user.png')} />
            <View style={styles.header}>
                 <TouchableOpacity>
                    <Image style={styles.mark} source={require('../images/ic.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: 'row',}}>   
                        <Image style={styles.inputUsername} source={require('../images/user_email.png')}/>
                        <TextInput 
                            ref='1'
                            blurOnSubmit={false}
                            style={[styles.input, styles.YellowFont]}
                            placeholder="Username"
                            placeholderTextColor="yellow"
                            value={this.state.email}
                            onChangeText={(text) => this.setState({email: text})} 
                            onSubmitEditing={() => this._focusNextField('2')}
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: 'row',}}>   
                        <Image style={styles.inputPassword}  source={require('../images/user_pass.png')}/>
                        <TextInput
                            ref='2'
                            password={true}
                            secureTextEntry={true}
                            blurOnSubmit={false}
                            style={[styles.input, styles.YellowFont]}
                            placeholder="Pasword"
                            placeholderTextColor="yellow"
                            value={this.state.password}
                            onChangeText={(text) => this.setState({password: text})} 
                            returnKeyType='done'
                        />
                    </View>
                </View>
                <View style={styles.forgotContainer}>
                    <TouchableOpacity onPress={this.registry.bind(this)} >
                         <Text style={styles.YellowFont}>Quên mật khẩu</Text>    
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                 <View style={styles.signin}>
                    <TouchableOpacity onPress={this.login.bind(this)} style={styles.button}>
                        <Text style={styles.whiteFont}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signup}>
                    <Text style={styles.greyFont}>Không có tài khoản?</Text>
                    <TouchableOpacity   onPress={this.goToSignup.bind(this)} >
                        <Text style={styles.YellowFont}>  đăng ký ngay</Text>
                    </TouchableOpacity>
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
        height: windowSize.height,
        resizeMode: 'stretch',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1/3,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150,
    },
    signin: {
        marginBottom:20,
        padding: 20,
        alignItems: 'center',
        marginLeft: 50,
        marginRight:50
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1/3,
        marginRight:20
    },
    footer:{
        flex:1/3,
    },
    inputPassword: {
        marginLeft: 17,
        width: 30,
        height: 30,
        marginTop:15
    },
    inputUsername: {
      marginLeft: 15,
      width: 30,
      height: 30,
      marginTop:15
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    input: {
        color:'blue',
        flex:.8,
        marginTop:-10,
        marginLeft:20
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#0B0B0B'
    },
    whiteFont: {
      color: '#0B0B0B'
    },
    YellowFont: {
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

module.exports = Login;
