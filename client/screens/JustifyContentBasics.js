import React, { Component } from 'react'//головна + модал + Interactable
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Keyboard, Dimensions, Platform, TextInput, Alert, Switch, SafeAreaView } from 'react-native'
import Interactable from 'react-native-interactable'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { Button, ThemeProvider, PricingCard } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator, createAppContainer, TabBarBottom } from 'react-navigation'
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
  addItemUp,
  addItemDown
} from '../redux/actions'

class JustifyContentBasics extends Component {
static navigationOptions = ({ navigation }) => ({
  title: 'NotePassword',
  tabBarComponent: () => null,
  headerBackTitleVisible: false,
  headerMode: 'none',
  headerBackTitle: null,
  headerRight: (

    <TouchableOpacity
      onPress={() => navigation.navigate('SettingScreen')}
      style={{ marginRight: 20, paddingLeft: 20,alignSelf:'center',justifyContent:'center'  }}
    >
      <Image source={require('../../img/settings.png')} style={styles.imgset} />
    </TouchableOpacity>

  ),
  headerStyle: {
    backgroundColor: 'white'
  },
  headerTintColor: 'black',
  headerTitleStyle: {
    fontWeight: 'bold'
  },
  height: '100%'
});

constructor(props) {
  super(props)
  this.state = {
    listViewVisible: true,
    inputText: '',
    showPass: props.enableUp,
    snapToIndex: 0,
    testModalVisible: false,
    site: '',
    log: '',
    pass: ''

  }
  this.onDrawerSnap = this.onDrawerSnap.bind(this)
  this.showAlert1 = this.showAlert1.bind(this)
  this.toggleSwitch = this.toggleSwitch.bind(this)
}

showAlert1(index) {
  Alert.alert(
    'удалить',
    'логин и пароль?',
    [
      {
        text: 'OK',
        onPress: () => {
          this.props.updateaddItem(index)
          console.log('OK Pressed')
        }
      },
      { text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel' }
    ]
  )
}

onDrawerSnap(event) {
  const snapPointId = event.nativeEvent.index
  console.log('event.nativeEvent ', event.nativeEvent)
  this.buildNameTextInput = true
  if (snapPointId === 0) {
    this.websiteInput.focus()
  } else {
    Keyboard.dismiss()
  }
}

toggleSwitch() {
  this.setState({ showPass: !this.state.showPass })
}

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  };

  _addItem() {
    if (!this.state.showPass) {
      this.props.addItemUp(this.state.site, this.state.log, this.state.pass)
    } else {
      this.props.addItemDown(this.state.site, this.state.log, this.state.pass)
    }
  }

  componentDidMount() {
    if (this.props.enableUp) {
      console.log('save up')
      return
    }
    if (!this.props.enableUp) {
      console.log('save down')

      return
    }

    console.log(this.props.enableUp)
    this.setState({ openTheKeyboard: true })
    this.setState({ autoFocus: true })
  }

  clearText() {
    this.setState({ log: '', site: '', pass: '' })
  }

  render() {
    console.log('render')
    const { navigate } = this.props.navigation
    console.log('1 ', this.props.note)
    console.log('2 ', this.props.note && this.props.note.toJS())
    return (
      <View style={styles.mainView}>
        <View style={styles.mainViewflat}>
          <FlatList
            data={this.props.note && this.props.note.toJS()}
            keyExtractor={(item, index) => `draggable-item-${index}`}
            scrollPercent={5}
            onMoveEnd={({ data }) => this.setState({ data })}
            renderItem={({ item, index }) =>
              (<TouchableOpacity
                style={styles.touchFlat}
                onPress={() => {
                  console.log(index)
                  this.props.editItemIndex(index)
                  this.props.navigation.push('EditItem')
                  console.log('button')
                }}
              >
                <Text style={styles.itemSite}>{item.site}</Text>
                <Text style={styles.itemLog}>Login {item.log}  </Text>
                <Text style={styles.itemPass}>Password {item.pass}</Text>

                <View style={styles.buttonContainer} />
               </TouchableOpacity>)
            }
          />
          <SafeAreaView style={styles.interView}>

            <Interactable.View
              style={{ zIndex: 1, flex: 1 }}
              initialPosition={{x: 0, y: isIphoneX() ? -10 : -10}}
              ref={ref => { this.blue = ref }}
              snapPoints={[
                { x: 0, y: -600 },
                { x: 0, y: isIphoneX() ? -10 : -10 }
              ]}
              onSnap={this.onDrawerSnap}
              verticalOnly
            >
              <View style={styles.addView}>
                <TouchableOpacity
                  style={styles.addTouch}
                  onPress={() => {
                    console.log('buttonPress ');
                    this.blue.snapTo({ index: 0 })
                  }}
                >
                  <Text style={styles.addText}>
                    <Image source={require('../../img/add.png')} style={styles.img} /> Add
                  </Text>
                </TouchableOpacity>
                <TextInput
                  ref={ref => { this.websiteInput = ref }}
                  placeholder="   Website"
                  keyboardType="default"
                  style={styles.inputSite}
                  textAlign="left"
                  onChangeText={(site) => {
                    console.log('site-', site)
                    this.setState({ site })
                  }}
                  value={this.state.site}
                />

                <TextInput
                  placeholder="   Login"
                  keyboardType="default"
                  style={styles.inputLog}
                  textAlign="left"
                  onChangeText={(log) => {
                    console.log('log-', log)
                    this.setState({ log })
                  }}
                  value={this.state.log}
                />

                <TextInput
                  placeholder="   Password"
                  keyboardType="default"
                  autoCorrect={false}
                  secureTextEntry={false}
                  returnKeyType="done"
                  onChangeText={(pass) => this.setState({ pass })}
                  style={styles.inputPass}
                  textAlign="left"
                  onChangeText={(pass) => {
                    console.log('pass-', pass)
                    this.setState({ pass })
                  }}
                  value={this.state.pass}
                />
                <View style={styles.viewList}>
                  <Text style={styles.textStart}> List start  </Text>
                  <Switch
                    onValueChange={this.toggleSwitch}
                    value={this.state.showPass}
                  />
                  <Text style={styles.textEnd}> List end  </Text>
                </View>
                <View style={styles.cancelSave}>

                  <TouchableOpacity
                    onPress={() => {
                      console.log('button is pressed')
                      this.blue.snapTo({ index:1  })
                      Keyboard.dismiss()
                    }}
                  >
                    <View style={styles.viewCancel}>
                      <Text style={styles.textCancel}>  Cancel  </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('button is pressed')
                      this._addItem()
                      this.clearText()
                      this.toggleModal()
                      Keyboard.dismiss()
                      this.blue.snapTo({ index: 1 })
                    }}
                  >
                    <View style={styles.viewSave}>
                      <Text style={styles.textSave}>  Save  </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Interactable.View>
          </SafeAreaView>
        </View>
      </View>

    )
  }
}

