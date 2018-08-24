import {utils} from '../../lib/utils'
import config from '../../lib/config'
import tpl from '../tpl/tpl'

const DEFAULT_HEIGHT = 182

let init = true
let _columns = 2
let _defaultExpandStatus = false
Component({
  data: {
    list: [],
    rawData: {}, // 源数据
    orderArr: [], // 记录原始数值
    renderList: [], // 记录用于渲染的数组排序
    _tplName: 'default',
    _defaultExpandStatus: false,
    _imageFillMode: 'widthFix', // 图片适配 mode
    _fontColor: 'black',
    _likeIcon: {
      like: '../../asset/icon/icon-like-full.svg',
      default: '../../asset/icon/icon-like.svg'
    },
    _limitContent: true
  },

  // properties list
  properties: {
    // optional
    // optional | default: { }
    option: {
      type: Object,
      value: {},
      observer: function(newVal) {
        if (!newVal) {
          return
        }

        let defaultExpandStatus = !!newVal.defaultExpandStatus ? newVal.defaultExpandStatus : false
        let {_tplName, _likeIcon} = this.data

        if (!!newVal.imageFillMode) {
          this.setData({_imageFillMode: newVal.imageFillMode})
        }

        if (!!newVal.columns && !isNaN(newVal.columns)) {
          _columns = newVal.columns
        }

        if (!!newVal.theme) {
          switch (newVal.theme) {
            case 'album':
              _tplName = 'album'
              _defaultExpandStatus = true
              break
            default:
              _tplName = 'default'
              _defaultExpandStatus = !!defaultExpandStatus
              break
          }
          this.setData({_tplName})
        }

        if (!!newVal.icon) {
          let {icon} = newVal
          if (!!icon.fill) {
            _likeIcon.like = icon.fill
          }
          if (!!icon.default) {
            _likeIcon.default = icon.default
          }
          this.setData({_likeIcon})
        }
      }
    },
    // raw dataset
    // required
    dataSet: {
      type: Array,
      value: [],
      observer: function(newVal) {
        let {rawData} = this.data
        let dataSet = {}
        let orderArr = []

        let {option} = this.properties
        let backgroundColor = ''
        let defaultExpandStatus = false
        let forceRepaint = false

        if (!!option) {
          backgroundColor = !!option.backgroundColor ? option.backgroundColor : backgroundColor
          defaultExpandStatus = !!option.defaultExpandStatus ? option.defaultExpandStatus : defaultExpandStatus
          forceRepaint = !!option.forceRepaint ? option.forceRepaint : forceRepaint
        }

        if (!Array.isArray(newVal)) {
          throw new Error('BrickLayout : dataSet is expecting a Array.')
        }

        newVal.forEach(item => {
          if (!item['id']) {
            throw new Error('BrickLayout : 错误的唯一索引。请检查数组中是否含有 id 作为唯一记录标识。')
          }

          // 当不强制重排，且已经有该数据源
          if (!forceRepaint && rawData[item['id']]) {
            item._height = rawData[item['id']]._height
            item._expandStatus = rawData[item['id']]._expandStatus
            item._background = rawData[item['id']]._background
            item._dateTime = rawData[item['id']]._dateTime
            item._rendered = rawData[item['id']]._rendered
          } else {
            item._background = item.backgroundColor || backgroundColor || this._getRandomColor()
            item._dateTime = item.time ? utils.relativeTime(item.time) : ''
            item._rendered = false
            item._height = DEFAULT_HEIGHT
            item._expandStatus = item.expandStatus ? item.expandStatus : defaultExpandStatus // 默认展开状态
          }

          if (item.likedCount) {
            item.likedCount = item.likedCount > 99 ? '99+' : item.likedCount
          }

          dataSet[item['id']] = item // 源数据
          orderArr.push(item['id'])
        })

        this.setData(
          {rawData: dataSet, orderArr, _defaultExpandStatus: defaultExpandStatus},
          this._getRenderList.bind(this, true)
        )

        tpl.init.call(this)
      }
    }
  },

  methods: {
    /**
     * @description 计算单个默认高度
     * @param card_id 卡片 id
     */
    _computeSingleCardHeight(card_id) {
      return new Promise((resolve, reject) => {
        let query = wx.createSelectorQuery().in(this)
        query.select('#card-' + card_id).boundingClientRect(res => {
          resolve({card_id, height: res.height})
        })
        query.exec()
      })
    },

    /**
     * @description 计算当前卡片高度，如果有传入 id 则计算和更新单个，如果没有传入 id 同时传入了 init，则只计算 第一个
     * @param {Object} opt id
     */
    _computeCardHeight(opt) {
      // 默认展开
      let {rawData, orderArr} = this.data

      let height = []
      height.length = 0

      if (!orderArr || !orderArr.length) {
        // 如果为空数组则无需计算
        console.warn('BrickLayout: Oops, empty array ? ')
        return
      }

      if (init) {
        init = false
        orderArr.forEach(item => {
          height.push(this._computeSingleCardHeight(item))
        })
        Promise.all(height).then(res => {
          res.forEach(item => {
            rawData[item.card_id]['_height'] = item.height
            rawData[item.card_id]['_rendered'] = true
          })
          this.setData({rawData}, this._getRenderList)
        })
      } else {
        let card_id = opt && opt.id ? opt.id : 0
        if (card_id) {
          // 计算单个
          this._computeSingleCardHeight(card_id).then(res => {
            let currentHeight = res.height
            if (currentHeight !== rawData[card_id]['_height']) {
              rawData[card_id]['_height'] = res.height
              this.setData({rawData}, this._getRenderList)
            }
          })
        } else {
          // 非初始化情况下
          orderArr.forEach((item, index) => {
            if (!rawData[item]['_rendered']) {
              height.push(this._computeSingleCardHeight(item))
            }
          })
          Promise.all(height).then(res => {
            res.forEach(item => {
              rawData[item.card_id]['_height'] = item.height
              rawData[item.card_id]['_rendered'] = true
            })
            this.setData({rawData}, this._getRenderList)
          })
        }
      }
    },

    /**
     * @description 图片预览功能
     */
    _imagePreview(event) {
      let dataset = event.currentTarget.dataset
      wx.previewImage({
        urls: dataset.images,
        current: dataset.currentImage
      })
    },

    /**
     * @description 监听展开缩起状态
     * @param {*} event
     */
    _toggleExpand(event) {
      const card_id = event.currentTarget.dataset.cardId
      const {rawData} = this.data
      rawData[card_id]['_expandStatus'] = !rawData[card_id]['_expandStatus']

      this.setData({rawData}, this._computeCardHeight.bind(this, {id: card_id}))
      this.triggerEvent('onCardExpanded', {card_id, expand_status: rawData[card_id]['_expandStatus']})
    },

    _getRenderList(shouleRecomputeHeight = false) {
      let renderList = []
      let heightArr = []
      const arrLength = _columns
      const {orderArr, rawData} = this.data
      heightArr = Array(arrLength).fill(0)

      // initial render Arr
      for (let i = 0; i < arrLength; i++) {
        renderList[i] = []
      }

      orderArr.forEach(item => {
        let willPushIndex = heightArr.indexOf(Math.min.apply(null, heightArr))
        renderList[willPushIndex].push(item)
        heightArr[willPushIndex] += rawData[item]['_height']
      })

      // 由于需要 renderList 先去前台渲染完已有 dom 节点之后再来这边计算每个卡片的高度
      if (shouleRecomputeHeight) {
        this.setData({renderList}, this._computeCardHeight)
        return
      } else {
        this.setData({renderList})
      }
    },

    /**
     * @description 返回色卡随机背景色
     */
    _getRandomColor() {
      const colorSet = config.colorWheel
      let index = Math.floor(Math.random() * (colorSet.length - 1))
      return colorSet[index]
    }
  }
})
