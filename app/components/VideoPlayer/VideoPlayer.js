import React, { Component } from 'react';
import { Text,View,StyleSheet,WebView,Dimensions,Image,StatusBar } from 'react-native';
import { Constants,Video,ScreenOrientation } from 'expo';

export default class App extends Component {


  showStatusBar() {
    StatusBar.setHidden(false)
  }

  render() {
    return (
        <Video
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          // resizeMode={Video.RESIZE_MODE_CONTAIN}
          shouldPlay={this.props.shouldPlay}
          // isLooping
          style={{ width: Dimensions.get('window').width, height: 300, marginBottom: 25 }}
          useNativeControls={true}
          onFullScreenUpdate={this.StatusBar}
        />
    );
  }
}

const styles = StyleSheet.create({

}); 