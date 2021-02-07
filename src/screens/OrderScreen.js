import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { AppContext } from './../../providers/AppProvider';

const OrderScreen = ({ navigation }) => {
  const app = useContext(AppContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen {app.state.driver}</Text>
    </View>
  );
}

export default OrderScreen;
