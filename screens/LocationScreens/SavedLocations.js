import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {firebase} from '../../auth/Firebase-config'
import { authContext } from '../../authContext/AuthContextProvider';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Geocoder from 'react-native-geocoding';
import MapView from 'react-native-maps';
import axios from 'axios';
import MapCard from '../../components/MapCard';
import { Skeleton } from "@rneui/themed";
import {LinearGradient} from 'expo-linear-gradient'
import LocationCardSkeleton from '../../components/LocationCardSkeleton';
import { nanoid } from 'nanoid';


const SavedLocations = () => {
  const firestore=firebase.firestore().collection('UserLocation');
  const[posts,setPosts]=useState([]);
  const[del,setDel]=useState(false);
  const{user}=useContext(authContext);
  const[loading,setLoading]=useState(false);
  useEffect(()=>{
        async function getSavedLocations(){
        setLoading(true);
        const fetchedPosts=[];
        await firestore.where('userID','==',user.uid).get().then((query)=>{
            query.forEach((post)=>{
              const postWithID={...post.data(),docuID:post.id}
              console.log(postWithID);
              fetchedPosts.push(postWithID);
              })
            }
        )
        setPosts(fetchedPosts);
        setLoading(false)
        }
        getSavedLocations();
   }
  ,[del]);
  return (
    <LinearGradient style={{flex:1}} colors={['#b0bec5','#004c40']}>
      {loading&&posts.length==0?
      <View>
        <LocationCardSkeleton/>
        <LocationCardSkeleton/> 
      </View>:
      <FlatList
      data={posts}
      renderItem={(props)=><MapCard data={props.item} setDel={setDel}/>}
      />
      }
        {/*<FlatList
        data={posts}
        renderItem={(props)=><MapCard data={props.item}/>}
        />*/}
    </LinearGradient>
  )
}

export default SavedLocations

const styles = StyleSheet.create({})