var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import logUpdate from './logUpdate';

var isFunction = function isFunction(x) {
  return typeof x === 'function';
};

var Reduxponent = function (_Component) {
  _inherits(Reduxponent, _Component);

  function Reduxponent(props) {
    _classCallCheck(this, Reduxponent);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = _this.props.initialState;
    _this.callReducer = _this.callReducer.bind(_this);
    _this.getChildProps = _this.getChildProps.bind(_this);
    return _this;
  }

  Reduxponent.prototype.callReducer = function callReducer(action) {
    var _props = this.props,
        enableLogging = _props.enableLogging,
        mapCustomDataTypesToLogging = _props.mapCustomDataTypesToLogging,
        reducer = _props.reducer;


    var prevState = this.state;

    if (!reducer || typeof reducer !== 'function') {
      var errMsg = 'Error: You must pass a reducer function' + 'in via the reducer prop when using dispatch.';

      throw new Error(errMsg);
    }

    var nextState = reducer(prevState, action);

    if (enableLogging && process.env.NODE_ENV !== 'production') {
      if (mapCustomDataTypesToLogging) {
        var transormed = mapCustomDataTypesToLogging({
          prevState: prevState,
          action: action,
          nextState: nextState
        });

        logUpdate({
          prevState: transormed.prevState,
          action: transormed.action,
          nextState: transormed.nextState
        });
      } else {
        logUpdate({
          prevState: prevState,
          action: action,
          nextState: nextState
        });
      }
    }

    this.setState(nextState === prevState ? null : nextState);
  };

  Reduxponent.prototype.getChildProps = function getChildProps() {
    var _this2 = this;

    var dispatch = this.callReducer,
        props = this.props,
        state = this.state;

    // gather non-parent props into "ownProps"

    var children = props.children,
        enableLogging = props.enableLogging,
        initialState = props.initialState,
        lifecycle = props.lifecycle,
        mapActionCreatorsToProps = props.mapActionCreatorsToProps,
        mapCustomDataTypesToLogging = props.mapCustomDataTypesToLogging,
        mapStateToProps = props.mapStateToProps,
        name = props.name,
        reducer = props.reducer,
        render = props.render,
        ownProps = _objectWithoutProperties(props, ['children', 'enableLogging', 'initialState', 'lifecycle', 'mapActionCreatorsToProps', 'mapCustomDataTypesToLogging', 'mapStateToProps', 'name', 'reducer', 'render']);

    var getState = function getState() {
      return _this2.state;
    };

    // dispatch & getState are exposed to facilitate redux-thunk style actions,
    // but this could be extended to mimic other types of middleware
    var fromActionCreators = mapActionCreatorsToProps ? _extends({}, mapActionCreatorsToProps(dispatch, getState)) : {};

    var fromState = mapStateToProps ? _extends({}, mapStateToProps(state)) : {};

    // everything just gets merged into child props
    return _extends({}, ownProps, fromActionCreators, fromState, {
      dispatch: dispatch // dispatch prop is provided solely as an escape hatch
    });
  };

  Reduxponent.prototype.componentDidMount = function componentDidMount() {
    var lifecycle = this.props.lifecycle;


    if (lifecycle && lifecycle.didMount) {
      lifecycle.didMount(this.getChildProps());
    }
  };

  Reduxponent.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var lifecycle = this.props.lifecycle;


    return lifecycle && lifecycle.shouldUpdate ? lifecycle.shouldUpdate({
      props: this.props,
      state: this.state,
      nextProps: nextProps,
      nextState: nextState
    }) : true;
  };

  Reduxponent.prototype.componentWillUnmount = function componentWillUnmount() {
    var lifecycle = this.props.lifecycle;


    if (lifecycle && lifecycle.willUnmount) {
      lifecycle.willUnmount({
        state: this.state,
        props: this.props
      });
    }
  };

  Reduxponent.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var lifecycle = this.props.lifecycle;


    if (lifecycle && lifecycle.didUpdate) {
      lifecycle.didUpdate({
        state: this.state,
        props: this.props,
        prevProps: prevProps,
        prevState: prevState
      });
    }
  };

  Reduxponent.prototype.render = function render() {
    var _props2 = this.props,
        children = _props2.children,
        render = _props2.render;


    if (children && render) {
      var errMsg = 'Warning: children & the render prop can' + 'not be used simultaneously. When both are provided, the' + 'render prop function will be ignored.';

      console.error(errMsg);
    }

    var childProps = this.getChildProps();

    return children ? isFunction(children) ? children(childProps) : children : render ? render(childProps) : null;
  };

  return Reduxponent;
}(Component);

Reduxponent.defaultProps = { enableLogging: false };

var ReduxponentWrapper = function ReduxponentWrapper(props) {
  var name = props.name,
      render = props.render,
      children = props.children,
      defaultProps = props.defaultProps,
      rest = _objectWithoutProperties(props, ['name', 'render', 'children', 'defaultProps']);

  var baseName = name || render && render.name || 'Reduxponent';

  var NamedReduxponent = function (_Reduxponent) {
    _inherits(NamedReduxponent, _Reduxponent);

    function NamedReduxponent() {
      _classCallCheck(this, NamedReduxponent);

      return _possibleConstructorReturn(this, _Reduxponent.apply(this, arguments));
    }

    return NamedReduxponent;
  }(Reduxponent);

  NamedReduxponent.displayName = baseName + 'Container';

  var Render = children && isFunction(children) ? children : render && isFunction(render) ? render : undefined;

  var Child = function Child(childProps) {
    return React.createElement(Render, childProps);
  };
  Child.displayName = baseName;

  return React.createElement(NamedReduxponent, _extends({}, defaultProps, rest, Render ? { render: Child } : {}));
};

export default ReduxponentWrapper;