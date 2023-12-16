import { View, Text,TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Image } from "react-native";
import { ScrollView } from "react-native";
import AppTheme from '../../Utils';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { useNavigation } from '@react-navigation/core';

const Otp = ({route}) => {
  const {user} = route.params;
  console.log(user)

  const [OtpCode, SetOtpCode] = useState("")
  const navigation = useNavigation()

  const OtpHandler = async ()=>{
    console.log("aaa")

    const docRef = doc(db, "users", user);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  const userdata = docSnap.data()
  if(userdata.Otp == OtpCode){
    console.log("Done")
    userdata.Otp = "Verified"
    console.log(userdata)
    // return
    const washingtonRef = doc(db, "users", user);


// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, userdata);
console.log("gogg")
if(userdata.userType == "User"){
  navigation.replace("UserTab")
}else{
  navigation.replace("UserTab")
}

  }else{
    console.log("daaa")
  }
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}



  }

 
  return (
    <ScrollView contentContainerStyle={{flex:1, backgroundColor:AppTheme.BackgroundColor}}>


<View style={{flex:1 , width:"100%", alignItems:"center"}}>
  <View style={{flex:1, width:"90%", backgroundColor:AppTheme.BackInnerColor, alignItems:"center", justifyContent:"center"}}>
    <Image source={require("../../assets/Icons/logo.png")}/>
    <Text style={{color:AppTheme.logoHeadingColor, fontWeight:"bold", fontSize:20}}>{AppTheme.AppName}</Text>
  </View>

</View>
<View style={{flex:2 }}>
  <View style={{flex:1,width:"100%", alignItems:"center"}}>
    <View style={{flex:1, backgroundColor:AppTheme.BackInnerColor, width:"90%", borderBottomStartRadius:25,borderBottomEndRadius:25}}></View>
  </View>
  <View style={{flex:8,}}>
        <View style={{ flex: 1, alignItems: "center", marginTop:20}}>
          <View
            style={{ width: "90%", height: "100%", gap: 20}}
          >
            <View>
              <TextInput
                style={{ borderWidth: 2, padding: 10, borderRadius: 10, borderColor:AppTheme.BodersColor }}
                placeholder="Enter OTP"
                onChangeText={(e)=>SetOtpCode(e)}
              />
              <Text style={{color:AppTheme.FontColor, fontWeight:"700"}}>We Send Otp code on your email address</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: AppTheme.ButtonInnerColor,
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={OtpHandler}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "500",
                    color: AppTheme.ButtonTextColor,
                  }}
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

  </View>
</View>



      
      </ScrollView>
  )
}

export default Otp