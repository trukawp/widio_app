import React from 'react';
import { ScrollView,StyleSheet,Text,View } from 'react-native';
import { WebBrowser } from 'expo';

import { movie } from '../services/api';
import SwipeCards from '../components/SwipeCards/SwipeCards.js'


export default class HomeScreen extends React.Component {
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
    };
  }

  componentDidMount() {
    movie.all()
      .then(response => {
        this.setState({
          ...this.state,
          movies: response.data
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <SwipeCards style={{flex: 1}} />
        </ScrollView>
      </View>
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
});
