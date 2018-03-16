'use strict';

exports.__esModule = true;
exports.ERROR_LABEL = exports.ERROR_COLOR = exports.NEXT_STATE_LABEL = exports.NEXT_STATE_COLOR = exports.PREV_STATE_LABEL = exports.PREV_STATE_COLOR = exports.ACTION_LABEL = exports.ACTION_COLOR = undefined;

var _fp = require('date-fns/esm/fp');

var _enUS = require('date-fns/locale/en-US');

var _enUS2 = _interopRequireDefault(_enUS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeFmt = 'HH:mm:ss.SSS';
var dateToString = (0, _fp.formatWithOptions)({ locale: _enUS2.default })(timeFmt);

var ACTION_COLOR = exports.ACTION_COLOR = '#03A9F4';
var ACTION_LABEL = exports.ACTION_LABEL = 'action';

var PREV_STATE_COLOR = exports.PREV_STATE_COLOR = '#9E9E9E';
var PREV_STATE_LABEL = exports.PREV_STATE_LABEL = 'prev state';

var NEXT_STATE_COLOR = exports.NEXT_STATE_COLOR = '#4CAF50';
var NEXT_STATE_LABEL = exports.NEXT_STATE_LABEL = 'next state';

var ERROR_COLOR = exports.ERROR_COLOR = '#F20404';
var ERROR_LABEL = exports.ERROR_LABEL = 'error';

// Logging
var enableLogging = function enableLogging(_ref) {
  var prevState = _ref.prevState,
      action = _ref.action,
      nextState = _ref.nextState;
  var type = action.type,
      payload = action.payload;


  var timestamp = dateToString(Date.now());
  var bold = 'font-weight: bold;';

  console.group('%c' + ACTION_LABEL + ' @ ' + timestamp + ' ' + type, bold);

  console.log('%c' + PREV_STATE_LABEL, 'color: ' + PREV_STATE_COLOR + '; ' + bold, prevState);

  console.log('%c' + ACTION_LABEL, 'color: ' + ACTION_COLOR + '; ' + bold, payload ? { type: type, payload: payload } : { type: type });

  console.log('%c' + NEXT_STATE_LABEL, 'color: ' + NEXT_STATE_COLOR + '; ' + bold, nextState);

  console.groupEnd();

  return nextState;
};

exports.default = enableLogging;