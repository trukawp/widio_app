import React from 'react';
import { ScrollView,StyleSheet,View,ImageBackground,Dimensions,TouchableOpacity,Image,StatusBar } from 'react-native';
import { Card,Button,Text } from 'react-native-elements';
import { Video } from 'expo';
import { movie } from '../services/api';

import MovieIcon from '../components/MovieIcon';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import MovieImages from '../components/MovieImages/MovieImages';

export default class MovieScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('movieTitle', 'movieTitle'),
      headerStyle: {
        backgroundColor: '#343E7A',
      },
      headerTintColor: '#FAE99E',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 15,
      },
      headerBackTitleStyle: {
        fontSize: 15,
      }
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      movie:{},
      pictures: [
       {imgURL: 'https://image.tmdb.org/t/p/original/aUVCJ0HkcJIBrTJYPnTXta8h9Co.jpg'},
       {imgURL: 'https://image.tmdb.org/t/p/original/6qVF0gnLnbKCgcMfCpCB8GH7B5I.jpg'},
       {imgURL: 'https://image.tmdb.org/t/p/original/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg'},
      ]
    };
  }

  componentDidMount() {
    movie.get(this.movieId)
      .then(response => {
        this.setState({
          ...this.state,
          movie: response.data
        })
      })
  }

  componentWillMount() {
    this.showStatusBar();
  }

  get movieId() {
    const { params } = this.props.navigation.state;
    return params.movieId;
  }

  showStatusBar() {
    StatusBar.setHidden(false);
  }

  renderVideo = () => {
    this.props.navigation.navigate("MovieVideo", {showStatusBar: this.showStatusBar.bind(this) })
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
        <ScrollView>
        <View style={styles.container}>
          <MovieImages pictures={this.state.pictures} />
        </View>
        <View style={styles.buttons}>
          <MovieIcon name='ios-heart-dislike' color='black' size={50} />
          <TouchableOpacity onPress={this.renderVideo}>
            <MovieIcon name='ios-play-circle' color='red' size={70} />
          </TouchableOpacity>
          <MovieIcon name='ios-star' color='gold' size={50} />
        </View>
          <Text style={{alignSelf: 'center', fontSize: 25, fontWeight: 'bold'}}>{this.state.movie.title}</Text>
          <Text style={{margin: 10, textAlign: 'justify', fontSize: 20 }}>{this.state.movie.description}</Text>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'flex-start',
    // flexDirection: 'column',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
  buttons: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.8)',
  }
});
