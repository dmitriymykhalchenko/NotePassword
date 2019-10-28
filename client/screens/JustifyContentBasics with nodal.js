import React, { Component } from 'react'//головна + модал
import { View, Text, FlatList, Image, StyleSheet, CheckBox, ScrollView, TouchableOpacity, TextInput, Alert, Switch, SafeAreaView } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
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
  //      <Button
  //   onPress={() => navigation.navigate('SettingScreen')}
  //   title="Info"
  //   color="#fff"
  // />
    <TouchableOpacity
      onPress={() => navigation.navigate('SettingScreen')}
      style={{ marginRight: 20, paddingLeft: 20 }}
    >
      <Image source={require('../../img/settings.png')} style={{ width: 25, height: 25 }} />
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

//????
constructor(props) {
  super(props)
  this.state = {
    listViewVisible: true,
    inputText: '',
    isModalVisible: false, //{/*open close modal window*/}
    showPass: props.enableUp,

    testModalVisible: false,
    site: '',
    log: '',
    pass: '',
    favorites: [],
    data: [...Array(20)].map((d, index) => ({
      key: `item-${index}`,
      label: index,
      backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`
    }))
  }
  this.showAlert1 = this.showAlert1.bind(this)
  this.toggleSwitch = this.toggleSwitch.bind(this)
}

  renderItem = ({ item, index, move, moveEnd, isActive }) => (
    <TouchableOpacity
      style={{
        height: 100,
        backgroundColor: isActive ? 'blue' : item.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onLongPress={move}
      onPressOut={moveEnd}
    >
      <Text style={{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 32
      }}
      >{item.label}
      </Text>
    </TouchableOpacity>
  )

  renderModalContent = () => (
    <View style={{ flex: 1, borderRadius: 20, backgroundColor: 'white', padding: 20 }}>
      <Text style={{ fontSize: 20, color: 'darkgray', marginTop: 10, marginBottom: 15, alignSelf: 'center', backgroundColor: 'transparent' }}>
        <Image source={require('../../img/add.png')} style={{ width: 18, height: 18, tintColor: 'darkgray' }} />  Add
      </Text>
      <TextInput

        placeholder="   Website"
        style={{ flex: 1 / 7, marginTop: 5, borderRadius: 5, borderColor: 'gray', borderWidth: 0.5, backgroundColor: 'rgb(240, 243, 244 )' }}
        textAlign="left"
        onChangeText={(site) => {
          console.log('site-', site)
          this.setState({ site })
        }}
        value={this.state.site}
      />
      <TextInput
        placeholder="   Login"
        style={{ flex: 1 / 7, marginTop: 10, borderRadius: 5, borderColor: 'gray', borderWidth: 0.5, backgroundColor: 'rgb(240, 243, 244 )' }}
        textAlign="left"
        onChangeText={(log) => {
          console.log('log-', log)
          this.setState({ log })
        }}
        value={this.state.log}
      />

      <TextInput
        placeholder="   Password"
        autoCorrect={false}
        secureTextEntry={false}
        returnKeyType="done"
        onChangeText={(pass) => this.setState({ pass })}
        style={{ flex: 1 / 7, marginTop: 10, marginBottom: 15, borderRadius: 5, borderColor: 'gray', borderWidth: 0.5, backgroundColor: 'rgb(240, 243, 244 )' }}
        textAlign="left"
        onChangeText={(pass) => {
          console.log('pass-', pass)
          this.setState({ pass })
        }}
        value={this.state.pass}
      />
      {/* // if (this.state.enableUp == false){console.log("good")
      // return ;}*/}
      <TouchableOpacity
        style={{ color: 'white', borderRadius: 10, flex: 1 / 6, marginTop: 20, backgroundColor: 'rgb(223,240,217)' }}
        onPress={() => {
          console.log('button is pressed')
          this._addItem()
          this.clearText()
          this.toggleModal()
        }}
      >

        <View style={{ color: 'white', borderRadius: 10, flex: 1, backgroundColor: 'transparent', justifyContent: 'center', flexDirection: 'column' }}>

          <Text style={{ color: 'gray', fontSize: 20, alignSelf: 'center', justifyContent: 'center' }}>  Зберегти  </Text>

        </View>

      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, marginTop: 20, justifyContent: 'center' }}>
        <Text style={{ color: 'gray' }}> Save Up  </Text>

        <Switch
          style={{ backgroundColor: 'transparent', color: 'red' }}
          onValueChange={this.toggleSwitch}
          value={this.state.showPass} //{this.state.title}
        />
        <Text style={{ color: 'gray', alignItems: 'flex-start' }}> Save Down  </Text>
      </View>

    </View>
  );
  // ///
  // handlePress = (item) => {
  //    this.setState(prevState => {
  //      const { favorites } = prevState;
  //      const isFavorite = favorites.includes(item);
  //      return {
  //        favorites: isFavorite
  //          ? favorites.filter(title => title !== item)
  //          : [item, ...favorites],
  //      };
  //    });
  //  }
  //
  //  renderItem = ({ item, index }) => {
  //    return (
  //      <Row
  //        title={item}
  //        isFavorite={this.state.favorites.includes(item)}
  //        onPress={this.handlePress}
  //      />
  //    );
  //  };
  //
  //  // Names are randomly generated, add index for safety.
  //  keyExtractor = (item, index) => item + index;
  // ////

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
    // this.props.addItem(this.state.site,this.state.log,this.state.pass)
  }

  componentDidMount() {
    if (this.props.enableUp) { //true
    // if this.props.enablePin &&|| {
      //this.props.navigation.push('PinScreen')

      console.log('save up')
      return
    }
    if (!this.props.enableUp) { //false....
      console.log('save down')

      //this.props.navigation.push('JustifyContentBasics')
      return
    }

    console.log(this.props.enableUp)
  }

  clearText() {
    this.setState({ log: '', site: '', pass: '' })
  }

  render() {
    const snapPoints = [
      { x: -140, y: -250 },
      { x: 140, y: -250 },
      { x: -140, y: -120 },
      { x: 140, y: -120 },
      { x: -140, y: 0 },
      { x: 140, y: 0 },
      { x: -140, y: 120 },
      { x: 140, y: 120 },
      { x: -140, y: 250 },
      { x: 140, y: 250 }
    ]
    const blueDestination = snapPoints[3]
    //
    // const { navigation } = this.props;
    // const { favorites } = this.state;
    //
    console.log('render')
    const { navigate } = this.props.navigation
    console.log('1 ', this.props.note)
    console.log('2 ', this.props.note && this.props.note.toJS())
    return (
      <View style={{ flex: 8, backgroundColor: 'lightgray' }}>
        <View style={{ flex: 7, backgroundColor: 'lightgray' }}>
          <DraggableFlatList
        // extraData={favorites}
        //
        //   keyExtractor={this.keyExtractor}
            data={this.props.note && this.props.note.toJS()}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            scrollPercent={5}
            onMoveEnd={({ data }) => this.setState({ data })}
            renderItem={({ item, index }) =>
              (<TouchableOpacity
                style={{ alignSelf: 'stretch', marginLeft: 25, marginRight: 25, borderBottomWidth: 1, borderColor: 'rgb(242,242,242)', backgroundColor: item.color }}
                onPress={() => {
                  console.log(index)
                  this.props.editItemIndex(index)
                  this.props.navigation.push('EditItem')
                  console.log('button')
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 10, justifyContent: 'center' }}>  {item.site}</Text>
                <Text style={{ color: 'rgb(191, 189, 189)', marginBottom: 5, fontWeight: 'bold', fontSize: 16 }}>   Login {item.log}  </Text>
                <Text style={{ color: 'rgb(191, 189, 189)', fontSize: 16, fontWeight: 'bold', marginBottom: 15 }}>   Password {item.pass}</Text>

                <View style={styles.buttonContainer}>

                  {/*//     <Button
                //   title="Кнепачка"
                //   onPress={() => {
                //     this.props.navigation.navigate('SettingScreen');
                //   }}
                // />
                  // <Button
                //     onPress ={() => this.showAlert1(index)}
                //     title="Delete"
                // />*/}
                </View>
               </TouchableOpacity>)

            }
          />
          {/*// <Interactable.View
            // backdropColor="transparent"
            // style={{zIndex: 2}}
            // ref='blue'
            // snapPoints={snapPoints}
            // initialPosition={{x:0, y: 330}}
            // >*/}
          <SafeAreaView style={styles.attribution}>
            <TouchableOpacity
              style={{ width: '100%', height: '100%', padding: 15, alignSelf: 'center' }}
               //onPress={this.toggleModal}
              onPress={() => this.setState({ isModalVisible: 'backdropPress' })}
            >
              <Text style={{ fontSize: 20, color: 'darkgray', alignSelf: 'center', backgroundColor: 'transparent' }}>
                <Image source={require('../../img/add.png')} style={{ width: 18, height: 18, tintColor: 'darkgray' }} />  Add
              </Text>


            </TouchableOpacity>

            {/*
                <Interactable.View
                horizontalOnly={false}
                verticalOnly = { false }
                //boundaries={{left: -100, right: 100, bounce: 0.5}}
                 onSnap={this.onDrawerSnap}
                 dragEnabled = { true }
                 initialPosition = {{x: -140, y: -280}}

                >
                <TouchableOpacity style={{ padding: 5,marginTop:5,alignSelf:'center', backgroundColor: 'lightblue'}} onPress={() => this.props.resetaddItem()}>
                <Text>Reset</Text>
              </TouchableOpacity>
              <Modal
              backdropColor="transparent"
              animationType="slide"
              transparent={true}
              left ={-20}
              //width={100}
              isVisible={this.state.isModalVisible === 'backdropPress'}
              onBackdropPress={() => this.setState({ isModalVisible: null })}
            >*/}
            <Modal
              backdropColor="transparent"
              animationType="slide"
              transparent
              left={-20}
            //width={100}
              isVisible={this.state.isModalVisible === 'backdropPress'}
              onBackdropPress={() => this.setState({ isModalVisible: null })}
            >

              <SafeAreaView style={{ flex: 1, marginTop: 90, marginBottom: 120, width: 410, backgroundColor: 'transparent' }}>


                {this.renderModalContent()}


              </SafeAreaView>
            </Modal>
          </SafeAreaView>

          {/*   //</Interactable.View> //</Modal>
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
    // incrementCounter() {//миняем
    //     dispatch(incrementCounter())
    // },
    // decrementCounter() {
    //     dispatch(decrementCounter())
    // },
    // resetCounter() {
    //     dispatch(resetCounter())
    // },
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JustifyContentBasics)

const styles = StyleSheet.create({

  buttonContainer: {
    backgroundColor: 'rgb(191, 189, 189)',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
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
