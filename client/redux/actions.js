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
