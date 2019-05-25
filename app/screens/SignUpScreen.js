import React from 'react';
import { ScrollView,StyleSheet,View,Image } from 'react-native';
import { Card,Button,Input,Text } from "react-native-elements";
import { onSignIn } from "../auth";

// import SignInScreen from './SignInScreen';

export default class SignUpScreen extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/images/widio_logo.png')}
            style={{ width: 200, height: 200  }}
          />
        </View>
        <Card>
          <Text>Email</Text>
          <Input placeholder="Email address..." />
          <Text>Password</Text>
          <Input secureTextEntry placeholder="Password..." />
          <Text>Confirm Password</Text>
          <Input secureTextEntry placeholder="Confirm Password..." />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="Zarejestruj"
            onPress={() => {
              onSignIn().then(() => navigate("TabNavigator"));
            }}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Zaloguj"
            onPress={() => navigate("SignIn")}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343E7A',
    // alignItems: 'center',
    flexDirection: 'column',
    // justifyContent: 'center',
    paddingTop: 50,
  },
});