import React from 'react';

export const AppContext = React.createContext();

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: 1,
    };
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
