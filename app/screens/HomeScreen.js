import React from 'react';
import { ScrollView,StyleSheet,Text,View,ImageBackground,Button,TouchableOpacity } from 'react-native';
import { WebBrowser } from 'expo';

import { movie,movieChosen,kid } from '../services/api';
import SwipeCards from '../components/SwipeCards/SwipeCards.js';
import HeaderIcon from '../components/HeaderIcon';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#343E7A',
    },
    headerRight: <HeaderIcon name='ios-lock' />,
    title: 'Widio',
    headerTintColor: '#FAE99E',
    headerTitleStyle: {
      fontFamily: 'lilitaone-regular',
      fontSize: 25,
    },
  }

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  _onPressButton = () => {
    this.props.navigation.navigate("Movie")
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <SwipeCards style={{flex: 1}} navigation={this.props.navigation} />
          <Text></Text>
        </ScrollView>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#343E7A',
  },
  contentContainer: {
    paddingTop: 30,
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
});
