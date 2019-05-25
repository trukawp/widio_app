import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';

import styles from './styles';

class AuthLoadingScreen extends React.PureComponent {
  componentDidMount() {
    this._redirectSignedIn();
  }

  _redirectSignedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(token ? 'Home' : 'SignIn');
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
