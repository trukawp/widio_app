import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.imgURL}} />
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 1,
    borderWidth: 1,
    borderColor: 'grey',
  },
  thumbnail: {
    width: 300,
    height: 450,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  }
})
