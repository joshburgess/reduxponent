import React, { Component } from 'react'
import enableLogging from './enableLogging'

class Reduxponent extends Component {
  constructor(props) {
    super(props)

    this.state = this.props.initialState
    this.callReducer = this.callReducer.bind(this)
    this.getChildProps = this.getChildProps.bind(this)
  }

  callReducer(action) {
    const { reducer } = this.props
    const prevState = this.state

    const nextState = reducer(prevState, action)

    if (this.props.enableLogging) {
      if (this.props.mapCustomDataToLogging) {
        const transormed = this.props.mapCustomDataToLogging({
          prevState,
          action,
          nextState,
        })

        enableLogging({
          prevState: transormed.prevState,
          action: transormed.action,
          nextState: transormed.nextState,
        })
      } else {
        enableLogging({
          prevState,
          action,
          nextState,
        })
      }
    }

    this.setState(nextState === prevState ? null : nextState)
  }

  getChildProps() {
    const { callReducer: dispatch, props, state } = this

    // gather non-parent props into "ownProps"
    const {
      children,
      enableLogging,
      initialState,
      mapActionCreatorsToProps,
      mapStateToLog,
      mapStateToProps,
      name,
      reducer,
      render,
      ...ownProps
    } = props

    const getState = () => this.state

    // dispatch & getState are exposed to facilitate redux-thunk style actions,
    // but this could be extended to mimic other types of middleware
    const fromDispatch = mapActionCreatorsToProps
      ? { ...mapActionCreatorsToProps(dispatch, getState) }
      : {}

    const fromState = mapStateToProps ? { ...mapStateToProps(state) } : {}

    // everything just gets merged into child props
    return {
      ...ownProps,
      ...fromDispatch,
      ...fromState,
      dispatch, // dispatch prop is provided solely as an escape hatch
    }
  }

  componentDidMount() {
    const { lifecycle } = this.props

    if (lifecycle && lifecycle.didMount) {
      lifecycle.didMount(this.getChildProps())
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { lifecycle } = this.props

    return lifecycle && lifecycle.shouldUpdate
      ? lifecycle.shouldUpdate({
          props: this.props,
          state: this.state,
          nextProps,
          nextState,
        })
      : true
  }

  componentWillUnmount() {
    const { lifecycle } = this.props

    if (lifecycle && lifecycle.willUnmount) {
      lifecycle.willUnmount({
        state: this.state,
        props: this.props,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { lifecycle } = this.props

    if (lifecycle && lifecycle.didUpdate) {
      lifecycle.didUpdate({
        ...this.getChildProps(),
        prevProps,
        prevState,
      })
    }
  }

  render() {
    const { children, render } = this.props

    return children
      ? typeof children === 'function'
        ? children(this.getChildProps())
        : children
      : render ? render(this.getChildProps()) : null
  }
}

Reduxponent.defaultProps = { enableLogging: false }

const ReduxponentWrapper = props => {
  const { name, render, children, defaultProps, ...rest } = props
  const baseName = name || (render && render.name) || 'Reduxponent'

  class NamedReduxponent extends Reduxponent {}
  NamedReduxponent.displayName = baseName + 'Container'

  const Render =
    children && typeof children === 'function'
      ? children
      : render && typeof render === 'function' ? render : undefined

  const Child = childProps => <Render {...childProps} />
  Child.displayName = baseName
  return (
    <NamedReduxponent
      {...defaultProps}
      {...rest}
      {...(Render ? { render: Child } : {})}
    />
  )
}

export default ReduxponentWrapper