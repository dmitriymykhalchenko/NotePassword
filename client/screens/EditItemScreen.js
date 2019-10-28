
import React from 'react'//WebSite,login,password
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
      <SafeAreaView style={styles.mainX}>
        <View style={styles.main}>
          <View style={styles.WebSiteView}>
            <Text style={styles.WebSiteText}>  WebSite:  </Text>
          </View>
          <View style={styles.ViewInput}>

            <TextInput
              placeholder={this.state.site}
              style={styles.TextIn}
              onChangeText={(text) => {
                console.log('site-', text)
                this.setState({ site: text })
              }}
              value={this.state.site}
            />
          </View>
          <TouchableOpacity
            style={styles.TouchDel}
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
        <View style={styles.mainLog}>
          <View style={styles.ViewLog}>
            <Text style={styles.TextLog}>  Login:  </Text>
          </View>
          <View style={styles.InputLog}>

            <TextInput
              placeholder={this.state.log}
              style={styles.TextInLog}
              onChangeText={(text) => {
                console.log('log-', text)
                this.setState({ log: text })
              }}
              value={this.state.log}
            />
          </View>
        </View>
        <View style={styles.mainPass}>
          <View style={styles.ViewPass}>
            <Text style={styles.TextPass}>  Password:  </Text>
            <Switch
              //style={{ backgroundColor: 'transparent' }}
              onValueChange={this.toggleSwitch}
              value={!this.state.showPass}
            />
          </View>
          <View style={styles.InputPass}>
            <TextInput
              placeholder={this.state.pass}
              style={styles.TextInPass}
              secureTextEntry={this.state.showPass}
              onChangeText={(text) => {
                console.log('pass-', text)
                this.setState({ pass: text })
              }}
              value={this.state.pass}
            />
          </View>
        </View>
        <View style={styles.mainSave}>
          <TouchableOpacity
            style={styles.TouchSave}
            onPress={() => {
              console.log('button is pressed')
              this.props.updateItem(this.state.site, this.state.log, this.state.pass)
              this.props.navigation.goBack()
            }}
          >
            <View style={styles.ButView}>
              <Text style={styles.SaveText}>  Зберегти  </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  mainX: {
    flex: 1,
    backgroundColor: 'lightgray'
  },
  main: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 15,
    backgroundColor: 'transparent'
  },
  WebSiteView: {
    alignSelf: 'flex-start'
  },
  WebSiteText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black'
  },
  ViewInput: {
    alignSelf: 'stretch',
    borderRadius: 15,
    backgroundColor: 'darkgray'
  },
  TextIn: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'darkgray'
  },
  TouchDel: {
    padding: 5,
    marginTop: 5,
    alignSelf: 'center',
    backgroundColor: 'lightblue'
  },
  mainLog: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 15,
    backgroundColor: 'transparent'
  },
  ViewLog: {
    alignSelf: 'flex-start'
  },
  TextLog: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black'
  },
  InputLog: {
    alignSelf: 'stretch',
    borderRadius: 15,
    backgroundColor: 'darkgray'
  },
  TextInLog: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'darkgray'
  },
  mainPass: {
    flex: 3,
    margin: 15,
    backgroundColor: 'transparent'
  },
  ViewPass: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  TextPass: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'transparent'
  },
  InputPass: {
    alignSelf: 'stretch',
    borderRadius: 15,
    backgroundColor: 'darkgray'
  },
  TextInPass: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'darkgray'
  },
  mainSave: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'transparent'
  },
  TouchSave: {
    borderRadius: 15,
    padding: 15,
    paddingLeft: 70,
    paddingRight: 70,
    alignSelf: 'center',
    backgroundColor: 'blue'
  },
  ButView: {
    borderRadius: 25,
    alignSelf: 'center',
    backgroundColor: 'blue'
  },
  SaveText: {
    color: 'white',
    fontSize: 20
  }

})
function mapStateToProps(state) {
  return {
    index: state.appData.get('index'), //достаем з редакса поле индекс
    note: state.appData.get('note')
  }
}
function mapDispatchToProps(dispatch) {
  return {

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
