'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enableLogging = require('./enableLogging');

var _enableLogging2 = _interopRequireDefault(_enableLogging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    var reducer = this.props.reducer;

    var prevState = this.state;

    var nextState = reducer(prevState, action);

    if (this.props.enableLogging) {
      if (this.props.mapCustomDataToLogging) {
        var transormed = this.props.mapCustomDataToLogging({
          prevState: prevState,
          action: action,
          nextState: nextState
        });

        (0, _enableLogging2.default)({
          prevState: transormed.prevState,
          action: transormed.action,
          nextState: transormed.nextState
        });
      } else {
        (0, _enableLogging2.default)({
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
        mapActionCreatorsToProps = props.mapActionCreatorsToProps,
        mapStateToLog = props.mapStateToLog,
        mapStateToProps = props.mapStateToProps,
        name = props.name,
        reducer = props.reducer,
        render = props.render,
        ownProps = _objectWithoutProperties(props, ['children', 'enableLogging', 'initialState', 'mapActionCreatorsToProps', 'mapStateToLog', 'mapStateToProps', 'name', 'reducer', 'render']);

    var getState = function getState() {
      return _this2.state;
    };

    // dispatch & getState are exposed to facilitate redux-thunk style actions,
    // but this could be extended to mimic other types of middleware
    var fromDispatch = mapActionCreatorsToProps ? _extends({}, mapActionCreatorsToProps(dispatch, getState)) : {};

    var fromState = mapStateToProps ? _extends({}, mapStateToProps(state)) : {};

    // everything just gets merged into child props
    return _extends({}, ownProps, fromDispatch, fromState, {
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
      lifecycle.didUpdate(_extends({}, this.getChildProps(), {
        prevProps: prevProps,
        prevState: prevState
      }));
    }
  };

  Reduxponent.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        render = _props.render;


    return children ? typeof children === 'function' ? children(this.getChildProps()) : children : render ? render(this.getChildProps()) : null;
  };

  return Reduxponent;
}(_react.Component);

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

  var Render = children && typeof children === 'function' ? children : render && typeof render === 'function' ? render : undefined;

  var Child = function Child(childProps) {
    return _react2.default.createElement(Render, childProps);
  };
  Child.displayName = baseName;
  return _react2.default.createElement(NamedReduxponent, _extends({}, defaultProps, rest, Render ? { render: Child } : {}));
};

exports.default = ReduxponentWrapper;