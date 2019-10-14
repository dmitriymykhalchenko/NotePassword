import React from 'react'//Кнепачка settings
import { View, Text, Keyboard, KeyboardAvoidingView, FlatList, Image, StyleSheet, Switch, ScrollView, TouchableOpacity, TextInput, Alert, SafeAreaView } from 'react-native'
import { createStackNavigator, createAppContainer, withNavigation } from 'react-navigation'
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
     const saveAction = navigation.getParam('save', () => {})//????
     return {
       title: 'Settings',
       headerRight: (
         <TouchableOpacity onPress={() =>
           saveAction()

              }
         >
           <Text
             style={{
               color: 'green', marginRight: 20, paddingLeft: 20, fontSize: 18, fontWeight: 'bold'
             }}
           >
                  Save
           </Text>
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
     }
   }

   constructor(props) {
     super(props)
     this.toggleSwitch = this.toggleSwitch.bind(this)
     this.state = {
       inputText: '',
       showPass: props.enablePin,
       myNumber: props.pinCode
     }
   }

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
     this.setState({ myNumber: newText })
   }

   render() {
     return (
       <SafeAreaView style={{ flex: 1, alignItems: 'stretch', backgroundColor: 'lightgray', justifyContent: 'space-between' }}>
         <View style={{ flex: 1 / 9, flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 20, justifyContent: 'space-between' }}>
           <Text style={{ color: 'white', fontSize: 22, color: 'black', backgroundColor: 'transparent' }}>  PIN code  </Text>
           <Switch
             style={{ backgroundColor: 'transparent', color: 'red' }}
             onValueChange={this.toggleSwitch}
             value={this.state.showPass}
           />
         </View>

         {this.state.showPass &&
         <View style={{ flex: 1, margin: 10, padding: 25 }}>
           <TextInput
             keyboardType="numeric"
             style={{ height: 60, borderColor: 'gray', borderRadius: 15, backgroundColor: 'white', borderWidth: 1 }}
             textAlign="center"
             onChangeText={(text) => this.onChanged(text)}
                //{ this.setState({inputText: text})

             value={this.state.myNumber}
             maxLength={4}
           />
           <Text style={{ color: 'gray', marginTop: 15, marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>Code must be 4-digit</Text>
         </View>
        }
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
)(SettingScreen)
