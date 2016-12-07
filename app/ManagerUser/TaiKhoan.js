'use strict';
import React,{Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import Signup from './SignUp';
import Account from './UsedAccount';
import Header from '../components/Header';
import Firebase from 'firebase';
let app = new Firebase("scorching-inferno-4078.firebaseio.com");
class TaiKhoan extends Component {
  constructor(props){
    super(props);
    this.state = {
      component: null,
      loaded: false
    };
  }
  componentWillMount(){
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      let component = {component: Signup};
      if(user_data != null){
        app.authWithCustomToken(user_data.token, (error, authData) => {
          if(error){
            this.setState(component);
          }else{
            this.setState({component: Account});
          }
        });
      }else{
        this.setState(component);
      }
    });

  }

  render(){

    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    }else{
      return (
        <View>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
          <View ></View>
        </View>
      );
    }

  }

}
module.exports=TaiKhoan;
