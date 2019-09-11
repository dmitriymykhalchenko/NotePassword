import React, { Component } from 'react';
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, TextInput, Alert, AlertIOS, SafeAreaView } from 'react-native'

import {
  incrementCounter,
  decrementCounter,
  resetCounter,
  addItem,
  logCounter,
  passCounter,
  resetaddItem,
  editItem
} from './client/redux/actions'

import {connect} from 'react-redux'
import Modal from "react-native-modal"
import { Button, ThemeProvider,PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


class JustifyContentBasics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listViewVisible: true,
      inputText: '',
      isModalVisible: false,
      items: [
        {key: 'Facebook', log:'Face', pass:'qwerty', color: 'lightgray'},
        {key: 'Instagram', log:'Face', pass:'qwerty', color: 'white'},
        {key: 'google', log:'Face', pass:'qwerty', color: 'orange'},
      ],

      testModalVisible: false,
      site:'',
      log:'',
      pass:''
    }

  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  hideModal= ()=>{
      this.setState({
        testModalVisible: !this.state.testModalVisible
      })
  }

  _addItem() {
    {/*const newa = this.state.items
    newa.push({key: this.state.site,name: this.state.name,password: this.state.password })
    console.log('add new position', newa)
    return this.setState({items: newa})
*/}
    this.props.addItem(this.state.site,this.state.log,this.state.pass)
    return this.setState({addItem: this.props.addItem})
  }

  clearText(){
     this.setState({ log:'', site:'', pass:'' })
  }

  render() {

    console.log("1 ", this.props.note);
    console.log("2 ", this.props.note && this.props.note.toJS());
    return (
      <SafeAreaView style={{ flex: 1,  backgroundColor: 'black', }}>
        <View style={{flex: 1, backgroundColor: 'yellow'}}>
        <View style={{ backgroundColor:'red', }}>
          <Button
            icon={
              <Icon
                name="book"
                size={20}
                color="white"
              />
            }
            title="  New note"
            onPress={this.toggleModal}
            />
          <TouchableOpacity style={{ padding: 5,marginTop:5,alignSelf:'center', backgroundColor: 'lightblue'}} onPress={() => this.props.resetaddItem()}>
            <Text>Reset</Text>
          </TouchableOpacity>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{ flex: 1}}>
              <TextInput
                placeholder="Напишіть назву сайта"
                style={{flex: 1/10,marginTop:5,  backgroundColor: 'lightblue'}}
                onChangeText={(site) => {
                console.log('site-', site)
                this.setState({site})
                }}
                value={this.state.site}
                />
              <TextInput
                  placeholder="Напишіть логин"
                  style={{ flex: 1/10,marginTop:5,  backgroundColor: 'lightblue'}}
                  onChangeText={(log) => {
                  console.log('log-', log)
                  this.setState({log})
                  }}
                  value={this.state.log}
                  />

              <TextInput
                  placeholder="+ Напишіть пароль і тисніть зберегти"
                  autoCorrect={false}
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={(pass) => this.setState({pass})}
                  style={{flex: 1/10,marginTop:5,marginBottom:15, backgroundColor: 'lightblue'}}
                  onChangeText={(pass) => {
                    console.log('pass-', pass)
                    this.setState({pass})
                  }}
                  value={this.state.pass}
                  />

              <TouchableOpacity
                  style={{ borderRadius: 25,alignSelf:'center',flex: 1/15, backgroundColor: 'darkblue'}}
                  onPress={() => {
                    console.log('button is pressed')
                    this._addItem()
                    this.clearText()
                    this.toggleModal()
                  }}
                  >
                <View style={{flex: 1,}}>
                  <Text style={{ color: 'white'}}> <Icon name="rocket" size={30} color="#900" /> Зберегти  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ borderRadius: 25, flex: 1/15,marginTop:20,   backgroundColor: '#0481B0'}}>
                <Button title="Закрити" onPress={this.toggleModal} />
              </View>
            </View>
          </Modal>
        </View>
        <FlatList
            data={this.props.note && this.props.note.toJS()}
            renderItem={({item}) =>
              (<TouchableOpacity
                style={{alignSelf: 'stretch', justifyContent: 'center', height: 60, borderWidth: 1, alignItems: 'flex-start',justifyContent:'center', backgroundColor: item.color}}
                onPress={() => { this.props.navigation.push('EditItem')
                console.log('button')}}>
                <Text style={{ backgroundColor: 'lightgray'}}> {item.site}</Text>
                <Text style={{}}>   log {item.log}  pass {item.pass}</Text>

              </TouchableOpacity>)
            }
            />

{/*
          // <TouchableOpacity
          //           onPress={() => {
          //             this.setState({testModalVisible: !this.state.testModalVisible})
          //           }}
          //           style={{alignSelf:'center', backgroundColor: 'lightblue', padding: 15, borderRadius: 20, zIndex: 2}}
          //           >
          //           <Text style={{}}>Open test counter</Text>
          //         </TouchableOpacity>
          //
          //         <Modal isVisible={this.state.testModalVisible}>
          //           <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          //             <TouchableOpacity style={{marginLeft: 40, padding: 20, backgroundColor: 'lightblue'}} onPress={() => this.props.incrementCounter()}>
          //               <Text>+1</Text>
          //             </TouchableOpacity>
          //             <Text style={{margin: 2}}>{ this.props.note}</Text>
          //
          //             <Text style={{margin: 2}}>{'Counter = ' + this.props.counter}</Text>
          //
          //             <TouchableOpacity style={{margin: 10, padding: 20, backgroundColor: 'lightblue'}} onPress={() => this.props.decrementCounter()}>
          //               <Text>-1</Text>
          //             </TouchableOpacity>
          //             <TouchableOpacity style={{margin: 10, padding: 20, backgroundColor: 'lightblue'}} onPress={() => this.props.resetCounter()}>
          //               <Text>0</Text>
          //             </TouchableOpacity>
          //             <View style={{ borderRadius: 25,alignSelf:'center', borderWidth: 1.5, position: 'absolute', bottom: 220,  padding: 15,width:350,alignSelf:'center', backgroundColor: '#0481B0'}}>
          //               <Button title="Закрити" onPress={this.hideModal} />
          //             </View>
          //           </View>
          //         </Modal>*/}
      </View>
    </SafeAreaView>

    )
  }
}

function mapStateToProps(state) {
    return {
        counter: state.appData.get('counter'),
        note: state.appData.get('note'),
        addItem: state.appData.get('addItem'),
    }
}
function mapDispatchToProps(dispatch) {
    return {
        incrementCounter() {
            dispatch(incrementCounter())
        },
        decrementCounter() {
            dispatch(decrementCounter())
        },
        resetCounter() {
            dispatch(resetCounter())
        },
        addItem(site,log,pass){
            dispatch(addItem(site,log,pass))
        },
        resetaddItem() {
            dispatch(resetaddItem())
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JustifyContentBasics)
