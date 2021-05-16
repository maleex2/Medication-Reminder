import React, { useEffect, useState } from 'react'
import { Button } from 'react-native';
import { View, Text, StyleSheet, SafeAreaView, ScrollView,Alert } from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import DatePicker from 'react-native-modern-datepicker';
import * as medsActions from '../store/actions'
import Constants from 'expo-constants';

import Notification from "../components/Notification"
import CancelNotification from "../components/CancelNotification"
import {fetchMeds} from '../database/db'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withTheme } from 'react-native-elements';

//active and reasons are swaped?
function MedDetailScreen(props) {
  const dispatch = useDispatch();
  const [medTitle, setMedTitle] = useState(props.route.params.medTitle);
  const [alarm1Value, setAlarm1Value] = useState(props.route.params.medAlarm1);
  const [alarm2Value, setAlarm2Value] = useState(props.route.params.medAlarm2);
  const [alarm3Value, setAlarm3Value] = useState(props.route.params.medAlarm3);
  if(alarm1Value==="-") {setAlarm1Value(null)}
  if(alarm2Value==="-") {setAlarm2Value(null)}
  if(alarm3Value==="-") {setAlarm3Value(null)}
  const medId = props.route.params.medId;
  const [show, setShow] = useState(false);
  const [newTime, setNewTime] = useState("00:00");
  const [alarmId, setAlarmId] = useState(1);
  const [alarm1, setAlarm1] = useState(null);
  const [alarm2, setAlarm2] = useState(null);
  const [alarm3, setAlarm3] = useState(null);

  


  const cancelAlert = () => {
    alert('Alarm removed');
  };
  const addAlert = () => {
    alert('Alarm was set');
  };
  const delAlert = () => {
    alert('Medication removed');
  };

  useEffect(() => {
    fetchMeds();
  }, []);
  
  useEffect(() => {
    if(alarm1Value!==null){
      setAlarm1(
        <View>
          <Text style={styles.label}>{alarm1Value}</Text>
          <CancelNotification id={props.route.params.medId} alarm={props.route.params.medAlarm1} onSelect={()=>{
            dispatch(medsActions.updateAlarm1("-",medId));
            progressDelete();
            setAlarm1Value(null)
            cancelAlert();
          }}/>
        </View>
      );
    } else {
      setAlarm1(<View><Text style={styles.label}>-</Text>

      <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setShow(!show);
                setAlarmId(1);
      
              }}
            >
              <Text style={styles.addButtonText}>Add Time</Text>
            </TouchableOpacity>
      
      </View>) 
    }
   
  }, [alarm1Value]);

  useEffect(() => {
    if(alarm2Value!==null){
      setAlarm2(
        <View>
          <Text style={styles.label}>{alarm2Value}</Text>
          <CancelNotification id={props.route.params.medId} alarm={props.route.params.medAlarm2} onSelect={()=>{
            dispatch(medsActions.updateAlarm2("-",medId));
            progressDelete();
            setAlarm2Value(null)
            cancelAlert();
          }}/>
        </View>
      );
    } else {
      setAlarm2(<View><Text style={styles.label}>-</Text><TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setShow(!show);
          setAlarmId(2);

        }}
      >
        <Text style={styles.addButtonText}>Add Time</Text>
      </TouchableOpacity></View>) 
    }
   
  }, [alarm2Value]);

  useEffect(() => {
    if(alarm3Value!==null){
      setAlarm3(
        <View>
          <Text style={styles.label}>{alarm3Value}</Text>
          <CancelNotification id={props.route.params.medId} alarm={props.route.params.medAlarm3} onSelect={()=>{
            dispatch(medsActions.updateAlarm3("-",medId));
            progressDelete();
            setAlarm3Value(null)
            cancelAlert();
          }}/>
        </View>
      );
    } else {
      setAlarm3(<View><Text style={styles.label}>-</Text><TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setShow(!show);
          setAlarmId(3);

        }}
      >
        <Text style={styles.addButtonText}>Add Time</Text>
      </TouchableOpacity></View>) 
    }
   
  }, [alarm3Value]);
 
  

