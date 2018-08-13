import dateUtil from '../lib/ifanrx-npm/date'

const relativeTime = function (date) {
    return dateUtil.relativeTime(date)
}

export const utils = {
    relativeTime
}