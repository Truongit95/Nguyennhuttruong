import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,Navigator,Dimensions,ListView,StatusBar,Image, TouchableOpacity
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
var Firebase = require('firebase');
var deviceScreen = Dimensions.get('window')
var arrBrand = []
class Brand extends Component{

constructor(props){
    super(props)
    this.state = {
        dataSource: new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2}),visible: true
      
    }
    var root = new Firebase('https://scorching-inferno-4078.firebaseio.com/')
    this.itemsRef = root.child('Brand')
    this.chooseBrand = this.chooseBrand.bind(this)
}

componentWillMount(){
    this.itemsRef.on('value',(dataSnapShot)=>{
        dataSnapShot.forEach((child)=>{
            arrBrand.push({name: child.key(), image: child.val().Image })
        })  
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(arrBrand),visible: false
        })
        arrBrand = []
    })
}
    renderRow(property){
    
        return(
            <View style = {styles.row}>
                <TouchableOpacity style = {styles.customRow}
                onPress={()=>this.chooseBrand(property.name)}>
                    <Image style = {styles.brandImage} source = {{uri: property.image}}/>
                </TouchableOpacity>
            </View>
        )
    }
    chooseBrand(name) {
        this.props.navigator.push({
            component: require('./Products'),
            props:{brandname: name}
        })
    }
    render(){
            
                return(
                        <View style={styles.container}>
                            <StatusBar hidden={true} />
                            <Spinner visible={this.state.visible} />
                            <ListView dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)} />
                        </View>
                     )
                    
             
    
    }
}
var styles = StyleSheet.create({
    container: {flex: 1,backgroundColor:'#FFFF00'},
    row: {
        height: deviceScreen.height / 3, borderWidth: 2, borderColor:'#8BC34A',
        borderRadius: 10, margin: 10
    },
    customRow: {
        flex: 1, justifyContent:'center', alignItems:'center'
    },
    brandImage: {
        width: deviceScreen.width / 1.5, height:deviceScreen.height / 3 - 30, resizeMode:'contain',margin: 10
    }
})
module.exports = Brand;