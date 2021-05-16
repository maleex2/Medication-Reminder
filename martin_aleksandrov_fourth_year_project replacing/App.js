import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './navigation/Navigator'
import { NavigationContainer } from '@react-navigation/native';

import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import medsReducer from './store/reducers';

import {init} from './database/db'


import registerForPushNotificationsAsync from './components/Notification';
import MedStackScreen from './screens/MedicationsScreen';

// DB and redux
init()
    .then(() => {
        console.log('Initialize Database')
    })
    .catch(err => {
        console.log('Initializing Database failed');
        console.log('err')
    })

const rootReducer = combineReducers({
  meds: medsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));









export default function App(props) {
  //notifications permission
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          throw new Error('Permission not granted!');
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then(response => {
        const token = response.data;
        
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }, []);

  
  


  return (
    <Provider store={store}>
      
      <Navigation />
      
     
    </Provider>
  );
}




