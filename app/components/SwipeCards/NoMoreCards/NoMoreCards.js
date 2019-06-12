import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


export default class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View/>
    )
  }
}

const styles = StyleSheet.create({
  noMoreCardsText: {
    fontSize: 22,
    alignSelf: 'center',
  },
})
