var plugin = requirePlugin("myPlugin")
Page({
  data: {
    dataSet: [{
      "id": "5b61575a4256350d332d03a1",
      "content": "爱范儿，让未来触手可及。", 
      "time": 1533106010,
      "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
      "likeCount": 0,
      "alreadyLike":true,
    },{
      "id": "123123123",
      "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
      "time": 1533106010,
      "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
      "likeCount": 0,
      "alreadyLike":true,
    },{
      "id": "5b61575a4256weqwe350d332d03a1",
      "content": "Lorem ipsum dolor sit amet,  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
      "time": 1533106010,
      "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
      "backgroundColor": "#AF7AC5",
      "likeCount": 0,
    },{
      "id": "5b61575a42dasda56350d332d03a1",
      "content": "爱范儿，让未来触手可及。", 
      "time": 1533106010,
      "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
      "backgroundColor": "#AF7AC5",
      "likeCount": 0,
    },{
      "id": "5b61575weweqa4256350d332d03a1",
      "content": "爱范儿，让未来触手可及。", 
      "time": 1533106010,
      "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
      "backgroundColor": "#AF7AC5",
      "likeCount": 0,
    }],
    brick_option: {
      // backgroundColor:"#16A085",
      // forceRepaint: true,
      // defaultExpandStatus : true
    }
  },

  tapCard: function (event) {
    console.log("tap card!");
  },

  handleLike: function (event) {
    console.log("like!");
  },

  handleUserEvent:function(event){
    console.log('user!')
  },

  onLoad: function () {
    plugin.getData()
  },
  onReachBottom: function () {
    console.log("reach bottom")
    this.setData({
      dataSet: [{
        "id": "5b61575a4256350d332d03a1",
        "content": "爱范儿，让未来触手可及。", 
        "time": 1533106010,
        "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
        "likeCount": 0,
        "alreadyLike":true,
      },{
        "id": "123123123",
        "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
        "time": 1533106010,
        "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
        "likeCount": 0,
        "alreadyLike":true,
      },{
        "id": "5b61575a4256weqwe350d332d03a1",
        "content": "Lorem ipsum dolor sit amet,  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
        "time": 1533106010,
        "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
        "backgroundColor": "#AF7AC5",
        "likeCount": 0,
      },{
        "id": "5b61575a42dasda56350d332d03a1",
        "content": "爱范儿，让未来触手可及。", 
        "time": 1533106010,
        "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
        "backgroundColor": "#AF7AC5",
        "likeCount": 0,
      },{
        "id": "5b61575weweqa4256350d332d03a1",
        "content": "爱范儿，让未来触手可及。", 
        "time": 1533106010,
        "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
        "backgroundColor": "#AF7AC5",
        "likeCount": 0,
      },{
        "id": "5b61575adas4256350d332d03a1",
        "content": "爱范儿，让未来触手可及。", 
        "time": 1533106010,
        "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
        "likeCount": 0,
        "alreadyLike":true,
      },{
        "id": "123da123123",
        "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
        "time": 1533106010,
        "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
        "likeCount": 0,
        "alreadyLike":true,
      },{
        "id": "532d03a1",
        "content": "Lorem ipsum dolor sit amet,  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
        "time": 1533106010,
        "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
        "backgroundColor": "#AF7AC5",
        "likeCount": 0,
      },{
        "id": "5b61575a42da3a1",
        "content": "爱范儿，让未来触手可及。", 
        "time": 1533106010,
        "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
        "backgroundColor": "#AF7AC5",
        "likeCount": 0,
      },{
        "id": "5basda4256350d332d03a1",
        "content": "爱范儿，让未来触手可及。", 
        "time": 1533106010,
        "user": { "avatar": "https://cdn.ifanr.cn/ifanr/default_avatar.png", "userId": 123123123, "username": "知晓妹" },
        "backgroundColor": "#AF7AC5",
        "likeCount": 0,
      }],

    })
  }

})