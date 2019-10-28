import * as ActionTypes from './types'

export function addItem(site, log, pass) {
  return {
    type: ActionTypes.ADD_ITEM,
    data: { site, log, pass }
  }
}
export function addItemUp(site, log, pass) {
  return {
    type: ActionTypes.ADD_ITEMUP,
    data: { site, log, pass }
  }
}
export function addItemDown(site, log, pass) {
  return {
    type: ActionTypes.ADD_ITEMDOWN,
    data: { site, log, pass }
  }
}

export function enablePin(value) {
  return {
    type: ActionTypes.ENABLE_PIN,
    data: value
  }
}
export function pinCode(value) {
  return {
    type: ActionTypes.PIN_CODE,
    data: value
  }
}
export function updateItem(site, log, pass) {
  return {
    type: ActionTypes.UPDATE_ITEM,
    data: { site, log, pass }
  }
}

export function resetaddItem() {
  return {
    type: ActionTypes.RESET_ADDITEM,
    data: null
  }
}
export function deleteaddItem() {
  return {
    type: ActionTypes.DELETE_ADDITEM,
    data: null
  }
}
export function updateaddItem(index) {
  return {
    type: ActionTypes.DELETE_UPDATEADDITEM,
    data: index
  }
}
export function editItem() {
  return {
    type: ActionTypes.ADD_EDITITEM,
    data: null
  }
}
export function editItemIndex(index) {
  return {
    type: ActionTypes.ADD_EDITITEMINDEX,
    data: index
  }
}
