import React from 'react';
import { ScrollView,StyleSheet,View,Image } from 'react-native';
import { Card,Button,Input,Text } from "react-native-elements";

// import SignInScreen from './SignInScreen';

class SignUpScreen extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { handleChange, handleSubmit, errors, touched, values } = this.props;
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
            {
              errors.message && <Text style={styles.error}>
                {errors.message}
              </Text>
            }
            <Text>Email</Text>
            <Input
              name="email"
              errorMessage={touched.email && errors.email}
              value={values.email}
              onChange={handleChange}
              placeholder="Email address..."
            />
            <Text>Hasło</Text>
            <Input
              name="password"
              errorMessage={touched.email && errors.email}
              value={values.password}
              onChange={handleChange}
              secureTextEntry
              placeholder="Hasło..."
            />
            <Text>Potwierdź hasło</Text>
            <Input
              name="password_confirmation"
              errorMessage={touched.email && errors.email}
              value={values.password_confirmation}
              onChange={handleChange}
              secureTextEntry
              placeholder="Potwierdz hasło..."
            />

            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="Zarejestruj"
              onPress={handleSubmit}
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
      </ScrollView>
    );
  }
}

export default withFormik({
  handleSubmit: async (values) => {
    try {
      const params = {
        email: values.email,
        password: values.password,
        passoword_confirmation: values.passoword_confirmation,
      };

      const { data } = await auth.signUp(params);

      // TODO: set proper path to auth_token
      await AsyncStorage.saveItem('token', data.payload.auth_token);
      props.navigation.navigate('Home');
    } catch (error) {
      if (error.errors) {
        setErrors({
          message: error.errors.message,
        });
      }
      setSubmitting(false);
    }
  },
  validationSchema: yup.object().shape({
    email: yup.string().required('Email jest wymagany'),
    password: yup.string().required('Hasło jest wymagane'),
    passoword_confirmation: yup.string()
      .oneOf([Yup.ref('password'), null], 'Hasła musza być takie same')
      .required('Potwiedzenie hasła jest wymagane'),
  }),
})(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343E7A',
  },
  container2: {
    flex: 1,
    backgroundColor: '#343E7A',
    flexDirection: 'column',
    paddingTop: 50,
  },
  error: {
    fontSize: 14,
    color: '#EE4B3A',
  }
});
