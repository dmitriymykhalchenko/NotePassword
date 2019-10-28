//преобразователь

import { List } from 'immutable'
import { combineReducers } from 'redux'

import * as stateOps from './stateOperations'

import * as ActionTypes from './types'

const appData = (state = stateOps.INITIAL_STATE, action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_ITEM:
      return stateOps.addItem(state, action.data)
    case ActionTypes.ADD_ITEMUP:
      return stateOps.addItemUp(state, action.data)
    case ActionTypes.ADD_ITEMDOWN:
      return stateOps.addItemDown(state, action.data)
    case ActionTypes.ENABLE_PIN:
      return stateOps.enablePin(state, action.data)
    case ActionTypes.PIN_CODE:
      return stateOps.pinCode(state, action.data)
    case ActionTypes.UPDATE_ITEM:
      return stateOps.updateItem(state, action.data)

    case ActionTypes.RESET_ADDITEM:
      return stateOps.resetaddItem(state, action.data)
    case ActionTypes.DELETE_ADDITEM:
      return stateOps.deleteaddItem(state)
    case ActionTypes.DELETE_UPDATEADDITEM:
      return stateOps.updateaddItem(state, action.data)

    case ActionTypes.ADD_EDITITEM:
      return stateOps.editItem(state, action.data)

    case ActionTypes.ADD_EDITITEMINDEX:
      return stateOps.editItemIndex(state, action.data)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  appData
})

export default rootReducer
