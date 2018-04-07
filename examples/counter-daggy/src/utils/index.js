import map from 'ramda/src/map'
import toString from 'ramda/src/toString'

// wrapper function for accessing & calling the 'cata' method of a data type
// used here to simulate pattern matching in statically typed FP languages
export const cata = updateLogic => action => action['cata'](updateLogic)

// wrapper function for accessing & calling the 'show' method of a data type
// used to return a string representation of a data type
export const is = value => dataType => dataType['is'](value)

// wrapper function for accessing & calling the 'show' method of a data type
// used to return a string representation of a data type
export const show = dataType => dataType['show']()

// wrapper function for accessing the 'value' property of a data type
// used to extract the value from type constructors that take an argument
export const value = dataType => dataType['value']

// used to print daggy generated data types in console
export const daggyDataTypesToLogging = ({ prevState, action, nextState }) => ({
  prevState: map(toString)(prevState),
  action: {
    ...action,
    type: show(action),
  },
  nextState: map(toString)(nextState),
})
