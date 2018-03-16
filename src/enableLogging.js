import { formatWithOptions } from 'date-fns/esm/fp'
import enUS from 'date-fns/locale/en-US'

const timeFmt = 'HH:mm:ss.SSS'
const dateToString = formatWithOptions({ locale: enUS })(timeFmt)

export const ACTION_COLOR = '#03A9F4'
export const ACTION_LABEL = 'action'

export const PREV_STATE_COLOR = '#9E9E9E'
export const PREV_STATE_LABEL = 'prev state'

export const NEXT_STATE_COLOR = '#4CAF50'
export const NEXT_STATE_LABEL = 'next state'

export const ERROR_COLOR = '#F20404'
export const ERROR_LABEL = 'error'

// Logging
const enableLogging = ({ prevState, action, nextState }) => {
  const { type, payload } = action

  const timestamp = dateToString(Date.now())
  const bold = 'font-weight: bold;'

  console.group(`%c${ACTION_LABEL} @ ${timestamp} ${type}`, bold)

  console.log(
    `%c${PREV_STATE_LABEL}`,
    `color: ${PREV_STATE_COLOR}; ${bold}`,
    prevState,
  )

  console.log(
    `%c${ACTION_LABEL}`,
    `color: ${ACTION_COLOR}; ${bold}`,
    payload ? { type, payload } : { type },
  )

  console.log(
    `%c${NEXT_STATE_LABEL}`,
    `color: ${NEXT_STATE_COLOR}; ${bold}`,
    nextState,
  )

  console.groupEnd()

  return nextState
}

export default enableLogging