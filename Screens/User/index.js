import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppTheme from '../../Utils'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../Firebase'
import { useNavigation } from '@react-navigation/core'
import { userHandler } from '../../Store/Slices/userSlice'

const User = () => {
    const [Name, SetName]= useState(null)
    const [Phone, SetPhone]= useState("No")
    const [Email, SetEmail]= useState("No")
    const [imageUrl, SetimageURL]= useState("No")

    const { user } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const navigation = useNavigation()
    useEffect(()=>{
        SetName(user.name)
        SetPhone(user.PhoneNo)
        SetEmail(user.email)
        SetimageURL(user.imageurl)
    },[])

    const logout = ()=>{
        
        auth.signOut()
        .then(() => {
          dispatch(userHandler(null))
          navigation.replace("Login")
      });
    }

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{backgroundColor:AppTheme.BackgroundColor, flex:1, }}>
        <View style={{flex:1, width:"100%", alignItems:"center"}}>
        <View style={{backgroundColor:AppTheme.BackgroundColor,borderBottomEndRadius: 40,
            borderBottomStartRadius: 40, flex:2,gap:10, justifyContent:"center", alignItems:"center", width:"90%", backgroundColor:"white"}}>
        <Image source={{uri:imageUrl}} style={{backgroundColor:"red", height:150, width:150, borderRadius:100}}/>
        <Text style={{fontSize:20}}>{Name||"UserNAme"}</Text>
      </View>
        </View>
      
      <View style={{ flex:2, justifyContent:"center",alignItems:"center"}}>
        <View style={{width:"90%" , gap:12}}>
        <Text style={{fontSize:18, fontWeight:"500"}}>Email:</Text>
        <TextInput style={{fontSize:19, paddingLeft:40, borderWidth:2.5, padding:7, borderRadius:10, borderColor:AppTheme.BodersColor}} value={Email} editable={false}/>
        <Text style={{fontSize:18, fontWeight:"500"}}>Phone:</Text>
        <TextInput style={{fontSize:19, paddingLeft:40, borderWidth:2.5, padding:7, borderRadius:10, borderColor:AppTheme.BodersColor}} value={Phone} editable={false}/>
        <Text style={{fontSize:18, fontWeight:"500"}}>Verify:</Text>
        <TextInput style={{fontSize:19, paddingLeft:40, borderWidth:2.5, padding:7, borderRadius:10, borderColor:AppTheme.BodersColor}} value='Verified' editable={false}/>
        </View>
      </View>
      <View style={{ flex:1, alignItems:"center"}}>
        <View style={{position:"absolute", bottom:20, alignContent:"center"}}>
        <TouchableOpacity style={{backgroundColor:AppTheme.ButtonInnerColor, width:100, padding:8, justifyContent:"center", borderRadius:12}} onPress={logout}>
          <Text style={{color:"white", textAlign:"center",fontWeight:"900"}}>Logout</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    </View>
    </SafeAreaView>
  )
}

export default User