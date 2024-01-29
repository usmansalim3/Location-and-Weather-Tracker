import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from "../auth/Firebase-config"

function mapAuthCodeToMessage(authCode) {
    switch (authCode) {
      case "auth/invalid-password":
        return "Password provided is not corrected";
  
      case "auth/invalid-email":
        return "Email provided is invalid";
      case "auth/email-already-exists":
        return "Email already registered";
     case "auth/invalid-email":
        return "Invalid email"
     case "auth/email-already-in-use":
        return "Email already registered"
     case "auth/user-not-found":
        return "Email not registered"
      default:
        return "Some error occured ";
    }
  }

export const authContext=createContext();
export default function AuthContextProvider({children}){
    const[user,setUser]=useState("");
    const[reg,setReg]=useState(false);
    const[error,setError]=useState('');
    const[signError,setSignError]=useState('');
    const[save,setSave]=useState(false);
    const[show,setShow]=useState(false);
    const[limit,setLimit]=useState(0);
    const[coord,setCoord]=useState({latitude: 37.78825,
        longitude: -122.4324})
    async function signIn(email,password){
    try{
        await firebase.auth().signInWithEmailAndPassword(email,password);
    }catch(e){
        console.log(e.code)
        setSignError(mapAuthCodeToMessage(e.code));
    }
    }
    async function register(email,password){
        try{
            setReg(true);
            await firebase.auth().createUserWithEmailAndPassword(email,password);
        }catch(e){
            setReg(false)
            console.log(e)
            setError(mapAuthCodeToMessage(e.code));
        }
    }
    useEffect(()=>{
        const sub=firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                AsyncStorage.setItem("loggedIn",JSON.stringify(user));
                setUser(user);
            }
        });
        return sub;
    },[])
    async function signOut(){
         await firebase.auth().signOut();
         AsyncStorage.removeItem("loggedIn")
         setReg(false);
    }
    value={
        signIn,
        register,
        user,
        setUser,
        signOut,
        error,
        setError,
        signError,
        setSignError,
        save,
        setSave,
        show,
        setShow,
        reg,
        setReg,
        limit,
        setLimit,
        coord,
        setCoord
    }
    return(
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
}