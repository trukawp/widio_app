import React from 'react';
import { ScrollView,StyleSheet,View,Image } from 'react-native';
import { Card,Button,Input,Text } from "react-native-elements";

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
      <ScrollView style={styles.container}>
        <View style={styles.container2}>
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
              onPress={() => navigate("TabNavigator")}
            />
            <Text 
              style={{ marginTop: 10, fontSize: 17 }}
              onPress={() => navigate("SignUp")}>
              Nie masz jeszcze konta?
            </Text>
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343E7A',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
  },
});
