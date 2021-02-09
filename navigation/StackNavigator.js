import {createAppContainer, createStackNavigator } from 'react-navigation'

import AddMedScreen from '../screens/AddMedScreen';
import MedDetailsScreen from '../screens/MedDetailsScreen';


const StackNav = createStackNavigator({
  Add: AddMedScreen,
  Details: MedDetailsScreen
});

export default createAppContainer(StackNav);