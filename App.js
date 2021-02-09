import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './navigation/Navigator'
import { NavigationContainer } from '@react-navigation/native';

import AddMedScreen from './screens/AddMedScreen';
import MedDetailsScreen from './screens/MedDetailsScreen';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import medsReducer from './store/reducers';

const rootReducer = combineReducers({
  meds: medsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {
  return (
    <Provider store={store}>
     <Navigation/>
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
