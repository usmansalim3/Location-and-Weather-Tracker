import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as locate from "expo-location";

export const initialState={
    weatherData:null,
    success:false,
    loading:true,
    error:''
}

export const getWeatherData=createAsyncThunk('weather/getWeatherData',async(args,{rejectWithValue})=>{
    try{
        const{coords}=await locate.getCurrentPositionAsync({accuracy:locate.Accuracy.High});
        const { latitude, longitude } = coords;
        const weatherResponse=await axios.get('https://api.openweathermap.org/data/2.5/weather?&appid=9e39fbad0aea4df20581d1ee3b6b7a07',{
            params:{
                lat:latitude,
                lon:longitude,
                units:'metric'
            }
        });
        const pollutionResponse=await axios.get('http://api.openweathermap.org/data/2.5/air_pollution?&appid=9e39fbad0aea4df20581d1ee3b6b7a07',{
            params:{
                lat:latitude,
                lon:longitude
            }
        })
        const pollutionData=pollutionResponse.data.list[0].components;
        const aqi=pollutionResponse.data.list[0].main.aqi;
        return {...weatherResponse.data,pollutionData,aqi};
        //return response.data;
    }catch(e){
        rejectWithValue(e.response.data);
    }
});

const weatherSlice=createSlice({
    name:'weather',
    initialState,
    extraReducers:{
        [getWeatherData.pending]:(state,{payload})=>{
            if(!state.success){
                state.loading=true;
            }
        },
        [getWeatherData.fulfilled]:(state,{payload})=>{
            state.weatherData=payload;
            state.loading=false;
            state.success=true;
        },
        [getWeatherData.rejected]:(state,{payload})=>{
            state.success=false;
            state.loading=false;
            state.error=payload
        }
    }
})
export default weatherSlice.reducer;