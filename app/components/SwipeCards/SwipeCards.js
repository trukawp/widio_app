import React, { Component } from 'react';
import { StyleSheet,Text,View,imgURL,Image,Button } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Emoji from 'react-native-emoji';

import Card from './Card/Card'
import NoMoreCards from './NoMoreCards/NoMoreCards'
import { movie,movieChosen,kid } from '../../services/api';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      kidId: '7713b48e-e01a-4c39-9861-059e51a2b20a',
      movieId: '232efab3-816c-4f38-91ae-7dc72b7f50d0',
      form: {
        movie:{},
        kid:{},
        watched: true,
      },
    };
  }

  componentDidMount() {
    Promise.all([movie.all(),movie.get(this.state.movieId),kid.get(this.state.kidId)])
      .then(([responseMs,responseM,responseK]) =>
        this.setState({
          cards: responseMs.data,
          form: {
            movie: responseM.data,
            kid: responseK.data,
            watched: false,
          },
        })
      )
  }

  get kidId() {
    return this.state.kidId;
  }

  get movieId() {
    return this.state.movieId;
  }

  handleYup (card) {
    console.log('Tak')
  }

  handleNope (card) {
    console.log('Nie')
  }

  // movieChange (card, kid, watched) {
  //   return this.setState({ form: {
  //       ...this.state.form,
  //       movie: card,
  //       kid: kid,
  //       watched: watched,
  //   }});
  // }

 

  renderCard = (data) => {
    return <Card {...data} />
  }

  handlOnClick (card) {
  }

  // onHandleClick = () => {
  //   movieChosen.update(this.state.form)
  //     .then(() => {
  //       this.setState()
  //     })
  //     .catch(error => {
  //       console.log(error.response)
  //       console.log(this.state.form.movie.title, this.state.form.kid.name, this.state.form.watched)
  //       alert("Nie można dodać filmu.")
  //     });
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
          onClickHandler={this.handlOnClick}
          smoothTransition={false}
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
