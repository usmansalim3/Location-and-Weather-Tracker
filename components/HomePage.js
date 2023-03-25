import { Animated, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Location from '../screens/LocationScreens/Location'
import News from '../screens/NewsScreens/News'
import UserProfile from "../screens/AuthScreens/UserProfile"
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import COLORS from "../constants/colors"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { authContext } from '../authContext/AuthContextProvider'
import { Feather } from '@expo/vector-icons'; 
import { yupToFormErrors } from 'formik'
import { Divider, IconButton, TouchableRipple} from 'react-native-paper'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Icon } from '@rneui/base'
import { LinearGradient } from 'expo-linear-gradient'
import Forecast from '../screens/ForecastScreens/Forecast'



function SearchIcon({onPress,tintColor}){
  const navigation=useNavigation();
  const context=useContext(authContext);
  return(
    <View style={{flexDirection:'row'}}>
      <View style={{marginRight:5}}>
        <IconButton icon='newspaper' size={24} iconColor={tintColor} onPress={()=>navigation.navigate('Saved Posts')}/>
      </View>
      <View>
        <IconButton icon='magnify' size={24} iconColor={tintColor} onPress={()=>navigation.navigate('Search')}/>
      </View>
    </View>
  )
}
export default function HomePage(){

  const[menu,setMenu]=useState(false);
  const context=useContext(authContext)
  const navigation=useNavigation();
  const bottomTabs=createBottomTabNavigator();
  const stack=createNativeStackNavigator();
  function RightMenu(){
    return(
        <Menu visible={menu}
        style={Platform.OS==='ios'?styles.IosMenu:styles.AndroidMenu}
        onRequestClose={()=>setMenu(false)}  
        anchor={<IconButton icon="dots-horizontal" size={26} iconColor={COLORS.blue} onPress={()=>setMenu(true)}/>}>
        <MenuItem onPress={()=>{navigation.navigate('Update Information') 
        setMenu(false) }}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Text allowFontScaling={false} style={Platform.OS==='ios'?{fontSize:12,marginLeft:'30%'}:{fontSize:12}}>Update bio</Text>
          <Entypo name="add-to-list" size={15} color={COLORS.blue} style={Platform.OS==='ios'?{marginLeft:'50%'}:{marginLeft:35}}/>
        </View>
        </MenuItem>
        <Divider/>
        <MenuItem onPress={()=>{
          context.signOut();
          navigation.navigate('Login');
          setMenu(false)
        }}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text allowFontScaling={false} style={Platform.OS==='ios'?{fontSize:12,marginLeft:'25%'}:{fontSize:12}}>Sign out</Text>
            <SimpleLineIcons name="logout" size={15} color={COLORS.blue} style={Platform.OS==='ios'?{marginLeft:'60%'}:{marginLeft:45}} />
          </View>
        </MenuItem> 
        </Menu>
    )
  }
  return (
          <bottomTabs.Navigator  screenOptions={{
            tabBarActiveTintColor:COLORS.blue,
            tabBarLabelStyle:{
              fontWeight:'bold',
              marginBottom:Platform.OS==='ios'?-15:15,
              fontSize:12,
            },
            headerTintColor:COLORS.blue,
            tabBarStyle:{
              backgroundColor:COLORS.light,
              position:'absolute',
              bottom:Platform.OS==='ios'?20:15,
              borderRadius:Platform.OS==='ios'?15:5,
              marginHorizontal:18,
              height:'9%',
              justifyContent:'center',
              alignItems:'center'
            },
            tabBarItemStyle:{justifyContent:'center',alignItems:'center',top:3},
            tabBarIconStyle:{justifyContent:'center',alignItems:'center'},
            headerBackground:()=><LinearGradient colors={['#FFFFFF','#D0D0E8']} style={StyleSheet.absoluteFill}/>
          }}>
              <bottomTabs.Screen component={Location} name="Location" options={{
                tabBarIcon:({size,color,focused})=>{
                return(
                  <View style={[focused?{backgroundColor:COLORS.grey,width:50,padding:5,alignItems:'center',justifyContent:'center',borderRadius:10}:{padding:5}]}>
                    <Entypo name="map" size={size} color={color} />
                  </View>
                )},
                tabBarIconStyle:{
                  alignSelf:'center',
                  justifyContent:'center',
                  alignItems:'center'
                },
                headerRight:()=><IconButton icon='map-marker-radius' iconColor={COLORS.blue} size={26} onPress={()=>navigation.navigate('Saved Locations')} />,
                headerBackground:()=><LinearGradient colors={['#FFFFFF','#FDFDFD']} style={StyleSheet.absoluteFill}/>
              }}/>
              <bottomTabs.Screen component={News} name="News" options={{
                tabBarActiveTintColor:COLORS.blue,
                tabBarIcon:({size,color,focused})=>{
                  return(
                    <View style={[focused?{backgroundColor:COLORS.grey,width:50,padding:5,alignItems:'center',justifyContent:'center',borderRadius:10}:{padding:5}]}>
                      <Entypo name="news" size={size} color={color} />
                    </View>
                  )},
                headerRight:({tintColor})=><SearchIcon tintColor={tintColor}/>,
                headerRightContainerStyle:{
                  marginRight:10
                },
              }}/>
              <bottomTabs.Screen component={UserProfile} name="Profile" options={{
                tabBarActiveTintColor:COLORS.blue,
                tabBarIcon:({size,color,focused})=>{
                  return(
                    <View style={[focused?{backgroundColor:COLORS.grey,width:50,padding:5,alignItems:'center',justifyContent:'center',borderRadius:10}:{padding:5}]}>
                      <Entypo name="user" size={size} color={color} />
                    </View>
                  )},
                headerRight:()=><RightMenu/>
              }}/>
              <bottomTabs.Screen component={Forecast} name="Weather" options={{
                tabBarActiveTintColor:COLORS.blue,
                tabBarIcon:({size,color,focused})=>{
                  return(
                    <View style={[focused?{backgroundColor:COLORS.grey,width:50,padding:5,alignItems:'center',justifyContent:'center',borderRadius:10}:{padding:5}]}>
                      <Entypo name="cloud" size={size} color={color} />
                    </View>
                  )},
              }}/>
          </bottomTabs.Navigator>
  )
}
const styles=StyleSheet.create({
  AndroidMenu:{position:'absolute',margin:5,left:'57%',top:10,width:"40%",backgroundColor:COLORS.light},
  IosMenu:{position:'absolute',margin:5,left:'60%',top:'7%',width:"35%",backgroundColor:COLORS.light}
})
