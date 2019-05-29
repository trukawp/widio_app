import React, { Component } from 'react';
import { Text,View,StyleSheet,WebView,Dimensions,Image } from 'react-native';
import { Constants,Video } from 'expo';

import Swiper from 'react-native-swiper';

export default class App extends Component {
  render() {
    return (
      <View style={{ width: Dimensions.get('window').width, height: 277 }} showButtons={true}>
        <Swiper showsButtons={false}>
          <Image style={styles.thumbnail} source={{uri: 'https://image.tmdb.org/t/p/original/6qVF0gnLnbKCgcMfCpCB8GH7B5I.jpg'}} />
          <Image style={styles.thumbnail} source={{uri: 'https://image.tmdb.org/t/p/original/aUVCJ0HkcJIBrTJYPnTXta8h9Co.jpg'}} />
          <Image style={styles.thumbnail} source={{uri: 'https://image.tmdb.org/t/p/original/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg'}} />
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#000000'
  }
})