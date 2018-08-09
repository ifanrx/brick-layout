import dateUtil from '../lib/ifanrx-npm/date'

const relativeTime = function (date) {
    return dateUtil.dateToRelativeTime(date + '000' - 0)
}

export const utils = {
    relativeTime
}