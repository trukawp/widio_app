import React from 'react';
import { ScrollView,StyleSheet,Text,View,Button,ImageBackground } from 'react-native';
import { WebBrowser } from 'expo';

import { movie } from '../services/api';
import CategorySwipeCards from '../components/SwipeCards/CategorySwipeCards.js';


export default class CategoryHomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('categoryName', 'categoryName'),
      headerStyle: {
        backgroundColor: '#343E7A',
      },
      headerTintColor: '#FAE99E',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

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

  get categoryId() {
    const { params } = this.props.navigation.state;
    return params.categoryId;
  }

  get categoryName() {
    const { params } = this.props.navigation.state;
    return params.categoryName;
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <CategorySwipeCards categoryId={this.categoryId} style={{flex: 1}} />
        </ScrollView>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
