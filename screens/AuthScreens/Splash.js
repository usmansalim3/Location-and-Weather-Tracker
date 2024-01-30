import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { CommonActions, StackActions, useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authContext } from '../../authContext/AuthContextProvider';
import * as locate from "expo-location";

const Splash = () => {
  const navigation=useNavigation();
  const context=useContext(authContext);
  async function isLoggedIn(){
    let log=await AsyncStorage.getItem("loggedIn");
    console.log(log,"log")
    if(log){
      // console.log(JSON.parse(log))
    //   GetCurrentLocation();
    let { status } = await locate.requestForegroundPermissionsAsync();
    if(status==="granted"){
     let { coords } = await locate.getLastKnownPositionAsync();
        if (coords) {
        const { latitude, longitude } = coords;
        context.setCoord({latitude,longitude})
        }
     }
      context.setUser(JSON.parse(log))
      navigation.dispatch(StackActions.replace("Home"))
      //console.log(JSON.parse(log))
    }else{
        console.log("here")
        navigation.navigate("start")

    }
   }
  async  function  GetCurrentLocation () {
   let { status } = await locate.requestForegroundPermissionsAsync();
   if(status==="granted"){
     let { coords } = await locate.getCurrentPositionAsync();
     if (coords) {
       const { latitude, longitude } = coords;
       setCoord({latitude,longitude})
     }
   }
 };
 useFocusEffect(useCallback(()=>{
    console.log("checking")
     isLoggedIn()
 },[context]))
  return (
    <View style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
      <Image style={{height:350,width:350}} source={require("../../assets/splash.png")}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})