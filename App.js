import React from 'react';
import { Platform,StatusBar,StyleSheet,View } from 'react-native';
import { Font } from 'expo';

// import MainTabNavigator from './app/navigation/MainTabNavigator';
import AppNavigator from './app/navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'pacifico-regular': require('./app/assets/fonts/Pacifico-Regular.ttf'),
      'lilitaone-regular': require('./app/assets/fonts/LilitaOne-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      { this.state.fontLoaded ? (
        <AppNavigator />
        ) : null
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
