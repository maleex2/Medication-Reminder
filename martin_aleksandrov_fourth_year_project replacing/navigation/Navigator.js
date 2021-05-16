import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import HomeStackScreen from '../screens/HomeScreen';
import AddMedScreen from '../screens/AddMedScreen';
import MedDetailsScreen from '../screens/MedDetailsScreen';
import MedStackScreen from '../screens/MedicationsScreen';
import ProgressStackScreen from '../screens/ProgressScreen';

import { Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NavigationEvents } from 'react-navigation';


const Tab = createBottomTabNavigator();
 

function Navigation() {
  function getTabBarVisible(route) {
    const routeName = getFocusedRouteNameFromRoute(route);
  
    if (routeName === 'Alarm') {
      return false;
    }
    return true;
  }
 

    return (
      <NavigationContainer>
      
        <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: 'steelblue',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisible(route),
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          })}
        />
        <Tab.Screen
          name="Medications"
          component={MedStackScreen}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisible(route),
            title: 'Medications',
            tabBarLabel: 'Medications',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="pill" color={color} size={size} />
            ),
          })}
        />
     
        <Tab.Screen
          name="Progress"
          component={ProgressStackScreen}
          options={{
            tabBarLabel: 'Progress',
            
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      </NavigationContainer>
      
     
    );
  }

  export default Navigation;
