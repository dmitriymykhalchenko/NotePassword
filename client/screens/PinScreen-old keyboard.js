import React from 'react'//проверка піна
import { Alert, View, Text, Keyboard, KeyboardAvoidingView, FlatList, Image, StyleSheet, Switch, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
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
      Wrong: 'Wrong PIN'

    }
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
      //this.props.navigation.push('JustifyContentBasics')
      console.log('Pin is correct')
      Alert.alert('Welcome', 'is your NotePassword')
    } else {
      <Text>{this.state.Wrong}</Text>

      Alert.alert('Reset Pin', 'no correct is Pin')
      console.log('error')
      this.setState({ myNumber: '' })
    }
  }

  // onText() {
  //   if (this.state.myNumber === this.state.pin){
  //     <View style={{color:"gray",marginTop:15,marginLeft:10,fontWeight:'bold',fontSize:16,}}>
  //   <Text >{this.state.Wrong}</Text>
  //   </View>
  //     console.log("PinTExt is correct")
  //   } else {
  //
  //     <Text style={{color:"red",marginTop:15,marginLeft:10,fontWeight:'bold',fontSize:16,}}>{this.state.Code}</Text>
  //
  //     console.log(" text error")
  //     this.setState({myNumber:''})
  //   }
  // }
  toggleSwitch() {
    this.setState({ showPass: !this.state.showPass })


    // clearText(){
    //    this.setState({ saveAction:'' })
    // }
  }

  saveAction() {
    console.log('saveAction')
    this.props.setEnablePin(this.state.showPass)
    this.props.setPinCode(this.state.myNumber)
  }

  componentDidMount() {
    this.props.navigation.setParams({ save: () => this.saveAction() })///????
  }

  onChanged(text) {
    let newText = ''
    const numbers = '0123456789'

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText += text[i]
      } else {
        // your call back function
        alert('please enter numbers only')
      }
    }
    const newTextLength = newText.length
    const oldTextLength = this.state.myNumber.length
    console.log('==========================================================================')
    console.log('newTextLength ', newTextLength)
    console.log('oldTextLength ', oldTextLength)
    if (newTextLength === 4 && oldTextLength === 3) {
      console.log('newTextLength ', newTextLength)
      this.onComplete(newText)
    }
    console.log(newText.length)
    this.setState({ myNumber: newText })
  }

  renderElement() {
    if (this.state.myNumber <= this.state.pin) {
      return <Text style={{ color: 'gray', marginTop: 15, marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>{this.state.Code} </Text>
    }
    // else {
    //   return <Text>{this.state.Wrong} </Text>;
    // }
    if (this.state.myNumber !== this.state.pin) {
      return <Text style={{ color: 'red', marginTop: 15, marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>{this.state.Wrong} </Text>
    }
  }

  render() {
    //const enable = this.onComplete
    return (

      <SafeAreaView style={{ flex: 1, alignItems: 'stretch', backgroundColor: 'lightgray', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 / 9, flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 100, justifyContent: 'center', backgroundColor: 'transparent' }}>
          <Text style={{ color: 'white', fontSize: 22, color: 'black', backgroundColor: 'transparent' }}> Enter PIN code  </Text>
        </View>
        <View style={{ flex: 1, marginRight: 20, marginLeft: 20, backgroundColor: 'transparent' }}>
          <TextInput
            keyboardType="numeric"
            style={{ height: 60, fontSize: 30, borderColor: 'gray', borderRadius: 15, backgroundColor: 'white', borderWidth: 1 }}
            textAlign="center"
            onChangeText={(text) => this.onChanged(text)}
                //{ this.setState({inputText: text})
            value={this.state.myNumber}
            maxLength={4}
          />
          {/*<Text style={{color:"gray",marginTop:15,marginLeft:10,fontWeight:'bold',fontSize:16,}}>{this.state.Code}</Text>
        {this.state.myNumber === this.state.pin ? <Text style={{color:"gray",marginTop:15,marginLeft:10,fontWeight:'bold',fontSize:16,}}>{this.state.Code}  </Text>:false}
        {this.state.myNumber !== this.state.pin ? <Text style={{color:"red",marginTop:15,marginLeft:10,fontWeight:'bold',fontSize:16,}}>{this.state.Wrong}  </Text>:false
        }*/}
          <View>{ this.renderElement() }</View>


          <TouchableOpacity
            style={{ borderRadius: 10, margin: 20, padding: 10, paddingLeft: 60, paddingRight: 60, alignSelf: 'center', backgroundColor: 'rgb(223,240,217)' }}
              //{this.myNumber === this.state.pin &&
            onPress={() => {
              this.onComplete(this.dtste.myNumber)


              //this.props.navigation.push('JustifyContentBasics')
              console.log('button')
            }}
          >
            <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center', backgroundColor: 'transparent' }}> Next </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

    )
  }
}
const styles = StyleSheet.create({
  hideText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'right'
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
