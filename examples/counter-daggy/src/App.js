import React from 'react'
import logo from './logo.svg'
import './App.css'
import Counter from './components/Counter'
import Reduxponent from 'reduxponent'
import { daggyDataTypesToLogging, show } from './utils'
import { Interval, Text } from './data-types/common'

const App = ({ title, description, interval }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">{show(title)}</h1>
    </header>
    <p className="App-intro">{show(description)}</p>
    <Counter interval={interval} />
  </div>
)

const initialState = {
  title: Text('A Counter Made Using Tagged Constructors'),
  description: Text('Writing actions, reducers, state, & props using tagged constructors created with daggy'),
  interval: Interval(3),
}

const mapStateToProps = ({ title, description, interval }) => ({
  title,
  description,
  interval,
})

const Root = props => (
  <Reduxponent
    {...props}
    enableLogging
    initialState={initialState}
    mapCustomDataTypesToLogging={daggyDataTypesToLogging}
    mapStateToProps={mapStateToProps}
    name="App"
    render={App}
  />
)

export default Root
