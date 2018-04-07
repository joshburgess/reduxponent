import React from 'react'
import Reduxponent from 'reduxponent'
import { decrement, increment, toggleIsLoading } from '../actions'
import { counterReducer } from '../reducers'
import compose from 'ramda/src/compose'
import { initialState } from '../constants'

const lifecycle = {
  didMount: ({ toggleIsLoading }) => setTimeout(() => toggleIsLoading(), 1500),
}

const mapActionCreatorsToProps = dispatch => ({
  decrement: compose(dispatch, decrement),
  increment: compose(dispatch, increment),
  toggleIsLoading: compose(dispatch, toggleIsLoading),
})

const mapStateToProps = ({ count, isLoading }) => ({ count, isLoading })

const Counter = ({ count, isLoading, decrement, increment, interval }) =>
  isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <button onClick={() => decrement(interval)}>
        <span>-</span>
      </button>
      <span> {count} </span>
      <button onClick={() => increment(interval)}>
        <span>+</span>
      </button>
    </div>
  )

const defaultProps = { interval: 1 }

const CounterContainer = props => (
  <Reduxponent
    {...props}
    defaultProps={defaultProps}
    enableLogging
    name="Counter"
    lifecycle={lifecycle}
    initialState={initialState}
    mapActionCreatorsToProps={mapActionCreatorsToProps}
    mapStateToProps={mapStateToProps}
    reducer={counterReducer}
    render={Counter}
  />
)

export default CounterContainer
