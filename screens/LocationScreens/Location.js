import { BackHandler, FlatList, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'
import * as locate from "expo-location";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import COLORS from '../../constants/colors';
import {Button, Divider, FAB, IconButton, List, SegmentedButtons, Snackbar, Switch, TouchableRipple} from 'react-native-paper'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import { Entypo, Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import {firebase} from '../../auth/Firebase-config'
import { authContext } from '../../authContext/AuthContextProvider';
import Dialog from "react-native-dialog";
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherData, initialState } from '../../redux/WeatherData';


function RejectionCard(){
  return(
    <View style={{alignSelf:'center'}}>
      <Text>Permission rejected.</Text>
    </View>
  );
}
const Location = () => {
  const dispatch=useDispatch();
  const dataFetched=useSelector((state)=>state.weatherData);
  const {user,limit,setLimit,coord}=useContext(authContext)
  const firestore=firebase.firestore().collection('UserLocation');
  const navigation=useNavigation();
  const [reject,setReject]=useState(false);
  const[showTraffic,setShowTraffic]=useState(false)
  const[poi,setPoi]=useState(false);
  const[inDoor,setInDoor]=useState(false)
  const[visible,setVisible]=useState(false);
  const [coordinates,setCoordinates]=useState(coord);
  const[value,setValue]=useState('standard');
  const rbRef=useRef();
    
    useFocusEffect(
      useCallback(()=>{
        const sub=BackHandler.addEventListener('hardwareBackPress',()=>{
          return true
        })
        return ()=>sub.remove()
      },[navigation])
    )

//  useEffect(()=>{
//     const sub=BackHandler.addEventListener('hardwareBackPress',()=>{
//       return true;
//     })
//     return ()=>{
//       console.log('removed');
//       return sub.remove();
//     }
//   },[]);
  useEffect(()=>{
    async  function  GetCurrentLocation () {
    let { status } = await locate.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setReject(true);
      /*Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );*/
    }
    if(status==="granted"){
      let { coords } = await locate.getCurrentPositionAsync();
      if (coords) {
        const { latitude, longitude } = coords;
        setCoordinates({latitude:latitude,longitude:longitude});
        console.log('change')
      }
      /*await locate.watchPositionAsync({timeInterval:1000,accuracy:locate.Accuracy.High},(loc)=>{
        console.log(loc)
        setCoordinates({latitude:loc.coords.latitude,longitude:loc.coords.longitude})
      })*/
    }
  };
  GetCurrentLocation();
  },[dataFetched])
  useEffect(()=>{
    dispatch(getWeatherData())
  },[])
  async function uploadLocation(){
    try{
      const coordinate= await locate.getLastKnownPositionAsync();
      
      const location={ userID:user.uid, latitude:coordinate.coords.latitude, longitude:coordinate.coords.longitude,
        date : firebase.firestore.Timestamp.fromDate(new Date()),aqi:dataFetched.aqi,pm2_5:dataFetched.pollutionData.pm2_5,pm10:dataFetched.pollutionData.pm10
      }
      await firestore.add(location)
    }catch(error){
      console.log(error)
      setVisible(true);
    }
  }
  return(
    <>
      <View>
        <MapView
        provider='google'
        region={{latitude:coordinates.latitude,longitude:coordinates.longitude,latitudeDelta:0.002,longitudeDelta:0.002}}
        showsUserLocation={true}
        showsPointsOfInterest={poi}
        showsIndoors={inDoor}
        showsTraffic={showTraffic}
        style={styles.map}
        mapType={value}
        loadingEnabled={true}
        showsCompass={true}
        />
          {/*<Marker
         coordinate={{latitude:coordinates.latitude,longitude:coordinates.longitude,latitudeDelta:0.002,longitudeDelta:0.002}}
        />
  </MapView>*/}
      </View>
      <View style={Platform.OS==='ios'?{position:'absolute',right:25,bottom:120}:{position:'absolute',right:25,bottom:100}}>
        <IconButton icon='tune-variant' size={30} onPress={()=>rbRef.current.open()}/>
      </View>
          <RBSheet ref={rbRef} closeOnDragDown={true} customStyles={{
            container:{
              backgroundColor:COLORS.light,
              borderTopRightRadius:10,
              borderTopLeftRadius:10,
              height:'40%'
            }
          }}>
              <SegmentedButtons
              value={value}
              onValueChange={setValue}
              
              buttons={[
                {
                  value: 'hybrid',
                  label: 'Hybrid',
                },
                {
                  value: 'satellite',
                  label: 'Satellite',
                },
                {
                  value: 'standard',
                  label: 'Standard',
                },
              ]}
              style={{marginHorizontal:'5%',alignSelf:'center'}}
              
              />
            <View>
              <List.Item title="Traffic" description="Show traffic near your location " left={()=><Entypo name="traffic-cone"
              size={35} color={COLORS.blue}
                style={{margin:10}}
                /> }
              right={()=><Switch value={showTraffic} onValueChange={setShowTraffic}/>}
               />
               <Divider bold/>
               <List.Item title="Places near you" description="Points of interest near you" left={()=><Entypo name="map" size={35} color={COLORS.blue}
              style={{margin:10}}
               />}
               right={()=><Switch value={poi} onValueChange={setPoi}/>}
               />
               <Divider bold/>
               <List.Item title="Indoor maps" description="Show indoor maps" left={()=><MaterialIcons name="place" size={35} color={COLORS.blue}
              style={{margin:10}}
              />}
              right={()=><Switch value={inDoor} onValueChange={setInDoor}/>}
               />
            </View>
          </RBSheet>
          <FAB label='Upload' icon='cloud-upload'
          style={{position:'absolute',left:20,bottom:'15%'}}
          onPress={()=>uploadLocation()}
          />
          
          <Snackbar
            visible={visible}
            onDismiss={()=>setVisible(false)}
            style={{marginBottom:100}}
            action={{
              label: 'Okay',
              onPress: () => {
                // Do something
                setVisible(false)
              },
            }}>
            <Text>Try again later</Text>
        </Snackbar>
        </>

  )
}

export default Location

const styles = StyleSheet.create({
  map:{
    width:"100%",
    height:"100%"
  }
})