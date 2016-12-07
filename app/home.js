/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Navigator,Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Brand = require('./components/Brand')
var allproduct = require('./components/allproduct');
var Taikhoan= require('./ManagerUser/TaiKhoan');
class home extends Component {
constructor(props) {
  super(props);
  this.state={selectedTab: 'sanpham'};
}
  render() {
      var home = (
         <Navigator
            initialRoute= {{name: 'allproduct',component: allproduct}}
            renderScene = {(route,navigator)=>{
            if (route.component) {
                return React.createElement(route.component,{navigator, passProps: route.props})  } }} />   
     );
     var taikhoan=(       
         <Navigator 
             initialRoute={{name:'taikhoan',component: Taikhoan}}
             renderScene={(route,navigator)=>{
                 if(route.component)
                    return <Taikhoan navigator={navigator}/>
             }}
         />
     );
     var lienhe=(
         <View style={{flex:1,}}>
            <View style={{flex:.3, justifyContent: 'center',alignItems: 'center',}}>
                <Image source={require('./images/hutech.png')} style={{width: 200,height:200}}/>
            </View>
            <View style={{flex:.3,marginTop:10}}>
                <Text style={{color:'red',fontSize:18}}> Địa Chỉ:</Text>
                <Text style={{padding:5}}>Trụ sở : 475A Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM</Text>
                <Text style={{padding:5}}>Cơ sở 475B : 475B Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM </Text>
                <Text style={{padding:5}}>Cơ sở Ung Văn Khiêm : 31/36 Ung Văn Khiêm, P.25, Q.Bình Thạnh, TP.HCM</Text>
                <Text style={{padding:5}}>ĐT: (08) 5445 7777  Fax: (08) 5445 4444    Email: hutech@hutech.edu.vn</Text>
            </View>
            <View style={{flex:.3,marginTop:10, flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
                <View style={{padding:10}}>
                    <Text style={{color:'red',fontSize:18}}>Nhân Viên Tư vấn:</Text>
                    <Text>Nguyễn Nhựt Trường</Text>
                    <Text>01648935841</Text>
                </View>
                <View style={{padding:10}}>
                    <Text style={{color:'red',fontSize:18}}>Nhân Viên Tư vấn:</Text>
                    <Text>Nguyễn Lâm Anh Huy</Text>
                    <Text>01648935841</Text>
                </View>
            </View>
         </View>
     );
    return (
       <TabNavigator style={{flex:1,}} >
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'sanpham'}
                        title="Sản phẩm"          
                        renderIcon={() => <Image source={require('./images/product_no.png')} style={styles.img}/>}
                        renderSelectedIcon={() => <Image source={require('./images/product_click.png')} style={styles.img} />}
                        onPress={() => this.setState({ selectedTab: 'sanpham' })} >
                         {home}
                    </TabNavigator.Item>
                     <TabNavigator.Item
                        selected={this.state.selectedTab === 'brand'}
                        title="Nhà sản xuất"                    
                        renderIcon={() => <Image source={require('./images/nsx_no.png')}style={styles.img} />}
                        renderSelectedIcon={() => <Image source={require('./images/nsx_click.png')}style={styles.img} />}
                        onPress={() => this.setState({ selectedTab: 'brand' })} >
                        <Navigator
                              initialRoute= {{name: 'Brand',component: Brand}}
                              renderScene = {(route,navigator)=>{
                               if (route.component) {
                              return React.createElement(route.component,{navigator, passProps: route.props}) } }} />
                    </TabNavigator.Item>
                     <TabNavigator.Item
                        selected={this.state.selectedTab === 'taikhoan'}
                        title="Tài Khoản"          
                        renderIcon={() => <Image source={require('./images/user_no.png')} style={styles.img}/>}
                        renderSelectedIcon={() => <Image source={require('./images/user_click.png')} style={styles.img} />}
                        onPress={() => this.setState({ selectedTab: 'taikhoan' })} >
                         {taikhoan}
                    </TabNavigator.Item>
                      <TabNavigator.Item
                        selected={this.state.selectedTab === 'lienhe'}
                        title="Liên Hệ"          
                        renderIcon={() => <Image source={require('./images/lienhe_no.png')} style={styles.img}/>}
                        renderSelectedIcon={() => <Image source={require('./images/lienhe_click.png')} style={styles.img} />}
                        onPress={() => this.setState({ selectedTab: 'lienhe' })} >
                         {lienhe}
                    </TabNavigator.Item>
        </TabNavigator>
    );
  }
}
var styles=StyleSheet.create({
    container:{
        flex:1,
    },
    img:{
        width:25,
        height:25,
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
         backgroundColor:'white',
    },
        tale:{
        justifyContent: 'center',
        alignItems: 'center',
    }
})
module.exports=home;
