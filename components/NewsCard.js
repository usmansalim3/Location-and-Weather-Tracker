import { StyleSheet, Text, View, Image, TouchableOpacity, ActionSheetIOS,TouchableWithoutFeedback, Linking, Pressable } from 'react-native'
import React, { memo, useContext, useEffect } from 'react'
import moment from 'moment/moment'
import { Entypo } from '@expo/vector-icons'; 
import COLORS from '../constants/colors';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../redux/WeatherData';
import {firebase} from '../auth/Firebase-config'
import { authContext } from '../authContext/AuthContextProvider';
import { nanoid } from 'nanoid'
import Svg, { Circle, Path, Rect, SvgUri } from 'react-native-svg';
import { IconButton, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const NewsCard = (props) => {
    const firestore=firebase.firestore().collection('UserSavedPosts')
    const [docID,setdocID]=useState('');
    const navigation=useNavigation();
    const dispatch=useDispatch();
    const[touch,setTouch]=useState(props.touch);
    const[exists,setExists]=useState(false)
    const {user}=useContext(authContext);
    async function check(){
        const docs=(await firestore.where('id','==',user.uid+props.publishedAt+props.author).onSnapshot((d)=>{
            if(d.size){
                setExists(true)
                console.log("Exists")
            }else{
                setExists(false)
            }
        }));

    }
    useEffect(()=>{
        check()
    },[])
    async function pressHandler(){
        if(exists==false){
            //dispatch(add(props.item));
            const savedPost={
                id:user.uid+props.publishedAt+props.author,
                userID:user.uid,
                title:props.title,
                description:props.description,
                author:props.author,
                publishedAt:props.publishedAt,
                sourceName:props.sourceName,
                urlToImage:props.urlToImage,
                urlToNews:props.url
            }
            await firestore.add(savedPost).then((query)=>{
                setdocID(query.id);
            });
            setExists(true);
        }else{
            setExists(false);
            await firestore.doc(docID).delete();
            setdocID('');
            //dispatch(remove(props.item.title));
            
        }
    }
  return (
    
    <View style={styles.container}>
        <View style={{
            position:'absolute',
            zIndex:11,
            right:12,
            top:0,
            
        }}>
            {exists?<IconButton icon='cards-heart' size={25} iconColor={COLORS.blue} onPress={pressHandler}/> : 
            <IconButton icon='cards-heart-outline' size={25} iconColor={COLORS.blue} onPress={pressHandler}/>}
            {/*touch?<Entypo name="save" size={24} color="black" />:<AntDesign name="save" size={24} color="black" />*/}
        </View>
        <Pressable onPress={()=>navigation.navigate('NewsWebView',{uri:props.url})} style={{zIndex:10}}>
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
                    By:<Text style={{fontFamily:"Barlow-Bold",color:'#4361ee'}}>{props.author&&!props.author.includes('/')?" "+props.author:" NA"}</Text>
                </Text>
                <Text style={{fontFamily:"Barlow-Bold",color:'#4361ee',fontSize:16}}>
                    {moment(props.publishedAt).format("MMM Do YY")}
                </Text>
            </View>
            <View style={{marginTop:6,width:300}}>
                <Text style={{fontSize:16,fontFamily:"Barlow-Regular"}}>
                    Source :   
                        <Text style={{color:'#4361ee',fontFamily:"Barlow-Bold"}}>{props.sourceName&&!props.sourceName.includes('/')?" "+props.sourceName:" NA"}</Text>
                </Text>
            </View>
        </View>
        </>
        </Pressable>
    </View>
  )
}

export default memo(NewsCard)

const styles = StyleSheet.create({
    container:{
        width:"90%",
        elevation:5,
        backgroundColor:COLORS.white,
        marginTop:20,
        borderRadius:20,
        alignSelf:'center',
        marginBottom:5
    },
    NewsTitle:{
        fontSize:18,
        marginTop:6,
        fontFamily:"Barlow-Bold"
    },
    description:{
        fontSize:16,
        fontWeight:"400",
        marginTop:5,
        fontFamily:"Barlow-Regular"
    }
})