import { StyleSheet, Text, View,Pressable,Button, TextInput } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import DataField from '../../components/DataField'
import {firebase} from '../../auth/Firebase-config'
import { authContext } from '../../authContext/AuthContextProvider';
import { useContext } from 'react'
import ProfilePicture from '../../components/ProfilePicture'
import COLORS from '../../constants/colors'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'; 
import RBSheet from "react-native-raw-bottom-sheet";
import { Drawer, Surface } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Skeleton } from '@rneui/themed'
import { responsiveHeight } from 'react-native-responsive-dimensions'

function LoadingSkeleton(){
  return(
    <View>
      <Skeleton height={responsiveHeight(5)} style={{width:'100%',marginVertical:22}} />
      <Skeleton height={responsiveHeight(5)} style={{width:'100%',marginBottom:22}} />
      <Skeleton height={responsiveHeight(5)} style={{width:'100%',marginBottom:22}} />
      <Skeleton height={responsiveHeight(5)} style={{width:'100%',marginBottom:22}} />
      <Skeleton height={responsiveHeight(5)} style={{width:'100%',marginBottom:22}} />
      <Skeleton height={responsiveHeight(5)} style={{width:'100%',marginBottom:22}} />
    </View>
  )
}
const UserProfile = () => {
  const navigation=useNavigation();
  const[fields,setFields]=useState({});
  const {user}=useContext(authContext)
  const[fetching,setFetching]=useState(false);
  const firestore=firebase.firestore().collection('UserCred')
  async function getFields(){
    try{
        setFetching(true)
      await firestore.where('UserID','==',user.uid).get().then((query)=>{
        query.forEach((doc)=>{
          setFields(doc.data());
        })
      })
      setFetching(false);
    }catch(e){
      console.log(e);
    }
  }
  // useLayoutEffect(()=>{
  //   getFields();
  // },[])
  useFocusEffect(useCallback(()=>{
    getFields();
  },[navigation]))
  return (
    <LinearGradient style={{height:'100%',width:'100%'}} colors={['#D0D0E8','#030F18']}>
      <ProfilePicture uri={fields.ProfilePic}/>
      <Surface style={Platform.OS==='ios'?styles.IosSurface:styles.AndroidSurface}>
        <View style={{width:'90%',alignSelf:'center'}}>
          {fetching&&Object.keys(fields).length==0?<LoadingSkeleton/>:
          <>
          <DataField icon="person" label="Username" text={fields.Username} />
          <DataField icon="person-outline" label="Name" text={fields.Name}/>
          <DataField icon="call-outline" label="Phone" text={fields.Phone} />
          <DataField icon="male-female" label="Gender" text={fields.Gender} />
          <View style={{marginBottom:12}}>
            <DataField icon="calendar-outline" label="DOB" text={fields.Dob} />
          </View>
          </>
          }
        </View>
      </Surface>
    </LinearGradient>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  AndroidSurface:{width:'95%',alignSelf:'center',marginTop:'10%',padding:10,borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4},
  
  IosSurface:{padding:10,paddingBottom:25,borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4,width:'95%',marginTop:'10%',marginLeft:'2.5%'}
})