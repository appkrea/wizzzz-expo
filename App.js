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
    <StatusBar style="light" />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{
            title: 'Wizz',
            headerStyle: {
              backgroundColor: '#B81D26',
            },
            headerTintColor: 'whitesmoke',
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            title: 'Objednávka',
            headerStyle: {
              backgroundColor: '#B81D26',
            },
            headerTintColor: 'whitesmoke',
          }} name="Order"
          component={OrderScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </AppProvider>
)

export default App;
