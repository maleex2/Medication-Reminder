import React, {useEffect, useState}from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import * as Notifications from 'expo-notifications';
import CancelNotification from "../components/CancelNotification"
import AsyncStorage from '@react-native-async-storage/async-storage';


function Notification(props) {
  const time = props.time;
  const medId = props.id;
  const storageKey = "" + time + medId + "";
  const title = props.params.medTitle;
  const medData = props.params;

  useEffect(() => {
    console.log("notification uEffect props:",props)
  }, []);
  

  let identifier;

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    },
  });

  

  async function triggerNotificationHandler() {
    // Prepare alarm time for the medication object: "10:50" is split and parsed as integers
    const hourAlarm = parseInt(time.split(":")[0], 10);
    const minuteAlarm = parseInt(time.split(":")[1], 10);
    identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "💊 Time for your medications! 💊",
        subtitle: time,
        body: "Take " + title,
        data: {
          data: medData, // Sending the medication data along with the notification for the Alarm screen
        },
      },
      trigger: {
        hour: hourAlarm,  //Exact time for the notification specified to be triggered daily
        minute: minuteAlarm,
        repeats: true,
      },
    });
    // Declaration of storageKey is: storageKey = "" + time + medId + "";
    try { 
      await AsyncStorage.setItem(storageKey, identifier);
    } catch (e) {
      console.log(e);
    }
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      console.log(keys);
    } catch (e) {
      console.log(e);
    }
  }
  
  //save med button or activate button
  return (
    <View>
      <Button
        title="Activate"
        onPress={() => {
          triggerNotificationHandler();
          props.onSelect();
        }}
      />
    </View>
  );
}

    //new Date(Date.now() + 60*1000); would be  1 min ahead in time
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Notification;


  // useEffect(() => {
  //   const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log("b in notification", response);
  //     }
  //   );

  //   const foregroundSubscription = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       console.log("f in notification", notification);
  //     }
  //   );

  //   return () => {
  //     backgroundSubscription.remove(); // fix with new docs avoid memory leaks
  //     foregroundSubscription.remove();
  //   };
  // }, []);