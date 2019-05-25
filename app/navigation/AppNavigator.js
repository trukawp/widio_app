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

const HomeStack = createStackNavigator({
  Home: HomeScreen,
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
});

MoviesChosenStack.navigationOptions = {
  tabBarLabel: 'WYBRANE',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart-half' : 'md-link'}
    />
  ),
};

const MoviesWatchedStack = createStackNavigator({
  MoviesWatched: MoviesWatchedScreen,
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
    // Settings: SettingsStack,
  },
  {
    initialRouteName: 'Home'
  }
);

const SignThingsStack = createSwitchNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  TabNavigator: TabNavigator,
  },
  {
    initialRouteName: 'SignUp'
  }
);

const AppContainer = createAppContainer(SignThingsStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}