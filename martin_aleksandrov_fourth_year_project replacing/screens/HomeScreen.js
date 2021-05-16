import React, {useEffect, useState}from 'react'
import { SafeAreaView,View, Text, StyleSheet, StatusBar } from 'react-native'

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {useSelector,useDispatch} from 'react-redux'

import AlarmScreen from './AlarmScreen';
import { createStackNavigator } from '@react-navigation/stack';

import * as medsActions from '../store/actions'
import { Button } from 'react-native';
import {fetchMeds} from '../database/db'

import { Avatar, ListItem } from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import {init} from '../database/db'

function HomeScreen(props) {
  const dispatch = useDispatch();
  let alarms = [];
  let alarms1 = [];
  let alarms2 = [];
  let alarms3 = [];
  const [icon, seticon] = useState("pill")
  const medications = useSelector(state=>state.meds.meds); //redux function hook
  useEffect(() => {
    dispatch(medsActions.loadMeds());
    
   
  }, [dispatch,medications]);
  
  if(medications){
    alarms1 = medications.filter(med => med.alarm1!=="-");
  alarms2 = medications.filter(med => med.alarm2!=="-");
  alarms3 = medications.filter(med => med.alarm3!=="-");
  alarms1.forEach(med => {
    alarms.push({
      id: med.id+"1",
      title: med.title,
      alarm: med.alarm1,
      form: med.form,
      quantity: med.quantity,
      quantityValue: med.quantityValue,
      strength: med.strength,
      strengthValue: med.strengthValue
    })
  });
  alarms2.forEach(med => {
    alarms.push({
      id: med.id+"2",
      title: med.title,
      alarm: med.alarm2,
      form: med.form,
      quantity: med.quantity,
      quantityValue: med.quantityValue,
      strength: med.strength,
      strengthValue: med.strengthValue
    })
  });
  alarms3.forEach(med => {
    alarms.push({
      id: med.id+"3",
      title: med.title,
      alarm: med.alarm3,
      form: med.form,
      quantity: med.quantity,
      quantityValue: med.quantityValue,
      strength: med.strength,
      strengthValue: med.strengthValue
    })
  });
  
  }

  
  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        console.log("medScreen, B response is:", notification) 
        props.navigation.navigate('Alarm', {
          medTitle: notification.notification.request.content.data.data.medTitle,
          medForm: notification.notification.request.content.data.data.medForm,
          medStrength: notification.notification.request.content.data.data.medStrength,
          medStrengthValue: notification.notification.request.content.data.data.medStrengthValue,
          medQuantity: notification.notification.request.content.data.data.medQuantity,
          medQuantityValue: notification.notification.request.content.data.data.medQuantityValue,
         medAlarm: notification.notification.request.content.subtitle
  
        });
      }
    );
  
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      
      (notification) => {
        console.log("medScreen, f response is:",notification)
        props.navigation.navigate("Alarm", {
          medTitle: notification.request.content.data.data.medTitle,
          medForm: notification.request.content.data.data.medForm,
          medStrength: notification.request.content.data.data.medStrength,
          medStrengthValue: notification.request.content.data.data.medStrengthValue,
          medQuantity: notification.request.content.data.data.medQuantity,
          medQuantityValue: notification.request.content.data.data.medQuantityValue,
          medAlarm: notification.request.content.subtitle
  
        });
      }
    );
    
    init();
    return () => {
      backgroundSubscription.remove(); // avoid memory leaks 
      foregroundSubscription.remove();
    };
  }, []);

  
  function picHandler(form){
    switch (form) {
      case 'Pill':
        return require('../assets/pill.png')
      case 'Drops':
        return require('../assets/drops.png')
      case 'Inhaler':
        return require('../assets/inhaler.png')
      case 'Injection':
        return require('../assets/injection.png')
      case 'Powder':
        return require('../assets/powder.png')
      case 'Solution':
        return require('../assets/solution.png')
      default:
        return require('../assets/solution.png')
    }
  }

    return (
      <SafeAreaView style={styles.homeContainer}>
        <Text style={styles.text}>Active Daily Alarms</Text>
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            
            <ListItem bottomDivider> 
            
            <Text style={styles.subtitle}>{itemData.item.alarm}</Text>
              <Avatar title="title" source={picHandler(itemData.item.form)}  /> 
              <ListItem.Content>
              
              <ListItem.Title>{itemData.item.title}</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}> {itemData.item.strengthValue} {itemData.item.strength}, take {itemData.item.quantityValue} {itemData.item.quantity}  </ListItem.Subtitle>
              
              </ListItem.Content>
              
            </ListItem>
            
          )}
        />

        
      </SafeAreaView>
    );
}


const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Alarm" component={AlarmScreen} options={{
            title: 'Alarm',
            headerLeft: null,

          }}/>
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    margin: 20,
  },
  subtitle: {
    fontSize: 15,
   },
   text:{
     padding: 3,
     fontSize: 17,
     fontWeight: 'bold'
   },
  
  });
