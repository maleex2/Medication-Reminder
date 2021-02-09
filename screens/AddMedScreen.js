import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import {useDispatch} from 'react-redux'
import * as medActions from '../store/actions'

const AddMedScreen = props => {

const [titleValue, setTitleValue] = useState('');

const dispatch = useDispatch();

  const titleChangeHandler = text => {
    // add validation
    setTitleValue(text);
  };

  const saveMedHandler = () => {
    dispatch(medActions.addMed(titleValue));
    props.navigation.goBack();
    
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />

        <Button title="Save Medication" onPress={saveMedHandler} />
      </View>
    </ScrollView>
  );

}



const styles = StyleSheet.create({
    form: {
      margin: 30
    },
    label: {
      fontSize: 18,
      marginBottom: 15
    },
    textInput: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      marginBottom: 15,
      paddingVertical: 4,
      paddingHorizontal: 2
    }
  });

export default AddMedScreen;
