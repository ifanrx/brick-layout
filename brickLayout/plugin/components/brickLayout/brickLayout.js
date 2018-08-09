import { utils } from "../../src/utils"
import tpl from "../tpl/tpl"

let LikeIcon = {
  like: "../../asset/icon/icon-like-full.svg",
  default: "../../asset/icon/icon-like.svg"
};

let init = true
let columns = 2 
Component({
  data: {
    list: [],
    rawData: {}, // 源数据
    orderArr: [], // 记录原始数值
    renderList: [], // 记录用于渲染的数组排序
    tplName: "default",
    _defaultExpandStatus: false
  },

  // properties list
  properties: {
    // raw dataset
    // required
    dataSet: {
      type: Array,
      value: [],
      observer: function (newVal) {
        let { rawData } = this.data
        let dataSet = {}
        let orderArr = []

        let {
          option: { backgroundColor, forceRepaint, defaultExpandStatus }
        } = this.properties

        if(!Array.isArray(newVal)){
          throw new Error(
            "BrickLayout : dataSet is expecting a Array."
          )
        }

        if (newVal[0] && !newVal[0]["id"]) {
          throw new Error(
            "BrickLayout : 错误的唯一索引。请检查数组中是否含有 id 作为唯一记录标识。"
          )
        }

        newVal.forEach(item => {
          // 当不强制重排，且已经有该数据源
          if (!forceRepaint && rawData[item["id"]]) {

            item._height = rawData[item["id"]]._height
            item._expandStatus = rawData[item["id"]]._expandStatus
            item._background = rawData[item["id"]]._background
            item._dateTime = rawData[item["id"]]._dateTime
            item._rendered = rawData[item["id"]]._rendered

          } else {
            item._background =
              item.backgroundColor || backgroundColor || this._getRandomColor()
            item._dateTime = item.time ? utils.relativeTime(item.time) : ''
            item._rendered = false
            item._height = item.height ? item.height : 182 // 非 0 即可
            item._expandStatus = item.expandStatus
              ? item.expandStatus
              : !!defaultExpandStatus // 默认展开状态
          }

          if (!!item.liked) {
            item._likeIcon = LikeIcon.like
          } else {
            item._likeIcon = LikeIcon.default
          }

          dataSet[item["id"]] = item
          orderArr.push(item["id"])
        });
        this.setData({ rawData: dataSet, orderArr, _defaultExpandStatus: !!defaultExpandStatus }, this._getRenderList.bind(this, true))
        tpl.init.call(this)
      }
    },

    // optional
    // optional | default: { }
    option: {
      type: Object,
      value: {},
      observer: function (newVal) {
        let tplName;
        let { theme } = newVal
        switch (theme) {
          case "album":
            tplName = "album"
            break
          default:
            tplName = "default"
            break
        }
        this.setData({ tplName })
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
        let query = wx.createSelectorQuery().in(this);
        query.select("#card-" + card_id).boundingClientRect(res => {
          resolve({ card_id, height: res.height })
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
      let { rawData, orderArr } = this.data;
      let {
        option: { defaultExpandStatus }
      } = this.properties;
      let height = []
      if (init) {
        init = false
        //Todo: 默认展开，1. 计算每一个的高度，并记录 高度 2.计算 render 数组 
        if (!!defaultExpandStatus) {
          orderArr.forEach(item => {
            height.push(this._computeSingleCardHeight(item))
          });
          Promise.all(height).then(res => {
            res.forEach(item => {
              rawData[item.card_id]["_height"] = item.height
              rawData[item.card_id]["_rendered"] = true
            })
            this.setData({ rawData }, this._getRenderList)
          });
        } else {
          //Todo : 1. 计算单个高度，并记录 高度、展开状态 2.不需要 computeRender 
          let card_id = opt && opt.id ? opt.id : this.data.orderArr[0]
          this._computeSingleCardHeight(card_id).then(res => {
            orderArr.forEach(item => {
              rawData[item]["_height"] = res.height
              rawData[item]["_rendered"] = true
            })
            this.setData({ rawData })
          });
        }
      } else {

        let card_id = opt && opt.id ? opt.id : 0
        if (card_id) {
          // 计算单个
          this._computeSingleCardHeight(card_id).then(res => {
            let currentHeight = res.height
            if (currentHeight !== rawData[card_id]["_height"]) {
              rawData[card_id]["_height"] = res.height
              this.setData({ rawData }, this._getRenderList)
            }
          })
        } else {
          // 非初始化情况下
          orderArr.forEach((item, index) => {
            if (!rawData[item]["_rendered"]) {
              height.push(this._computeSingleCardHeight(item))
            }
          })

          Promise.all(height).then(res => {
            res.forEach(item => {
              rawData[item.card_id]["_height"] = item.height
              rawData[item.card_id]["_rendered"] = true
            })
            this.setData({ rawData }, this._getRenderList)
          })
        }
      }

    },

    /**
     * @description 监听展开缩起状态
     * @param {*} event
     */
    _toggleExpand(event) {
      const card_id = event.currentTarget.dataset.cardId
      const { rawData } = this.data
      rawData[card_id]["_expandStatus"] = !rawData[card_id]["_expandStatus"]
      
      this.setData(
        { rawData },
        this._computeCardHeight.bind(this, { id: card_id })
      )

      this.triggerEvent('onCardExpanded',{card_id,expand_status: rawData[card_id]["_expandStatus"] })
    },

    _getRenderList(shouleRecomputeHeight = false) {
      let renderList = []
      let heightArr = []
      const arrLength = columns
      const { orderArr, rawData } = this.data

      heightArr = Array(arrLength).fill(0)

      // initial render Arr
      for (let i = 0; i < arrLength; i++) {
        renderList[i] = []
      }

      orderArr.forEach(item => {
        let willPushIndex = heightArr.indexOf(Math.min.apply(null, heightArr))
        renderList[willPushIndex].push(item)
        heightArr[willPushIndex] += rawData[item]["_height"]
      });

      // 由于需要 renderList 先去前台渲染完已有 dom 节点之后再来这边计算每个卡片的高度
      if (shouleRecomputeHeight) {
        this.setData({ renderList }, this._computeCardHeight)
        return
      } else {
        this.setData({ renderList })
      }

    },

    /**
     * @description 返回色卡随机背景色
     */
    _getRandomColor() {
      const colorSet = [
        "#F5B7B1",
        "#F1948A",
        "#EC7063",
        "#E74C3C",
        "#F7DC6F",
        "#F1C40F",
        "#D4AC0D",
        "#B7950B",
        "#EDBB99",
        "#E59866",
        "#EB984E",
        "#E67E22",
        "#D7BDE2",
        "#C39BD3",
        "#AF7AC5",
        "#9B59B6",
        "#A9CCE3",
        "#7FB3D5",
        "#5499C7",
        "#2980B9",
        "#A2D9CE",
        "#73C6B6",
        "#45B39D",
        "#16A085"
      ]
      let index = Math.floor(Math.random() * colorSet.length)
      return colorSet[index]
    }
  },

  attached: function () {
    // 可以在这里发起网络请求获取插件的数据
  },

});
