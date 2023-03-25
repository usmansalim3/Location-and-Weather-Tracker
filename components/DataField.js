import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import COLORS from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'; 
import {firebase} from '../auth/Firebase-config'
import { authContext } from '../authContext/AuthContextProvider';

const DataField = ({label,icon,text,onPress,field}) => {
  const {user}=useContext(authContext)
  const firestore=firebase.firestore().collection('UserCred')
  const list=[]
  // async function getFields(){
  //   try{
  //     await firestore.where('UserID','==',user.uid).get().then((query)=>{
  //       query.forEach((doc)=>{
  //         list.push(doc.data());
  //         console.log(list)
  //       })
  //     })
  //   }catch(e){
  //     console.log(e);
  //   }
  // }
  // getFields();
  return (
    <View style={{width:'100%',alignSelf:'center',marginVertical:3}}>
        <Text allowFontScaling={false} style={{margin:3,color:COLORS.grey,fontSize:12}}>
            {label}
        </Text>
        <View style={{width:'100%',borderWidth:1,height:40,alignContent:'center',justifyContent:'center',borderColor:COLORS.blue,padding:5,backgroundColor:COLORS.light}}>
          <View style={{flexDirection:'row'}}>
            <Ionicons name={icon} size={22} color={COLORS.blue} />
            <Text allowFontScaling={false} style={{alignSelf:'center',marginLeft:5,fontSize:14}}>{text?text:"......"}</Text>
          </View>
        </View>
    </View>
  )
}

export default DataField

const styles = StyleSheet.create({})