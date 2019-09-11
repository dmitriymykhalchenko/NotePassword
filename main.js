import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import EditItemScreen from './EditItemScreen';
import ProfileScreen from './ProfileScreen';
import JustifyContentBasics from './JustifyContentBasics';
  const AppNavigator = createStackNavigator(
      {
          EditItem: EditItemScreen,
          Profile: ProfileScreen,
          JustifyContentBasics: JustifyContentBasics,

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
