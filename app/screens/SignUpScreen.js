import React from 'react';
import { ScrollView, StyleSheet, View, Image, AsyncStorage, DatePickerIOS, Dimensions, Alert } from 'react-native';
import { Card, Button, Input, Text, CheckBox } from "react-native-elements";
import { withFormik } from 'formik';
import * as yup from 'yup';
import Dialog from "react-native-dialog";

import { auth,kid } from '../services/api';

class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      dialog: false,
    };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  onCancel = () => {
    this.setState({
      dialog: false,
    })
  }

  showDialog = () => {
    this.setState({
      dialog: true,
    })
  }

  onChangeText = (name) => (text) => {
    this.props.setFieldValue(name, text);
  }

  checkSex = (name, value) => () => {
    this.props.setFieldValue(name, value);
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
              style={{ width: 100, height: 100  }}
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
            <Text>Potwierdź hasło</Text>
            <Input
              name="password_confirmation"
              errorMessage={errors.password_confirmation}
              value={values.password_confirmation}
              onChangeText={this.onChangeText("password_confirmation")}
              secureTextEntry
              placeholder="Potwierdz hasło..."
            />
            <Text>Imię dziecka</Text>
            <Input
              name="name"
              errorMessage={errors.name}
              value={values.name}
              onChangeText={this.onChangeText("name")}
              placeholder="Imię dziecka..."
            />
            <Text>Płeć dziecka</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <CheckBox
              title="Chłopiec"
              checked={values.male}
              onPress={this.checkSex('male', true)}
              // uncheckedIcon={}
              // checkedIcon={}
            />
            <CheckBox
              title="Dziewczynka"
              checked={!values.male}
              onPress={this.checkSex('male', false)}
              // uncheckedIcon={}
              // checkedIcon={}
            />
            </View>
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
              title="Powrót"
              onPress={() => navigate("SignIn")}
            />
          </Card>
        </View>
      </ScrollView>
    );
  }
}

export default withFormik({
  handleSubmit: async (values, { setErrors }) => {
    // console.log('in', values)
    try {
      // console.log('try')
      // console.log('values', values)
      const params = {
        email: values.email,
        password: values.password,
        name: values.name,
        birthDate: values.birthDate,
        male: values.male,
      };
      // console.log('params', params);

      const { data } = await kid.update(params);
      // console.log('token', data.headers.authorization)

      // TODO: set proper path to auth_token
      // console.log('after storage')
      values.navigation.navigate('SignIn');
      Alert.alert (
        '',
        'Sukces! Udało się poprawnie założyć konto',
        [{text: 'OK', onPress: () => console.log('sukcess')}]
      );
      // console.log('after navigate')
    } catch (error) {
      // console.log('error:',error)
      if (error.errors) {
        setErrors({
          message: error.errors.message,
        });
      }
    }
  },
  validationSchema: yup.object().shape({
    email: yup.string().required('Email jest wymagany'),
    password: yup.string().required('Hasło jest wymagane'),
    password_confirmation: yup.string()
      .oneOf([yup.ref('password'), null], "Podane hasła nie zgadzają się")
      .required('Potwierdzenie hasła jest wymagane'),
    name: yup.string().required('Imię dziecka jest wymagane'),
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
    paddingTop: 50
    ,
  },
  error: {
    fontSize: 14,
    color: '#EE4B3A',
  }
});