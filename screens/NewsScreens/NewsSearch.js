import { StyleSheet, Text, TextInput, View, FlatList, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React,{useEffect, useMemo, useState} from 'react'
import axios from 'axios'
import NewsCard from '../../components/NewsCard'
import COLORS from '../../constants/colors'
import { Entypo } from '@expo/vector-icons';
import {useKeyboard} from '@react-native-community/hooks'
import { LinearGradient } from 'expo-linear-gradient'
import { IconButton, Surface } from 'react-native-paper'


function NotFound({keyboardHeight,keyboardShown}){
    return(
      <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',backgroundColor:'white',elevation:5
      ,padding:10,bottom:Platform.OS=="ios"&&keyboardShown?keyboardHeight:0,width:"100%"
      }}>
        <Text style={{fontWeight:'bold'}}>
          No articles found please make sure you have selected the right category of news
        </Text>
      </View>
    )
}
function SearchBar({placeholder,value,setValue,setCategory}){
  return(
    <TextInput 
    value={value}
    onChangeText={(text)=>{
      setValue(text)
    }}
    style={styles.textInput}
    placeholder={placeholder}
    />
    )
  }
  const NewsSearch = () => {
    const keyboardHeight=useKeyboard().keyboardHeight;
    const keyboardShown=useKeyboard().keyboardShown
  const categories=[
    {category:'entertainment',icon:"tv"},
    {category:'sports',icon:"sports-club"},
    {category:'general',icon:"newsletter"},
    {category:'health',icon:"plus"},
    {category:'technology',icon:"laptop"},
    {category:'science',icon:"lab-flask"},
    {category:'business',icon:"suitcase"}
  ]
  const[pressed,setPressed]=useState(false);
  const[value,setValue]=useState('');
  const[articles,setArticles]=useState([]);
  const[category,setCategory]=useState('general');
  const[visible,setVisible]=useState(false);
  const[options,setOptions]=useState(false);
  const[error,setError]=useState(false);
  function pressHandler({category}){
    setCategory(category);
    setPressed(true);
  }
  async function news(){
    setError(false)
    try{
      const response=await axios.get('https://newsapi.org/v2/top-headlines?apiKey=dd493ba6d06f44339e02f18279179ac2',{
        params:{
          category,
          country:'in',
          q:value
        }
      });
      setArticles(response.data.articles);
    }catch(e){
      setError(true);
      console.log(e);
    }
  }
  useEffect(()=>{
    const timer = setTimeout(() => {
      console.log("called")
      news()
    }, 500)
    return () => clearTimeout(timer)
  },[value,category])
  useEffect(()=>{
    setInterval(()=>{
      if(articles.length===0){
        setVisible(true);
      }
    },3000)
  },[])
  if(error){
    return(
        <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'#212529'}}>
          <Surface style={{justifyContent:'center',alignItems:'center',alignSelf:'center',padding:10,borderRadius:10}}>
            <Text>Make sure you're connected to the internet</Text>
            {/* <Button onPress={news}><Text>try again</Text></Button> */}
            <IconButton onPress={news} icon={"refresh"}/>
          </Surface>
        </View>
    )
  }
  return (
   
    <View style={{backgroundColor:COLORS.light,flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:20,alignSelf:'center',padding:5,elevation:5,backgroundColor:'white',borderRadius:5,zIndex:1,position:'absolute',top:12}}>
        <Entypo name="magnifying-glass" size={24} color="black" />
        <SearchBar placeholder={"Search in "+category+" news"} value={value} setValue={setValue} setCategory={setCategory} />
        {options?<Entypo name="cross" size={24} color="black" onPress={()=>setOptions(false)}/>
        :<Entypo name="list" size={24} color="black" onPress={()=>setOptions((true))}/>}
      </View>
      <View style={{backgroundColor:'#212529',flex:1}}>
        <FlatList data={articles} renderItem={({item})=><NewsCard  item={item} url={item.url} touch={false} urlToImage={item.urlToImage} title={item.title} description={item.description} sourceName={item.source.name} publishedAt={item.publishedAt} author={item.author}
         />}
         />
      </View>
      {articles.length===0&&visible?<NotFound keyboardHeight={keyboardHeight} keyboardShown={keyboardShown} />:null}
      {options?<View style={{position:'absolute',bottom:articles.length?10:80,zIndex:999,padding:5,elevation:5,backgroundColor:'white',borderRadius:5,marginTop:10,marginHorizontal:20}}>
        <FlatList
          horizontal
          data={categories}
          renderItem={({item})=>
          <TouchableOpacity style={[styles.button,category===item.category?{backgroundColor:COLORS.blue}:null]} onPress={()=>{
            setCategory(item.category)
            setPressed(true);

          }}>
            <View>
              <Entypo name={item.icon} size={22} color="black" />
            </View>
          </TouchableOpacity>}
          showsHorizontalScrollIndicator={false}
          />
      </View>:null}
    </View>
  )
}

export default NewsSearch

const styles = StyleSheet.create({
    searchBarContainer:{
        width:'80%',
        
    },
    textInput:{
        height:35,
        padding:5,
        fontSize:14,
        width:'80%'
    },
    button:{
      margin:10,
      backgroundColor:'white',
      elevation:5,
      padding:7,
      borderRadius:10
    }
})