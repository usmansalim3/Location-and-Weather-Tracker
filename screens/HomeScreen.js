import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import COLORS from "../constants/colors"
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import NewsSearch from './NewsScreens/NewsSearch'
import HomePage from "../components/HomePage"
import SavedPosts from '../screens/NewsScreens/SavedPosts'

import { useSelector } from 'react-redux'

import SavedLocations from '../screens/LocationScreens/SavedLocations'
import UpdateInfo from './AuthScreens/UpdateInfo'

import { IconButton } from 'react-native-paper'



function BackButton(){
  const navigation=useNavigation();
  return(
    <IconButton icon='arrow-left' style={{marginLeft:0}} iconColor={COLORS.blue} size={24} onPress={()=>navigation.goBack()}/>
  );
}

function SearchIcon({onPress,tintColor}){
  const navigation=useNavigation();
  return(
    <IconButton icon='back' size={24} onPress={()=>navigation.goBack()}/>
  )
}

const HomeScreen = () => {
  const state=useSelector(state=>state)
  const bottomTabs=createBottomTabNavigator();
  const stack=createNativeStackNavigator();
  return (
    <stack.Navigator screenOptions={{
      headerShown:false,
      headerStyle:{backgroundColor:COLORS.light},
      headerTintColor:COLORS.blue,
      gestureEnabled:false
    }}>
      <stack.Screen component={HomePage} name="Home Page" options={{
        gestureEnabled:false,
      }}/>
      <stack.Screen component={NewsSearch} name="Search" options={
        {
          headerShown:true,
          headerLeft:()=><BackButton/>,
          headerStyle:{backgroundColor:'#212529'}
        }
      }/>
      <stack.Screen component={SavedPosts} name="Saved Posts" options={
        {
          headerLeft:()=><BackButton/>,
          headerShown:true,
          headerShadowVisible:false,
          headerStyle:{backgroundColor:'#c7a4ff'}
        }
      }/>
      <stack.Screen component={SavedLocations} name="Saved Locations" options={{
        headerShown:true,
        headerLeft:()=><BackButton/>,
        headerStyle:{backgroundColor:'#b0bec5'},
        headerShadowVisible:false
      }}
      />
      <stack.Screen component={UpdateInfo} name="Update Information" options={{
        headerShown:true,
        headerLeft:()=><BackButton/>,
        headerStyle:{backgroundColor:'#D0D0E8'},
        headerShadowVisible:false
      }}
      />
    </stack.Navigator>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})