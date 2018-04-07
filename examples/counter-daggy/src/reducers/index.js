import add from 'ramda/src/add'
import compose from 'ramda/src/compose'
import objOf from 'ramda/src/objOf'
import merge from 'ramda/src/merge'
import { IsLoading, Count } from '../data-types/common'
import { cata, value } from '../utils'

const toggleIsLoadingLogic = {
  True: () => IsLoading.False,
  False: () => IsLoading.True,
}

const addValue = compose(add, value)
const getAddCount = x => compose(Count, addValue(x))
const createCountRecord = objOf('count')
const NegativeNumber = x => -Number(x)

export const counterReducer = (state, action) => {
  const { count, isLoading } = state

  const addCount = getAddCount(count)

  const add = f => compose(addCount, f)
  const increment = add(Number)
  const decrement = add(NegativeNumber)

  const mergeStateWith = merge(state)
  const mergeStateWithNextCount = compose(mergeStateWith, createCountRecord)

  const update = f => compose(mergeStateWithNextCount, f)

  const counterLogic = {
    Increment: update(increment),
    Decrement: update(decrement),
    ToggleIsLoading: () =>
      compose(
        mergeStateWith,
        objOf('isLoading'),
        cata(toggleIsLoadingLogic)
      )(isLoading),
  }

  return cata(counterLogic)(action)
}
