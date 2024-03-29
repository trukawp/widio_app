import React from 'react';
import { ScrollView, StyleSheet, View, Image, AsyncStorage,StatusBar } from 'react-native';
import { Card, Button, Input, Text } from 'react-native-elements';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { auth } from '../services/api';

class SignInScreen extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    StatusBar.setHidden(false);
  }

  onChangeText = (name) => (text) => {
    this.props.setFieldValue(name, text);
  }

  render() {
    const { handleChange, handleSubmit, errors, values } = this.props;
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
            {errors.message && <Text style={styles.error}>{errors.message}</Text>}
            <Text>Email</Text>
            <Input
              name="email"
              errorMessage={errors.email}
              value={values.email}
              onChangeText={this.onChangeText("email")}
              placeholder="Email address..."
              autoCapitalize="none"
            />
            <Text>Hasło</Text>
            <Input
              name="password"
              errorMessage={errors.password}
              value={values.password}
              onChangeText={this.onChangeText("password")}
              secureTextEntry
              placeholder="Hasło..."
            />

            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="Zaloguj"
              onPress={handleSubmit}
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

export default withFormik({
  handleSubmit: async (values) => {
    console.log('in')
    try {
      const params = {
        email: values.email,
        password: values.password,
      };

      console.log('email', email)
      // console.log('email' values.email)

      const data = await auth.signIn(params);
      console.log('data', data)

      // TODO: set proper path to auth_token
      await AsyncStorage.saveItem('token', data.payload.auth_token);
      props.navigation.navigate('Home');
    } catch (error) {
      if (error.errors) {
        setErrors({
          message: error.errors.message,
        });
      }
    }
  },
  validationSchema: yup.object().shape({
    email: yup.string().required('Email jest wymagany'),
    password: yup.string().required('Hasło jest wymagane')
  }),
})(SignInScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343E7A',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
  },
  error: {
    fontSize: 14,
    color: '#EE4B3A',
  }
});
