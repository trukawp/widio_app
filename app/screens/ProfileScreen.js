import React from 'react';
import { ScrollView,StyleSheet,View,ImageBackground,AsyncStorage,Alert, Linking } from 'react-native';
import { Card,Button,Text,SocialIcon,Input } from "react-native-elements";
import { Audio, Asset, AppLoading } from 'expo';
import JWT from 'expo-jwt';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";

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
      password: "",
      email: "",
      form: {
        birthDate: "",
        email: "",
        id: "",
        male: false,
        name: "",
        password: ""
      },
      dialogPasswordVisible: false,
      dialogDeleteVisible: false,
      dialogEmailVisible: false
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
          form: {
            birthDate: response.data.birthDate,
            email: response.data.email,
            id: response.data.id,
            male: response.data.male,
            name: response.data.name,
            password: response.data.password
          }
        })
      })
  }

  showPasswordDialog = () => {
    this.setState({ dialogPasswordVisible: true });
  };

  handleSubmitPassword = async (password) => {
    this.setState({
      form: { ...this.state.form, password: password },
    },
      () => this.onModifyPassword()
    );
  }

  ratingCompleted = (rating) => {
    this.setState({
      form: { ...this.state.form, vote: rating },
      _form: { ...this.state._form, vote: rating, watched: true },

    });
  }

  handleSubmitEmail = async (email) => {
    this.setState({
      form: { ...this.state.form, email: email },
    },
      () => this.onModifyEmail()
    );
  }

  onModifyEmail = () => {
    try {
      kid.modifyEmail(this.state.form)
        .then(response => {
          Alert.alert (
              'Sukces!',
              'Zaloguj się ponownie przy użyciu nowego adresu email',
              [{text: 'OK', onPress: () => this.handleLogout()}]
          )
        })
    } catch (error) {
      console.log('error', error)
    }
  }

  onModifyPassword = () => {
    try {
      kid.modifyPassword(this.state.form)
        .then(response => {
          Alert.alert (
              'Sukces!',
              'Zaloguj się ponownie przy użyciu nowego hasła',
              [{text: 'OK', onPress: () => this.handleLogout()}]
          )
        })
    } catch (error) {
      console.log('error', error)
    }
  }

  handleSubmitDelete = () => {
    console.log(this.state.password);
    console.log(this.state.email)
  }

  showEmailDialog = () => {
    this.setState({ dialogEmailVisible: true});
  };

  showDeleteDialog = () => {
    this.setState({ dialogDeleteVisible: true});
  };
 
  handleCancel = () => {
    this.setState({ dialogPasswordVisible: false, dialogDeleteVisible: false, dialogEmailVisible: false });
  };
 
  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogPasswordVisible: false });
  };

  handleLogout = () => {
    try {
      AsyncStorage.removeItem('token');
      this.props.navigation.navigate("SignIn");
    } catch (error) {
      console.log(error)
    }
  }

  render() { 
    // console.log(this.state.kid)
    // console.log('forma',this.state.form)
    // console.log(this.state.form.email)
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
            onPress={this.showPasswordDialog}
            style={styles.buttons}
          />
          <Button
            backgroundColor="#03A9F4"
            title="Zmień email"
            // onPress={this.handlePLay}
            onPress={this.showEmailDialog}
            style={styles.buttons}
          />
          <Button
            backgroundColor="#03A9F4"
            title="Usuń konto"
            // onPress={this.handlePLay}
            onPress={this.showDeleteDialog}
            style={styles.buttons}
            buttonStyle={[{ backgroundColor: 'red' }]}
            backgroundColor="red"
          />
        <Text style={{alignSelf: 'center', paddingTop: 50}}>Widio w social media</Text>
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <SocialIcon
            type='facebook'
            raised={true}
            onPress={() => Linking.openURL('https://facebook.com')}
          />
          <SocialIcon
            type='instagram'
            raised={true}
            onPress={() => Linking.openURL('https://instagram.com')}
          />
          <SocialIcon
            type='twitter'
            raised={true}
            onPress={() => Linking.openURL('https://twitter.com')}
          />
        </View>
      </View>
        <Dialog.Container visible={this.state.dialogPasswordVisible}>
          <Dialog.Title>Zmiana hasła</Dialog.Title>
          <Dialog.Description>
            Aby zmienić hasło uzupełnij poniższe pole i kliknij Zapisz
          </Dialog.Description>
          <Dialog.Input 
            label="Nowe hasło" 
            autoFocus={true} 
            secureTextEntry
            name="password"
            onChangeText={(password) => this.setState({password})}
          />
          <Dialog.Button label="Anuluj" onPress={this.handleCancel} />
          <Dialog.Button label="Zapisz" onPress={() => this.handleSubmitPassword(this.state.password)} />
        </Dialog.Container>
        <Dialog.Container visible={this.state.dialogEmailVisible}>
          <Dialog.Title>Zmiana adresu email</Dialog.Title>
          <Dialog.Description>
            Aby zmienić email uzupełnij poniższe pole i kliknij Zapisz
          </Dialog.Description>
          <Dialog.Input
            label="Nowy email"
            autoFocus={true} 
            autoCapitalize="none"
            name="email"
            onChangeText={(email) => this.setState({email})}
          />
          <Dialog.Button label="Anuluj" onPress={this.handleCancel} />
          <Dialog.Button label="Zapisz" onPress={() => this.handleSubmitEmail(this.state.email)} />
        </Dialog.Container>
        <Dialog.Container visible={this.state.dialogDeleteVisible}>
          <Dialog.Title>Usuwanie konta</Dialog.Title>
          <Dialog.Description>
            Czy na pewno chcesz usunąć to konto? Zmiana jest nieodwracalna
          </Dialog.Description>
          <Dialog.Button label="Anuluj" onPress={this.handleCancel} />
          <Dialog.Button label="Usuń" onPress={this.handleSubmitDelete} />
        </Dialog.Container>
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