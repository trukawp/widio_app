import React, { Component } from 'react';
import {StyleSheet, Text, View, imgURL} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import Card from './Card/Card'
import NoMoreCards from './NoMoreCards/NoMoreCards'
import { movie } from '../../services/api';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      outOfCards: false,
      movies: [],
    }
  }

  componentDidMount() {
    movie.all()
      .then(response => {
        this.setState({
          ...this.state,
          cards: response.data
        })
      })
  }

  handleYup (card) {
    console.log("TAK")
  }

  handleNope (card) {
    console.log("NIE")
  }

  handlOnClick (card) {
    alert('Bziuum.')
  }

  render() {
    return (
      <View>
        <SwipeCards
          cards={this.state.cards}
          loop={true}
          renderCard={(cardData) => <Card {...cardData} />}
          // renderNoMoreCards={() => <NoMoreCards />}
          showYup={true}
          showNope={true}
          yupText='Kwadracik'
          nopeText='Kwadracik'
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          key={this.state.cards.id}
          yupStyle={styles.yup}
          nopeStyle={styles.nope}
          yupTextStyle={styles.yuptxt}
          nopeTextStyle={styles.nopetxt}
          onClickHandler={this.handlOnClick}
        />
        <Text>{this.state.cards.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  yup: {
    backgroundColor: '#00FF7F',
    marginRight: 5,
    borderWidth: 0,
  },
  nope: {
    backgroundColor: '#DC143C',
    marginLeft: 5,
    borderWidth: 0,
  },
  yuptxt: {
    color: '#00FF7F',
    fontWeight: 'bold',
  },
  nopetxt: {
    color: '#DC143C',
    fontWeight: 'bold',
  },
});