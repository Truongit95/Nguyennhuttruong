    import React, { Component } from 'react';
    import {
    StyleSheet,
    Text,
    View,Navigator,Dimensions,ListView,StatusBar,Image, TouchableOpacity
    } from 'react-native';
    var Firebase = require('firebase');
    var deviceScreen = Dimensions.get('window');
    import Spinner from 'react-native-loading-spinner-overlay';
var arrProducts=[]
class allproduct extends Component{

constructor(props){
    super(props)
    this.state = {
        dataSource: new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2}) , visible: true
    }
    var root = new Firebase('https://scorching-inferno-4078.firebaseio.com/')
    this.itemsRef = root.child('Product')
    this.viewDetail=this.viewDetail.bind(this)
}
componentWillMount(){
    this.itemsRef.on('value',(dataSnapShot)=>{
        dataSnapShot.forEach((child)=>{
            arrProducts.push({name: child.key(), image: child.val().Image,
                 color: child.val().Color, price: child.val().Price,
                 des: child.val().Description
                })     
        })
         this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(arrProducts),visible: false
                })
                arrProducts = []
    })
}
    renderRow(property){
        return(
            <View style={styles.row}>
                <View style={styles.square}>
                    <TouchableOpacity style={styles.productsImage}
                        onPress={()=>this.viewDetail(property.name,property.image,
                        property.color,property.price, property.des)}>
                        <Image style={styles.image} source={{uri:property.image}}/>
                    </TouchableOpacity>
                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>{property.name}</Text>
                    </View>
                </View>
            </View>
        )
    }
    viewDetail(name, image, color, price, des){
        this.props.navigator.push({
            component: require('./Details'),
            props: {productName: name,image: image, color: color, price:price, des: des}
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.bar}>                  
                    <View style={styles.title}>
                        <Text style={styles.titleText}>DANH SÁCH SẢN PHẨM</Text>
                    </View>
                </View>
                <View style={styles.contain}>
                    <Spinner visible={this.state.visible} />
                    <ListView contentContainerStyle={styles.gridView}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}/>
                </View>
            </View>
        )
    }  
}
var styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
        width: 30, height: 30
    },
     titleText: {
        color:'white', fontSize: 20
    },
    contain: {
        flex: 10,backgroundColor:'#FFFF00'
    },
    gridView: {
        flexDirection:'row',flexWrap: 'wrap',marginLeft: 10, marginRight: 10
    },
    row: {
        height:deviceScreen.height/3
    },
    square: {
        width: (deviceScreen.width - 20)/2 - 20,
        height: deviceScreen.width/2 + 20, margin: 10, flexDirection:'column',borderRadius:5
    },
    productsImage: {
        flex: 8, margin: 10
    },
    image: {
        flex: 0.6,borderRadius: 5, resizeMode: 'stretch'
    },
    nameView: {
        flex:2.5, justifyContent:'center',alignItems:'center',backgroundColor:'#8BC34A', borderRadius: 5
    },
    nameText: {
        fontSize: 15, color: 'white',justifyContent:'center',alignItems:'center'
    }
})
module.exports = allproduct;