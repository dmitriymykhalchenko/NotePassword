'use strict'

import {fromJS, List, Map, Set} from 'immutable';

export const INITIAL_STATE = fromJS({
    counter: 0,
    note:[],
    
})


export function incrementCounter(state, value) {
  let currentCounter = state.get('counter')
  let nextCounter = currentCounter + 1
  let newState = state.set('counter', nextCounter)

  return newState;
}

export function decrementCounter(state, value) {
  let currentCounter = state.get('counter')
  let nextCounter = currentCounter - 1
  let newState = state.set('counter', nextCounter)

  return newState;
}
export function resetCounter(state, value) {

  let newState = state.set('counter', 0)

  return newState;
}
export function addItem(state, value) {
  let newState = state
  let item = fromJS(value)
  console.log(item);
  newState = newState.update('note',oldnote => oldnote.push(item) )
  return newState;
}
export function resetaddItem(state, value) {

  //let newState = state.set('note', List())

  //return newState;
  return INITIAL_STATE
}
