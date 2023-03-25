import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react'
import * as locate from "expo-location";
import axios from 'axios';
import moment from 'moment';
import { ActivityIndicator, IconButton, Surface } from 'react-native-paper';
import COLORS from '../../constants/colors';
import { Entypo, Fontisto, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherData } from '../../redux/WeatherData';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
const Forecast = () => {
    const dispatch=useDispatch();
    const dataFetched=useSelector((state)=>state);
    const[coordinates,setCoordinates]=useState({});
    const[date,setDate]=useState(moment().format('hh:mm a'));
    const[day,setDay]=useState(moment().format('dddd'));
    //const[weatherData,setWeatherData]=useState(null);
    useEffect(()=>{
        /*async function GetCurrentLocation(){
            const{coords}=await locate.getCurrentPositionAsync({accuracy:locate.Accuracy.High});
            if(coords){
                const { latitude, longitude } = coords;
                setCoordinates({latitude,longitude})
                const weatherResponse=await axios.get('https://api.openweathermap.org/data/2.5/weather?&appid=9e39fbad0aea4df20581d1ee3b6b7a07',{
                params:{
                    lat:latitude,
                    lon:longitude,
                    units:'metric'
                }
            });
            setWeatherData(weatherResponse.data);
            }

        }
        GetCurrentLocation();*/
    },[])
    useEffect(()=>{
        //dispatch(getWeatherData());
        const timer= setInterval(()=>{
          dispatch(getWeatherData());
        },180000)
        return ()=>clearInterval(timer)
    },[])
    useEffect(()=>{
        let timer=setInterval(() => {
            var date = moment().format(" hh:mm a");
            var day=moment().format('dddd'); 
            setDate(date);
            setDay(day)
          },10000);
        return ()=>clearInterval(timer);
    },[])
    const weatherData=dataFetched.weatherData
    //console.log(dataFetched.weatherData);
    if(dataFetched.loading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator animating={true} size='large' style={{justifyContent:'center',alignItems:"center"}}/>
            </View>
        )
    }
    if(!dataFetched.loading&&dataFetched.error){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Make sure you're connected to the internet</Text>
                <IconButton onPress={()=>dispatch(getWeatherData())} icon={"refresh"} />
            </View>
        )
    }
    return (
        <ImageBackground source={require('../../assets/landscape-minimalist.png')} style={{flex:1}}>
            <View style={{backgroundColor:'rgba(0,0,0,0.1)',flex:1}}>
                <View style={{marginTop:'10%',marginLeft:'5%',flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                        <Text style={{fontSize:responsiveFontSize(3),color:COLORS.black}}>{weatherData.name}</Text>
                        <Text style={{fontSize:responsiveFontSize(2.5),color:COLORS.light}}>{day}</Text>
                        <Text style={{color:COLORS.grey}}>{date}</Text>
                    </View>
                    <View style={{marginRight:'5%'}}>
                        
                        <Text  style={{fontSize:responsiveFontSize(2.6)}}>{weatherData.weather[0].main}</Text>
                        <Text >{weatherData.weather[0].description}</Text>
                    </View>
                </View>
                <View style={{marginHorizontal:'3%',marginVertical:'5%'}}>
                    <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                        <Text style={{fontSize:responsiveFontSize(8)}}>{weatherData.main.temp+"°C"}</Text>
                        <Image source={{uri:`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}} style={{width:100,height:100}} />
                    </View>
                    <View style={{marginHorizontal:'2%'}}>
                        <View style={{flexDirection:'row',marginTop:3}}>
                            <Text >{weatherData.main.temp_min+'°C'+'/'}</Text>
                            <Text >{weatherData.main.temp_max+'°C'}</Text>
                        </View>
                    </View>
                </View>
                <Surface elevation={0} style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:'5%',padding:5,borderRadius:5,backgroundColor: 'rgba(52, 52, 52, 0.1)'}}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <View style={{marginRight:3}}>
                            <MaterialCommunityIcons name="temperature-celsius" size={24} color="black" style={{marginHorizontal:5}}/>
                        </View>
                        <Text allowFontScaling={false} style={{fontSize:12}}>
                            {weatherData.main.feels_like}
                        </Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <View style={{marginRight:2}}>
                            <Entypo name="air" size={24} color="black" style={{marginHorizontal:5}}/>
                        </View>
                        <Text allowFontScaling={false} style={{fontSize:12,marginLeft:2}}>
                        {weatherData.main.humidity+'%'}
                        </Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <View>
                            <Foundation name="mountains" size={24} color="black" style={{marginHorizontal:5}}/>
                        </View>
                        <Text allowFontScaling={false} style={{fontSize:12}}>
                        {weatherData.main.pressure+' atm'}
                        </Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Fontisto name="wind" size={24} color="black" style={{marginHorizontal:5}} />
                        <Text allowFontScaling={false} style={{fontSize:12}}>
                            {weatherData.wind.deg+'°'}
                        </Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <MaterialCommunityIcons name="windsock" size={24} color="black" />
                        <Text allowFontScaling={false} style={{fontSize:12}}>
                            {weatherData.wind.speed+' m/s'}
                        </Text>
                    </View>
                    
                </Surface>
            </View>
        </ImageBackground>
    )
}

export default Forecast

const styles = StyleSheet.create({})