
import React from 'react'//WebSite,login,password
//import react in our code.
import { StyleSheet, View, Button, SafeAreaView, TextInput, Text, Switch, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {
  updateItem,
  deleteaddItem,
  updateaddItem
} from '../redux/actions'
import SettingScreen from './SettingScreen'

class EditItemScreen extends React.Component {
  static navigationOptions = {
    //title: 'EditItem',
    headerStyle: {
      backgroundColor: '#FFF'
    },
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold'

    }
  };

  constructor(props) {
    super(props)
    this.toggleSwitch = this.toggleSwitch.bind(this)
    const { index } = props //индекс айтем на 1 екран
    const { note } = props //дани на 1 екрани массв
    const item = note.get(index)//з массива 1 елемент
    const muttableItem = item.toJS() // в прості

    this.state = {
      site: muttableItem.site,
      log: muttableItem.log,
      pass: muttableItem.pass,
      showPass: true
    }
  }

  toggleSwitch() {
    this.setState({ showPass: !this.state.showPass })
  }

  render() {
    console.log(this.state)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'lightgray' }}>
        <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'flex-start', margin: 15, backgroundColor: 'transparent' }}>
          <View style={{ alignSelf: 'flex-start' }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', color: 'black' }}>  WebSite:  </Text>
          </View>
          <View style={{ alignSelf: 'stretch', borderRadius: 15, backgroundColor: 'darkgray' }}>

            <TextInput
              placeholder={this.state.site}
              style={{ padding: 15, borderRadius: 15, backgroundColor: 'darkgray' }}
              onChangeText={(text) => {
                console.log('site-', text)
                this.setState({ site: text })
              }}
              value={this.state.site}
            />
          </View>
          <TouchableOpacity
            style={{ padding: 5, marginTop: 5, alignSelf: 'center', backgroundColor: 'lightblue' }}
            onPress={() => {
              console.log('button is pressed delete')
              this.props.deleteaddItem()
              //this.props.updateaddItem()
              this.props.navigation.goBack()
            }}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'flex-start', margin: 15, backgroundColor: 'transparent' }}>
          <View style={{ alignSelf: 'flex-start' }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', color: 'black' }}>  Login:  </Text>
          </View>
          <View style={{ alignSelf: 'stretch', borderRadius: 15, backgroundColor: 'darkgray' }}>

            <TextInput
              placeholder={this.state.log}
              style={{ padding: 15, borderRadius: 15, backgroundColor: 'darkgray' }}
              onChangeText={(text) => {
                console.log('log-', text)
                this.setState({ log: text })
              }}
              value={this.state.log}
            />
          </View>
        </View>
        <View style={{ flex: 3, margin: 15, backgroundColor: 'transparent' }}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', color: 'black', backgroundColor: 'transparent' }}>  Password:  </Text>
            <Switch
              style={{ backgroundColor: 'transparent' }}
              onValueChange={this.toggleSwitch}
              value={!this.state.showPass}
            />
          </View>
          <View style={{ alignSelf: 'stretch', borderRadius: 15, backgroundColor: 'darkgray' }}>

            <TextInput
              placeholder={this.state.pass}
              style={{ padding: 15, borderRadius: 15, backgroundColor: 'darkgray' }}
              secureTextEntry={this.state.showPass}
              onChangeText={(text) => {
                console.log('pass-', text)
                this.setState({ pass: text })
              }}
              value={this.state.pass}
            />

          </View>
        </View>
        <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: 'transparent' }}>

          <TouchableOpacity
            style={{ borderRadius: 15, padding: 15, paddingLeft: 70, paddingRight: 70, alignSelf: 'center', backgroundColor: 'blue' }}
            onPress={() => {
              console.log('button is pressed')
              this.props.updateItem(this.state.site, this.state.log, this.state.pass)
              this.props.navigation.goBack()
            }}
          >
            <View style={{ borderRadius: 25, alignSelf: 'center', backgroundColor: 'blue' }}>
              <Text style={{ color: 'white' }}>  Зберегти  </Text>
            </View>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    )
  }
}
function mapStateToProps(state) {
  return {

    index: state.appData.get('index'), //достаем з редакса поле индекс
    note: state.appData.get('note')

  }
}
function mapDispatchToProps(dispatch) {
  return {
    // incrementCounter() {
    //     dispatch(incrementCounter())
    // },
    // decrementCounter() {
    //     dispatch(decrementCounter())
    // },
    // resetCounter() {
    //     dispatch(resetCounter())
    //},
    updateItem(site, log, pass) {
      dispatch(updateItem(site, log, pass))
    },
    addItem(site, log, pass) {
      dispatch(addItem(site, log, pass))
    },
    resetaddItem() {
      dispatch(resetaddItem())
    },
    deleteaddItem() {
      dispatch(deleteaddItem())
    },
    updateaddItem() {
      dispatch(updateaddItem())
    },
    editItem() {
      dispatch(editItem())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditItemScreen)
