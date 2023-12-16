import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppTheme from '../../Utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import User from '../User';

const UserTab = () => {

    const Tab = createBottomTabNavigator();
    var HomeIcon = 'tomato';
    var favIcon = 'gray';
    var historyIcon = 'tomato';
    var UserIcon = 'tomato';
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown:false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              HomeIcon = focused
                ? AppTheme.BackgroundColor
                : 'grey';
              iconName = "home"
                
            } else if (route.name === 'History') {


              HomeIcon = focused
                ? AppTheme.BackgroundColor
                : 'grey';
              iconName = 'history';
            }else if(route.name === 'Favorite'){
              HomeIcon = focused
              ? AppTheme.BackgroundColor
              : 'grey';
            iconName = 'heart';
            }else if(route.name === 'Profile'){
              HomeIcon = focused
              ? AppTheme.BackgroundColor
              : 'grey';
            iconName = 'user';
            }

            // You can return any component that you like here!
            return (<View style={styles.bottomNav}>
                  <FontAwesome name={iconName} size={size} color={HomeIcon} />
                
              </View>)
          },
          tabBarActiveTintColor: AppTheme.BackgroundColor,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Dashboard" component={User} />
        <Tab.Screen name="History" component={User} />
        <Tab.Screen name="Favorite" component={User} />
        <Tab.Screen name="Profile" component={User} />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingVertical: 10,
      marginTop: 40,
    },
    title: {
      flex: 2,
      justifyContent: "center",
    },
    titleText: {
      fontSize: 30,
      fontWeight: "800",
      color: AppTheme.BackgroundColor,
    },
    search: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    searchInput: {
      padding: 5,
      backgroundColor: "white",
      paddingLeft: 20,
      borderRadius: 12,
      marginTop: 10,
      width: "100%",
    },
    category: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: 10,
    },
    itemsContainer: {
      marginTop: 10,
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
      paddingLeft: 20,
    },
    item: {
      height: "75%",
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: "white",
    },
    itemImage: {
      marginBottom: 10,
    },
    bottomNav: {
      width: "100%",
      // position: "absolute",
      // bottom: 0,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      // padding: 15,
    },
  });

export default UserTab