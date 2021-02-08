import React, { useContext } from 'react';
import { View, Button, Text, FlatList, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';

import { AppContext } from './../../providers/AppProvider';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const app = useContext(AppContext);
  return (
    <View style={styles.container}>
      {
        app.state.deliveries && app.state.deliveries[app.state.driver].length > 0 ? (
          <>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderText}>
                Rozvozy pro řidiče {app.state.driver}
              </Text>
            </View>
            <FlatList
              data={app.state.deliveries[app.state.driver]}
              ItemSeparatorComponent={() => (<View style={styles.listSeparator} />)}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => navigation.navigate('Order', { order: item })}
                >
                  <View style={styles.orderItem}>
                    <Text style={[styles.orderItemText, styles.orderItemTextAddress]}>{item.address}</Text>
                    <Text style={[styles.orderItemText, styles.orderItemTextLocation]}>{item.location}</Text>
                    <Text style={[styles.orderItemText, styles.orderItemTextName]}>{item.name}</Text>
                    <Text style={[styles.orderItemText, styles.orderItemTextNote]}>{item.note || 'Žádná poznámka'}</Text>
                  </View>
                </TouchableHighlight>
              )}
              keyExtractor={item => item.id}
            />
          </>
        ) : (<Text>Žádné objednávky</Text>)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    width,
  },
  listHeader: {
    padding: 20,
    width,
    backgroundColor: '#FAB73D',
  },
  listHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  listSeparator: {
    height: 1,
    backgroundColor: 'black',
  },
  orderItem: {
    backgroundColor: 'white',
    width,
    padding: 20,
  },
  orderItemText: {
    fontSize: 25,
  },
  orderItemTextAddress: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  orderItemTextLocation: {
    fontSize: 20,
    marginBottom: 5,
  },
  orderItemTextName: {
    fontSize: 15,
    marginBottom: 10,
  },
  orderItemTextNote: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#B81D26',
  },
});

export default HomeScreen;
