import React from 'react';
import { ScrollView,StyleSheet,Text,View,ImageBackground,TouchableOpacity,RefreshControl,AsyncStorage } from 'react-native';
import { Rating } from 'react-native-ratings';
import { NavigationEvents } from 'react-navigation';
import JWT from 'expo-jwt';
import { Audio } from 'expo';

import { kid } from '../services/api';
import ListCards from '../components/ListCards/ListCards.js';
import HeaderIcon from '../components/HeaderIcon';
import PasswordPrompt from '../components/PasswordPrompt';

export default class MoviesWatchedScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const openProfile = () => navigation.state.params.openProfile();

    return {
      headerStyle: {
        backgroundColor: '#343E7A',
      },
      headerRight: (
        <HeaderIcon
          name='ios-settings'
          onPress={openProfile}
        />
      ),
      title: 'Widio',
      headerTintColor: '#FAE99E',
      headerTitleStyle: {
        fontFamily: 'lilitaone-regular',
        fontSize: 27,
      },
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      movies_sorted: [],
      kid: {},
      refreshing: false,
    };
  }

  sortByName() {
    const {movies} = this.state
    let newMovies = movies
    newMovies = movies.sort((a, b) => a.title < b.title)
    this.setState({
      movies_sorted: newMovies
    })
  }

  // componentDidMount() {
  //   kid.getKidWatched(this.kidId)
  //     .then(response => {
  //       this.setState({
  //         ...this.state,
  //         movies: response.data
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error.response)
  //     });
  // }

  componentDidMount() {
    this.props.navigation.setParams({
      openProfile: this._togglePromptVisibility,
    });
    const key ="SecretKeyToGenJWTs";
    const jwttoken = AsyncStorage.getItem('token', (err, result) => {
      const code = (JWT.decode(result, key));
      this.retrieveData(code.sub);
    });
  }

  retrieveData = async (email) => {
    this.setState({ refreshing: true });

    try {
      const kidResponse = await kid.findByEmail(email);
      const watchedResponse = await kid.getKidWatched(kidResponse.data.id);

      this.setState({
        kid: kidResponse.data,
        movies: watchedResponse.data,
        refreshing: false,
      });
      this.sortByName();
    } catch (e) {
      this.setState({ refreshing: false });
    }
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  _onRefresh = () => {
    this.retrieveData(this.state.kid.email);
  }

  get kidId() {
    return this.state.kid.id;
  }

  _togglePromptVisibility = () => {
    this.setState({
      isPasswordPromptVisible: !this.state.isPasswordPromptVisible,
    });
  }

  _onPromptOk = () => {
    this.props.navigation.navigate('Profile');
    this._togglePromptVisibility();
  }

  _onPressButton = (movie, movieTitle, movieVote) => {
    this.props.navigation.navigate("Movie", {movie: movie, movieTitle: movieTitle, navigation: this.props.navigation, is_watched: true, movieVote: movieVote})
  }

  isEmpty = (str) => {
    return (!str || 0 === str.length);
  }

  handlePLay = async () => {
    const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require('../assets/audio/button_click.mp3'));
        await soundObject.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
  }

  playAndRefresh = () => {
    this._onRefresh();
    this.handlePLay();
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.3}}>
      <NavigationEvents
        onWillFocus={this.playAndRefresh}
      />
      <PasswordPrompt
        isVisible={this.state.isPasswordPromptVisible}
        onCancel={this._togglePromptVisibility}
        onOk={this._onPromptOk}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}>
        { !this.isEmpty(this.state.movies) ?
        <View style={styles.container}>
        {this.state.movies_sorted.map(movie =>
          <View key={movie.movie.id}>
            <TouchableOpacity onPress={this._onPressButton.bind(this, movie, movie.movie.title, movie.movie.vote)} key={movie.movie.id}>
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
      :
        <View style={styles.container2}><Text style={{ fontSize: 20, marginTop: 50 }}>Oceń wybrane bajki, aby wyświetlić listę</Text></View>
      }
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
  container2: {
    flex: 1,
    flexDirection:'row', 
    justifyContent: 'center',
    alignItems: 'center', 
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