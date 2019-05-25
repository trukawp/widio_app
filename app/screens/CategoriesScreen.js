import React from 'react';
import { ScrollView,StyleSheet,Text,View } from 'react-native';

import { category } from '../services/api';
import CategoryCards from '../components/CategoryCards/CategoryCards.js'

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#343E7A',
      color: '#fff'
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          {this.state.categories.map(category => 
            <CategoryCards key={category.id} name={category.name} imgURL={category.imgURL} />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    // backgroundColor: '#343E7A',
  },
  box: {
    flex: 1,
    marginTop: 15,
    flexDirection:'row', 
    justifyContent: 'center', 
    flexWrap: 'wrap',
  },
});
