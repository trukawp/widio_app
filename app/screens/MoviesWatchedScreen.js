import React from 'react';
import { ScrollView,StyleSheet,Text,View,ImageBackground,TouchableOpacity,RefreshControl } from 'react-native';
import { Rating } from 'react-native-ratings';

import { kid } from '../services/api';
import ListCards from '../components/ListCards/ListCards.js';
import HeaderIcon from '../components/HeaderIcon';

export default class MoviesWatchedScreen extends React.Component {
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
      kid: '6e792f65-a1f3-4d70-830c-13f333cf6dd3',
      refreshing: false,
    };
  }

  componentWillMount() {
    kid.getKidWatched(this.kidId)
      .then(response => {
        this.setState({
          ...this.state,
          movies: response.data
        })
      })
      .catch(error => {
        console.log(error.response)
      });
  }

  // ratingCompleted(rating) {
  //   console.log("Rating is: " + rating)
  // }

  _onRefresh = () => {
    this.setState({refreshing: true});
    kid.getKidWatched(this.kidId)
    .then(response => {
      this.setState({
        ...this.state,
        movies: response.data,
        refreshing: false
      })
    })
    .catch(error => {
      console.log(error.response);
      this.setState({
        ...this.state,
        refreshing: false
      })
    })
  }

  get kidId() {
    return this.state.kid;
  }

  _onPressButton = (movie, movieTitle) => {
    this.props.navigation.navigate("Movie", {movie: movie, movieTitle: movieTitle, navigation: this.props.navigation, is_watched: true})
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
      <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}>
        <View style={styles.container}>
          {this.state.movies.map(movie =>
          <View key={movie.movie.id}>
            <TouchableOpacity onPress={this._onPressButton.bind(this, movie, movie.movie.title)} key={movie.movie.id}>
              <ListCards name={movie.movie.title} imgURL={movie.movie.imgURL} />
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center' }}>Ocena:</Text>
            <Rating
              startingValue={movie.vote}
              type='star'
              ratingCount={5}
              imageSize={20}
              // showRating
              readonly={true}
              ratingTextColor='black'
              // onFinishRating={this.ratingCompleted}
              style={styles.stars}
            />
          </View>
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
  stars: {
    marginBottom: 10,
    // borderRadius: 5,
    // borderColor: 'grey',
    // borderWidth: 0,
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  }
});