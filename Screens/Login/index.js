import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AppTheme from "../../Utils";
import { useNavigation } from "@react-navigation/core";

const Login = () => {
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoContent}>
          <Image style={styles.logoImage} source={require("../../assets/Icons/logo.png")} />
          <Text style={styles.appName}>{AppTheme.AppName}</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formHeader}></View>
        <View style={styles.formInputs}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={Email}
            onChangeText={(e) => SetEmail(e)}
          />
          <View>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
              value={Password}
              onChangeText={(e) => SetPassword(e)}
            />
            <Text style={styles.forgetPasswordText}>Forget Password?</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.noAccountText} onPress={()=>navigation.navigate("Signup")}>You Don't Have An Account?</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.BackgroundColor,
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  logoContent: {
    flex: 1,
    justifyContent: "flex-end",
    width: "90%",
    alignItems: "center",
    backgroundColor: AppTheme.BackInnerColor,
  },
  logoImage: {},
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: AppTheme.logoHeadingColor,
  },
  formContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
  },
  formHeader: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    backgroundColor:AppTheme.BackInnerColor,
    borderBottomEndRadius:25,
    borderBottomStartRadius:25,
    
  },
  formInputs: {
    flex: 8,
    width: "90%",
    gap: 10,
    paddingTop: 12,
  },
  input: {
    paddingLeft: 10,
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    fontSize: 17,
    borderColor: AppTheme.BodersColor,
  },
  forgetPasswordText: {
    fontWeight: "bold",
    marginTop: 3,
    color: AppTheme.FontColor,
  },
  loginButton: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: AppTheme.ButtonInnerColor,
  },
  loginButtonText: {
    color: AppTheme.ButtonTextColor,
    textAlign: "center",
    fontWeight: "bold",
  },
  noAccountText: {
    fontWeight: "bold",
    marginTop: 3,
    color: AppTheme.FontColor,
  },
});

export default Login;

