import { createAction } from 'redux-actions'

import { DECREMENT, INCREMENT, TOGGLE_IS_LOADING } from '../constants'

export const decrement = createAction(DECREMENT)
export const increment = createAction(INCREMENT)
export const toggleIsLoading = createAction(TOGGLE_IS_LOADING)
