import React, { PureComponent } from 'react';
import { ScrollView,StyleSheet,Text,View,TouchableOpacity,ImageBackground,RefreshControl,AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Audio } from 'expo';
import JWT from 'expo-jwt';

import { kid } from '../services/api';
import ListCards from '../components/ListCards/ListCards.js';
import HeaderIcon from '../components/HeaderIcon';
import PasswordPrompt from '../components/PasswordPrompt';

export default class MoviesChosenScreen extends PureComponent {
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
      kid: {

      },
      refreshing: false,
    };
  }

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
      const choicesResponse = await kid.getKidChoices(kidResponse.data.id);

      this.setState({
        kid: kidResponse.data,
        movies: choicesResponse.data,
        refreshing: false,
      });
    } catch (e) {
      this.setState({ refreshing: false });
    }
  }

  _onRefresh = () => {
    this.retrieveData(this.state.kid.email);
  }

  get kidId() {
    return this.state.kid.id;
  }

  _onPressButton = (movie, movieTitle) => {
    this.props.navigation.navigate("Movie", {movie: movie, movieTitle: movieTitle, navigation: this.props.navigation})
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

  render() {
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.3}}>
      <NavigationEvents
        onWillFocus={this._onRefresh}
      />
      <PasswordPrompt
        isVisible={this.state.isPasswordPromptVisible}
        onCancel={this._togglePromptVisibility}
        onOk={this._onPromptOk}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}>
      { !this.isEmpty(this.state.movies) ?
        <View style={styles.container}>
          {this.state.movies.map(movie => 
            <View key={movie.movie.id}>
              <TouchableOpacity onPress={this._onPressButton.bind(this, movie, movie.movie.title)} key={movie.movie.id}>
                <ListCards name={movie.movie.title} imgURL={movie.movie.imgURL} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      :
        <View style={styles.container2}><Text style={{ fontSize: 20, marginTop: 50 }}>Wybierz bajki, aby wyświetlić listę</Text></View>
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
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  }
});