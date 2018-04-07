import React, { Component } from 'react'
import logUpdate from './logUpdate'

const isFunction = x => typeof x === 'function'

class Reduxponent extends Component {
  constructor(props) {
    super(props)

    this.state = this.props.initialState
    this.callReducer = this.callReducer.bind(this)
    this.getChildProps = this.getChildProps.bind(this)
  }

  callReducer (action) {
    const {
      enableLogging,
      mapCustomDataTypesToLogging,
      reducer,
    } = this.props

    const prevState = this.state

    if (!reducer || typeof reducer !== 'function') {
      const errMsg = 'Error: You must pass a reducer function' +
        'in via the reducer prop when using dispatch.'

      throw new Error(errMsg)
    }

    const nextState = reducer(prevState, action)

    if (enableLogging && process.env.NODE_ENV !== 'production') {
      if (mapCustomDataTypesToLogging) {
        const transormed = mapCustomDataTypesToLogging({
          prevState,
          action,
          nextState,
        })

        logUpdate({
          prevState: transormed.prevState,
          action: transormed.action,
          nextState: transormed.nextState,
        })
      } else {
        logUpdate({
          prevState,
          action,
          nextState,
        })
      }
    }

    this.setState(nextState === prevState ? null : nextState)
  }

  getChildProps () {
    const { callReducer: dispatch, props, state } = this

    // gather non-parent props into "ownProps"
    const {
      children,
      enableLogging,
      initialState,
      lifecycle,
      mapActionCreatorsToProps,
      mapCustomDataTypesToLogging,
      mapStateToProps,
      name,
      reducer,
      render,
      ...ownProps
    } = props

    const getState = () => this.state

    // dispatch & getState are exposed to facilitate redux-thunk style actions,
    // but this could be extended to mimic other types of middleware
    const fromActionCreators = mapActionCreatorsToProps
      ? { ...mapActionCreatorsToProps(dispatch, getState) }
      : {}

    const fromState = mapStateToProps
      ? { ...mapStateToProps(state) }
      : {}

    // everything just gets merged into child props
    return {
      ...ownProps,
      ...fromActionCreators,
      ...fromState,
      dispatch, // dispatch prop is provided solely as an escape hatch
    }
  }

  componentDidMount () {
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

  componentWillUnmount () {
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
        state: this.state,
        props: this.props,
        prevProps,
        prevState,
      })
    }
  }

  render () {
    const { children, render } = this.props

    if (children && render) {
      const errMsg = 'Warning: children & the render prop can' +
      'not be used simultaneously. When both are provided, the' +
      'render prop function will be ignored.'

      console.error(errMsg)
    }

    const childProps = this.getChildProps()

    return children
      ? isFunction(children)
        ? children(childProps)
        : children
      : render ? render(childProps) : null
  }
}

Reduxponent.defaultProps = { enableLogging: false }

const ReduxponentWrapper = props => {
  const { name, render, children, defaultProps, ...rest } = props
  const baseName = name || (render && render.name) || 'Reduxponent'

  class NamedReduxponent extends Reduxponent {}
  NamedReduxponent.displayName = `${baseName}Container`

  const Render =
    children && isFunction(children)
      ? children
      : render && isFunction(render) ? render : undefined

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