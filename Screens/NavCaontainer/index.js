import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Signup from "../Signup";
import Login from "../Login";
import Otp from "../Otp";
import { useSelector } from "react-redux";
import UserTab from "../UserTab";

const NavContainer = () => {
  const { user } = useSelector((state) => state.userSlice);

  console.log("suer", user);
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          user.userType == "User" ? (
            <>
              <Stack.Screen name="UserTab" component={UserTab} />
              <Stack.Screen name="Product" component={UserTab} />
              <Stack.Screen name="Carts" component={UserTab} />
            </>
          ) : (
            <Stack.Screen name="VendorScreen" component={VendorTab} />
          )
        ) : (
          <>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Otp" component={Otp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;
