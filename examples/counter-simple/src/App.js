import React from 'react'
import logo from './logo.svg'
import './App.css'
import Counter from './components/Counter'
import Reduxponent from 'reduxponent'

const App = ({ title, description, interval }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">{title}</h1>
    </header>
    <p className="App-intro">{description}</p>
    <Counter interval={interval} />
  </div>
)

const initialState = {
  title: 'A Counter Made Using Redux-Actions',
  description:
    'Writing actions & reducers using the redux-actions helper library',
  interval: 3,
}

const mapStateToProps = ({ title, description, interval }) => ({
  title,
  description,
  interval,
})

const Root = props => (
  <Reduxponent
    {...props}
    enableLogging={true}
    initialState={initialState}
    mapStateToProps={mapStateToProps}
    name="App"
    render={App}
  />
)

export default Root
