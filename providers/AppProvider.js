import React from 'react';
import axios from 'axios';

export const AppContext = React.createContext();

const endpoint = process.env.NODE_ENV === 'production' ? 'https://Www.wizzzz.cz' : 'http://192.168.8.184:1234';

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      env: process.env.NODE_ENV,
      driver: 1,
      deliveries: null,
    };
  }

  componentDidMount() {
    this.fetchDeliveries();
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
