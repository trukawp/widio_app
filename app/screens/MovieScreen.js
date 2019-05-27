import React from 'react';
import { ScrollView,StyleSheet,View,ImageBackground } from 'react-native';
import { Card,Button,Text } from "react-native-elements";

export default class MovieScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('movieTitle', 'movieTitle'),
      headerStyle: {
        backgroundColor: '#343E7A',
      },
      headerTintColor: '#FAE99E',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
      <View style={styles.container}>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
});