function mapStateToProps(state) {
  return {
    counter: state.appData.get('counter'),
    note: state.appData.get('note'), //витягуем  массив
    addItem: state.appData.get('addItem')
  }
}
function mapDispatchToProps(dispatch) {
  return {

    addItemUp(site, log, pass) {
      dispatch(addItemUp(site, log, pass))
    },
    addItemDown(site, log, pass) {
      dispatch(addItemDown(site, log, pass))
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
    editItemIndex(index) {
      dispatch(editItemIndex(index))
    },
    updateaddItem(index) {
      dispatch(updateaddItem(index))
    }

  }
}
function isIphoneX() {
  const dimen = Dimensions.get('window')

  return (
    Platform.OS === 'ios' &&
       !Platform.isPad &&
       !Platform.isTVOS &&
       (dimen.height / dimen.width > 2 || dimen.height / dimen.width < 0.5)
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JustifyContentBasics)

const styles = StyleSheet.create({
  textSave: {
    color: 'gray',
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  viewSave: {
    color: 'white',
    borderRadius: 8,
    width: 170,
    flex: 1,
    borderColor: 'gray',
    marginLeft: 15,
    borderWidth: 0.5,
    backgroundColor: 'rgb(223,240,217)',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  textCancel: {
    color: 'gray',
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  viewCancel: {
    color: 'white',
    borderRadius: 8,
    width: 170,
    flex: 1,
    borderColor: 'gray',
    borderWidth: 0.5,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  cancelSave: {
    color: 'white',
    flex: 1 / 10,
    marginTop: 15,
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  textEnd: {
    color: 'gray',
    alignItems: 'flex-start'
  },
  textStart: {
    color: 'gray'
  },
  viewList: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    justifyContent: 'center'
  },
  inputPass: {
    flex: 1 / 10,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
    backgroundColor: 'rgb(240, 243, 244 )'
  },
  inputLog: {
    flex: 1 / 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
    backgroundColor: 'rgb(240, 243, 244 )'
  },
  inputSite: {
    flex: 1 / 10,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
    backgroundColor: 'rgb(240, 243, 244 )'
  },
  img: {
    width: 18,
    height: 18,
    tintColor: 'darkgray',

  },
  addText: {
    fontSize: 20,
    color: 'darkgray',
    alignSelf:'center',
    justifyContent:'center',
    height:'50%',
    width:'20%'
  },
  addTouch: {
    color: 'white',
    borderTopRightRadius: 10,
    width: '100%',
    alignSelf: 'center',
    //marginTop: 10,
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    flex: 1 / 10
  },
  addView: {
    flex: 1,
    borderRadius: 20,
    height: isIphoneX() ? 665 : 660,
    backgroundColor: 'white',
    padding: 5
    //paddingBottom:150,
  },
  interView: {
    position: 'absolute',
    //top: isIphoneX() ? 660 : 620,
    top: isIphoneX() ? 660 : 620,
    left: 0,
    width: '100%',
    zIndex: 1,
    backgroundColor: 'transparent'
  },
  itemPass: {
    color: 'rgb(191, 189, 189)',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },
  itemLog: {
    color: 'rgb(191, 189, 189)',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemSite: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    justifyContent: 'center'
  },
  touchFlat: {
    alignSelf: 'stretch',
    marginLeft: 25,
    marginRight: 25,
    borderBottomWidth: 1,
    borderColor: 'rgb(242,242,242)'
  },
  mainViewflat: {
    flex: 7,
    backgroundColor: 'lightgray'
  },
  mainView: {
    flex: 8,
    backgroundColor: 'lightgray'
  },
  buttonContainer: {
    backgroundColor: 'rgb(191, 189, 189)',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  imgset: { width: 25, height: 25},
  attribution: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  }

})
