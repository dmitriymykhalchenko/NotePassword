import React from 'react'//проверка піна
import { Alert, View, Text, Keyboard, StatusBar, KeyboardAvoidingView, FlatList, Dimensions, Image, StyleSheet, Switch, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import { createStackNavigator, createAppContainer, withNavigation, NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import { Button, ThemeProvider, PricingCard } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
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
  enablePin,
  pinCode
} from '../redux/actions'

class PinScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    title: 'NotePassword',
    tabBarComponent: () => null,
    headerBackTitleVisible: false,
    headerMode: 'none',
    headerBackTitle: null
  });

  constructor(props) {
    super(props)
    this.toggleSwitch = this.toggleSwitch.bind(this)
    this.onComplete = this.onComplete.bind(this)
    this.state = {
      inputText: '',
      showPass: props.enablePin,
      myNumber: '',
      pin: props.pinCode,
      //pin: '1111',
      Code: 'Code must be 4-digit',
      Wrong: 'Wrong PIN',
      calculationText: ''
    }
  }

  buttonPressed(text) {
    const newText = this.state.inputText + text
    const newTextLength = newText.length
    if (newTextLength > 4) {
      return
    }
    const oldTextLength = this.state.inputText.length

    if (newTextLength === 4 && oldTextLength === 3) {
      this.onComplete(newText)
    }

    this.setState({
      inputText: newText
    })
  }

  onComplete(pin1) {
    if (pin1 === this.state.pin) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'JustifyContentBasics' })
        ]
      })
      this.props.navigation.dispatch(resetAction)
      console.log('Pin is correct')
    } else {
      console.log('error')
      this.setState({ inputText: '' })
    }
  }

  toggleSwitch() {
    this.setState({ showPass: !this.state.showPass })
  }

  saveAction() {
    console.log('saveAction')
    this.props.setEnablePin(this.state.showPass)
    this.props.setPinCode(this.state.myNumber)
  }

  componentDidMount() {
    this.props.navigation.setParams({ save: () => this.saveAction() })///????
  }

  onClear() {
    this.setState({ myNumber: '' })
    this.setState({ inputText: '' })
  }

  renderElement() {
    if (this.state.inputText !== this.state.pin && this.state.inputText.length === 4) {
      return <Text style={styles.wrong}>{this.state.Wrong} </Text>
    }
    return <Text style={styles.code}>{this.state.Code} </Text>
  }

  render() {
    const rows = []
    const nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [, 0]]
    for (let i = 0; i < 4; i++) {
      const row = []
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity
          onPress={() => {
            this.buttonPressed(nums[i][j])
            console.log(nums[i][j])
          }}
          disabled={!nums[i][j] && nums[i][j] !== 0}////////????
          key={nums[i][j]}
          style={nums[i][j] >= 0 ? styles.nums : styles.numsEmpty}
        >
          <Text style={styles.numsfont}>{nums[i][j]}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View
        key={i}
        style={styles.textIn}
      >{row}
      </View>)
    }

    function Item({ title }) {
      return (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )
    }
    return (
      <SafeAreaView style={styles.mainx}>
        <StatusBar hidden />
        <View style={styles.enter}>
          <Text style={styles.tenter}> Enter PIN code  </Text>
        </View>
        <View style={styles.textback}>
          <View style={{ flex: 1 }}>
            <View style={styles.touchtext}>
              <Text style={styles.statetext}>{this.state.inputText}</Text>
              <TouchableOpacity
                style={styles.touchclear}
                onPress={() => this.onClear()}
              >
                <Image
                  source={require('../../img/backspace.png')}
                  style={styles.backspace}
                />
              </TouchableOpacity>
            </View>
            <View style={{}}>{ this.renderElement() }</View>
            <View style={styles.x}>
              <View style={styles.y}>
                {rows}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  y: {
    flex: 1,
    width: 15,
    padding: 10
  },
  x: {
    flex: 1,
    flexDirection: 'row',
    margin: 25
  },
  backspace: {
    position: 'absolute',
    height: 35,
    width: 35,
    bottom: -8,
    left: 12,
    tintColor: 'rgb(180,180,180)',
    backgroundColor: 'transparent'
  },
  touchclear: {
    padding: 10, alignSelf: 'center', backgroundColor: 'transparent'
  },
  statetext: {
    fontSize: 40, marginLeft: 80, fontFamily: 'verdana', width: '50%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: 'transparent', color: 'black'
  },
  touchtext: {
    flexDirection: 'row', marginRight: 20, marginLeft: 20, width: '100%', justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white', borderWidth: 0.5, borderColor: 'rgb(180,180,180)', height: 65, borderRadius: 10
  },
  textback: {
    flex: 1, marginRight: 20, marginLeft: 20, backgroundColor: 'transparent'
  },
  tenter: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    backgroundColor: 'transparent' },
  enter: {
    flex: 1 / 13,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 70,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  mainx: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'rgb(242,242,242)',
    justifyContent: 'space-between' },
  nums: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 15,
    borderColor: 'rgb(180,180,180)',
    backgroundColor: 'rgb(242,242,242)',
    borderWidth: 1,
    width: '26%',
    height: '70%'
  },
  numsEmpty: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: 'rgb(242,242,242)',
    width: '26%',
    height: '70%'
  },
  numsfont: {
    fontSize: 27,
    color: 'rgb(176,176,176)',
    padding: 10,
    fontWeight: '400',
    fontFamily: 'verdana'
  },
  wrong: {
    color: 'red',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10
  },
  code: {
    color: 'rgb(180,180,180)',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10
  },
  textIn: {
    flexDirection: 'row',
    flex: 2,
    width: '100%',
    //backgroundColor:'red',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  item: {
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2 / 1,
    margin: 5,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5
  },
  title: {
    fontSize: 20,
    backgroundColor: 'rgb(180,180,180)'
  }
})

function mapStateToProps(state) {
  return {
    enablePin: state.appData.get('enablePin'),
    pinCode: state.appData.get('pinCode')
  }
}

function mapDispatchToProps(dispatch) {
  return {

    setEnablePin(value) {
      dispatch(enablePin(value))
    },
    setPinCode(value) {
      dispatch(pinCode(value))
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PinScreen)
