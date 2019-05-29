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
      movies: [],
      kidId: 'fd106cc7-470c-42e3-a273-33910eff0d36',
      form: {
        movie:{},
        kid:{},
        watched: false,
      },
    };
  }

  componentDidMount() {
    Promise.all([movie.all(),kid.get(this.kidId)])
      .then(([responseM,responseK]) =>
        this.setState({
          movies: responseM.data,
          form: {
            kid: responseK.data,
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

  handleYup (kid, watched, movie) {
    return this.setState({ form: {
        ...this.state.form,
        kid: kid,
        watched: watched,
        movie: movie,
    }}, () => {
      this.handleOnSwipe();
      }
    );
  }

  renderCard = (data) => {
    return <Card {...data} />
  }

  handleOnSwipe () {
    movieChosen.update(this.state.form)
      .then(() => {
        this.setState()
      })
      .catch(error => {
        console.log(error.response)
        alert("Nie można dodać filmu.")
      });
  }

  handleOnClick () {

  }

  // navigateToMovie (navigation) {
  //   navigation.navigate("Movie")
  // }

  render() {
    return (
      <View>
        <SwipeCards
          cards={this.state.movies}
          loop={true}
          renderCard={this.renderCard}
          renderNoMoreCards={() => <NoMoreCards />}
          handleYup={this.handleYup.bind(this, this.state.form.kid, this.state.form.watched)}
          // handleNope={this.handleNope}
          key={this.state.movies.id}
          yupView={<Image source={require('../../assets/images/love.png')} style={{ width: 103, height: 90 }}/>}
          yupStyle={styles.yup}
          noView={<Image source={require('../../assets/images/rejects.png')} style={{ width: 100, height: 100  }}/>}
          nopeStyle={styles.nope}
          // onClickHandler={this.navigateToMovie.bind(this, this.props.navigation)}
          onClickHandler={this.handleOnClick}
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
