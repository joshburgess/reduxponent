import add from 'ramda/src/add'
import compose from 'ramda/src/compose'
import objOf from 'ramda/src/objOf'
import merge from 'ramda/src/merge'
import not from 'ramda/src/not'
import prop from 'ramda/src/prop'
import { handleActions } from 'redux-actions'
import { decrement, increment, toggleIsLoading } from '../actions'
import { initialState } from '../constants'

const addCount = compose(add, prop('count'))
const createCountRecord = objOf('count')
const NegativeNumber = x => -Number(x)

const getPayload = prop('payload')

const mergeDecrement = (state, action) =>
  compose(
    merge(state),
    createCountRecord,
    addCount(state),
    NegativeNumber,
    getPayload,
  )(action)

const mergeIncrement = (state, action) =>
  compose(
    merge(state),
    createCountRecord,
    addCount(state),
    Number,
    getPayload,
  )(action)

const mergeToggleIsLoading = state =>
  compose(
    merge(state),
    objOf('isLoading'),
    not,
    prop('isLoading'),
  )(state)

export const counterReducer = handleActions(
  {
    [decrement]: mergeDecrement,
    [increment]: mergeIncrement,
    [toggleIsLoading]: mergeToggleIsLoading,
  },
  initialState,
)
