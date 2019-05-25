import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class CategoryCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.imgURL}} />
        <Text style={styles.text}>{this.props.name}</Text>
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
    margin: 2,
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
  }
})
