import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { FlatList,RefreshControl,StyleSheet, Text, View } from 'react-native';
import NewsCard from "../../components/NewsCard"
import { Entypo } from '@expo/vector-icons'; 
import { authContext } from '../../authContext/AuthContextProvider';
import { Button, IconButton, Modal, Surface } from 'react-native-paper';
import LocationCardSkeleton from '../../components/LocationCardSkeleton';
import { LinearGradient } from 'expo-linear-gradient';


export default function Home() {
  const [newsArticles,setNews]=useState([]);
  const [refresh,setRefresh]=useState(false);
  const context=useContext(authContext)
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(false);
  async function refreshHandler(){
    setRefresh(true);
    await news();
    setRefresh(false);
  }
  async function news(){
    setLoading(true);
    setError(false)
    try{
      const response=await axios.get('https://newsapi.org/v2/top-headlines?apiKey=dd493ba6d06f44339e02f18279179ac2',{
        params:{
          category:"technology",
          country:'us',
          pageSize:100
        }
      });
      console.log(response.data.totalResults)
      setNews(response.data.articles);
      setLoading(false);
    }catch(error){
      setLoading(false);
      setError(true);
    }
  }
  useEffect(()=>{
    news();
  },[]);
  if(error){
    return(
      <LinearGradient style={{flex:1,justifyContent:'center',alignItems:'center'}} colors={['#D0D0E8','#071E31']}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Surface style={{justifyContent:'center',alignItems:'center',alignSelf:'center',padding:10,borderRadius:10}}>
            <Text>Make sure you're connected to the internet</Text>
            {/* <Button onPress={news}><Text>try again</Text></Button> */}
            <IconButton onPress={news} icon={"refresh"}/>
          </Surface>
        </View>
      </LinearGradient>
    )
  }
  return(
    <LinearGradient style={{height:'100%',width:'100%'}} colors={['#D0D0E8','#071E31']}>
      {loading?
      <View>
        <LocationCardSkeleton color={'#e2f1f8'}/>
        <LocationCardSkeleton color={'#e2f1f8'}/>
      </View>
      :<LinearGradient style={{height:'100%',width:'100%'}} colors={['#D0D0E8','#071E31']}>
        <FlatList
        refreshControl={
          <RefreshControl
          refreshing={refresh}
          onRefresh={refreshHandler}
          />
        }
        onEndReached={()=>{
          
        }}
        data={newsArticles} renderItem={({item,index})=><NewsCard item={item} url={item.url} touch={false} save={context.save} setSave={context.setSave} urlToImage={item.urlToImage} title={item.title} description={item.description} sourceName={item.source.name} publishedAt={item.publishedAt} author={item.author} 
        />}
        />
      </LinearGradient>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212529'
  },
  float:{
    position:'absolute'
  }
});