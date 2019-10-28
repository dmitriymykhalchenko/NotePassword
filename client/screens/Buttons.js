import React, { Component } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import Interactable from 'react-native-interactable'
{/*import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Interactable from 'react-native-interactable';

export default class SnapTo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snapToIndex: 0
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Interactable.View
          ref='headInstance'
          snapPoints={[
            {x: -140, y: -250},
            {x: 140, y: -250},
            {x: -140, y: -120},
            {x: 140, y: -120},
            {x: -140, y: 0},
            {x: 140, y: 0},
            {x: -140, y: 120},
            {x: 140, y: 120},
            {x: -140, y: 250},
            {x: 140, y: 250}
          ]}
          initialPosition={{x: 140, y: 250}}>
          <View style={{width: 70, height: 70, backgroundColor: '#EE2C38', borderRadius: 35}} />
        </Interactable.View>
        <View style={styles.button}>
          <Button title="Snap To Next" onPress={this.onButtonPress.bind(this)} color='white' />
        </View>
      </View>
    );
  }
  onButtonPress() {
    this.refs['headInstance'].snapTo({index: this.state.snapToIndex});
    this.setState({
      snapToIndex: (this.state.snapToIndex + 1)%10
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    position: 'absolute',
    left: 110,
    backgroundColor: '#459FED'
  }
});
*/} snapTo
{ /*import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text, Button, Dimensions } from 'react-native'
import Interactable from 'react-native-interactable'
const Screen = Dimensions.get('window')
const SideMenuWidth = 280
const RemainingWidth = Screen.width - SideMenuWidth

export default class SideMenu extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.sideMenuContainer} pointerEvents="box-none">
          <Interactable.View
            ref="menuInstance"
            horizontalOnly
            snapPoints={[{ x: 0 }, { x: -SideMenuWidth }]}
            //boundaries={{ Top: 1000 / 2 }}
            //initialPosition={{ x: -SideMenuWidth }}
          >
            <View style={styles.sideMenu}>
              <Text style={styles.sideMenuTitle}>Menu</Text>
              <TouchableOpacity onPress={this.onClosePress.bind(this)}>
                <Text style={{ color: '#542790', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginLeft: 200 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Interactable.View>
        </View>

        <View style={styles.header}>

          <Text style={styles.headerTitle}>Side Menu Example</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.content}>Some Content Here</Text>
          <TouchableOpacity onPress={this.onMenuPress.bind(this)}>
            <Text style={styles.sideMenuTitle}>Menu</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  onMenuPress() {
    this.refs.menuInstance.setVelocity({ x: 1500 })
  }

  onClosePress() {
    this.refs.menuInstance.setVelocity({ x: -1500 })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  sideMenuContainer: {
    position: 'absolute',
    top: 0,
    left: -RemainingWidth,
    right: 0,
    top: 650,
    flexDirection: 'column',
    zIndex: 1002
  },
  sideMenu: {
    left: 0,
    width: Screen.width,
    paddingLeft: RemainingWidth,
    flex: 1,
    backgroundColor: 'red',
    paddingTop: 20
  },
  sideMenuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'red',
  },
  button: {
    color: '#542790',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20
  },
  header: {
    height: 60,
    paddingHorizontal: 20,
    marginTop:80,
    flexDirection: 'column',
    backgroundColor: '#32B76C',
    alignItems: 'center',
    zIndex: 1001
  },
  body: {
    marginTop:450,
    flex: 1,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuIcon: {
    width: 30,
    height: 30
  },
  headerTitle: {
    marginLeft: 24,
    color: 'white',
    fontSize: 20
  },
  content: {
    fontSize: 18
  }
})*/ }

