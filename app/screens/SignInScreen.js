import React from 'react';
import { ScrollView,StyleSheet,View,Image } from 'react-native';
import { Card,Button,Input,Text } from "react-native-elements";
import { onSignIn } from "../auth";

// import SignUpScreen from './SignUpScreen';

export default class SignInScreen extends React.Component {
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

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="Zaloguj"
            onPress={() => {
              onSignIn().then(() => navigate("TabNavigator"));
            }}
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
