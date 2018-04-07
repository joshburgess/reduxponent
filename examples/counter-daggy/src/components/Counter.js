import React from 'react'
import Reduxponent from 'reduxponent'
import { counterReducer } from '../reducers'
import { Interval, IsLoading, Count } from '../data-types/common'
import { CounterAction } from '../data-types/actions'
import { cata, daggyDataTypesToLogging, is, show, value } from '../utils'
import compose from 'ramda/src/compose'

const initialState = {
  count: Count(0),
  isLoading: IsLoading.True,
}

const lifecycle = {
  didMount: ({ toggleIsLoading }) => setTimeout(() => toggleIsLoading(), 1500),
}

const mapActionCreatorsToProps = dispatch => ({
  decrement: compose(dispatch, CounterAction.Decrement, value),
  increment: compose(dispatch, CounterAction.Increment, value),
  toggleIsLoading: () => dispatch(CounterAction.ToggleIsLoading),
})

const mapStateToProps = ({ count, isLoading }) => ({ count, isLoading })

const defaultProps = { interval: Interval(1) }

const Counter = ({ count, isLoading, decrement, increment, interval }) =>
  isLoading && is(isLoading)(IsLoading) ? (
    cata({
      True: () => <h1>Loading...</h1>,
      False: () => (
        <div>
          <button onClick={() => decrement(interval)}>
            <span>-</span>
          </button>
          <span> {show(count)} </span>
          <button onClick={() => increment(interval)}>
            <span>+</span>
          </button>
        </div>
      ),
    })(isLoading)
  ) : (
    <h1>Error!</h1>
  )

const CounterContainer = props => (
  <Reduxponent
    {...props}
    defaultProps={defaultProps}
    enableLogging
    lifecycle={lifecycle}
    initialState={initialState}
    mapActionCreatorsToProps={mapActionCreatorsToProps}
    mapCustomDataTypesToLogging={daggyDataTypesToLogging}
    mapStateToProps={mapStateToProps}
    name="Counter"
    reducer={counterReducer}
    render={Counter}
  />
)

export default CounterContainer
