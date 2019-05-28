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

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Movie: MovieScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'HOME',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : ''}`
          : 'md-information-circle'
      }
    />
  ),
};

const CategoriesStack = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryHome: CategoryHomeScreen,
  Movie: MovieScreen
});

CategoriesStack.navigationOptions = {
  tabBarLabel: 'KATEGORIE',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-browsers' : 'md-link'}
      onPress={this._onPressButton}
    />
  ),
};

const MoviesChosenStack = createStackNavigator({
  MoviesChosen: MoviesChosenScreen,
  Movie: MovieScreen,
});

MoviesChosenStack.navigationOptions = {
  tabBarLabel: 'WYBRANE',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-link'}
    />
  ),
};

const MoviesWatchedStack = createStackNavigator({
  MoviesWatched: MoviesWatchedScreen,
  Movie: MovieScreen
});

MoviesWatchedStack.navigationOptions = {
  tabBarLabel: 'OBEJRZANE',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-star' : 'md-link'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'PROFIL',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-link'}
    />
  ),
};

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