var plugin = requirePlugin('myPlugin')
Page({
  data: {
    dataSet: [
      {
        id: '5b61575a4256350d332d03a1',
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
        content:
          'Lorem ipsum dolor sit amet, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        time: 1533106010,
        user: {
          avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
          userId: 123123123,
          username: 'Lorem ipsum dolor sit am'
        },
        likedCount: 122,
        liked: true,
        images: ['https://images.ifanr.cn/wp-content/uploads/2018/08/640-90-1024x576.jpeg','https://images.ifanr.cn/wp-content/uploads/2018/08/640-90-1024x576.jpeg']
      },
      {
        id: '123123123',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        time: 1533106010,
        user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
        likedCount: 0,
        liked: true
      },
      {
        id: '5b61575a4256weqwe350d332d03a1',
        content:
          'Lorem ipsum dolor sit amet,  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        time: 1533106010,
        user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
        backgroundColor: '#AF7AC5',
        likedCount: 0
      },
      {
        id: '5b61575a42dasda56350d332d03a1',
        content: '爱范儿，让未来触手可及。',
        time: 1533106010,
        user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
        backgroundColor: '#AF7AC5',
        likedCount: 0
      },
      {
        id: '5b61575weweqa4256350d332d03a1',
        content: '爱范儿，让未来触手可及。',
        time: 1533106010,
        user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
        backgroundColor: '#AF7AC5',
        likedCount: 0,
        images: ['https://images.ifanr.cn/wp-content/uploads/2018/08/640-90-1024x576.jpeg']
      }
    ],
    brick_option: {
      // showFullContent: true,
      // backgroundColor:"#16A085",
      // forceRepaint: true,
      defaultExpandStatus: false,
      // imageFillMode:'aspectFill'
      columns: 3,
      icon: {
        fill: 'https://images.ifanr.cn/wp-content/uploads/2018/08/640-90-1024x576.jpeg'
      },
      // fontColor:'black'
    }
  },

  // 改变卡片展开状态事件的回调
  handleExpand: function(event) {
    console.log(event.detail)
    console.log('expand call back')
  },

  // 点击卡片
  tapCard: function(event) {
    console.log(event.detail)
    console.log('tap card!')
  },

  // 点赞
  handleLike: function(event) {
    console.log(event.detail)
    console.log('like!')
  },

  // 点击用户头像区域
  handleUserEvent: function(event) {
    console.log(event.detail)
    console.log('user!')
  },

  onReachBottom: function() {
    console.log('reach bottom')

    this.setData({
      dataSet: [
        {
          id: '5b2d03a1',
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
          content:
            'Lnim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          time: 1533106010,
          user: {
            avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
            userId: 123123123,
            username: 'Lorem ipsum dolor sit am'
          },
          likedCount: 122,
          liked: true,
          images: ['https://images.ifanr.cn/wp-content/uploads/2018/08/640-90-1024x576.jpeg']
        },
        {
          id: '123123123',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          time: 1533106010,
          user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
          likedCount: 0,
          liked: true
        },
        {
          id: '5b61575a4256weqwe350d332d03a1',
          content:
            'Lorem ipsum dolor sit amet,  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          time: 1533106010,
          user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
          backgroundColor: '#AF7AC5',
          likedCount: 0
        },
        {
          id: '5b61575a42dasda56350d332d03a1',
          content: '爱范儿，让未来触手可及。',
          time: 1533106010,
          user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
          backgroundColor: '#AF7AC5',
          likedCount: 0
        },
        {
          id: '5b61575weweqa4256350d332d03a1',
          content: '爱范儿，让未来触手可及。',
          time: 1533106010,
          user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
          backgroundColor: '#AF7AC5',
          likedCount: 0,
          images: ['https://images.ifanr.cn/wp-content/uploads/2018/08/640-90-1024x576.jpeg']
        },
        {
          id: '5b61575adas4256350d332d03a1',
          content: '爱范儿，让未来触手可及。',
          time: 1533106010,
          user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
          likedCount: 0,
          liked: true
        },
        {
          id: '123da123123',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          time: 1533106010,
          user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
          likedCount: 0,
          liked: true
        },
        {
          id: '532d03a1',
          content: 'Lorem ipsum dion icia deserunt mollit anim id est laborum.',
          time: 1533106010,
          user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
          backgroundColor: '#AF7AC5',
          likedCount: 0
        },
        {
          id: '5b61575a42da3a1',
          content: '爱范儿，让未来触手可及。',
          time: 1533106010,
          user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
          backgroundColor: '#AF7AC5',
          likedCount: 0
        },
        {
          id: '5b61575a41236350d332d03a1',
          title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
          content:
            'Lorem ipsum aliquip ex ea commodo consequat. Duis aute irure doloolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          time: 1533106010,
          user: {
            avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png',
            userId: 123123123,
            username: 'Lorem ipsum dolor sit am'
          },
          likedCount: 122,
          liked: true,
          images: ['https://images.ifanr.cn/wp-content/uploads/2018/08/640-90-1024x576.jpeg']
        },
        {
          id: '5basda4256350d332d03a1',
          content: '爱范儿，让未来触手可及。',
          time: 1533106010,
          user: {avatar: 'https://cdn.ifanr.cn/ifanr/default_avatar.png', userId: 123123123, username: '知晓妹'},
          backgroundColor: '#AF7AC5',
          likedCount: 0
        }
      ]
    })
  }
})
