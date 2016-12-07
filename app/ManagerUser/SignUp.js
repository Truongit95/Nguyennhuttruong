'use strict';
import React,{Component} from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableHighlight,
  AsyncStorage,
  Alert
} from 'react-native';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import Button from '../components/Button';
import Header from '../components/Header';
import Login from './Login';
import Firebase from 'firebase';

let app = new Firebase("scorching-inferno-4078.firebaseio.com");

class SignUp extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password_1: '',
      password_2: '',
    };
  }

  signup(){
      if(this.state.password_1==this.state.password_2)
      {
        this.setState({
        loaded: false
        });

        app.createUser({
        'email': this.state.email,
        'password': this.state.password_2
        }, (error, userData) => {

        if(error){
            switch(error.code){

            case "EMAIL_TAKEN":
                Alert.alert('Thông Báo',"Tài khoản không được tạo thành công vì tên email này đã có người sử dụng!");
            break;

            case "INVALID_EMAIL":
                Alert.alert('Thông Báo',"Tài khoản email không đúng định dạng!");
            break;

            default:
                Alert.alert('Thông Báo',"Lỗi khi tạo tài khoản, vui lòng thử lại sau!");
            }

        }else{
            Alert.alert('Thông Báo','Tài khoản '+this.state.email+' đã được tạo, Vui lòng đăng nhập!');
            this.props.navigator.push({
            component: Login
            });
        }

        this.setState({
            email: '',
            password_1: '',
            password_2: '',
        });

        });
      }
      else
      {
          Alert.alert('Lỗi','Mật khẩu không khớp, vui lòng thử lại!');
      }

  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }
_focusNextField(nextField) {
        this.refs[nextField].focus()
    }
  render() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={require('../images/user.png')} />
            <View style={styles.header}>
                 <TouchableOpacity >
                      <Image style={styles.mark} source={require('../images/ic.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputstop}>
                     <View style={{ flexDirection: 'row',}}>   
                        <Image style={styles.inputemail} source={require('../images/user_email.png')}/>
                        <TextInput
                             ref='1'
                            style={[styles.input, styles.YellowFont]}
                            placeholder="Email"
                            placeholderTextColor="yellow"
                            blurOnSubmit={false}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({email: text})}
                            onSubmitEditing={() => this._focusNextField('2')}
                        />
                    </View>
                </View>
                <View style={styles.inputsbottom}>
                     <View style={{ flexDirection: 'row',}}>   
                        <Image style={styles.inputPassword}  source={require('../images/user_pass.png')}/>
                        <TextInput
                             ref='2'
                            password={true}
                            secureTextEntry={true}
                            style={[styles.input, styles.YellowFont]}
                            placeholder="Password"
                            blurOnSubmit={false}
                            placeholderTextColor="yellow" 
                            value={this.state.password_1}
                            onChangeText={(text) => this.setState({password_1: text})}
                            onSubmitEditing={() => this._focusNextField('3')}
                        />
                    </View>
                </View>     
                  <View style={styles.inputsbottom}>
                     <View style={{ flexDirection: 'row',}}>   
                        <Image style={styles.inputPassword}  source={require('../images/user_pass.png')}/>
                        <TextInput
                            ref='3'
                            password={true}
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            style={[styles.input, styles.YellowFont]}
                            placeholder="Rely Password"
                            placeholderTextColor="yellow" 
                            value={this.state.password_2}
                            onChangeText={(text) => this.setState({password_2: text})}
                            returnKeyType='done'
                        />
                    </View>
                </View>                                   
            </View>
            <View  style={styles.footer}>
                <View style={{flex:1/2,}}>
                    <View style={styles.signup}>
                       <TouchableHighlight onPress={this.signup.bind(this)} style={styles.button}>
                            <Text style={styles.whiteFont}>Đăng ký</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.register}>
                    <View style={styles.signin} >
                        <Text style={styles.BlackFont}>Có tài khoản?</Text>
                        <TouchableOpacity onPress={this.goToLogin.bind(this)}>
                            <Text style={{color:'#290AF6'}}> đăng nhập ngay</Text>
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
        backgroundColor: 'transparent',
    },
    mark: {
        width: 150,
        height: 150
    },
    register: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1/2,
    },
    signin:{
        flex:1.2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    signup:{
        alignItems: 'center',
        marginTop:50,
        marginLeft: 50,
        marginRight:50,
    },
    inputs: {
        flex: 1/3,
        marginRight:20,
    },
    inputUsername: {
      marginLeft: 17,
        width: 30,
        height: 30,
        marginTop:15
    },
    inputPassword: {
        marginLeft: 18,
        width: 34,
        height: 30,
        marginTop:15
    },
    inputemail:{
       marginLeft: 17,
        width: 30,
        height: 30,
        marginTop:15
    },
    inputstop: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        flex:1/2
    },
      inputsbottom: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        flex:1/2
    },
    input: {
        color:'blue',
        flex:.1,
        marginTop:-20,
        marginLeft:20,
    },
     footer:{
        flex:1/3,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    YellowFont:{
        color: '#290AF6'
    },
    whiteFont: {
      color: '#FFF',
    },
    button:{
        width:200,
        height:50,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        borderWidth:1
    }
})
module.exports = SignUp;
