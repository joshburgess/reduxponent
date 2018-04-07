import daggy from 'daggy'

export const CounterAction = daggy.taggedSum('CounterAction', {
  Increment: ['value'],
  Decrement: ['value'],
  ToggleIsLoading: [],
})

CounterAction.prototype.show = function() {
  return this.toString()
}
