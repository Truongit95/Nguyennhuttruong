'use strict';
import React,{Component} from 'react';
import  {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
   Alert
} from 'react-native';
import Header from '../components/Header';
import Login from './Login';
import styles from '../util/styles.js';
import Firebase from 'firebase';
let app = new Firebase("scorching-inferno-4078.firebaseio.com");
class UsedAccount extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
    }

  }
  componentWillMount(){
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      this.setState({
        user: user_data,
        loaded: true
      });
    });

  }
  render(){
    return (
      <View style={styles.container}>
        <View style={{flex:2/20}}>
          <Header text="Quản Lý Tài Khoản" loaded={this.state.loaded}/>
        </View>
        <View style={page_styles.body}>
        <Text>Tài Khoản</Text>
        {
          
          this.state.user &&
            <View style={{  alignItems:'center',justifyContent:'center',}}>
              <View style={{padding:20}}>
                <Text style={page_styles.email_text}>{this.state.user.password.email}</Text>
              </View>
              <Image
                style={page_styles.image}
                source={{uri: this.state.user.password.profileImageURL}}
              />
              <TouchableOpacity
                  onPress={this.logout.bind(this)}
                  style={page_styles.button}
                  >
                   <Text style={{}}> Đăng Xuất</Text>
              </TouchableOpacity>
            </View>
        }
        </View>
      </View>
    );
  }
  logout(){
    Alert.alert('Thông báo','Bạn có chắc chắn muốn thoát',[
      {text:'Có', onPress: () =>  AsyncStorage.removeItem('user_data').then(() => {
                      app.unauth();
                      this.props.navigator.pop({
                        component:require('./Login')
                      });
                    })},{text:'Không'}])
  }
}
const page_styles = StyleSheet.create({
  email_container: {
    padding: 20,
    flex:1
  },
  email_text: {
    fontSize: 18
  },
   button:{
        width:200,
        height:50,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        borderWidth:1,
        marginTop:20
    },
    body:{
          alignItems: 'center',
          flex:18/20,
    },
    image:{
       width: 100,
       height: 100,
       marginTop:20
    }
});

module.exports = UsedAccount;
