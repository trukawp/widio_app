import React, { Component } from 'react';
import { StyleSheet,Text,View,imgURL,Image } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import Card from './Card/Card'
import NoMoreCards from './NoMoreCards/NoMoreCards'
import { category } from '../../services/api';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      outOfCards: false,
    }
  }

  componentDidMount() {
    category.getCategoryMovies(this.categoryId)
      .then(response => {
        this.setState({
          ...this.state,
          cards: response.data
        })
      })
  }


  get categoryId() {
    return this.props.categoryId;
  }

  // handleYup (card) {
  //   console.log("Tak")
  // }

  // handleNope (card) {
  //   console.log("Nie")
  // }

  renderCard = (data) => <Card {...data} />

  handleOnClick (card) {

  }

  // navigateToMovie (navigation) {
  //   navigation.navigate("Movie")
  // }

  render() {
    return (
      <View>
        <SwipeCards
          cards={this.state.cards}
          loop={true}
          renderCard={this.renderCard}
          renderNoMoreCards={() => <NoMoreCards />}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          key={this.state.cards.id}
          yupView={<Image source={require('../../assets/images/love.png')} style={{ width: 103, height: 90 }}/>}
          yupStyle={styles.yup}
          noView={<Image source={require('../../assets/images/rejects.png')} style={{ width: 100, height: 100  }}/>}
          nopeStyle={styles.nope}
          // onClickHandler={this.navigateToMovie.bind(this, this.props.navigation)}
          onClickHandler={this.handleOnClick}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  yup: {
    marginRight: 5,
    borderWidth: 0,
  },
  nope: {
    marginLeft: 5,
    borderWidth: 0,
  }
});
