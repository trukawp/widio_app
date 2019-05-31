import React, { Component } from 'react';
import { Text,View,StyleSheet,WebView,Dimensions,Image } from 'react-native';
import { Constants,Video } from 'expo';

import Swiper from 'react-native-swiper';

export default class App extends Component {
  render() {
    return (
      <View style={{ width: Dimensions.get('window').width, height: 277, backgroundColor: '#000000' }} showButtons={true}>
        <Swiper showsButtons={false} index={1} loop={true}>
        { this.props.pictures.map(picture =>
          <Image style={styles.thumbnail} source={{uri: picture.imgURL}} key={picture.id}/>
        )}
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