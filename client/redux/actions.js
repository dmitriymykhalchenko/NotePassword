import * as ActionTypes from './types'

export function testAction() {
    return (dispatch, getState) => {
        dispatch(incrementCounter())
    }
}

export function incrementCounter() {
    return {
        type: ActionTypes.INCREMENT_COUNTER,
        data: null
    }
}

export function decrementCounter() {
    return {
        type: ActionTypes.DECREMENT_COUNTER,
        data: null
    }
}
export function resetCounter() {
    return {
        type: ActionTypes.RESET_COUNTER,
        data: null
    }
}
export function addItem(site,log,pass) {
    return {
        type: ActionTypes.ADD_ITEM,
        data: {site,log,pass}
    }
}
