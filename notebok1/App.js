
import React from 'react';
import {

  View,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { NavigationContainer, StackActions,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/Home';
import CountryScreen from './screens/CountryDetails';
import MapScreen from './screens/Map';

const Stack = createStackNavigator();
 
 
const App = () => {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="CountryDetails" component={CountryScreen} />
       <Stack.Screen name="Map" component={MapScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}


export default App;