async function progressAdd() {
  try {
    let progress = JSON.parse(await AsyncStorage.getItem(medTitle));
    console.log("ADD: progress for ", medTitle," is: ",progress)
    progress[0]++;
    console.log("ADD: progress for ", medTitle," is: ",progress)
    await AsyncStorage.setItem(medTitle, JSON.stringify(progress));
    //add to homeTable the alarm, name, form etc
  } catch (e) {
    console.log(e);
  }
}

async function progressDelete() {
  try {
    let progress = JSON.parse(await AsyncStorage.getItem(medTitle));
    console.log("DELETE: progress for ", medTitle," is: ",progress)
    if(progress[0]>0){
      progress[0]--;
    }
    console.log("DELETE: progress for ", medTitle," is: ",progress)
    await AsyncStorage.setItem(medTitle, JSON.stringify(progress));
    //add to homeTable the alarm, name, form etc
  } catch (e) {
    console.log(e);
  }
}
  
  

  async function updateHandler() {
    
    if(alarmId === 1){
      dispatch(medsActions.updateAlarm1(newTime,medId));
      addAlert();
        setShow(!show)
        setAlarm1(<Text>{newTime} </Text>) 
        setAlarm1Value(newTime)
        progressAdd();
        
    } else if (alarmId===2){
      dispatch(medsActions.updateAlarm2(newTime,medId));
      addAlert();
        setShow(!show)
        setAlarm2(<Text>{newTime} </Text>) 
        setAlarm2Value(newTime)
        progressAdd();
    }else if (alarmId===3){
      dispatch(medsActions.updateAlarm3(newTime,medId));
      addAlert();
      setShow(!show)
      setAlarm3(<Text>{newTime} </Text>) 
      setAlarm3Value(newTime) 
      progressAdd();
    }
    //add modal here maybe or timewait/spinner
  }
 
 

  
  useEffect(() => {
    
  }, []);

  const deleteHandler =()=>{
    Alert.alert(
      "Are you sure you want to delete this medication?",
      "The information about it will be lost.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(medsActions.deleteMed(medId));
            props.navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
    
  }
    
   
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.text}>
            <Text style={styles.label}>
              Name: {medTitle}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteHandler}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Form: {props.route.params.medForm}</Text>
          <Text style={styles.label}>Strength: {props.route.params.medStrengthValue} {props.route.params.medStrength}</Text>
          <Text style={styles.label}>Reason: {props.route.params.medReason}</Text>
          <Text style={styles.label}>
            Dosage: {props.route.params.medQuantityValue} {}
            {props.route.params.medQuantity}
          </Text>
          <View
            style={{
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              marginBottom: 10
            }}
          />
          <Text style={styles.label}>Reminders times: </Text>
          {alarm1}
          {alarm2}
          {alarm3}

          <View style={!show ? { display: "none" } : {}}>
            <DatePicker
              mode="time"
              minuteInterval={1}
              onTimeChange={(selectedTime) => setNewTime(selectedTime)}
            />
            <Notification
              id={props.route.params.medId}
              params={props.route.params}
              time={newTime}
              onSelect={() => {
                updateHandler();
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      elevation: 8,
      
      marginTop: Constants.statusBarHeight, 
    },
    scrollView: {
      backgroundColor: '#f2f2f2',
      marginHorizontal: 20,
      
      
    },
    text: {
      flexDirection: "row", 
      justifyContent:'space-between',
      fontSize: 17
    },
    label: {
      fontSize: 19,
      marginBottom: 15,
    },
    deleteButton: {
      alignSelf: "flex-end",
      elevation: 8,
      backgroundColor: "#FF5733",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    deleteButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
    },
    addButton: {
      elevation: 3,
      backgroundColor: "#58D68D",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginBottom: 8
    },
    addButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
    },
    
  });

export default MedDetailScreen;
