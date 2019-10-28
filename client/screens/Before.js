import React, { Component } from 'react'//головна + модал
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { Button, ThemeProvider, PricingCard } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator, createAppContainer, NavigationActions, StackActions, TabBarBottom } from 'react-navigation'
import {
  incrementCounter,
  decrementCounter,
  resetCounter,
  addItem,
  logCounter,
  passCounter,
  resetaddItem,
  editItem,
  editItemIndex,
  deleteaddItem,
  updateaddItem,
  pinCode
} from '../redux/actions'

class Before extends Component {
static navigationOptions = ({ navigation }) => ({
  tabBarComponent: () => null,
  headerBackTitleVisible: null,
  headerMode: 'none',
  headerBackTitle: null,
  header: null
});//????

UNSAFE_componentWillMount() {
  if (this.props.enablePin) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'PinScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
    console.log('good')
    console.log('pinCode ', pinCode.length)
    return
  }
  if (!this.props.enablePin) { //false....
    console.log('error')

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'JustifyContentBasics' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
    return
  }

  console.log(this.props.enablePin)
  console.log('UNSAFE_componentWillMount()')
}

render() {
  return null
}
}

function mapStateToProps(state) {
  return {
    counter: state.appData.get('counter'),
    note: state.appData.get('note'), //витягуем  массив
    addItem: state.appData.get('addItem'),
    enablePin: state.appData.get('enablePin'),
    pinCode: state.appData.get('pinCode')

  }
}
function mapDispatchToProps(dispatch) {
  return {

    addItem(site, log, pass) {
      dispatch(addItem(site, log, pass))
    },
    resetaddItem() {
      dispatch(resetaddItem())
    },
    deleteaddItem() {
      dispatch(deleteaddItem())
    },
    editItemIndex(index) {
      dispatch(editItemIndex(index))
    },
    updateaddItem(index) {
      dispatch(updateaddItem(index))
    },
    setPinCode(value) {
      dispatch(pinCode(value))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Before)
