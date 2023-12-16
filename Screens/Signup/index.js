import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import AppTheme from '../../Utils';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, doc, getDownloadURL, ref, setDoc, storage, uploadBytesResumable } from '../../Firebase';
import { userHandler } from '../../Store/Slices/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';



const Signup = () => {
  const [FullName, SetFullName] = useState('');
  const [Email, SetEmail] = useState('');
  const [Password, SetPassword] = useState('');
  const [PhoneNo, SetPhoneNo] = useState('');
  const [userType, setUserType] = useState(null);
  const [image, setImage] = useState(null);

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const pickImage = async () => {
    
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUserTypeChange = (index, value) => {
    setUserType(value);

    if (value === 'Vendor') {
      setDropdownOptions(['Vendor', 'User']);
    } else {
      setDropdownOptions(['User', 'Vendor']);
    }
  };

  const [dropdownOptions, setDropdownOptions] = useState(['User', 'Vendor']);

  const SignupHandler = async () => {

    
    // return
    
    
    
    await createUserWithEmailAndPassword(auth, Email, Password)
    .then(async(userCredential)=>{
      const user = userCredential.user;
      console.log("user", user);
  
  
      const blob = await new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
          resolve(xhr.response);
  
        };
        xhr.onerror =function (){
          reject(new TypeError("Network request failed"));
  
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null)
      })
  
  
      const metadata = {
        contentType: 'image/jpeg'
      };
  
      // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'users/' + Date.now());
  const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
  const OTPCODE = Math.floor(100000 + Math.random() * 900000);

  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    async () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);
        await setDoc(doc(db, "users", user.uid), {
          name: FullName,
          email: Email,
          PhoneNo,
          userType,
          imageurl : downloadURL,
          Otp : OTPCODE
        });
  
        
      });

      
    const OtpObj = {
      Otp : OTPCODE,
      fullName : FullName,
      email : Email
    }

    const res = await axios.post("https://busy-gray-shark-hose.cyclic.app/api/otpVerify",  OtpObj )
   
    console.log(res)
      
      if(res){
        navigation.replace("Otp", {user :user.uid})
      }

      console.log("Doneeeeeee")
      
    
      
    }
  );
  
  
  
  
  
  
  
     
    })
    .catch((error)=>{
      console.log(error.message);
    })
  
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoContent}>
          <Image source={require('../../assets/Icons/logo.png')} />
          <Text style={styles.appName}>{AppTheme.AppName}</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formHeader}></View>
        <View style={styles.formInputs}>
          <View style={styles.inputContainer}>
            <Text onPress={pickImage} style={styles.input}>
              Pick Image
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <ModalDropdown
              style={styles.input}
              options={dropdownOptions}
              dropdownStyle={styles.dropdown}
              onSelect={handleUserTypeChange}
              defaultValue="Select User Type"
            />
          </View>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            onChangeText={(e) => SetFullName(e)}
            value={FullName}
          />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            onChangeText={(e) => SetPhoneNo(e)}
            value={PhoneNo}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(e) => SetEmail(e)}
            value={Email}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(e) => SetPassword(e)}
            value={Password}
            style={styles.input}
          />
          <View>
            <Text style={styles.bottomText} onPress={()=>navigation.navigate("Login")}>
              Already Have An Account?
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={SignupHandler}
            >
              <Text style={styles.signupButtonText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: AppTheme.BackgroundColor,
  },
  logoContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  logoContent: {
    flex: 1,
    width: '90%',
    backgroundColor: AppTheme.BackInnerColor,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  appName: {
    color: AppTheme.logoHeadingColor,
    fontWeight: 'bold',
    fontSize: 20,
  },
  formContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
  formHeader: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    backgroundColor:AppTheme.BackInnerColor,
    borderBottomEndRadius:25,
    borderBottomStartRadius:25,
  },
  formInputs: {
    flex: 8,
    width: '90%',
    marginTop: 15,
    gap:8
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    paddingLeft: 10,
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    fontSize: 17,
    borderColor: AppTheme.BodersColor,
  },
  dropdown: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: AppTheme.FontColor,
    fontWeight: 'bold',
    marginTop: 3,
  },
  signupButton: {
    padding: 10,
    backgroundColor: AppTheme.ButtonInnerColor,
    borderRadius: 100,
  },
  signupButtonText: {
    color: AppTheme.ButtonTextColor,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Signup;
