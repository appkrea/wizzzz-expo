import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';

import { AppContext } from './../../providers/AppProvider';

const HomeScreen = ({ navigation }) => {
  const app = useContext(AppContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Řidič {app.state.driver}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Orders')}
      />
    </View>
  );
}

export default HomeScreen;
