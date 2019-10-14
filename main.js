import React from 'react'//navigator
import { View, Text, Button } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import EditItemScreen from './client/screens/EditItemScreen'
import SettingScreen from './client/screens/SettingScreen'
import PinScreen from './client/screens/PinScreen'
import JustifyContentBasics from './client/screens/JustifyContentBasics'
import Before from './client/screens/Before'

const AppNavigator = createStackNavigator(
  {
    EditItem: EditItemScreen,
    //DetailsScreen: DetailsScreen,
    JustifyContentBasics,
    SettingScreen,
    PinScreen,
    Before


  },
  {

    initialRouteName: 'Before'

  }
)
const AppContainer = createAppContainer(AppNavigator)
export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}
