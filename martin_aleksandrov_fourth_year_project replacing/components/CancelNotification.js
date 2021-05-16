import React, {useEffect}from 'react'
import {StyleSheet, Button,Text } from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import * as Notifications from 'expo-notifications';
import * as medActions from "../store/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


function CancelNotification(props) {
  const time = props.alarm;
  const medId = props.id;
  const storageKey = ""+time+medId+"";
  const dispatch = useDispatch();
  let identifier;
  //const identifier = props.identifier;
  useEffect(() => {
    // console.log("identifier is:" , identifier)
  }, []);

      
  async function cancelNotification() {
        //acquire the notification id stored in AsyncStorage to remove it
        try {

          identifier = await AsyncStorage.getItem(storageKey);

          await Notifications.cancelScheduledNotificationAsync(identifier);
          removeFromAsync(storageKey);
          //del from home table 
        } catch(e) {
          console.log(e)
        }
        
        
        
        
      }

    async function removeFromAsync(id) {
      try {
        await AsyncStorage.removeItem(id);
      } catch (e) {
        console.log(e);
      }

      let keys = [];
      try {
        keys = await AsyncStorage.getAllKeys();
        //await AsyncStorage.multiRemove(keys)
      } catch (e) {
        // read key error
      }

      console.log(keys);
    }


      
    return (
      <TouchableOpacity
      style={styles.removeButton}
      onPress={() => {props.onSelect(), cancelNotification();

      }}
    >
      <Text style={styles.removeButtonText}>Remove Time</Text>
    </TouchableOpacity>
            
            
        
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeButton: {
      elevation: 3,
      backgroundColor: "#D98880",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginBottom: 8
    },
    removeButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
    }
  });

export default CancelNotification;
