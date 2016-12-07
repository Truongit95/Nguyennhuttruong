import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,Navigator,Dimensions,ListView,StatusBar,Image, TouchableOpacity,ScrollView 
} from 'react-native';
var Firebase = require('firebase');
var deviceScreen = Dimensions.get('window');
var arrImages = [];
import Spinner from 'react-native-loading-spinner-overlay';
class Details extends Component{

    constructor(props){
    super(props)
    this.state = {
       uriImage:this.props.passProps.image,
       array:[],
       visible: true
     }
     var root = new Firebase('https://scorching-inferno-4078.firebaseio.com/')
    this.itemsRef = root.child(this.props.passProps.productName)
    this.itemsDetail = root.child('Brand/' + this.props.passProps.brandname + '/Products' +
    this.props.passProps.productName)
    this.chooseImage = this.chooseImage.bind(this)
    this.orderProduct = this.orderProduct.bind(this)
    }

    componentWillMount(){
        this.itemsRef.on('value',(dataSnapShot)=>{
        var count  = dataSnapShot.numChildren()
        for(i=1;i<count;i++){   
            rootImage = this.itemsRef.child('image'+i)
            rootImage.on('value',(snapShot)=>   {
                arrImages.push({image: snapShot.val()})
            })
        }
        this.setState({
            array: arrImages,visible: false
        })
        arrImages = []
    })
}
    createRow(uri){
        return(
            <TouchableOpacity style={styles.card}
                onPress={()=>this.chooseImage(uri.image)}>
                <Image source={{uri: uri.image}} style={styles.img}/>
            </TouchableOpacity>
        )
    }

    chooseImage(image){
        this.setState({
            uriImage: image
        })
    }

    render() {
        return(
            <View style={styles.container}>
            <Spinner visible={this.state.visible} />
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.backButton} onPress={()=>this.props.navigator.pop()}>
                        <Image source={require('../images/back.png')} style={styles.backImage} />
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>{this.props.passProps.productName}</Text>
                    </View>
                    <View style={styles.none}></View>
                </View>
                <View style={styles.imageView}>
                    <Image source={{uri: this.state.uriImage}} style={styles.imageBorder} />
                </View>
                <View style={styles.imageList}>
                    <ScrollView 
                        horizontal={true}
                        automaticallAdjustContentInsets={false}
                        style={[styles.ScrollView, styles.horizontalScrollView]}>
                        {this.state.array.map(this.createRow.bind(this))}
                    </ScrollView>
                </View>
                <View style={styles.detailView}>
                    <View style={styles.corlorView}>
                        <Text style={styles.corlorText}>Màu: {this.props.passProps.color}</Text>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.priceText}>Giá Tốt: {this.props.passProps.price}VNĐ</Text>
                    </View>
                    <View style={styles.desView}>
                         <Text style={styles.desText}>Thông tin chi tiết: {this.props.passProps.des}</Text>
                    </View>
                </View>
                <View style={styles.orderView}>
                    <TouchableOpacity style={styles.orderButtion}
                    onPress={()=>this.orderProduct(this.props.passProps.productName, this.props.passProps.price, this.props.passProps.image)}>
                        <Text style={styles.orderText}>Mua Ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    orderProduct(name,price,image){
        this.props.navigator.push({
            component: require('./Order'),
            props: {name:name,price:price,image:image}
        })
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
        width: 30, height: 30
    },
    titleText: {
        color:'white', fontSize: 20
    },
    imageView: {flex: 4,justifyContent:'center',alignItems:'center'},
    imageBorder: {height: deviceScreen.width / 2,width: deviceScreen.width / 2,resizeMode: 'stretch'},
    imageList: {flex: 2},
    detailView:{flex: 4, marginTop:10},
    orderView: {flex: 1,justifyContent:'center',alignItems:'center'},
    ScrollView: {height: deviceScreen/6},
    horizontalScrollView: {height: 120},
    corlorView: {flex: 1,justifyContent:'center'},
    corlorText: {color: '#8BC', marginLeft: 10, fontSize: 15, fontWeight: '600',marginTop:10},
    priceView:  {flex: 1,justifyContent:'center'},
    priceText: {color: 'red', marginLeft: 10, fontSize: 15, fontWeight: '600'},
    desView:  {flex: 4, justifyContent: 'center'},
    desText: {marginLeft: 10, fontSize: 14, fontWeight: '400'},
    orderButtion: {height: deviceScreen.height/12 -10, width: deviceScreen.width/5+50,
        borderRadius: 10,backgroundColor: '#8BC43A',justifyContent: 'center', alignItems: 'center'},
    orderText: {color: 'white',fontSize:20},
    card: {padding: 10, alignItems: 'center', borderRadius: 3},
    img: {width: deviceScreen.height/6 - 20, height: deviceScreen.height/6 - 20}
})

module.exports = Details;