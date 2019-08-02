import React, { Component } from 'react';
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, TextInput, Alert, AlertIOS, SafeAreaView } from 'react-native'

import {
  incrementCounter,
  decrementCounter
} from './client/redux/actions'

import {connect} from 'react-redux'
import Modal from "react-native-modal"
import { Button, ThemeProvider,PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'

class JustifyContentBasics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listViewVisible: true,
      inputText: '',
      isModalVisible: false,

      items: [
        {key: 'Facebook', name:'Face', password:'qwerty', color: 'lightgray'},
        {key: 'Instagram', name:'Face', password:'qwerty', color: 'white'},
        {key: 'google', name:'Face', password:'qwerty', color: 'orange'},
      ],
      value:{
        name: '',
        password:'',
        site:'',
      },
      testModalVisible: false,
    }

  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  // componentWillUnmount() {
  //   this.setState = {
  //     value: {
  //       name: '',
  //       password: null
  //     }
  //   }
  // }

  _addItem() {
    const newa = this.state.items
    newa.push({key: this.state.site,name: this.state.name,password: this.state.password })
    console.log('add new position', newa)
    return this.setState({items: newa})
    //   },
    // )
  }

  clearText(){
     this.setState({ name:'', site:'', password:'' })
  }

  render() {
    return (
      <SafeAreaView style={{marginTop: 30, flex: 1, alignSelf: 'stretch', backgroundColor: 'white', justifyContent: 'center'}}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
        <View style={{ }}>
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

        <Modal isVisible={this.state.isModalVisible}>
          <SafeAreaView style={{ flex: 1 }}>
            <TextInput
              placeholder="Напишіть назву сайта"
              style={{height: 50, width: '100%', backgroundColor: 'lightblue'}}
              onChangeText={(site) => {
              console.log('site-', site)
              this.setState({site})
              }}
              value={this.state.site}
              />
            <TextInput  placeholder="Напишіть логин"
          style={{alignSelf: 'center',justifyContent:'center',height: 50, width: '100%',margin:5, backgroundColor: 'lightblue'}}
          onChangeText={(name) => {
          console.log('name-', name)
          this.setState({name})
          }}
          value={this.state.name}
          />


              <TextInput
                placeholder="+ Напишіть пароль і тисніть зберегти"
                autoCorrect={false}
                secureTextEntry={true}
                returnKeyType="done"
                onChangeText={(password) => this.setState({password})}
                style={{height: 50, width: '100%',alignSelf: 'center', backgroundColor: 'lightblue'}}
                onChangeText={(password) => {
                  console.log('password-', password)
                  this.setState({password})
                }}
                value={this.state.password}
                />

              <TouchableOpacity
                style={{ borderRadius: 25,alignSelf:'center', position: 'absolute', bottom: 520,  padding: 15, backgroundColor: 'darkblue'}}
                onPress={() => {
                  console.log('button is pressed')
                  this._addItem()
                  this.clearText()
                  this.toggleModal()
                }}
                >
               <Text style={{color: 'white'}}> <Icon name="rocket" size={30} color="#900" /> Зберегти  </Text>
              </TouchableOpacity>

              <View style={{ borderRadius: 25,alignSelf:'center', borderWidth: 1.5, position: 'absolute', bottom: 320,  padding: 15,width:350, backgroundColor: '#0481B0'}}>
                <Button title="Закрити" onPress={this.toggleModal} />
              </View>

          </SafeAreaView>
        </Modal>
      </View>


          <FlatList
            data={this.state.items}
            renderItem={({item}) =>
              (<View style={{alignSelf: 'stretch', justifyContent: 'center', height: 60, borderWidth: 1, alignItems: 'flex-start',justifyContent:'center', backgroundColor: item.color}}>
              <Text style={{ backgroundColor: 'lightgray'}}> {item.key}</Text>

                <Text style={{}}>   log {item.name}  pass {item.password}</Text>
              </View>)
            }
          />

        </SafeAreaView>


        <TouchableOpacity
          onPress={() => {
            this.setState({testModalVisible: !this.state.testModalVisible})
          }}
          style={{position: 'absolute', bottom: 20, right: 20, backgroundColor: 'lightblue', padding: 15, borderRadius: 20, zIndex: 2}}
          >
          <Text style={{}}>Open test counter</Text>
        </TouchableOpacity>

        <Modal isVisible={this.state.testModalVisible}>
          <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={{margin: 20, padding: 20, backgroundColor: 'lightblue'}} onPress={() => this.props.incrementCounter()}>
              <Text>+1</Text>
            </TouchableOpacity>

            <Text style={{margin: 20}}>{'Counter = ' + this.props.counter}</Text>

            <TouchableOpacity style={{margin: 20, padding: 20, backgroundColor: 'lightblue'}} onPress={() => this.props.decrementCounter()}>
              <Text>-1</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </SafeAreaView>

    )
  }
}

function mapStateToProps(state) {
    return {
        counter: state.appData.get('counter'),
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JustifyContentBasics)
