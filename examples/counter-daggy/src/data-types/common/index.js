import daggy from 'daggy'

export const IsLoading = daggy.taggedSum('IsLoading', {
  True: [],
  False: [],
})

IsLoading.prototype.toString = function() {
  return this.show()
}

IsLoading.prototype.show = function() {
  return this.cata({
    True: () => 'true',
    False: () => 'false',
  })
}

IsLoading.prototype.toBoolean = function() {
  return this.cata({
    True: () => true,
    False: () => false,
  })
}

export const Count = daggy.tagged('Count', ['value'])

Count.prototype.toString = function() {
  return this.show()
}

Count.prototype.show = function() {
  return this && this.value ? this.value.toString() : '0'
}

export const Interval = daggy.tagged('Interval', ['value'])

export const Text = daggy.tagged('Text', ['value'])

Interval.prototype.show = function() {
  return this && this.value ? this.value.toString() : 'Error'
}

Text.prototype.show = function() {
  return this && this.value ? this.value.toString() : ''
}
