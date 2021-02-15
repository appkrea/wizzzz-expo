import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Text, FlatList, StyleSheet, Dimensions, TouchableHighlight, Image } from 'react-native';
import MapView, { Marker, AnimatedRegion, Animated } from 'react-native-maps';
const carIcon = require('../images/car-icon.png');
// const map = require('./map.json');

import { AppContext } from './../../providers/AppProvider';

const { width } = Dimensions.get('window');

const ASPECT_RATIO = width / 400;
const LATITUDE_DELTA = 0.010;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 50.20137449,
    longitude: 15.83504256,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [heading, setHeading] = useState(0);

  const app = useContext(AppContext);

  useEffect(() => {
    if (app.state.location) {
      console.log(app.state.location);
      setLocation({
        latitude: parseFloat(app.state.location.coords.latitude),
        longitude: parseFloat(app.state.location.coords.longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      setHeading(parseFloat(app.state.location.coords.heading));
    }
  }, [app.state.location])
  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>
          Řidič {app.state.driver}
        </Text>
      </View>
      {
        app.state.deliveries && app.state.deliveries[app.state.driver].length > 0 ? (
          <>
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
        ) : (
            <Animated
              style={styles.map}
              showsTraffic={true}
              // customMapStyle={map}
              region={location}
              initialRegion={location}
            >
              <Marker coordinate={{ latitude: 50.20137449, longitude: 15.83504256 }} />
              <Marker coordinate={location} rotation={heading}>
                <Image
                  source={carIcon}
                  style={{ width: 50, height: 50 }}
                  resizeMode="center"
                />
              </Marker>
            </Animated>
          )
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
  map: {
    width,
    height: 400,
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
