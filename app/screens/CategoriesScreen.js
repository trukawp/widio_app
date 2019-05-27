import React from 'react';
import { ScrollView,StyleSheet,Text,View,TouchableOpacity,ImageBackground } from 'react-native';

import { category } from '../services/api';
import CategoryCards from '../components/CategoryCards/CategoryCards.js';
import HeaderIcon from '../components/HeaderIcon';

export default class CategoriesScreen extends React.Component {
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
      categories: [],
    };
  }

  componentDidMount() {
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

  render() {
    return (
      <ImageBackground source={require('../assets/images/app_background.jpg')} style={styles.backgroundImage} imageStyle={{opacity: 0.5}}>
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
