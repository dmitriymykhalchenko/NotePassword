import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
  const AppNavigator = createStackNavigator(
      {
          Home: HomeScreen,
          Profile: ProfileScreen,
          JustifyContentBasics: JustifyContentBasics
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
{/*class HomeScreen extends React.Component {
  static navigationOptions = {
         title: 'Home',
         headerStyle: {
             backgroundColor: '#FFF',
         },
       headerTintColor: 'red',
         headerTitleStyle: {
             fontWeight: 'bold',

         },
     };
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Profile"
                    onPress={() => this.props.navigation.push('Profile')}
                />
            </View>
        );
    }
}
class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Profile Screen</Text>
                <Button
                    title="Go to Profile... again"
                    onPress={() => this.props.navigation.push('Profile')}
                />
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                 />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
    );
    }
}

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Profile: ProfileScreen
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
*/}
