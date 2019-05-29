import React from "react";
import { Button, View, Text, Platform } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import MoviesChosenScreen from '../screens/MoviesChosenScreen';
import MoviesWatchedScreen from '../screens/MoviesWatchedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CategoryHomeScreen from '../screens/CategoryHomeScreen';
import AuthLoading from '../containers/AuthLoading/AuthLoading';
import MovieScreen from '../screens/MovieScreen';
import MovieVideoScreen from '../screens/MovieVideoScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
},{
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index < 1,
    tabBarLabel: 'HOME',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-home${focused ? '' : ''}`
            : 'md-information-circle'
        }
        color='#2f95dc'
      />
    ),
  }),
});


const CategoriesStack = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryHome: CategoryHomeScreen,
},{
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index < 1,
    tabBarLabel: 'KATEGORIE',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-browsers' : 'md-link'}
        color='#2f95dc'
      />
    ),
  }),
});

const MoviesChosenStack = createStackNavigator({
  MoviesChosen: MoviesChosenScreen,
  Movie: MovieScreen,
  MovieVideo: MovieVideoScreen,
},{
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index < 1,
    tabBarLabel: 'WYBRANE',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-heart' : 'md-link'}
        color='#2f95dc'
      />
    ),
  }),
});

const MoviesWatchedStack = createStackNavigator({
  MoviesWatched: MoviesWatchedScreen,
  Movie: MovieScreen,
  MovieVideo: MovieVideoScreen,
},{
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index < 1,
    tabBarLabel: 'OBEJRZANE',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-star' : 'md-link'}
        color='#2f95dc'
      />
    ),
  }),
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
},{
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index < 1,
    tabBarLabel: 'PROFIL',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-link'}
        color='#2f95dc'
      />
    ),
  }),
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Categories: CategoriesStack,
    MovieChosen: MoviesChosenStack,
    MoviesWatched: MoviesWatchedStack,
    Profile: ProfileStack,
  },
  {
    initialRouteName: 'Home'
  }
);

const SignThingsStack = createSwitchNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  TabNavigator: TabNavigator,
  AuthLoading: { screen: AuthLoading },
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}