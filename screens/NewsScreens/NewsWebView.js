import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { useRoute } from '@react-navigation/native'
import { StatusBar } from 'react-native'

const NewsWebView = () => {
  const {params}=useRoute();
  return (
    <WebView startInLoadingState source={{ uri:params.uri}} style={{ flex: 1,marginTop:StatusBar.currentHeight }} />
  )
  
}

export default NewsWebView

const styles = StyleSheet.create({})