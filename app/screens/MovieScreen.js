import React from 'react';
import { ScrollView,StyleSheet,View,ImageBackground,Dimensions,TouchableOpacity,Image,StatusBar } from 'react-native';
import { Card,Button,Text } from 'react-native-elements';
import { Video } from 'expo';
import Dialog from "react-native-dialog";
import { Rating } from 'react-native-ratings';
import { movie,movieChosen,movieWatched,kid,media } from '../services/api';

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
      media:[],
      form: {
        movie:{},
        kid:{},
        vote: 5,
      },
      kidId: 'e96cd6e4-8f50-4909-a751-73268fda76b0',
      is_watched: this.props.navigation.state.params.is_watched,
      rating_dialog: false,
      delete_dialog: false,
    };
  }

  componentWillMount() {
    Promise.all([movie.get(this.movieId), kid.get(this.kidId), movie.getMovieMedias(this.movieId)])
      .then(([responseM,responseK,responseMed]) => {
        this.setState({
          movie: responseM.data,
          pictures: responseM.data.pictures,
          media: responseMed.data,
          ...this.form,
          form: {
            movie: responseM.data,
            kid: responseK.data,
          },
        })
      })
  }

  componentDidMount() {
    this.showStatusBar();
  }

  deleteMovieChosen = async (selectedMovieId) => {
    this.props.navigation.goBack();
    await movieChosen.delete(selectedMovieId);
  }

  deleteMovieWatched = async (selectedMovieId) => {
    this.props.navigation.goBack();
    await movieWatched.delete(selectedMovieId);
  }

  isWatched(form) {
    movieWatched.update(form)
      .then(() => {
        this.setState({
          rating_dialog: false,
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

  onCancel = () => {
    this.setState({
      rating_dialog: false,
      delete_dialog: false,
    })
  }

  showRatingDialog() {
    this.setState({
      rating_dialog: true,
    })
  }

  showDeleteDialog() {
    this.setState({
      delete_dialog: true,
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
    this.setState({
      form: { ...this.state.form, vote: rating },
    });
  }

  submit = () => {
    this.isWatched(this.state.form);
  }

  showStatusBar() {
    StatusBar.setHidden(false);
  }

  renderVideo = () => {
    this.props.navigation.navigate("MovieVideo", {showStatusBar: this.showStatusBar.bind(this) })
  }


  render() {
    console.log()
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.3}}>
        <ScrollView>
        <View style={styles.container}>
          <MovieImages pictures={this.state.pictures} />
        </View>
          { this.state.is_watched ?
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => {this.showDeleteDialog()}}>
              <MovieIcon name='ios-close-circle' color='black' size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.renderVideo}>
              <MovieIcon name='ios-play-circle' color='red' size={70} />
            </TouchableOpacity>
            <Text style={{ fontSize: 35 }}>
              {this.props.navigation.state.params.movie.vote}<MovieIcon name='ios-star' color='gold' size={40} />
            </Text>
            <Dialog.Container visible={this.state.delete_dialog} onBackdropPress={this.onCancel}>
              <Dialog.Title>Czy na pewno chcesz usunąć?</Dialog.Title>
              <MovieIcon name='ios-close-circle' color='black' size={60} />
              <Dialog.Button label="ANULUJ" onPress={() => this.onCancel()} />
              <Dialog.Button label="OK" onPress={() => this.deleteMovieWatched(this.selectedMovieId)} />
            </Dialog.Container>
          </View>
          :           
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => {this.showDeleteDialog()}}>
              <MovieIcon name='ios-heart-dislike' color='black' size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.renderVideo}>
              <MovieIcon name='ios-play-circle' color='red' size={70} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.showRatingDialog()}}>
              <MovieIcon name='ios-star-outline' color='gold' size={50} />
            </TouchableOpacity>
            <Dialog.Container visible={this.state.rating_dialog} onBackdropPress={this.onCancel}>
              <Dialog.Title>Oceń bajkę</Dialog.Title>
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
              <Dialog.Button label="OK" onPress={this.submit} />
            </Dialog.Container>
            <Dialog.Container visible={this.state.delete_dialog} onBackdropPress={this.onCancel}>
              <Dialog.Title>Czy na pewno chcesz usunąć?</Dialog.Title>
              <MovieIcon name='ios-heart-dislike' color='black' size={60} />
              <Dialog.Button label="ANULUJ" onPress={() => this.onCancel()} />
              <Dialog.Button label="OK" onPress={() => this.deleteMovieChosen(this.selectedMovieId)} />
            </Dialog.Container>
          </View>
          }
          <Text style={{alignSelf: 'center', fontSize: 25, fontWeight: 'bold'}}>{this.state.movie.title}</Text>
          <Text style={{margin: 10, textAlign: 'justify', fontSize: 20 }}>{this.state.movie.description}</Text>
          <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>Dostępne również na:</Text>
          <View style={{ flex:1, flexDirection: 'row', margin: 10, justifyContent: 'space-around', flexWrap: 'wrap'}}>
            { this.state.media.map(media =>
              <Image source={{uri: media.media.imgURL}} style={{height: 60, width: 120}} key={media.media.id} resizeMode='contain'/>
              )
            }
          </View>
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
