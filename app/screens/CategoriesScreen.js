import React from 'react';
import { ScrollView,StyleSheet,Text,View,TouchableOpacity,ImageBackground } from 'react-native';

import { category } from '../services/api';
import CategoryCards from '../components/CategoryCards/CategoryCards.js';
import HeaderIcon from '../components/HeaderIcon';
import PasswordPrompt from '../components/PasswordPrompt';
import { NavigationEvents } from 'react-navigation';
import { Audio } from 'expo';


export default class CategoriesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const openProfile = () => navigation.state.params.openProfile();

    return {
      headerStyle: {
        backgroundColor: '#343E7A',
      },
      headerRight: (
        <HeaderIcon
          name='ios-settings'
          onPress={openProfile}
        />
      ),
      title: 'Widio',
      headerTintColor: '#FAE99E',
      headerTitleStyle: {
        fontFamily: 'lilitaone-regular',
        fontSize: 27,
      },
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      openProfile: this._togglePromptVisibility,
    });
    category.all()
      .then(response => {
        this.setState({
          ...this.state,
          categories: response.data
        })
      })
  }

  _onPressButton (categoryId, categoryName) {
    this.props.navigation.navigate('CategoryHome', {categoryId: categoryId, categoryName: categoryName})
  }

  _togglePromptVisibility = () => {
    this.setState({
      isPasswordPromptVisible: !this.state.isPasswordPromptVisible,
    });
  }

  _onPromptOk = () => {
    this.props.navigation.navigate('Profile');
    this._togglePromptVisibility();
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

  render() {
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.3}}>
      <NavigationEvents
        onWillFocus={this.handlePLay}
      />
      <PasswordPrompt
        isVisible={this.state.isPasswordPromptVisible}
        onCancel={this._togglePromptVisibility}
        onOk={this._onPromptOk}
      />
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          {this.state.categories.map(category =>
         <TouchableOpacity onPress={this._onPressButton.bind(this, category.id, category.name)} key={category.id}>
            <CategoryCards name={category.name} imgURL={category.imgURL} />
          </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  box: {
    flex: 1,
    marginTop: 15,
    flexDirection:'row', 
    justifyContent: 'center', 
    flexWrap: 'wrap',
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  }
});
