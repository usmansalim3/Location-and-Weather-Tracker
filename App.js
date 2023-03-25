import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import COLORS from './constants/colors';
import AuthContextProvider from '././authContext/AuthContextProvider';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import WeatherData, { getWeatherData } from './redux/WeatherData';
import UserCred from './screens/AuthScreens/UserCred';
import { ThemeProvider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabBar from './components/TabBar';



export default function App() {
  const storee=configureStore({
    reducer:WeatherData
  });
  const stack=createNativeStackNavigator();
  return (
      <Provider store={storee}>
      <AuthContextProvider>
        <NavigationContainer>
          <StatusBar style="dark"  />
          <stack.Navigator screenOptions={{headerShown:false,gestureEnabled:false}}>
            <stack.Screen component={TabBar} name="start"/>
            <stack.Screen component={UserCred} name="Add Details" options={{
              headerTintColor:COLORS.blue ,
              headerShown:true,
              headerShadowVisible:false,
              headerStyle:{backgroundColor:'#B9B9DC'},
              headerBackVisible:false
            }}/>
            <stack.Screen component={HomeScreen} name="Home" />
          </stack.Navigator>
        </NavigationContainer>
      </AuthContextProvider>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:50,
    paddingHorizontal:20
  },
  registerHeader:{
    fontSize:40,
    fontWeight:'bold'
  },
  registerSubHeading:{
    fontSize:16,
    color:COLORS.grey,
    marginLeft:1
  }
});
