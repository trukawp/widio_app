import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class ListCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.imgURL}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    margin: 10,
  },
  thumbnail: {
    width: 143,
    height: 215,
    resizeMode: 'contain',
  },
})
