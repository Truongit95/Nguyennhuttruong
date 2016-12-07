import React, { Component } from 'react';
import {
  StyleSheet,
  Text,Alert,
  View,Navigator,Dimensions,ListView,StatusBar,Image, TouchableOpacity,ScrollView ,TextInput
} from 'react-native';
var Firebase = require('firebase');
var deviceScreen = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
class Order extends Component{

    constructor(props){
    super(props)
    this.state = {
        fullname: '',
        email: '',
        phone: '',
        diachi:'',
        visible: false
    }
    var root = new Firebase('https://scorching-inferno-4078.firebaseio.com/')
    this.itemsRef=root.child('Order')
    this.confirm=this.confirm.bind(this)
}
_focusNextField(nextField) {
        this.refs[nextField].focus()
    }
    render(){
        return (
                <View style={styles.container}>
                        <View style={styles.bar}>
                            <TouchableOpacity style={styles.backButton}
                            onPress={()=>this.props.navigator.pop()}>
                                <Image source={require('../images/back.png')} style={styles.backImage} />
                            </TouchableOpacity>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>Order</Text>
                            </View>
                            <View style={styles.none}></View>
                        </View>
                            <View style={styles.contain}>
                                <View style={styles.infoView}>
                                    <TextInput
                                        ref='1'
                                        style={styles.textInput}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({fullname: text})}
                                        value={this.state.text}
                                        placeholder="Họ và tên"
                                        placeholderTextColor="#8BC34A"
                                        onSubmitEditing={() => this._focusNextField('2')}
                                    />
                                    <TextInput
                                        ref='2'
                                        style={styles.textInput}
                                        onChangeText={(text) => this.setState({email:text})}
                                        value={this.state.text}
                                        placeholder="Email"
                                        placeholderTextColor="#8BC34A"
                                        onSubmitEditing={() => this._focusNextField('3')}
                                    />
                                    <TextInput
                                        ref='3'
                                        style={styles.textInput}
                                        onChangeText={(text) => this.setState({diachi:text})}
                                        value={this.state.text}
                                        placeholder="Địa chỉ"
                                        placeholderTextColor="#8BC34A"
                                        onSubmitEditing={() => this._focusNextField('4')}
                                    />
                                    <TextInput
                                        ref='4'
                                        keyboardType='numeric'
                                        style={styles.textInput}
                                        onChangeText={(text) => this.setState({phone: text})}
                                        value={this.state.text}
                                        placeholder="Số điện thoại"
                                        placeholderTextColor="#8BC34A"
                                    />
                                </View>
                                     <View style={{flex:5}}>   
                                        <View style={styles.detailView}>
                                            <Text style={styles.text}>Sản Phẩm: </Text>
                                            <Text style={styles.name}>-Tên: {this.props.passProps.name}</Text>
                                            <Text style={styles.price}>-Giá Tốt: {this.props.passProps.price} </Text>
                                            <Image style={styles.image} source={{uri:this.props.passProps.image}} />
                                        </View>
                                        <View style={styles.confirmView}>
                                            <TouchableOpacity style={styles.confirmButton}
                                                onPress={()=>this.confirm()}>
                                                <Text style={styles.confirmText}>Đặt hàng</Text>
                                            </TouchableOpacity>
                                            <Spinner visible={this.state.visible} />
                                        </View>
                                    </View>
                            </View>
                        </View>
                   
        )
    }       
      confirm(){
        if(this.state.fullname == ''|| this.state.email==''|| this.state.phone==''){
            Alert.alert('Lỗi','Vui lòng nhập hết các thông tin')
        } else {
            this.itemsRef.push({
                Fullname: this.state.fullname,
                Email: this.state.email,
                Phone: this.state.phone,
                Product: this.props.passProps.name
            }),
              this.setState({
                visible: true,
                fullname:'',
                email:'',   
                phone:'',
                product:''})    
              setTimeout(function(){
                 Alert.alert('Chúc mừng bạn ','điện thoại đã được đặt thành công!') 
                },3000)
              this.props.navigator.pop()      
        }
      }
}
var styles = StyleSheet.create({
    container: {flex: 1,backgroundColor:'#FFFF00'},
       bar: {
        flex: 1, backgroundColor:'#8BC34A', flexDirection: 'row'
    },
    backButton: {
        flex: 1, justifyContent: 'center',alignItems:'center'
    },
    title: {
        flex: 6,justifyContent:'center',alignItems:'center'
    },
    none: {
        flex: 1
    },
    backImage: {
        width: 30, height: 30,
    },
    titleText: {
        color:'white', fontSize: 20
    },
    contain: {flex : 10},
    textInput:{height: 40, borderColor: '#8BC34A', borderWidth: 1,borderRadius:5,margin: 3, padding:5,borderBottomWidth:0},
    infoView: {flex: 4},
    detailView: {flex: 5, borderColor: '#8BC34A', borderRadius: 10, borderWidth: 1, margin: 8, justifyContent:'center',alignItems: 'center'},
    text: {fontSize: 16, fontWeight: '400', marginTop: 6,marginLeft: 10  },
    name: {fontSize: 16, fontWeight: '600', marginTop: 2, marginLeft: 10},
    price: {fontSize: 18,color: 'red', fontWeight: '600', marginTop: 5, margin: 10},
    image: {height: deviceScreen.height/9*2-20, width: deviceScreen.height/9*2-20,
        resizeMode: 'stretch',marginLeft: 20},
    confirmView: {flex: 1, justifyContent:'center',alignItems: 'center'},
    confirmButton: {height: deviceScreen.height/9 -20, width: deviceScreen.width/4+30,
        borderRadius:10,backgroundColor:'#8BC43A',justifyContent:'center',alignItems:'center'},
    confirmText:{color:'white',fontSize:20}
})
module.exports=Order;