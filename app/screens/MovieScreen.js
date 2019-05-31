import React from 'react';
import { ScrollView,StyleSheet,View,ImageBackground,Dimensions,TouchableOpacity,Image,StatusBar } from 'react-native';
import { Card,Button,Text } from 'react-native-elements';
import { Video } from 'expo';
import Dialog from "react-native-dialog";
import { Rating } from 'react-native-ratings';
import { movie,movieChosen,movieWatched,kid } from '../services/api';

import MovieIcon from '../components/MovieIcon';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import MovieImages from '../components/MovieImages/MovieImages';

export default class MovieScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('movieTitle', 'movie.movie.title'),
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
      pictures:[],
      form: {
        movie:{},
        kid:{},
        vote: 5,
      },
      kidId: '6e792f65-a1f3-4d70-830c-13f333cf6dd3',
      is_watched: this.props.navigation.state.params.is_watched,
      dialog_visible: false,
    };
  }

  componentWillMount() {
    Promise.all([movie.get(this.movieId), kid.get(this.kidId)])
      .then(([responseM,responseK]) => {
        this.setState({
          movie: responseM.data,
          pictures: responseM.data.pictures,
          ...this.form,
          form: {
            movie: responseM.data,
            kid: responseK.data,
          },
          // is_watched: this.props.navigation.state.params.is_watched
        })
      })
  }

  componentDidMount() {
    this.showStatusBar();
  }

  deleteMovieChosen(selectedMovieId) {
    movieChosen.delete(selectedMovieId)
      .then(response => {
        this.props.navigation.goBack();
      })
  }

  deleteMovieWatched(selectedMovieId) {
    movieWatched.delete(selectedMovieId)
      .then(response => {
        this.props.navigation.goBack();
      })
  }

  isWatched(form) {
    movieWatched.update(form)
      .then(() => {
        this.setState({
          dialog_visible: false,
        },() => {
          this.deleteMovieChosen(this.selectedMovieId)
        }
      )})
      .catch(error => {
        console.log(error.response)
        alert("Nie można dodać filmu.")
      });
  }

  // rateMovie(form) {
  //   console.log('film', form.movie.title);
  //   console.log('dziecko', form.kid.name);
  //   console.log('ocena', form.vote);
  // }


  get movieId() {
    const { params } = this.props.navigation.state;
    return params.movie.movie.id;
  }

  get kidId() {
    return this.state.kidId;
  }

  get selectedMovieId() {
    const { params } = this.props.navigation.state;
    return params.movie.id;
  }

  onCancel() {
    this.setState({
      dialog_visible: false,
    })
  }

  showDialog() {
    this.setState({
      dialog_visible: true,
    })
  }

  // ratingCompleted(rating) {
  //   console.log('Rating is: ' + rating);
  //   this.setState({
  //     form: {
  //       vote: rating,
  //     }
  //   });
  // }

  ratingCompleted = (rating) => { 
    // this.setState ({
    //   form: {
    //     vote : rating 
    //   }
    // });
    console.log('Rating:' + rating)
  }

  rating2Completed(rating) {
    console.log(rating);
  }

  showStatusBar() {
    StatusBar.setHidden(false);
  }

  renderVideo = () => {
    this.props.navigation.navigate("MovieVideo", {showStatusBar: this.showStatusBar.bind(this) })
  }


  render() {
    const reactNativeModalProps = {
      onBackdropPress: () => this.onCancel(),
    };
    console.log(this.state.pigzdurez)
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
        <ScrollView>
        <View style={styles.container}>
          <MovieImages pictures={this.state.pictures} />
        </View>
          { this.state.is_watched ?
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.deleteMovieWatched.bind(this, this.selectedMovieId)}>
              <MovieIcon name='ios-close-circle' color='black' size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.renderVideo}>
              <MovieIcon name='ios-play-circle' color='red' size={70} />
            </TouchableOpacity>
            <Text style={{ fontSize: 35 }}>
              {this.state.form.vote}<MovieIcon name='ios-star' color='gold' size={40} />
            </Text>
          </View>
          :           
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.deleteMovieChosen.bind(this, this.selectedMovieId)}>
              <MovieIcon name='ios-heart-dislike' color='black' size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.renderVideo}>
              <MovieIcon name='ios-play-circle' color='red' size={70} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.showDialog()}}>
              <MovieIcon name='ios-star-outline' color='gold' size={50} />
            </TouchableOpacity>
            <Dialog.Container visible={this.state.dialog_visible} {...reactNativeModalProps}>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={50}
                showRating
                onFinishRating={this.ratingCompleted}
                style={{ marginBottom: 50, marginHorizontal: 10 }}
                startingValue={3}
              />
              <Dialog.Button label="ANULUJ" onPress={() => this.onCancel()} />
              <Dialog.Button label="OK" onPress={() => this.isWatched(this.state.form)} />
            </Dialog.Container>
          </View>
          }
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
