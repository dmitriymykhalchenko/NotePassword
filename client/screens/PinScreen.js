import React from 'react'//проверка піна
import { Alert, View, Text, Keyboard, KeyboardAvoidingView, FlatList, Dimensions, Image, StyleSheet, Switch, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
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
    // this.myNumber = this.myNumber.bind(this);
    // this.pin = this.pin.bind(this);
    this.state = {
      inputText: '',
      showPass: props.enablePin,
      myNumber: '',
      //pin: '1111',
      pin: props.pinCode,
      Code: 'Code must be 4-digit',
      Wrong: 'Wrong PIN',
      calculationText: ''
    }
  }



  buttonPressed(text) {
    let newText = this.state.inputText + text
    const newTextLength = newText.length
    if (newTextLength > 4) {
      return;
    }
    const oldTextLength = this.state.inputText.length

    if (newTextLength === 4 && oldTextLength === 3) {

      this.onComplete(newText)
    }

    this.setState({
      inputText:newText
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
    if (this.state.inputText !== this.state.pin && this.state.inputText.length === 4 ) {
      return <Text style={{ color: 'red', marginTop: 15, marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>{this.state.Wrong} </Text>
    }

    return <Text style={{ color: 'gray', marginTop: 15, marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>{this.state.Code} </Text>
  }

  render() {
    const rows = []
    const nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [, 0]]
    for (let i = 0; i < 4; i++) {
      const row = []
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity 
          onPress={() => this.buttonPressed(nums[i][j])}
          disabled={!nums[i][j] && nums[i][j] !== 0}////////????
          key={nums[i][j]}
          style={{
            flex: 1,
            alignItems: 'center',
            alignSelf: 'stretch',
            justifyContent: 'center',
            margin: 5,
            borderRadius:15,
            borderColor: 'gray',
            backgroundColor: 'rgb(242,242,242)',
            borderWidth: 1.9,
            width: 35 }}
        >
          <Text
            style={{ fontSize: 30,padding:15
            }}
          >{nums[i][j]}
          </Text>
                 </TouchableOpacity>)
      }
      rows.push(<View
        key={i}
        style={{ flexDirection: 'row',
          flex: 1,
          backgroundColor:'transparent',
          justifyContent: 'space-around',
          alignItems: 'center' }}
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

      <SafeAreaView style={{ flex: 1, alignItems: 'stretch', backgroundColor: 'lightgray', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 / 9, flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 100, justifyContent: 'center', backgroundColor: 'transparent' }}>
          <Text style={{ color: 'white', fontSize: 22, color: 'black', backgroundColor: 'transparent' }}> Enter PIN code  </Text>
        </View>
        <View style={{ flex: 1, marginRight: 20, marginLeft: 20, backgroundColor: 'transparent' }}>

          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#000', height: 40, borderRadius: 5, margin: 10 }}>
              <Text style={{ fontSize: 30, width: 280, justifyContent: 'center', color: 'black' }}>{this.state.inputText}</Text>
              <TouchableOpacity
                style={{ padding: 10, alignSelf: 'flex-end', backgroundColor: 'transparent' }}
                onPress={() => this.onClear()}
              >
                <Image source={require('../../img/backspace.png')} style={{ padding: 10, marginLeft: 30, height: 5, width: 25, resizeMode: 'stretch', alignItems: 'flex-end', justifyContent: 'flex-end', backgroundColor: 'transparent' }} />
              </TouchableOpacity>
            </View>
            {/*<Text style={{color:"gray",marginTop:15,marginLeft:10,fontWeight:'bold',fontSize:16,}}>{this.state.Code}</Text>
        {this.state.myNumber === this.state.pin ? <Text style={{color:"gray",marginTop:15,marginLeft:10,fontWeight:'bold',fontSize:16,}}>{this.state.Code}  </Text>:false}
        {this.state.myNumber !== this.state.pin ? <Text style={{color:"red",marginTop:15,marginLeft:10,fontWeight:'bold',fontSize:16,}}>{this.state.Wrong}  </Text>:false
        }*/}

            <View>{ this.renderElement() }</View>
            <View style={{ flex: 7,
              flexDirection: 'row',
              margin: 10 }}
            >
              <View style={{ flex: 3,
                backgroundColor: 'transparent',
                borderColor: 'red',
                width: 15,

                padding: 10
              }}
              >
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
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  btntext: {
    fontSize: 30

  },
  white: {
    color: 'white'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  hideText: {
    color: '#fff',
    fontSize: 1,
    textAlign: 'right'
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
    fontSize: 20


  },
  mContainer: {
    position: 'absolute',
    // //height: 105,
    // //width: 'width',
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: 'transparent'
  },
  mContent: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 15
  },
  textInputStyle: {
    marginHorizontal: 15,
    flex: 1,
    height: 40,
    color: '#000',
    fontSize: 14,
    textAlign: 'left',
    textAlignVertical: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: '#6f6f6f',
    borderWidth: 0.5,
    backgroundColor: '#f5f5f5'
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
