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
      kidId: '35d430bd-4745-4789-8743-64d3bb8d5bfb',
      movieId: '504c1847-88fe-46e4-a508-caafbde03d59',
      form: {
        movie:{},
        kid:{},
        watched: true,
      },
    };
  }

  componentDidMount() {
    Promise.all([movie.all(),movie.get(this.movieId),kid.get(this.kidId)])
      .then(([responseMs,responseM,responseK]) =>
        this.setState({
          cards: responseMs.data,
          form: {
            movie: responseM.data,
            kid: responseK.data,
            watched: false,
          }
        })
      )
  }

  //    movie.all()
  //     .then(response => {
  //       this.setState({
  //         ...this.state,
  //         cards: response.data
  //       })
  //     })
  // }

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
    // this.props.navigation.navigate("Movie")
    console.log('Click!')
    this.navigateToMovie()
  }

  navigateToMovie (navigation) {
    navigation.navigate("Movie")
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
    console.log(this.state.cards)
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
          onClickHandler={this.navigateToMovie.bind(this, this.props.navigation)}
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
