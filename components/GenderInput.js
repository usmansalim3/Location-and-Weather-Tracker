import { Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import { MaterialCommunityIcons} from '@expo/vector-icons'; 


const GenderInput = ({label,placeholder,onPress}) => {
    return (
        <View style={styles.container}>
        <Text style={{color:COLORS.grey,fontSize:12,marginVertical:0}}>{label}</Text>
            <TouchableOpacity onPress={onPress} >
        <View style={styles.Inputcontainer}>
            <View style={{margin:3}}>
            <MaterialCommunityIcons name="gender-male-female" size={22} color={COLORS.blue}/>
            </View>
            <TextInput style={styles.input}
            onTouchStart={onPress}
            
            placeholder={placeholder}
            editable={false}
            />
        </View>
        </TouchableOpacity>
    </View>
  )
}

export default GenderInput

const styles = StyleSheet.create({
    container:{
        width:"100%",
        marginTop:10
    },
    Inputcontainer:{
        backgroundColor:COLORS.light,
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:COLORS.darkBlue,
        borderWidth:1,
        padding:3
    },
    input:{flex:1,height:"100%",fontSize:14}

})