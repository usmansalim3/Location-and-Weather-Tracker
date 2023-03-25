import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'
import { MaterialIcons } from '@expo/vector-icons'; 


const Input = ({label,iconName,hide,placeholder,value,handleChange,error,touched,formik,type,errorVisible}) => {
    const [show,setShow]=useState(hide);
    const warning=!!error[label];
    return (
    <View style={styles.container}>
        <Text style={{color:COLORS.grey,fontSize:12,marginVertical:0}}>{label}</Text>
        {formik.touched[label]&&error[label]?<Text style={{color:COLORS.red,fontSize:12}}>{error[label]}</Text>:null}
        <View style={[styles.Inputcontainer,formik.touched[label]&&warning?{borderColor:COLORS.red}:null]}>
            <View style={{margin:3}}>
            <MaterialIcons name={iconName} size={22} color={formik.touched[label]&&warning?COLORS.red:COLORS.blue} />
            </View>
            <TextInput style={styles.input}
            autoCapitalize={false}
            secureTextEntry={show}
            placeholder={placeholder}
            value={value}
            keyboardType={type?type:'default'}
            onChangeText={handleChange(label)}
            onBlur={touched(label)}
            allowFontScaling={false}
            />
            {hide&&show&&
            <Pressable onPress={()=>setShow(!show)}>
            <MaterialIcons name="keyboard" size={22} color={COLORS.blue} />
            </Pressable>
            }
            {hide&&!show&&
            <Pressable onPress={()=>setShow(!show)}>
                <MaterialIcons name="keyboard-hide" size={22} color={COLORS.blue} />
            </Pressable>
            }
        </View>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container:{
        width:"100%",
        marginTop:5,
    },
    Inputcontainer:{
        backgroundColor:COLORS.light,
        height:45,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderColor:COLORS.darkBlue,
        borderWidth:1,
        padding:1
    },
    input:{flex:1,height:"100%",fontSize:15}

})