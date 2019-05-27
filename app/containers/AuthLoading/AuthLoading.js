import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor: '#343E7A',
  },
});

export default AuthLoadingScreen;
