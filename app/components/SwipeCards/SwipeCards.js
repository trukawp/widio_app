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

  renderCard = (data) => <Card {...data} />

  handlOnClick (card) {

  }

  render() {
    return (
      <View>
        <SwipeCards
          cards={this.state.cards}
          loop={true}
          renderCard={this.renderCard}
          // renderNoMoreCards={() => <NoMoreCards />}
          showYup={true}
          showNope={true}
          yupText='+'
          nopeText='-'
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
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  nope: {
    marginLeft: 5,
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
  },
  yuptxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  nopetxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
});