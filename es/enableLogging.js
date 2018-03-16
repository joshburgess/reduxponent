import { formatWithOptions } from 'date-fns/esm/fp';
import enUS from 'date-fns/locale/en-US';

var timeFmt = 'HH:mm:ss.SSS';
var dateToString = formatWithOptions({ locale: enUS })(timeFmt);

export var ACTION_COLOR = '#03A9F4';
export var ACTION_LABEL = 'action';

export var PREV_STATE_COLOR = '#9E9E9E';
export var PREV_STATE_LABEL = 'prev state';

export var NEXT_STATE_COLOR = '#4CAF50';
export var NEXT_STATE_LABEL = 'next state';

export var ERROR_COLOR = '#F20404';
export var ERROR_LABEL = 'error';

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

export default enableLogging;