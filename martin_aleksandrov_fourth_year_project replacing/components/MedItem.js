import { Avatar, ListItem } from 'react-native-elements';
import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';

import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';


const MedItem = props => {
  
    return (
        
            <TouchableOpacity onPress={props.onSelect}>
                <ListItem bottomDivider> 
                    <ListItem.Content>
                        <ListItem.Title>{props.title}
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>
        
    )
}

export default MedItem;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      margin: 20,
    },
    subtitle: {
      fontSize: 15,
     },
     
    });