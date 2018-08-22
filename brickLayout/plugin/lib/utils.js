import dateUtil from './ifanrx-npm/date'

const relativeTime = function(date) {
  return dateUtil.relativeTime(date)
}

export const utils = {
  relativeTime
}
