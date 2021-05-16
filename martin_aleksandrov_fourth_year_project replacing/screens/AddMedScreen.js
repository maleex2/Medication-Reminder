import React, { useState, useRef} from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet, FlatList
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import {useDispatch} from 'react-redux'
import * as medActions from '../store/actions'
import AddMedStack from "./AddMedStack"

const AddMedScreen = props => {
  return (
   
      <View style={styles.form}>
        <AddMedStack/>
      </View>
   
    
  );

}



const styles = StyleSheet.create({
    form: {
      margin: 30,
      flex: 1
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
      paddingHorizontal: 2,
      width: '60%'
    },
    page: {
      
      alignItems: 'center',
    },
  });

export default AddMedScreen;
