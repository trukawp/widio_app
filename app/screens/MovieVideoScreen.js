import React from 'react';
import { ScrollView,StyleSheet,View,ImageBackground,Dimensions,TouchableOpacity } from 'react-native';
import { Card,Button,Text } from 'react-native-elements';
import { Video } from 'expo';
import { NavigationEvents } from 'react-navigation';

// import { movie } from '../services/api';

import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

export default class MovieVideoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: 'black',
        shadowOpacity: 0,
        borderBottomWidth: 0
      },
      headerTintColor: '#FAE99E',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 15,
      },
      headerBackTitleStyle: {
        fontSize: 15,
      },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      // movie:{},
      shouldPlay: false,
    };
  }

  componentWillMount() {
    const {params} = this.props.navigation.state;
    params.showStatusBar();
  }

  // componentDidMount() {
  //   movie.get(this.movieId)
  //     .then(response => {
  //       this.setState({
  //         ...this.state,
  //         movie: response.data
  //       })
  //     })
  // }

  // get movieId() {
  //   const { params } = this.props.navigation.state;
  //   return params.movieId;
  // }

  // renderVideo() {
  //   return <VideoPlayer />
  // }

  render() {
    return (
      <ImageBackground style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
        <View style={styles.container}>
          <VideoPlayer shouldPlay={this.state.shouldPlay} />
          <NavigationEvents onDidFocus={payload => { this.setState({ shouldPlay: false }); }} onWillBlur={payload => { this.setState({ shouldPlay: false }); }} />
        </View>
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
    backgroundColor: 'black'
  },
  // buttons: {
  //   justifyContent: 'space-evenly',
  //   alignItems: 'center',
  //   flexDirection: 'row'
  // }
});
