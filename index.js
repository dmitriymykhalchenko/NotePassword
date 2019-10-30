import { AppRegistry, AsyncStorage, View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { StackNavigator, TabNavigator } from 'react-navigation'
import throttle from 'lodash/throttle'
import { fromJS } from 'immutable'
import { SERIALIZE_STATE_INTERVAL } from './constants'
import createStore from './client/configs/store'

import App from './main'

import { name as appName } from './app.json'

console.disableYellowBox = true

class Application extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
    const init = (initialState) => {
      this._store = createStore({ appData: fromJS(initialState) })
      const { dispatch } = this._store
      this._store.subscribe(throttle(() => {
        const data = this._store.getState().appData
        if (data) {
          const counter = data.get('counter')
          const note = data.get('note')
          const addItem = data.get('addItem')
          const editItem = data.get('editItem')
          const enablePin = data.get('enablePin')
          const pinCode = data.get('pinCode')

          saveState({
            counter,
            note,
            addItem,
            editItem,
            enablePin,
            pinCode
          })
        }
      }, SERIALIZE_STATE_INTERVAL))
      this.setState({ isLoading: false })
    }

    loadState()
      .then(state => {
        init(state)
      })
      .catch(e => {
        console.log('loadState error - ', e)
        init()
      })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'lightgray' }}>Loading...</Text>
        </View>
      )
    }
    return (
      <Provider store={this._store}>
        <App />
      </Provider>
    )
  }
}

const STATE = 'STATE'
const saveState = (state) => AsyncStorage.setItem(STATE, JSON.stringify(state))
const loadState = () => AsyncStorage.getItem(STATE).then(raw => JSON.parse(raw))

AppRegistry.registerComponent(appName, () => Application)
