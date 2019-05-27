import React from 'react';
import { ScrollView,StyleSheet,View,ImageBackground } from 'react-native';
import { Card,Button,Text } from "react-native-elements";
import { Audio, Asset, AppLoading } from 'expo';

import HeaderIcon from '../components/HeaderIcon';

export default class ProfileScreen extends React.Component {
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
    };
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

  handleNavigate = () => {
    this.props.navigation.navigate("SignIn");
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
      <View style={{ paddingVertical: 20 }}>
        <Card title="Pawel Trukawka">
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>PT</Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            // onPress={this.handlePLay}
            onPress={this.handleNavigate}
          />
        </Card>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
});