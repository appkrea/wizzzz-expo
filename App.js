import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppProvider from './providers/AppProvider';

import OrderScreen from './src/screens/OrderScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => (
  <AppProvider>
    <StatusBar style="dark" />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Orders" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </AppProvider>
)

export default App;
