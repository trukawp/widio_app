import React from 'react';
import { ScrollView,StyleSheet,Text,View,TouchableOpacity,ImageBackground } from 'react-native';

import { kid } from '../services/api';
import ListCards from '../components/ListCards/ListCards.js';
import HeaderIcon from '../components/HeaderIcon';

export default class MoviesChosenScreen extends React.Component {
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
      kid: '33b226a1-28d7-43de-bcc3-b2e46d14d512',
    };
  }

  componentDidMount() {
    kid.getKidChoices(this.kidId)
      .then(response => {
        this.setState({
          ...this.state,
          movies: response.data
        })
      })
  }

  get kidId() {
    return this.state.kid;
  }

  _onPressButton = (movieId, movieTitle, navigation) => {
    this.props.navigation.navigate("Movie", {movieId: movieId, movieTitle: movieTitle, navigation: this.props.navigation})
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
      <ScrollView>
        <View style={styles.container}>
          {this.state.movies.map(movie => 
            <TouchableOpacity onPress={this._onPressButton.bind(this, movie.movie.id, movie.movie.title)} key={movie.movie.id}>
            <ListCards name={movie.movie.title} imgURL={movie.movie.imgURL} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection:'row', 
    justifyContent: 'space-between', 
    flexWrap: 'wrap',
    paddingRight: 20,
    paddingLeft: 20,
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  }
});