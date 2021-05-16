import React, { useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {  ProgressChart} from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

 function ProgressScreen({navigation}) {

  let all = 0, skiped = 0, taken = 0;
  const [allV, setAllV] = useState(0);
  const [skipedV, setSkipedV] = useState(0);
  const [takenV, setTakenV] = useState(0);
  let values;
  let progress;
  let keys = [];
  const [progressV, setprogressV] = useState(0);
  useEffect(() => {
    async function fetchAsync() {
      const unsubscribe = navigation.addListener('focus', async () => {
      try {
        keys = await AsyncStorage.getAllKeys();
        values = await AsyncStorage.multiGet(keys);
        progress = values.filter(e => (isNaN(e[0].charAt(0))));
        all = 0, skiped = 0, taken = 0;
        for(var i = 0; i<progress.length;i++){
          all += parseInt(progress[i][1].charAt(1),10) 
          taken += parseInt(progress[i][1].charAt(3),10)
          skiped += parseInt(progress[i][1].charAt(5),10)
        }
        setAllV(all);
        setSkipedV(skiped);
        setTakenV(taken);
        
          
      } catch (e) {
        console.log(e)
      }
      
         // saving progress for each med by title
        });
        
    
    };
    
    fetchAsync();
    
}, []);

useEffect(() => {
  if(allV!=0&&takenV!=0){
    setprogressV(takenV/allV*100)
  }
}, [allV,takenV]);

const data = {
  labels: ["Progress"], // optional
  data: [progressV/100]
};
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#fff",
  backgroundGradientToOpacity: 0,
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(114, 176, 73, ${opacity})`,
  strokeWidth: 1, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

    return (
      <View style={styles.progressContainer}>
        
        <Text style={styles.text}>Your Progress:</Text>

        <Text style={styles.text}>{progressV.toFixed()}%</Text>
        <ProgressChart
          data={data}
          width={350}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={true}
        />
        <Text style={styles.textBelow}>You have {skipedV} skipped medications</Text>
        <Text style={styles.textBelow}> and {takenV} marked as taken</Text>
      </View>
    );
}


const ProgressStack = createStackNavigator();

export default function ProgressStackScreen() {
  return (
    <ProgressStack.Navigator >
      <ProgressStack.Screen name="Progress" component={ProgressScreen} />
    </ProgressStack.Navigator>
  );
}

const styles = StyleSheet.create({
    progressContainer: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: 'black',
      fontSize: 22,
      margin: 10,
    },
    textBelow: {
      color: 'black',
      fontSize: 18,
      margin: 7,
    }
  });


