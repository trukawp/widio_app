import React from 'react';
import { ScrollView,StyleSheet,Text,View,ImageBackground,Button } from 'react-native';
import { WebBrowser } from 'expo';

import { movie,movieChosen,kid } from '../services/api';
import SwipeCards from '../components/SwipeCards/SwipeCards.js';
import HeaderIcon from '../components/HeaderIcon';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#343E7A',
    },
    headerRight: <HeaderIcon name='ios-lock' />,
    title: 'Widio',
    headerTintColor: '#FAE99E',
    headerTitleStyle: {
      fontFamily: 'lilitaone-regular',
      fontSize: 25,
    },
  }

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      kidId: 'a353934d-f13a-4029-bd0a-982952d1f34e',
      movieId: '26478e59-0a4b-42b3-8df4-969605b11f65',
      form: {
        movie:{},
        kid:{},
        watched: true,
      },
    };
  }

  // componentDidMount() {
  //   Promise.all([movie.all(),movie.get(this.state.movieId),kid.get(this.state.kidId)])
  //     .then(([responseMs,responseM,responseK]) =>
  //       this.setState({
  //         form: {
  //           movie: responseM.data,
  //           kid: responseK.data,
  //           watched: false,
  //         },
  //       })
  //     )
  // }

  get kidId() {
    return this.state.kidId;
  }

  get movieId() {
    return this.state.movieId;
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
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <SwipeCards style={{flex: 1}} />
        </ScrollView>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#343E7A',
  },
  contentContainer: {
    paddingTop: 30,
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
});
