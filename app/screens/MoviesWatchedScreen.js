import React from 'react';
import { ScrollView,StyleSheet,Text,View,ImageBackground } from 'react-native';
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
      kid: '7713b48e-e01a-4c39-9861-059e51a2b20a',
      starCount: 3.5,
    };
  }

  componentDidMount() {
    kid.getKidWatched(this.kidId)
      .then(response => {
        this.setState({
          ...this.state,
          movies: response.data
        })
      })
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  get kidId() {
    return this.state.kid;
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
      <ScrollView style={styles.container}>
        <View style={styles.cardwrapper}>
          {this.state.movies.map(movie =>
          <View key={movie.movie.id} style={{}}> 
            <ListCards name={movie.movie.title} imgURL={movie.movie.imgURL} />
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
    paddingTop: 15,
  },
  cardwrapper: {
    flex: 1,
    marginTop: 15,
    flexDirection:'row', 
    justifyContent: 'space-between', 
    flexWrap: 'wrap',
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 50,
  },
  stars: {
    marginBottom: 10,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  }
});