export default class IconDrawer extends Component {
  constructor(props) {
    super(props)
    this._deltaX = new Animated.Value(0)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'red' }}>

          <View style={{ position: 'absolute', right: 0, height: 75, flexDirection: 'row', alignItems: 'center' }}>
            <Animated.View style={
                [styles.button, {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-230, -230, -180, -180],
                    outputRange: [1, 1, 0, 0]
                  }),
                  transform: [{
                    scale: this._deltaX.interpolate({
                      inputRange: [-230, -230, -180, -180],
                      outputRange: [1, 1, 0.8, 0.8]
                    })
                  }]
                }
                ]}
            />
            <Animated.View style={
                [styles.button, {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-165, -165, -115, -115],
                    outputRange: [1, 1, 0, 0]
                  }),
                  transform: [{
                    scale: this._deltaX.interpolate({
                      inputRange: [-165, -165, -115, -115],
                      outputRange: [1, 1, 0.8, 0.8]
                    })
                  }]
                }
                ]}
            />
            <Animated.View style={
                [styles.button, {
                  opacity: this._deltaX.interpolate({
                    inputRange: [-100, -100, -50, -50],
                    outputRange: [1, 1, 0, 0]
                  }),
                  transform: [{
                    scale: this._deltaX.interpolate({
                      inputRange: [-100, -100, -50, -50],
                      outputRange: [1, 1, 0.8, 0.8]
                    })
                  }]
                }
                ]}
            />
          </View>

          <Interactable.View
            horizontalOnly
            snapTo={[{ x: 200, id: 'closed' }, { x: -230, id: 'open' }]}
            onSnap={this.onDrawerSnap}
            animatedValueX={this._deltaX}
          >
            <View style={{ left: 0, right: 0, height: 75, backgroundColor: '#e0e0e0' }} />
          </Interactable.View>

        </View>
      </View>
    )
  }

  onDrawerSnap(event) {
    const snapPointId = event.nativeEvent.id
    console.log(`drawer state is ${snapPointId}`)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  button: {
    width: 40,
    height: 40,
    marginRight: 25,
    backgroundColor: 'blue'
  }
})
{ /*import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import Interactable from 'react-native-interactable'


export default class ChangePosition extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }


  render() {
    const snapPoints = [
      { x: 740, y: 250 },
      { x: 340, y: 740 },
      { x: -140, y: -120 },
      { x: -80, y: -250 },
      { x: 500, y: 100 }
    ]
    const blueDestination = snapPoints[3]
    return (
      <View style={styles.container}>
        <Interactable.View
          snapPoints={[{ x: 30,y: 370 , id: 'closed' }, { x: -230, id: 'open' }]}
          style={{ zIndex: 1 }}
          ref="blue"
          //horizontalOnly={false}
          verticalOnly
          // snapPoints={[{ x: 560 }, { x: 0 }, { x: -560 }]}
          initialPosition={{ x: 30, y: 370 }}
        >
          <TouchableOpacity
            onPress={() => {
              this.refs.blue.changePosition(blueDestination)
            }}
          >
            <View>
              <Text style={{ color: '#3182C8', borderColor: '#3182C8', borderWidth: 1, padding: 6, borderRadius: 15, alignSelf: 'center' }}>{`ChangePosition to ${JSON.stringify(blueDestination)}`}</Text>
              <Text style={{ color: '#3182C8', borderColor: '#3182C8', borderWidth: 1, padding: 6, borderRadius: 15, alignSelf: 'center' }}>{`ChangePosition to ${JSON.stringify(blueDestination)}`}</Text>
              <TouchableOpacity onPress={this.onClosePress.bind(this)}>
                              <Text>Cancel</Text>
                            </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Interactable.View>

        <View style={{
          position: 'absolute',
          top: 900,
          left: 200,
          zIndex: 1
        }}
        >
          <TouchableOpacity
            onPress={() => {
              this.refs.blue.changePosition(blueDestination)
            }}
          />
        </View>
      </View>
    )
  }
  onClosePress() {
    this.refs.menuInstance.setVelocity({ x: 2000 })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})*/ }

{ /*import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Btn = ({ text, colorText, onPress, zero }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={zero ? styles.zeroContainer : styles.container}
    >
      <Text style={colorText ? styles.textLight : styles.textDark}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderColor: "#19153E"
  },
  zeroContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderColor: "#19153E"
  },
  textLight: {
    fontSize: 34,
    color: "#fff"
  },
  textDark: {
    fontSize: 34,
    color: "#575757"
  }
});
export default Btn;
*/ }
{ /*import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import Interactable from 'react-native-interactable';

export default class HandleTouches extends Component {

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8']}
        keyExtractor={item => item}
        renderItem={this.renderRow}
      />
    );
  }
  renderRow = (data) => {
    return (
      <Interactable.View
        horizontalOnly={true}
        snapPoints={[{x: 360},{x: 0},{x: -360}]}>
        <TouchableOpacity style={styles.card} onPress={this.onCardPress}>
          <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this, 'A')}>
            <Text style={{textAlign: 'center'}}>Button A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this, 'B')}>
            <Text style={{textAlign: 'center'}}>Button B</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Interactable.View>
    );
  }
  onCardPress() {
    alert('Card was pressed');
  }
  onButtonPress(type) {
    alert(`Button ${type} was pressed`);
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white'
  },
  card: {
    width: 300,
    height: 180,
    backgroundColor: '#32B76C',
    borderRadius: 8,
    marginVertical: 6
  },
  button: {
    width: 80,
    height: 40,
    marginLeft: 30,
    marginTop: 30,
    justifyContent: 'center',
    backgroundColor: '#b5d9f8'
  }
});*/ }
{ /*import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      resultText: '',
      calculationText: ''
    }
  }

  calculateResult() {
    const text = this.state.resultText
    // do magic
    this.setState({
      calculationText: eval(text)
    })
  }

  buttonPressed(text) {
    if (text == '=') {
      return this.calculateResult()
    }
    this.setState({
      resultText: this.state.resultText + text
    })
  }

  render() {
    const rows = []
    const nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [, 0]]
    for (let i = 0; i < 4; i++) {
      const row = []
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity key={nums[i][j]} style={styles.btn}>
          <Text onPress={() => this.buttonPressed(nums[i][j])} style={styles.btntext}>{nums[i][j]}</Text>
                 </TouchableOpacity>)
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    const ops = []


    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2,
          backgroundColor: '#8bc2f9',
          justifyContent: 'center',
          alignItems: 'flex-end' }}
        >
          <Text style={{ fontSize: 30,
            color: 'white' }}
          >{this.state.resultText}
          </Text>
        </View>
        <View style={{ flex: 7,
          flexDirection: 'row',
          margin: 10 }}
        >
          <View style={{ flex: 3,
            backgroundColor: '#82868c',
            borderColor: 'red',
            width: 0.5,
            margin: 5 }}
          >
            {rows}
          </View>
        </View>
      </View>
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
  }


})
*/ }
{ /**/ }
