import React, {useEffect}from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

function AlarmScreen(props) {
  const title = props.route.params.medTitle;
  const form = props.route.params.medForm;
  const quantity = props.route.params.medQuantity;
  const quantityValue = props.route.params.medQuantityValue;
  const strength = props.route.params.medStrength;
  const strengthValue = props.route.params.medStrengthValue;
  const alarm = props.route.params.medAlarm
    
    async function skipHandler() {
      Alert.alert(
        "Are you sure you want skip taking this medication?",
        "Do you want to contiue?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              props.navigation.navigate("Home");
              try {
                let progress = JSON.parse(await AsyncStorage.getItem(title));
                console.log("take: progress for ", title," is: ",progress)
                progress[2]++;
                console.log("TAKE: progress for ", title," is: ",progress)
                await AsyncStorage.setItem(title, JSON.stringify(progress));
                //add to homeTable the alarm, name, form etc
              } catch (e) {
                console.log(e);
              }
            },
          },
        ],
        { cancelable: false }
      );
    }

    
    
      return (
        <View style={styles.container}>
          <View style={styles.textInstructions}>
            <Text style={styles.label}>
              Take {quantityValue} {quantity}
            </Text>
          </View>

          <View style={styles.text}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.labelRight}>{title}</Text>
          </View>

          <View style={styles.text}>
            <Text style={styles.label}>Scheduled time:</Text>
            <Text style={styles.labelRight}>{alarm}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Dosage:</Text>
            <Text style={styles.labelRight}>
              {strengthValue} {strength}
            </Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.takeButton}
              onPress={async () => {
                props.navigation.navigate("Home");
                try {
                  let progress = JSON.parse(await AsyncStorage.getItem(title));
                  console.log("SKIP: progress for ", title, " is: ", progress);
                  progress[1]++;
                  console.log("SKIP: progress for ", title, " is: ", progress);
                  await AsyncStorage.setItem(title, JSON.stringify(progress));
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <Text style={styles.takeButtonText}>Take</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={skipHandler}>
              <Text style={styles.deleteButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      justifyContent: 'center',
      margin: 30
    },
    text: {
      flexDirection: "row", 
      justifyContent:'space-between',
      fontSize: 17
    },
    labelRight: {
      alignSelf: "flex-end",
      fontSize: 19,
      marginBottom: 15,
    },
    label: {
      fontSize: 19,
      marginBottom: 15,
    },
    textInstructions: {
      marginBottom: 25,
      fontSize: 17,

    },
    deleteButton: {
      alignSelf: "flex-end",
      elevation: 8,
      backgroundColor: "#E74C3C",
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
    takeButton: {
      elevation: 3,
      backgroundColor: "#58D68D",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginBottom: 8
    },
    takeButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
    },
    row: {
      flexDirection: "row", 
      justifyContent:'space-around',
      marginTop: 20
    },
  });

export default AlarmScreen
