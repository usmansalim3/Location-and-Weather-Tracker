import { StyleSheet, Text, View, Image, TouchableOpacity, ActionSheetIOS, Pressable, Linking } from 'react-native'
import React, { useContext, useEffect } from 'react'
import moment from 'moment/moment'
import { Entypo } from '@expo/vector-icons'; 
import COLORS from '../constants/colors';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../redux/WeatherData';
import {firebase} from '../auth/Firebase-config'
import { authContext } from '../authContext/AuthContextProvider';
import Svg, { Circle, Path, Rect, SvgUri } from 'react-native-svg';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SavedPostCard= (props) => {
    const context=useContext(authContext);
    const navigation=useNavigation();
    const firestore=firebase.firestore().collection('UserSavedPosts')
    async function pressHandler(){
            //dispatch(remove(props.item.title))
            await firestore.doc(props.postRef).delete();
            props.setDel((prev)=>!prev)
            /*await firestore.where('userID','==',context.user.uid).where('id','==',context.user.uid+props.publishedAt+props.author).get().then((query)=>{
                query.docs.forEach((q)=>{
                    const id=q.id
                    firestore.doc(id).delete();
                })
            })*/
            
    }
  return (
    <View style={styles.container}>
        <View style={{
            position:'absolute',
            zIndex:1,
            right:12,
            top:0
        }}>
            <IconButton icon='cards-heart' iconColor={COLORS.blue} size={25} onPress={pressHandler}/>
        </View>
        <Pressable onPress={()=>navigation.navigate('NewsWebView',{uri:props.url})}>
        <>
        {props.urlToImage?
            <Image source={{uri:props.urlToImage}}
            style={{height:200,width:"100%",borderTopLeftRadius:20,borderTopRightRadius:20}}
            />
            :
        <Svg xmlns="http://www.w3.org/2000/svg" height={200} width='100%' viewBox="0 0 64 64"><Rect width="56" height="40" x="4" y="16" fill="#f6f5f5"/><Rect width="56" height="8" x="4" y="8" fill="#1f3c88"/><Path fill="#070d59" d="M60,7H4A1,1,0,0,0,3,8V56a1,1,0,0,0,1,1H60a1,1,0,0,0,1-1V8A1,1,0,0,0,60,7ZM5,9H59v6H5ZM59,55H5V17H59Z"/><Circle cx="8" cy="12" r="1" fill="#ee6f57"/><Circle cx="12" cy="12" r="1" fill="#ee6f57"/><Circle cx="16" cy="12" r="1" fill="#ee6f57"/><Path fill="#ee6f57" d="M37 26H27a1 1 0 0 0-1 1V45a1 1 0 0 0 1 1H37a1 1 0 0 0 1-1V27A1 1 0 0 0 37 26zM36 44H28V28h8zM51 28a1 1 0 0 0-1 1v8H42V27a1 1 0 0 0-2 0V38a1 1 0 0 0 1 1h9v6a1 1 0 0 0 2 0V29A1 1 0 0 0 51 28zM23 28a1 1 0 0 0-1 1v8H14V27a1 1 0 0 0-2 0V38a1 1 0 0 0 1 1h9v6a1 1 0 0 0 2 0V29A1 1 0 0 0 23 28z"/></Svg>
        }
        <View style={{padding:10}}>
            <Text style={styles.NewsTitle}>{props.title}</Text>
            <Text style={styles.description} numberOfLines={5}>{props.description}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                <Text style={{fontSize:16}}>
                    By:<Text style={{fontFamily:"Barlow-Bold",color:'#4361ee'}}>{props.author&&!props.author.includes('/')?" "+ props.author:" NA"}</Text>
                </Text>
                <Text style={{fontFamily:"Barlow-Bold",color:'#4361ee',fontSize:16}}>
                    {moment(props.publishedAt).format("MMM Do YY")}
                </Text>
            </View>
            <View style={{marginTop:6}}>
                <Text style={{fontSize:16,fontFamily:"Barlow-Regular"}}>
                    Source:
                        <Text style={{fontFamily:"Barlow-Bold",color:'#4361ee'}}>{props.sourceName&&!props.sourceName.includes('/')?" "+props.sourceName:" NA"}</Text>
                </Text>
            </View>
        </View>
        </>
        </Pressable>
    </View>
  )
}

export default SavedPostCard

const styles = StyleSheet.create({
    container:{
        marginTop:5,
        width:"90%",
        elevation:5,
        backgroundColor:'#fff',
        borderRadius:20,
        alignSelf:'center',
        marginBottom:5
    },
    NewsTitle:{
        fontFamily:"Barlow-Bold",
        fontSize:18,
        marginTop:6
    },
    description:{
        fontSize:16,
        fontWeight:"400",
        marginTop:5,
        fontFamily:"Barlow-Regular"
    }
})