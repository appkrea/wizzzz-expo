import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { AppContext } from './../../providers/AppProvider';

const { width } = Dimensions.get('window');

const ASPECT_RATIO = width / 330;
const LATITUDE_DELTA = 0.0020; //Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const OrderScreen = ({ route, navigation }) => {
  const { order } = route.params;
  console.log(order);
  useEffect(() => {
    navigation.setOptions({
      title: order.address,
    });
  }, [])
  const app = useContext(AppContext);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: order.coords.lat,
          longitude: order.coords.lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Marker coordinate={{ latitude: order.coords.lat, longitude: order.coords.lng }} />
      </MapView>
      <View style={styles.details}>
        <View style={styles.detailName}>
          <Text style={styles.detailNameText}>{order.name}</Text>
        </View>
        <View style={styles.detailPayment}>
          <View>
            <Text style={styles.detailPaymentText}>{order.price},- Kč</Text>
          </View>
          <View>
            <Text style={styles.detailPaymentText}>{order.payment || ''} placeno</Text>
          </View>
        </View>
      </View>
      <View style={styles.detailProducts}>
            {order.filteredProducts.medium > 0 ? <Text style={styles.detailProductsText}>{`${order.filteredProducts.medium}x STŘ`}</Text> : null}
            {order.filteredProducts.large > 0 ? <Text style={styles.detailProductsText}>{`${order.filteredProducts.large}x VEL`}</Text> : null}
            {order.filteredProducts.burgers > 0 ?<Text style={styles.detailProductsText}>{`${order.filteredProducts.burgers}x BURGER`}</Text> : null}
            {order.filteredProducts.boxes > 0 ? <Text style={styles.detailProductsText}>{`${order.filteredProducts.boxes}x BOX`}</Text> : null}
            {order.filteredProducts.drinks > 0 ? <Text style={styles.detailProductsText}>{`${order.filteredProducts.drinks}x PITÍ`}</Text> : null}
        </View>
      <View style={styles.note}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.noteText}>{order.note || 'Žádná poznámka'}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={[styles.button, styles.buttonCall]}>
          <Text style={styles.buttonText}>VOLAT</Text>
        </View>
        <View style={[styles.button, styles.buttonDone]}>
          <Text style={styles.buttonText}>DORUČENO</Text>
        </View>
      </View>
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
    height: 330,
  },
  details: {
    backgroundColor: '#FAB73D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'whitesmoke',
    width,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  detailName: {
  },
  detailNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailPayment: {
    alignItems: 'center',
  },
  detailPaymentText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailProducts: {
    alignItems: 'center',
    width,
    flexDirection: 'row',
    backgroundColor: '#FAB73D',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: 'whitesmoke',
  },
  detailProductsText: {
    backgroundColor: 'gray',
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  note: {
    flex: 1,
    backgroundColor: '#FAB73D',
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttons: {
    backgroundColor: 'cyan',
    width,
    height: 120,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCall: {
    flex: 5,
    backgroundColor: '#3DC651',
  },
  buttonDone: {
    flex: 4,
    backgroundColor: '#B81D26',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'whitesmoke',
  }
});

export default OrderScreen;
