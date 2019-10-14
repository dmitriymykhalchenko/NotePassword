'use strict'//хранилище

import {fromJS, List, Map, Set} from 'immutable';

export const INITIAL_STATE = fromJS({
  //  counter: 0,
    note:[],

})


// export function incrementCounter(state, value) {
//   let currentCounter = state.get('counter')
//   let nextCounter = currentCounter + 1
//   let newState = state.set('counter', nextCounter)
//
//   return newState;
// }
//
// export function decrementCounter(state, value) {
//   let currentCounter = state.get('counter')
//   let nextCounter = currentCounter - 1
//   let newState = state.set('counter', nextCounter)
//
//   return newState;
// }
// export function resetCounter(state, value) {
//
//   let newState = state.set('counter', 0)
//
//   return newState;
// }
export function addItem(state, value) {//????
  let newState = state
  let item = fromJS(value)// in immutable
  console.log(item);
  newState = newState.update('note',oldnote => oldnote.unshift(item) )//  обновляем и добавляем в конец массива item
  return newState;// пересохраняем стате
}
export function addItemDown(state, value) {//????
  let newState = state
  let item = fromJS(value)// in immutable
  console.log(item);
  newState = newState.update('note',oldnote => oldnote.push(item) )//  обновляем и добавляем в конец массива item
  return newState;// пересохраняем стате
}
export function addItemUp(state, value) {//????
  let newState = state
  let item = fromJS(value)// in immutable
  console.log(item);
  newState = newState.update('note',oldnote => oldnote.unshift(item) )//  обновляем и добавляем в конец массива item
  return newState;// пересохраняем стате
}

export function enablePin(state, value) {//????
  let newState = state
  newState = newState.set('enablePin', value)//
  return newState;// пересохраняем стате
}
export function pinCode(state, value) {//????
  let newState = state
  newState = newState.set('pinCode', value)//
  return newState;// пересохраняем стате
}
export function updateItem(state, value) {
  let newState = state
  let index = state.get('index')//получаем порядковий номер індекс
  newState = newState.updateIn(['note',index, 'site'],oldsite => value.site)
  newState = newState.updateIn(['note',index, 'log'],oldsite => value.log)//обновляем массив присвоюем порядковий индекс
  newState = newState.updateIn(['note',index, 'pass'],oldsite => value.pass)

  return newState;
}
export function editItemIndex(state, value) {
  let newState = state
  newState = newState.set('index', value)// присвоюем индекс
  return newState;
}
export function resetaddItem(state, value) {

  let newState = state.set('note', List())//присваюем пустой лист
  console.log(newState);
  return newState;
}
export function deleteaddItem(state) {
  let newState = state //копия стате newState=appData
  console.log(newState.toJS());
  let index = newState.get('index') // получаем индекс итем
  console.log(index);
  let oldnote = newState.get('note') //старий масив ноте

  console.log(oldnote.toJS());//став простий массив
  console.log(oldnote);
  let newNote = oldnote.splice(index,1) //удалили 1 елемент по індексу з массива и получили новый массыв ноте
  console.log(newNote.toJS());
  newState = newState.set('note',newNote )// поклали новий массив в копию стате
  return newState; // замена старого стате
}
export function updateaddItem(state,index) {
  let newState = state //копия стате newState=appData
  console.log(newState.toJS());
  //let index = newState.get('index') //стате удаляем индекс итем удалять(получаем індекс)
  newState = newState.updateIn(['note'],(oldNote)=>{
    let newNote = oldNote.splice(index,1)// обновляем массив и удаляем позицию індекса
    return newNote;
  })
  return newState; // замена старого стате
}
