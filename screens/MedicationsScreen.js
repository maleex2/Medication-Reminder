import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';
import AddMedScreen from '../screens/AddMedScreen';
import MedDetailsScreen from '../screens/MedDetailsScreen';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {useSelector} from 'react-redux'

import MedItem from '../components/MedItem'


const MedicationsScreen = props=> {
  const medications = useSelector(state=>state.meds.meds);
  console.log(medications);
    return (
        
        <View style={styles.container}>
          <FlatList data={medications} keyExtractor={item => item.id} renderItem={itemData => (
            <MedItem title={itemData.item.title} onSelect={()=>{
              
              props.navigation.navigate('Details', {
                medTitle: itemData.item.title,
                medId: itemData.item.id
              });
            }} />)}
          
             />
          <TouchableOpacity style={styles.button} >
            <Button title="Add a medication" onPress={() =>
               {props.navigation.navigate('Add a Medication')}} />
          </TouchableOpacity>
          
        </View>
        
    );
}






const MedsStack = createStackNavigator();

function MedStackScreen() {
  return (
    <MedsStack.Navigator>
      <MedsStack.Screen name="Medicationss" component={MedicationsScreen} />
      <MedsStack.Screen name="Details" component={MedDetailsScreen} />
      <MedsStack.Screen name="Add a Medication" component={AddMedScreen} />
      
    </MedsStack.Navigator>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
     
      alignSelf:'flex-end',
      
      height: 100,
    }
  });

export default MedStackScreen;