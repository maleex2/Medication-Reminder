import React, {useEffect} from 'react';
import { View,SafeAreaView, Text, StyleSheet, Button,  StatusBar } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';
import AddMedScreen from '../screens/AddMedScreen';
import AddMedStack from "./AddMedStack"
import MedDetailsScreen from '../screens/MedDetailsScreen';
import AlarmScreen from '../screens/AlarmScreen';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {useSelector,useDispatch} from 'react-redux'
import HomeStack from './HomeScreen'

import MedItem from '../components/MedItem';
import Notification from '../components/Notification';

import * as medsActions from '../store/actions'
import * as Notifications from 'expo-notifications';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {init} from '../database/db'


const MedicationsScreen = props=> {
  

  const medications = useSelector(state=>state.meds.meds); //redux function hook
  const dispatch = useDispatch();

  useEffect(() => {
    init();
  }, []);

// notification to screen






    return (
      
      <SafeAreaView style={styles.medContainer}>
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <MedItem
              title={itemData.item.title}
              onSelect={() => {
                props.navigation.navigate("Details", {
                  medTitle: itemData.item.title,
                  medId: itemData.item.id,
                  medForm: itemData.item.form,
                  medStrength: itemData.item.strength,
                  medStrengthValue: itemData.item.strengthValue,
                  medQuantity: itemData.item.quantity,
                  medQuantityValue: itemData.item.quantityValue,
                  medAlarm1: itemData.item.alarm1,
                  medAlarm2: itemData.item.alarm2,
                  medAlarm3: itemData.item.alarm3,
                  medReason: itemData.item.reason,
                  medInstructions: itemData.item.instructions,
                });
              }}
            />
          )}
        />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              props.navigation.navigate("Add a Medication");
            }}
          >
            <Text style={{color: "white",fontSize: 17}}><MaterialCommunityIcons name="plus" size={19} /> Add a medication</Text>
          </TouchableOpacity>
         
      </SafeAreaView>
    );
}






const MedsStack = createStackNavigator();

export function MedStackScreen() {
  return (
    <MedsStack.Navigator >
      <MedsStack.Screen name="Medications" component={MedicationsScreen} />
      <MedsStack.Screen name="Details" component={MedDetailsScreen}  options={{title: 'Details' }}/> 
      <MedsStack.Screen name="Add a Medication" component={AddMedStack} options={{headerShown: false}}/>

      <MedsStack.Screen name="Alarm" component={AlarmScreen} options={{
            title: 'Alarm',
            headerLeft: null
          }}/>
      
    </MedsStack.Navigator>
  );
}

const styles = StyleSheet.create({
    medContainer: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      margin: 20,
    },
    button: {
      alignSelf:'flex-end',
      height: 100,
    },
    addButton: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'steelblue',
    },
  });


export default MedStackScreen;