import { Button, Modal, StyleSheet, Text, TouchableOpacity, Pressable, View, BackHandler, KeyboardAvoidingView, TouchableNativeFeedback, Keyboard, TouchableWithoutFeedback, ScrollView, Platform} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import COLORS from '../../constants/colors'
import Input from '../../components/Input'
import { useFormik, yupToFormErrors } from 'formik'
//import { Picker } from '@react-native-picker/picker'
import * as Yup from "yup"
import "yup-phone";
import DatePicker from 'react-native-modern-datepicker'
import DataField from '../../components/DataField'
import {firebase} from '../../auth/Firebase-config'
import { useNavigation } from '@react-navigation/native'
import { authContext } from '../../authContext/AuthContextProvider'
import * as ImagePicker from 'expo-image-picker'
import ProfilePic from '../../components/ProfilePic'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import RBSheet from 'react-native-raw-bottom-sheet'
import GenderInput from '../../components/GenderInput'
import { List, Surface } from 'react-native-paper'
import { Button as PaperButton }  from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { responsiveHeight } from 'react-native-responsive-dimensions'


const UserCred = () => {
  const {user}=useContext(authContext);
  const navigation=useNavigation();
  const firestore=firebase.firestore().collection('UserCred')
  const[show,setShow]=useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const[url,setUrl]=useState('');
  const[url64,setUrl64]=useState('');
  const[image,setImage]=useState(null);
  const [submit,setSubmit]=useState(false);
  const[showPPModal,setShowPPModal]=useState(false);
  const [gender,setGender]=useState('N/A')
  const[enable,setEnable]=useState(true);
  const formik=useFormik({
    initialValues:{
      Username:"",
      Name:"",
      Phone:"",
      Gender:'N/A',
    },
    validationSchema:Yup.object().shape({
      Username:Yup.string().min(3,"Too short").max(24,"Too long").required("Field is required"),
      Name:Yup.string().min(3,"Too short").max(24,"Too long").required("Field is required"),
      Phone:Yup.string().phone('IN', true, 'Invalid number').required()

    }),
    onSubmit: async ()=>{
      Keyboard.dismiss()
      await add();
    }
  });
  async function ImageHandler(){
    const result=await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[4,3],
      quality:1,
      base64:true
    });
    const source={uri:result.uri};
    if(source.uri){
      setEnable(false);
    }
    if(result.base64){
      setUrl64(result.base64)
    }
    console.log(source);
    if(result.uri){
      setImage(source);
    }
  }
  async function uploadImage(){
    const response=await fetch(image.uri)
    const blob= await response.blob();
    const fileName=image.uri.substring(image.uri.lastIndexOf('/')+1);
    console.log(fileName);
    var ref=firebase.storage().ref().child(fileName).put(blob);
    const storageRef=firebase.storage().ref(fileName)
    try{
      await ref;
      const link=await storageRef.getDownloadURL();
      console.log(link);
      setUrl(link);
      setShowPPModal(false);
    }catch(e){
      console.log(e);
    }
  }
  async function add(){
    const dataObject={
      UserID:user.uid,
      Username:formik.values.Username,
      Name:formik.values.Name,
      Phone:formik.values.Phone,
      Gender:gender,
      Dob:selectedDate,
      ProfilePic:url?url:'https://reactnative.dev/img/tiny_logo.png'
    }
    await firestore.add(dataObject);
    setSubmit(true)
  }
  useEffect(()=>{
    if(submit){
      navigation.navigate('Home')
    }
  },[submit])
  const RBref=useRef();
  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress',()=>{
      navigation.navigate('Add Details');
      return true;
    })
  },[])
  return (
    <LinearGradient style={{height:'100%',width:'100%'}} colors={show?['#222322','#494B47']:['#B9B9DC','#3C3EF1']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      {/* <KeyboardAvoidingView behavior={Platform.OS=='ios'?'position':null} style={Platform.OS=='ios'?{height:'85%'}:{justifyContent:'center',alignItems:"center",flex:1}}> */}
      <Surface style={Platform.OS==='ios'?styles.IosSurface:styles.AndroidSurface}>
          <View>
              <Text allowFontScaling={false} style={styles.loginHeader}>Fill details <Text style={{color:COLORS.blue}}>Here</Text></Text>
              <Text allowFontScaling={false} style={styles.loginSubHeading}>Fill in down below</Text>
          </View>
          <View style={{width:'100%',alignSelf:'center'}}>
            <Input label="Username" iconName="person" placeholder={"Enter your Username"} value={formik.values.Username} formik={formik} error={formik.errors} touched={formik.handleBlur} handleChange={formik.handleChange}/>
            <Input label="Name" iconName="person" placeholder={"Enter your Name"} value={formik.values.Name} formik={formik} error={formik.errors} touched={formik.handleBlur} handleChange={formik.handleChange}/>
            <Input label="Phone" type='numeric' iconName="call" placeholder={"Enter your Phone"} value={formik.values.Phone} formik={formik} error={formik.errors} touched={formik.handleBlur} handleChange={formik.handleChange}/>
            <TouchableOpacity onPress={()=>{
              RBref.current.open()
              Keyboard.dismiss()
              }}>
              <GenderInput label="Gender" placeholder={gender} onPress={()=>{
              RBref.current.open()
              Keyboard.dismiss()
              }} />
            </TouchableOpacity>
            <RBSheet ref={RBref} closeOnDragDown={true} height={160} customStyles={{
              container:{
                backgroundColor:COLORS.light,
                borderTopRightRadius:10,
                borderTopLeftRadius:10
              }
            }}>
              <View>
                <TouchableOpacity onPress={()=>{
                  setGender('Male');
                  RBref.current.close();
                  }}>
                  <List.Item title="Male" left={()=>
                    <FontAwesome5 name="male" size={24} color={COLORS.blue} style={{margin:10}} />
                  }/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  setGender('Female');
                  RBref.current.close();
                  }}>
                  <List.Item title="Female" left={()=>
                  <FontAwesome5 name="female" size={24} color={COLORS.blue} style={{margin:10}} />
                  }/>
                </TouchableOpacity>
              </View>
            </RBSheet>
            <TouchableOpacity onPress={()=>{
              setShow(true)
              Keyboard.dismiss()
              }}>
              <DataField label='DOB' text={selectedDate} icon="calendar-outline"/>
            </TouchableOpacity>
            <Modal visible={show} transparent animationType='fade' style={{flex:1}}>
              <TouchableWithoutFeedback onPress={()=>setShow(false)}>
                <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:'rgba(0, 0, 0, 0.7)'}}>
                  <DatePicker
                  options={{
                    backgroundColor: COLORS.light,
                    textHeaderColor: COLORS.blue,
                    textDefaultColor: COLORS.blue,
                    selectedTextColor: COLORS.white,
                    mainColor: COLORS.blue,
                    textSecondaryColor: COLORS.blue,
                    borderColor: 'rgba(122, 146, 165, 0.1)',
                  }}
                  selected={formik.values.DOB}
                  onSelectedChange={(date)=>{
                    setSelectedDate(date);
                    setShow(false)
                  }}
                  mode='calendar'
                  minuteInterval={30}
                  style={{ borderRadius: 10,width:'90%'}}
                  />
                </View>
              </TouchableWithoutFeedback>
            </Modal>
            <Modal visible={showPPModal} animationType='fade'>
              <View style={{flex:1,backgroundColor:'#B9B9DC'}}>
                <View style={{margin:responsiveHeight(5)}}>
                  <Text allowFontScaling={false} style={styles.loginHeader}>Choose Profile Picture <Text style={{color:COLORS.blue}}>Here</Text></Text>
                </View>
                <View style={{alignItems:'center',justifyContent:'center',marginTop:100}}>
                  <ProfilePic uri={url64}/>
                  <View style={{width:'70%'}}>
                    <View style={{margin:10}}>
                      <PaperButton mode='contained' style={{borderRadius:3}} onPress={ImageHandler}>
                        <Text style={{color:COLORS.light}}>
                          Pick Image
                        </Text>
                      </PaperButton>
                    </View>
                    <View style={{margin:10}}>
                      <PaperButton disabled={enable} mode='outlined' style={{borderRadius:3}} onPress={uploadImage}>
                        <Text>
                          Upload Image
                        </Text>
                      </PaperButton>
                    </View>
                  </View>
                </View>
                <View style={{width:'80%',alignSelf:'center',position:'absolute',bottom:50}}>
                  <PaperButton onPress={()=>setShowPPModal(false)}>
                    <Text style={{fontWeight:'bold'}}>
                      Close
                    </Text>
                  </PaperButton>
                </View>
              </View>
            </Modal>
          </View>
          {/* <View style={{width:"90%",height:40,alignSelf:'center',marginTop:10,marginBottom:10,overflow:"hidden"}}>
          <Pressable  onPress={()=>setShowPPModal(true)} android_ripple={{color:COLORS.grey}} style={{backgroundColor:COLORS.blue,justifyContent:'center',alignItems:'center',borderRadius:5,overflow:'hidden'}}>
            <View>
              <Text style={{color:COLORS.light}}>
                Set Profile Picture
              </Text>
            </View>
          </Pressable>
        </View> */}
        <View style={{width:'90%',alignSelf:'center'}}>
          <PaperButton mode='contained' style={{borderRadius:5,marginVertical:5}} onPress={()=>setShowPPModal(true)} >
          <Text style={{color:COLORS.light}}>
                Set Profile Picture
            </Text>
          </PaperButton>
        </View>
        <View style={{width:'90%',alignSelf:'center'}}>
          <PaperButton mode='outlined' style={{borderRadius:5,padding:0}} onPress={formik.handleSubmit} >
            <Text>Submit</Text>
          </PaperButton>
        </View>
        </Surface>
        {/* </KeyboardAvoidingView> */}
        </TouchableWithoutFeedback>
    </LinearGradient>
  )
}

export default UserCred

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:10,
        paddingHorizontal:20
    },
    loginHeader:{
        fontSize:40,
        fontWeight:'bold',
        marginTop:5
      },
      loginSubHeading:{
        fontSize:16,
        color:COLORS.grey,
        marginLeft:1
      },
      AndroidSurface:{width:'95%',alignSelf:'center',padding:10,marginTop:'20%',borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4},
      IosSurface:{padding:10,borderRadius:5,backgroundColor:COLORS.light,borderColor:COLORS.blue,borderWidth:0.4,width:'95%',marginTop:'25%',marginLeft:'2.5%'}
})