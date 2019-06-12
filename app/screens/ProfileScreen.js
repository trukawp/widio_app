import React from 'react';
import { ScrollView,StyleSheet,View,ImageBackground,AsyncStorage } from 'react-native';
import { Card,Button,Text,SocialIcon,Input } from "react-native-elements";
import { Audio, Asset, AppLoading } from 'expo';
import JWT from 'expo-jwt';
import Icon from 'react-native-vector-icons/FontAwesome';

import HeaderIcon from '../components/HeaderIcon';
import { kid } from '../services/api';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#343E7A',
    },
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
      kid: {},
      name: "",
    };
  }

  componentDidMount() {
    const key ="SecretKeyToGenJWTs";
    const jwttoken = AsyncStorage.getItem('token', (err, result) => {
      const code = (JWT.decode(result, key));
      this.retrieveData(code.sub);
    });
  }

  retrieveData(email) {
    kid.findByEmail(email)
      .then(response => {
        this.setState({
          ...this.state,
          kid: response.data,
          name: response.data.name.charAt(0),
        })
      })
  }

  handleLogout = () => {
    AsyncStorage.removeItem('token');
    this.props.navigation.navigate("SignIn");
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.3}}>
      <View style={{ paddingVertical: 20 }}>
        <Card title={this.state.kid.name}>
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
            <Text style={{ color: "white", fontSize: 30 }}>{this.state.name}</Text>
          </View>
          <Text style={{ marginLeft: 15,marginBottom: 20 , fontSize: 20 }}>
            Email: {this.state.kid.email}
          </Text>
          <Button
            backgroundColor="#03A9F4"
            title="Wyloguj"
            // onPress={this.handlePLay}
            onPress={this.handleLogout}
          />
        </Card>
          <Button
            backgroundColor="#03A9F4"
            title="Zmień hasło"
            // onPress={this.handlePLay}
            onPress={this.handleLogout}
            style={styles.buttons}
          />
          <Button
            backgroundColor="#03A9F4"
            title="Zmień email"
            // onPress={this.handlePLay}
            onPress={this.handleLogout}
            style={styles.buttons}
          />
          <Button
            backgroundColor="#03A9F4"
            title="Usuń konto"
            // onPress={this.handlePLay}
            onPress={this.handleLogout}
            style={styles.buttons}
            buttonStyle={[{ backgroundColor: 'red' }]}
            backgroundColor="red"
          />
        <Text style={{alignSelf: 'center', paddingTop: 50}}>Widio w social media</Text>
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <SocialIcon
            type='facebook'
          />
          <SocialIcon
            type='instagram'
          />
          <SocialIcon
            type='twitter'
          />
        </View>
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
  buttons: {
    width: 150,
    margin: 5,
    alignSelf: 'center',
  }
});