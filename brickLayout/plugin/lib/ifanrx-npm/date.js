'use strict'

module.exports = {
  /**
   * 转换 Date 对象
   * @param  {Date} date
   * @returns {Object}
   */
  standardizedDate: function(date) {
    var stdDate = {},
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes()

    stdDate.year = date.getFullYear()
    stdDate.month = month > 9 ? month : '0' + month
    stdDate.day = day > 9 ? day : '0' + day
    stdDate.hour = hour > 9 ? hour : '0' + hour
    stdDate.minute = min > 9 ? min : '0' + min

    return stdDate
  },

  /**
   * 格式化 Date 对象为相应时间字符串
   * @param  {Date} date
   * @param  {String} type
   * @returns {String}
   */
  formatTime: function(date, type) {
    var currentYear = new Date().getFullYear()
    var stdDate = this.standardizedDate(date)
    var result
    switch (type) {
      case 'short':
        result = stdDate.hour + ':' + stdDate.minute
        break
      case 'withNoYear':
        result = stdDate.month + '-' + stdDate.day + ' ' + stdDate.hour + ':' + stdDate.minute
        if (stdDate.year != currentYear) {
          result = stdDate.year + '-' + result
        }
        break
      case 'y-m-d':
        result = stdDate.year + '-' + stdDate.month + '-' + stdDate.day
        break
      case 'full':
        result = stdDate.year + '-' + stdDate.month + '-' + stdDate.day + ' ' + stdDate.hour + ':' + stdDate.minute
        break
      default:
        result = ''
    }
    return result
  },

  /**
   * 格式化时间戳为相应时间字符串
   * @param  {Number} stamp
   * @param  {String} type
   * @return {String}
   */
  formatTimestamp: function(stamp, type) {
    var date = new Date()
    date.setTime(parseInt(stamp, 10) * 1000)
    var stdDate = this.standardizedDate(date)
    var result
    switch (type) {
      case 'md':
        result = '' + stdDate.month + ' / ' + stdDate.day
        break
      case 'ym':
        result = '' + stdDate.year + '-' + parseInt(stdDate.month, 10) + '-'
        break
      case 'ymzh':
        result = '' + stdDate.year + '年' + parseInt(stdDate.month, 10) + '月'
        break
      case 'ymd':
        result = '' + stdDate.year + '-' + stdDate.month + '-' + stdDate.day
        break
      case 'ymdzh':
        result = '' + stdDate.year + '年' + parseInt(stdDate.month, 10) + '月' + parseInt(stdDate.day, 10) + '日'
        break
      case 'ymdhm':
        result =
          '' + stdDate.year + '-' + stdDate.month + '-' + stdDate.day + ' ' + stdDate.hour + ':' + stdDate.minute
        break
      case 'ymdhmzh':
        result =
          '' +
          stdDate.year +
          '年' +
          parseInt(stdDate.month, 10) +
          '月' +
          parseInt(stdDate.day, 10) +
          '日 ' +
          stdDate.hour +
          ':' +
          stdDate.minute
        break
      case 'mdhmzh':
        result =
          '' +
          parseInt(stdDate.month, 10) +
          '月' +
          parseInt(stdDate.day, 10) +
          '日 ' +
          stdDate.hour +
          ':' +
          stdDate.minute
        break
      default:
        result = '' + stdDate.month + '-' + stdDate.day + ' ' + stdDate.hour + ':' + stdDate.minute
        break
    }
    return result
  },

  /**
   * 较多函数使用 formateTimestamp，向前兼容
   */
  formateTimestamp: function(stamp, type) {
    return this.formatTimestamp(stamp, type)
  },

  /** 获取当前 Unix 时间戳
   * @returns {Number}
   */
  getUnix: function() {
    return Math.round(+new Date() / 1000)
  },

  /**
   * 获取距离今天前一个星期的日期字对象，详细见(getLastWeekDate)
   * @returns {Object}
   */
  getWeekDate: function() {
    return this.getLastWeekDate(new Date())
  },

  /**
   * 获取给定日期的前一个星期的日期字对象
   * @param  {Date} nowDate
   * @returns {Object}
   */
  getLastWeekDate: function(nowDate) {
    var lastWeekStamp = nowDate.getTime() - 6 * 3600 * 24 * 1000
    var lastWeekDate = new Date()
    lastWeekDate.setTime(lastWeekStamp)
    var stdNowDate = this.standardizedDate(nowDate)
    var stdLastWeekDate = this.standardizedDate(lastWeekDate)
    return {
      nowTime: stdNowDate.year + '-' + stdNowDate.month + '-' + stdNowDate.day,
      pastTime: stdLastWeekDate.year + '-' + stdLastWeekDate.month + '-' + stdLastWeekDate.day
    }
  },

  /**
   * 根据 unix timestamp 获取对应日期起始 timestamp
   * @param  {Number} timestamp
   * @returns {Number} 返回 Unix 时间戳
   */
  getStartUnixByUnix: function(timestamp) {
    var dateObj = new Date(parseInt(timestamp, 10) * 1000)
    var startDateObj = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())
    return startDateObj / 1000
  },

  relativeTime: function(time) {
    var date
    if (typeof time === 'number') {
      date = new Date()
      date.setTime(time * 1000)
    } else if (typeof time === 'string') {
      date = new Date(time)
    } else {
      return false
    }
    return this.dateToRelativeTime(date)
  },

  relativetime: function(time) {
    return this.relativeTime(time)
  },

  /**
   * 根据跟当前时间的时间长度返回中文时间字符串
   * @param  {Date} date
   * @returns {String}
   */
  dateToRelativeTime: function(date) {
    var DaySeconds = 86400 // const variable, 24 hours * 60 mins * 60 s
    var currentDate = new Date()
    var currentMonth = currentDate.getMonth()
    var currentYear = currentDate.getFullYear()
    date = new Date(date)
    var year = date.getFullYear()
    var month = date.getMonth()
    var days = new Date().getDate() - date.getDate()
    var distanceMillis = currentDate.getTime() - date.getTime()
    var seconds = Math.floor(Math.abs(distanceMillis) / 1000)
    var minutes = Math.floor(seconds / 60)
    var result
    // more than whole day
    if (seconds >= DaySeconds) {
      if (days == 1 && seconds < DaySeconds * 2) {
        result = '昨天 ' + this.formatTime(date, 'short')
      } else if (days == 2 && seconds < DaySeconds * 3) {
        result = '前天 ' + this.formatTime(date, 'short')
      } else if (year === currentYear) {
        result = this.formatTime(date, 'withNoYear')
      } else {
        result = this.formatTime(date, 'full')
      }
    }
    // more than one day but no whole day or in different month e.g. May or June,but days != 1 .
    else if (days == 1 || currentMonth != month) {
      result = this.limeTime(date.getTime() / 1000)
    } else if (seconds >= 3600) {
      result = this.limeTime(date.getTime() / 1000)
    } else if (seconds >= 60) {
      result = minutes + ' 分钟前'
    } else {
      result = '刚刚'
    }
    return result
  },

  /**
   * 获取距离当前时间的时间长度
   * @param  {Number} timestamp
   * @returns {String}
   */
  limeTime: function(timestamp) {
    return this.simplyToRelativeTime(timestamp)
  },

  /**
   * 获取距离当前时间的时间长度
   * @param  {Number} timestamp
   * @returns {String}
   */
  simplyToRelativeTime: function(timestamp) {
    var currentUnixTime = Math.round(new Date().getTime() / 1000)
    var deltaSecond = currentUnixTime - parseInt(timestamp, 10)
    var result
    if (deltaSecond < 60) {
      result = deltaSecond + ' 秒前'
    } else if (deltaSecond < 3600) {
      result = Math.floor(deltaSecond / 60) + ' 分钟前'
    } else if (deltaSecond < 86400) {
      result = Math.floor(deltaSecond / 3600) + ' 小时前'
    } else {
      result = Math.floor(deltaSecond / 86400) + ' 天前'
    }
    return result
  }
}
