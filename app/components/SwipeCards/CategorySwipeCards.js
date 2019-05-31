import React, { Component } from 'react';
import { StyleSheet,Text,View,imgURL,Image } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

import Card from './Card/Card'
import NoMoreCards from './NoMoreCards/NoMoreCards'
import { category,movieChosen,kid } from '../../services/api';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      outOfCards: false,
      kidId: '6e792f65-a1f3-4d70-830c-13f333cf6dd3',
      form: {
        movie:{},
        kid:{},
        watched: false,
      },
    }
  }

  // componentDidMount() {
  //   category.getCategoryMovies(this.categoryId)
  //     .then(response => {
  //       this.setState({
  //         ...this.state,
  //         movies: response.data
  //       })
  //     })
  // }

  componentWillMount() {
    Promise.all([category.getCategoryMovies(this.categoryId),kid.get(this.kidId)])
      .then(([responseM,responseK]) =>
        this.setState({
          movies: responseM.data,
          form: {
            kid: responseK.data,
          }
        })
      )
  }

  get categoryId() {
    return this.props.categoryId;
  }

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

  // handleYup (card) {
  //   console.log("Tak")
  // }

  // handleNope (card) {
  //   console.log("Nie")
  // }

  renderCard = (data) => <Card {...data} />

  handleOnSwipe () {
    movieChosen.update(this.state.form)
      .then(() => {
        this.setState()
      })
      .catch(error => {
        console.log(error.response)
        Alert.alert('Film isnieje już na liście','Spróbuj dodać film, którego jeszcze nie dodałeś')
      });
  }

  handleOnClick (card) {

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
