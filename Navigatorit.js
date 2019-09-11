import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
//import JustifyContentBasics from './JustifyContentBasics';
  const AppNavigator = createStackNavigator(
      {
          Home: HomeScreen,
          Profile: ProfileScreen,
          //JustifyContentBasics: JustifyContentBasics
      },
      {
          initialRouteName: "JustifyContentBasics",

      }
  );
    const AppContainer = createAppContainer(AppNavigator);
    export default class App extends React.Component {
        render() {
            return <AppContainer />;
        }
    }
