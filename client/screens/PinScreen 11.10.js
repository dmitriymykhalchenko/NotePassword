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

  onSubmit() {
    this.setState({ myNumber: '' })
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
    const formatData = (data, numColumns) => {
      const numberOfFullRows = Math.floor(data.length / numColumns)

      let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns)
      while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
        numberOfElementsLastRow++
      }

      return data
    }
    const numColumns = 3
    const data = [
      { title: '1', numbers: 1 },
      { title: '2', numbers: 2 },
      { title: '3', numbers: 3 },
      { title: '4', numbers: 4 },
      { title: '5', numbers: 5 },
      { title: '6', numbers: 6 },
      { title: '7', numbers: 7 },
      { title: '8', numbers: 8 },
      { title: '9', numbers: 9 },
      { title: '' },
      { title: '0', numbers: 0 }
    ]
    function Item({ title }) {
      return (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )
    }
    //const enable = this.onComplete
    return (

      <SafeAreaView style={{ flex: 1, alignItems: 'stretch', backgroundColor: 'lightgray', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 / 9, flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 100, justifyContent: 'center', backgroundColor: 'transparent' }}>
          <Text style={{ color: 'white', fontSize: 22, color: 'black', backgroundColor: 'transparent' }}> Enter PIN code  </Text>
        </View>
        <View style={{ flex: 1, marginRight: 20, marginLeft: 20, backgroundColor: 'transparent' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#000', height: 40, borderRadius: 5, margin: 10 }}>
            <TextInput
              keyboardType="numeric"
              style={{ height: 38, width: 310, fontSize: 30, backgroundColor: 'white' }}
              textAlign="center"
            //keyboardShouldPersistTaps={'always'}
              onChangeText={(text) => this.onChanged(text)}
              //{ this.setState({inputText: text})
              value={this.state.myNumber}
              onSubmitEditing={() => { this.onSubmit() }}
              maxLength={4}
            />
            <TouchableOpacity onPress={() => this.onSubmit()}>
              <Image source={require('../../img/backspace.png')} style={{ padding: 10, margin: 5, height: 5, width: 25, resizeMode: 'stretch', alignItems: 'flex-end', justifyContent: 'flex-end', backgroundColor: 'transparent' }} />
            </TouchableOpacity>
          </View>

          {/*<Text style={{color:"gray",marginTop:15,marginLeft:10,fontWeight:'bold',fontSize:16,}}>{this.state.Code}</Text>
        {this.state.myNumber === this.state.pin ? <Text style={{color:"gray",marginTop:15,marginLeft:10,fontWeight:'bold',fontSize:16,}}>{this.state.Code}  </Text>:false}
        {this.state.myNumber !== this.state.pin ? <Text style={{color:"red",marginTop:15,marginLeft:10,fontWeight:'bold',fontSize:16,}}>{this.state.Wrong}  </Text>:false
        }*/}
          <View>{ this.renderElement() }</View>


          <TouchableOpacity
            style={{ borderRadius: 10, margin: 20, padding: 10, paddingLeft: 60, paddingRight: 60, alignSelf: 'center', backgroundColor: 'rgb(223,240,217)' }}
              //{this.myNumber === this.state.pin &&
            onPress={() => {
              this.onComplete(this.state.myNumber)


              //this.props.navigation.push('JustifyContentBasics')
              console.log('button')
            }}
          >
            <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center', backgroundColor: 'transparent' }}> Next </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSubmit()} />
          {/*<View style={{flexDirection:'row',justifyContent: 'space-between',backgroundColor:'red'}}>
              <TouchableOpacity onPress={ () => this.one() }>
                <View style={{ height: '35%',width:'200%', marginLeft:20,backgroundColor:'green'}}>
                 <Text style={{fontSize:40,color:'black',alignSelf:'center',backgroundColor:'transparent'}}>1</Text>
                </View>
              </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.one() }>
            <View style={{backgroundColor: '#4D243D', alignItems: 'center',justifyContent: 'center',margin: 2, height: '20%',width:'20%',}}>
             <Text>2</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View style={{backgroundColor: '#4D243D', alignItems: 'center',justifyContent: 'center',margin: 2, height: '20%',width:'20%',}}>
             <Text>3</Text>
            </View>
            </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={ () => this.onSubmit() }>

            <View style={{backgroundColor: '#4D243D', alignItems: 'center',justifyContent: 'center',margin: 2, height: '20%',width:'20%',}}>
             <Text>4</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.onSubmit() }>

            <View style={{backgroundColor: '#4D243D', alignItems: 'center',justifyContent: 'center',margin: 2, height: '20%',width:'20%',}}>
             <Text>5</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.onSubmit() }>

            <View style={{backgroundColor: '#4D243D', alignItems: 'center',justifyContent: 'center',margin: 2, height: '20%',width:'20%',}}>
             <Text>6</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.onSubmit() }>

            <View style={{backgroundColor: '#4D243D', alignItems: 'center',justifyContent: 'center',margin: 2, height: '20%',width:'20%',}}>
             <Text>7</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.onSubmit() }>

            <View style={{backgroundColor: '#4D243D', alignItems: 'center',justifyContent: 'center',margin: 2, height: '20%',width:'20%',}}>
             <Text>8</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.onSubmit() }>
            <View style={{backgroundColor: '#4D243D', alignItems: 'center',justifyContent: 'center',margin: 2, height: '20%',width:'20%',}}>
             <Text>9</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.onSubmit() }>
            <View style={{backgroundColor: '#4D243D', alignItems: 'center',justifyContent: 'center',margin: 2, height: '20%',width:'20%',}}>
             <Text>0</Text>
            </View>
            </TouchableOpacity><FlatList
      data={formatData(data, numColumns)}
      numColumns={numColumns}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Item title={item.title} />}
    />*/}
          <FlatList
            data={formatData(data, numColumns)}
            numColumns={numColumns}
            keyExtractor={item => item.id}
            onPressItem={this.item}
//renderItem={({ item }) => <Item title={item.title} />}
            renderItem={({ item }) => <FlatListItem item={item} />
}
          />
        </View>
      </SafeAreaView>

    )
  }
}
class FlatListItem extends React.Component {
  render() {
    return (
      <View style={styles.item}>

        <TouchableOpacity
          style={{ alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#DDDDDD',
            padding: 30 }}
          onPress={() => alert('FAB clicked')}
        >
          <Text style={styles.title}>{this.props.item.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
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
