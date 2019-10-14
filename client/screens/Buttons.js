import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

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
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Interactable from 'react-native-interactable';

export default class ChangePosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const snapPoints = [
            {x: 740, y: 250},
            {x: 340, y: 740},
            {x: -140, y: -120},
            {x: 10, y: -50},
            {x: 740, y: 740},
          ];
    const blueDestination = snapPoints[3];
    return (
      <View style={styles.container}>
        <Interactable.View
          style={{zIndex: 1}}
          ref='blue'
          verticalOnly={false}
          snapPoints={[{x: 360},{x: 0},{x: -360}]}
          initialPosition={{x: 540, y: 410}}
        >
          <View style={{width: 70, height: 70, backgroundColor: '#3182C8', borderRadius: 35}} />
        </Interactable.View>

        <View style={{
          position: 'absolute',
          top: 700,
          left: 100,
          zIndex: 1,
        }}>
          <TouchableOpacity
            onPress={() => {
              this.refs['blue'].changePosition(blueDestination)
            }}
          >
            <Text style={{color: '#3182C8', borderColor: '#3182C8', borderWidth: 1, padding: 6, borderRadius: 15, alignSelf: 'center'}}>{"ChangePosition to " + JSON.stringify(blueDestination)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});
{/*import React, { Component } from 'react';
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
