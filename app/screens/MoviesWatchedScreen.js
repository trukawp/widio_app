import React from 'react';
import { ScrollView,StyleSheet,Text,View } from 'react-native';

import { kid } from '../services/api';
import ListCards from '../components/ListCards/ListCards.js'

export default class MoviesWatchedScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#343E7A',
      color: '#fff'
    },
  }

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      kid: '98452c21-9d89-4808-9ab6-38c3dd58f410',
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

  get kidId() {
    return this.state.kid;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          {this.state.movies.map(movie => 
            <ListCards key={movie.movie.id} name={movie.movie.title} imgURL={movie.movie.imgURL} />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    // backgroundColor: '#343E7A',
  },
  box: {
    flex: 1,
    marginTop: 15,
    flexDirection:'row', 
    justifyContent: 'space-between', 
    flexWrap: 'wrap',
    paddingRight: 20,
    paddingLeft: 20,
  },
});