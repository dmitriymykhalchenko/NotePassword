import React from 'react'//Кнепачка settings
import { View, Text, Keyboard, KeyboardAvoidingView, FlatList, Image, StyleSheet, Switch, ScrollView, TouchableOpacity, TextInput, Alert, SafeAreaView } from 'react-native'
import { createStackNavigator, createAppContainer, NavigationActions, withNavigation } from 'react-navigation'
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

class SettingScreen extends React.Component {
   static navigationOptions = ({ navigation, navigationOptions }) => {
     const { params } = navigation
     const rightActionButton = navigation.getParam('rightActionButton', () => {})//????
     return {
       title: 'Settings',
       headerRight: (
         rightActionButton()
       ),
       headerStyle: {
         backgroundColor: 'white'
       },
       headerTintColor: 'black',
       headerTitleStyle: {
         fontWeight: 'bold'
       },
       height: '100%'
     }
   }


   constructor(props) {
     super(props)
     this.toggleSwitch = this.toggleSwitch.bind(this)
     this.state = {
       inputText: '',
       showPass: props.enablePin,
       myNumber: props.pinCode,
       //newText: ''
     }
     this.props.navigation.setParams({ rightActionButton: () => this.renderElement() })///????
   }

   toggleSwitch() {
     this.setState(
       { showPass: !this.state.showPass },
       () => {
         this.props.navigation.setParams({ rightActionButton: () => this.renderElement() })///????
       }
     )
   }

   renderElement() {
     console.log(this.state.myNumber.length)
     if (this.state.myNumber.length === 4 && this.state.showPass === this.props.enablePin) {
       return (
         <TouchableOpacity
           onPress={() =>
             this.saveAction()
         }
         >
           {/*//<Text style={[styles.textSave1, enablePin && styles.textSave]}>Save</Text>*/}
           <Text style={styles.textSave}>Save</Text>
         </TouchableOpacity>

       )
     }
     return (
       <TouchableOpacity onPress={() =>
         this.saveAction()
       }
       >
         <Text style={styles.textSave1}> Save </Text>
       </TouchableOpacity>

     )
   }

   //if(enablePin === false){
   saveAction() {
     console.log(pinCode.length)
     console.log(this.state.myNumber.length)

     console.log('saveAction')
     this.props.setEnablePin(this.state.showPass)
     this.props.setPinCode(this.state.myNumber)
     //this.buttonPressed()
     this.props.navigation.navigate('JustifyContentBasics')
   }


   componentDidMount() {
     this.props.navigation.setParams({ rightActionButton: () => this.renderElement() })///????
   }

   onChanged(text) {
     let newText = ''
     const numbers = '0123456789'

     for (let i = 0; i < text.length; i++) {
       if (numbers.indexOf(text[i]) > -1) {
         newText += text[i]
         console.log(newText.length)
       } else {
         // your call back function
         alert('please enter numbers only')
       }
     }
     this.setState(
       { myNumber: newText },
       () => {
         this.props.navigation.setParams({ rightActionButton: () => this.renderElement() })///????
       }
     )
   }

   // buttonPressed(text) {
   //   const newText = this.state.inputText + text
   //   const newTextLength = newText.length
   //   console.log(text.length);
   //   if (newTextLength > 4) {
   //     return
   //   }
   //   const oldTextLength = this.state.inputText.length
   //
   //   if (newTextLength === 4 && oldTextLength === 3) {
   //     this.onComplete(newText)
   //   }
   //
   //   this.setState({
   //     inputText: newText
   //   })
   // }

   render() {
     return (
       <SafeAreaView style={styles.main}>
         <View style={styles.pinView}>
           <Text style={styles.pinText}>  PIN code  </Text>
           <Switch
             //style={{ backgroundColor: 'transparent', color: 'red' }}
             onValueChange={this.toggleSwitch}
             value={this.state.showPass}
           />
         </View>

         {this.state.showPass &&
         <View style={styles.inputView}>
           <TextInput
             keyboardType="numeric"
             style={styles.textIn}
             textAlign="center"
             onChangeText={(text) => this.onChanged(text)}
                //{ this.setState({inputText: text})
             value={this.state.myNumber}
             maxLength={4}
           />
           <Text style={styles.Code}>Code must be 4-digit</Text>
         </View>
        }
       </SafeAreaView>
     )
   }
}
const styles = StyleSheet.create({
  textSave: { color: 'green',
    marginRight: 20,
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: 'bold'
  },
  textSave1: { color: 'red',
    marginRight: 20,
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: 'bold'
  },
  main: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'lightgray',
    justifyContent: 'space-between'
  },
  pinView: {
    flex: 1 / 9,
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  pinText: {
    color: 'white',
    fontSize: 22,
    color: 'black',
    backgroundColor: 'transparent'
  },
  inputView: {
    flex: 1,
    margin: 10,
    padding: 25
  },
  textIn: {
    height: 60,
    fontSize: 40,
    borderColor: 'gray',
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 1
  },
  Code: {
    color: 'gray',
    marginTop: 15,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16
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
)(SettingScreen)
