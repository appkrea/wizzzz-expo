import React from 'react';
import axios from 'axios';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { io } from 'socket.io-client';

export const AppContext = React.createContext();

const endpoint = process.env.NODE_ENV === 'production' ? 'https://www.wizzzz.cz' : 'http://192.168.8.184:1234';

class AppProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      env: process.env.NODE_ENV,
      driver: 1,
      deliveries: null,
      location: undefined,
    };
  }

  async componentDidMount() {
    let socket = io(endpoint, {
      transports: ['websocket'],
    });

    this.getLocationAsync();
    this.fetchDeliveries();

    socket.on('deliveries change', (deliveries) => {
      this.setState((prevState) => ({
        ...prevState,
        deliveries,
      }))
  });
  }

   componentWillUnmount() {
    this.location.remove();
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      console.log('no geolocation premissions');
    }
    this.location = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.High,
      timeInterval: 1,
      distanceInterval: 1
    }, (loc) => {
      this.setState((prevState) => ({
        ...prevState,
        location: loc,
      }), () => {
        // console.log(this.state);
      });
      // console.log(loc);
      /*axios.post(`https://www.wizzzz.cz/api/position/${this.state.driver}`, loc).then((res) => {
        console.log(res);
      });*/
    });
  }

  fetchDeliveries() {
    axios.get(`${endpoint}/api/deliveries`).then((res) => {
      console.log('deliveries fetched');
      this.setState({
        deliveries: res.data,
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
      }}>
        {
          this.props.children
        }
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
