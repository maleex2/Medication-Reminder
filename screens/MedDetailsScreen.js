import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function MedDetailScreen() {

    return (
        <View style={styles.container}>
            <Text>Details</Text>
        </View>
    );
}

MedDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('medTitle')
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default MedDetailScreen;
