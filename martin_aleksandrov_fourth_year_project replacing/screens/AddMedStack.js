import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  TextInput,
  Alert ,TouchableOpacity
} from "react-native";

import * as medActions from "../store/actions";
import { useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";

import { createStackNavigator } from "@react-navigation/stack";

import { CommonActions } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


// commit first

const AddMedsStack = createStackNavigator();

function AddMedStack(props) {
  return (
    <AddMedsStack.Navigator mode="modal">
      <AddMedsStack.Screen
        name="Name"
        component={NameScreen}
        // options={{
        //   headerStyle: {
        //     backgroundColor: "aliceblue",
        //   },
        // }}
      />
      <AddMedsStack.Screen name="Form" component={FormScreen} />
      <AddMedsStack.Screen name="Strength" component={StrengthScreen} />
      <AddMedsStack.Screen name="Reason" component={ReasonScreen} />
      <AddMedsStack.Screen name="Quantity" component={QuantityScreen} />
      <AddMedsStack.Screen name="Preview" component={ShowDetailsScreen} />
    </AddMedsStack.Navigator>
  );
}

export default AddMedStack;

function NameScreen(props) {
  const [titleValue, setTitleValue] = useState("");
  const titleChangeHandler = (text) => {
    // add validation
    setTitleValue(text);
  };

  const onPressHandler = () =>{
      //Check for the Name TextInput
      if (titleValue==="") {
        Alert.alert('Please Enter A Name',"Name must be filled out",);
        return;
      }
      //Checked Successfully
      props.navigation.navigate("Form", {
        title: titleValue,
      });
    };
  return (
    <View style={styles.form}>
      <Text style={styles.label}>Name of the med</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={titleChangeHandler}
        value={titleValue}
        autoFocus={true}
        maxLength={25}
      />
      <TouchableOpacity
            style={styles.nextButton}
            onPress={onPressHandler}
          >
            <Text style={{color: "white",fontSize: 17}}>Next</Text>
          </TouchableOpacity>
    </View>
  );
}

function FormScreen(props) {
  const name = props.route.params.title;
  const [form, setForm] = useState("Pill");

  return (
    <View style={styles.form}>
      <Picker
        selectedValue={form}
        style={{
          marginLeft: 20,
          marginBottom: -10,
          height: 80,
          width: "40%",
          transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
        }}
        onValueChange={(itemValue) => setForm(itemValue)}
        itemStyle={{ height: 80, transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
      >
        <Picker.Item style={{ fontSize: 18 }} label="Pill" value="Pill" />
        <Picker.Item label="Solution" value="Solution" />
        <Picker.Item label="Injection" value="Injection" />
        <Picker.Item label="Powder" value="Powder" />
        <Picker.Item label="Drops" value="Drops" />
        <Picker.Item label="Inhaler" value="Inhaler" />
      </Picker>
      <View
  style={{
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 35,
    paddingVertical: 4,
    paddingHorizontal: 2,
    width: "60%",
  }}
/> 
      {/* <Button
        title="Next"
        onPress={()=>{
          props.navigation.navigate("Strength", {
            title: name,
            form: form,
          })
        }}
      /> */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          props.navigation.navigate("Strength", {
            title: name,
            form: form,
          });
        }}
      >
        <Text style={{ color: "white", fontSize: 17 }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

function StrengthScreen(props) {
  const name = props.route.params.title;
  const form = props.route.params.form;
  const [strength, setStrength] = useState("mg");
  const [strengthValue, setStrengthValue] = useState("");
  const strengthChangeHandler = (text) => {
    // add validation
    setStrengthValue(text);
  };

  const onPressHandler = () =>{
    //Check for the TextInput
    if (strengthValue==="") {
      Alert.alert('Please enter Strength',"Medication's strength must be filled out",);
      return;
    }
    //Checked Successfully
    props.navigation.navigate("Reason", {
      title: name,
      form: form,
      strength: strength,
      strengthValue: strengthValue
    });
  };
  return (
    <View style={styles.form}>
      <Text style={styles.label}>Strength</Text>
      <TextInput
        numeric
        keyboardType={"numeric"}
        onChangeText={strengthChangeHandler}
        value={strengthValue}
        style={styles.textInput}
        autoFocus={true}
        maxLength={25}
      />

      <Picker
        selectedValue={strength}
        onValueChange={(itemValue) => setStrength(itemValue)}
        style={{
          marginLeft: 20,
          marginBottom: -10,
          height: 80,
          width: "40%",
          transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
        }}
        itemStyle={{ height: 80,width: 100, transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
      >
        <Picker.Item label="mg" value="mg" />
        <Picker.Item label="g" value="g" />
        <Picker.Item label="ml" value="ml" />
        <Picker.Item label="ui" value="ui" />
        <Picker.Item label="µg" value="µg" />
        <Picker.Item label="µL" value="µL" />
      </Picker>
      <View
  style={{
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 35,
    paddingVertical: 4,
    paddingHorizontal: 2,
    width: "60%",
  }}
/> 
      <TouchableOpacity style={styles.nextButton} onPress={onPressHandler}>
        <Text style={{ color: "white", fontSize: 17 }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

function ReasonScreen(props) {
  const name = props.route.params.title;
  const form = props.route.params.form;
  const strength = props.route.params.strength;
  const strengthValue = props.route.params.strengthValue;
  const [reason, setReason] = useState("");
  const titleChangeHandler = (text) => {
    // add validation
    setReason(text);
  };

  const onPressHandler = () =>{
    //Check for the TextInput
    if (reason==="") {
      Alert.alert('Please enter Reason',"Reason must be filled out",);
      return;
    }
    //Checked Successfully
    props.navigation.navigate("Quantity", {
      title: name,
      form: form,
      strength: strength,
      strengthValue: strengthValue,
      reason: reason
    });
  };
  
  return (
    <View style={styles.form}>
      <Text style={styles.label}>Reason</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={titleChangeHandler}
        value={reason}
        autoFocus={true}
        maxLength={35}
      />
      <TouchableOpacity
            style={styles.nextButton}
            onPress={onPressHandler}
          >
            <Text style={{color: "white",fontSize: 17}}>Next</Text>
          </TouchableOpacity>
    </View>
  );
}


function QuantityScreen(props) {
  const title = props.route.params.title; // use of kname is deprecated
  const form = props.route.params.form;
  const strength = props.route.params.strength;
  const strengthValue = props.route.params.strengthValue;
  const reason = props.route.params.reason;
  const [quantityValue, setQuantitythValue] = useState("");
  const quantityChangeHandler = (text) => {
    // add validation
    setQuantitythValue(text);
  };
  const [quantity, setQuantity] = useState("Application(s)");
  
  const onPressHandler = () =>{
    //Check for the TextInput
    if (quantityValue==="") {
      Alert.alert('Please Enter Dosage',"Medicine's dosage must be filled out",);
      return;
    }
    //Checked Successfully
    props.navigation.navigate("Preview", {
      title: title,
      form: form,
      strength: strength,
      strengthValue: strengthValue,
      reason: reason,
      quantity: quantity,
      quantityValue: quantityValue
    });
  };



  return (
    <View style={styles.form}>
      <Text style={styles.label}>Dosage</Text>
      <TextInput
        numeric
        keyboardType={"numeric"}
        onChangeText={quantityChangeHandler}
        value={quantityValue}
        style={styles.textInput}
        autoFocus={true}
        maxLength={25}
      />

      <Picker
        selectedValue={quantity}
        onValueChange={(itemValue) => setQuantity(itemValue)}
        style={{
          marginLeft: 30,
          marginBottom: -10,
          height: 80,
          width: "75%",
          transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
        }}
        itemStyle={{ height: 80,width: 100, transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
      >
        <Picker.Item label="Application(s)" value="Application(s)" />
        <Picker.Item label="Drop(s)" value="Drop(s)" />
        <Picker.Item label="Cup(s)" value="Cup(s)" />
        <Picker.Item label="Injection(s)" value="Injection(s)" />
        <Picker.Item label="Inhale(s)" value="Inhale(s)" />
        <Picker.Item label="Capsule(s)" value="Capsule(s)" />
        <Picker.Item label="Spray(s)" value="Spray(s)" />
        <Picker.Item label="IU" value="IU" />
        <Picker.Item label="mg" value="mg" />
        <Picker.Item label="ml" value="ml" />
        <Picker.Item label="g" value="g" />
        
      </Picker>
      <View
  style={{
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 35,
    paddingVertical: 4,
    paddingHorizontal: 2,
    width: "60%",
  }}
/> 

      <TouchableOpacity style={styles.nextButton} onPress={onPressHandler}>
        <Text style={{ color: "white", fontSize: 17 }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}


function ShowDetailsScreen(props) {
  const title = props.route.params.title; // use of name is deprecated
  const form = props.route.params.form;
  const strength = props.route.params.strength;
  const strengthValue = props.route.params.strengthValue;
  const reason = props.route.params.reason;
  const quantity = props.route.params.quantity;
  const quantityValue = props.route.params.quantityValue;
  //hardcode the rest of the values for the DataBase
  const alarm1 = "-";
  const alarm2 = "-";
  const alarm3 = "-";
  const instructions = "instructions"

  const alert = () =>
  Alert.alert(
    "Are you sure you want to cancel?",
    "The information you typed will be lost.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => cancelHandler() }
    ],
    { cancelable: false }
  );

  //save med button actions
    const dispatch = useDispatch();

   async function saveMedHandler() {
    dispatch(medActions.addMed(
      title,
      form,
      strength,
      strengthValue,
      quantity,
      quantityValue,
      alarm1,
      alarm2,
      alarm3,
      reason, 
      instructions));
      let titleAsync = ""+title+"";
      try {
        await AsyncStorage.setItem(titleAsync, "[0,0,0]");
        //add to homeTable the alarm, name, form etc
      } catch (e) {
        console.log(e);
      }
      let keys = [];
      try {
        keys = await AsyncStorage.getAllKeys();
        console.log(keys);
      } catch (e) {
        // read key error
      }
    //add modal here maybe or timewait/spinner
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },
        ],
      })
    )  
   
  }

  const  cancelHandler = () => {
    
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },
        ],
      })
    ) 
    
  }



  return (
    <View style={styles.form}>
      <View style={styles.text}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.labelRight}>{title}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Form:</Text>
            <Text style={styles.labelRight}>{form}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Strength:</Text>
            <Text style={styles.labelRight}>{strengthValue} {strength}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Quantity:</Text>
            <Text style={styles.labelRight}>{quantityValue} {quantity}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.label}>Reason:</Text>
            <Text style={styles.labelRight}>{reason}</Text>
          </View>
       
      <Text style={styles.labelExplanation}>You will be able to add alarms from the Medications tab.</Text>
      {/* <Button title="Save Medication" onPress={saveMedHandler} /> */}
      <TouchableOpacity
            style={styles.saveButton}
            onPress={saveMedHandler}
          >
            <Text style={{color: "white",fontSize: 17}}>Save Medication</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={alert}
          >
            <Text style={{color: "white",fontSize: 17}}>Cancel</Text>
          </TouchableOpacity>

      {/* saveMedHandler 
      expo has a bug so I left the tab/stack nested navigatior this way
      i was adding the alarms before saving the med, but they still dont have an id 
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
    flex: 1,
  },
  label: {
    fontSize: 19,
    marginBottom: 15,
  },
  labelExplanation: {
    fontSize: 17,
    marginBottom: 15,
    marginTop: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    width: "60%",
    fontSize: 20,
  },
  selector: {
    width: "60%",
  },
  page: {
    alignItems: "center",
  },
  button: {
    alignSelf:'flex-end',
    height: 100,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'steelblue',
    marginTop: 25,
    marginBottom: 15
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'steelblue',
    marginTop: 25,
    marginBottom: 15
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F08080',
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

});

