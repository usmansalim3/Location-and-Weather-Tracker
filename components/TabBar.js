import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Register from '../screens/AuthScreens/Register';
import Login from '../screens/AuthScreens/Login';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import COLORS from '../constants/colors';
import { AntDesign , FontAwesome5} from '@expo/vector-icons';


const TabBar = () => {
    const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator  screenOptions={{
        tabBarStyle: {backgroundColor:COLORS.light,width:'100%',alignSelf:'center',justifyContent:'center',elevation:10,paddingTop:'8%'},
        tabBarIndicatorStyle:{
            backgroundColor:COLORS.blue,
            width:'1%',
            margin:10,
            marginLeft:'17.59%'
        },
        tabBarInactiveTintColor:COLORS.grey,
        tabBarPressColor:'transparent'
    }}>
          <Tab.Screen name="Login" component={Login}  options={{
            tabBarActiveTintColor:COLORS.blue,
            tabBarLabelStyle:{
                fontSize:14,
                fontWeight:'bold'
            },
            tabBarIcon:({color})=><AntDesign name="login" size={20} color={color} />
          }} />
          <Tab.Screen name="Register" component={Register} options={{
            tabBarActiveTintColor:COLORS.blue,
            tabBarLabelStyle:{
                fontSize:14,
                fontWeight:'bold'
            },
            tabBarIcon:({color})=><FontAwesome5 name="tasks" size={20} color={color} />
          }} />
    </Tab.Navigator>
  )
}

export default TabBar

const styles = StyleSheet.create({})