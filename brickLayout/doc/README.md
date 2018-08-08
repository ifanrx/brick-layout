# brick-layout 使用指南
### 介绍
### 使用
1. 在微信小程序管理后台中，按 APPID `wxc4d0500e36129bd6` 搜索到该插件，点击添加，即可在代码中使用 `brickLayout`

2. 在 `app.json` 里，声明该插件的引入，目前该插件为`0.1.0`，`provider` 为该插件的 APPID，`brickLayout` 为自定义的插件名称，
```json
"plugins": {
  "brickLayout": {
    "version": "0.1.0",
    "provider": "wxc4d0500e36129bd6"
  }
}
```

3. 在需要引用瀑布流组件的小程序页面的`json`配置文件中，作如下配置：
```json
{
  "usingComponents": {
    "brickLayout": "plugin://brickLayout/brickLayout"
  }
}
```

4. 使用
```html
<brickLayout 
	dataSet="{{dataSet}}"  
	option="{{brick_option}}" 
	bind:tapCard="tapCard" 
	bind:tapLike="handleLike" 
	bind:tapUser="handleUserEvent"
/>
```

### 组件属性介绍
* **dataSet**
	* **类型：**  `Array<Object>`
	* **类别：** required 必填参数
	* **示例值：**
```js
 [{
   id: 'string' ,
   content: 'string',
   backgroundColor: ? | '#fff',
   time: ? unix timestamp | 1533106010,
   likedCount: ? number | 0 ,
   liked:? bool | false,
   user : ? object | {
     avatar:? string | 'user_avatar_url',
     name: ? string | 'user_name',
     userId: ? string or number | ‘132’ or 123
   }
 },
 {
   id: 'string',
   content: 'string',
   backgroundColor: ? | '#fff',
   time: ? unix timestamp | 1533106010,
   likedCount: ? number | 0 ,
   liked: ? bool | false,
   user : ? object | {
     avatar: ? string | 'user_avatar_url',
     username: ? string | 'user_name',
     userId: ? string or number | ‘132’ or 123
   }
 }]
```
	* **示例值说明：**
		* **id**  
			*  数据每条记录的唯一标志
		* **content**  
			* 卡片实际记录的内容
		* **backgroundColor** 
			*  (optional) 每个卡片的背景颜色 如果不填 则为随机色
		* **time** 
			* (optional) 记录的时间戳 如果不填默认没有时间显示
		* **likedCount** 
			* (optional) 右下角点赞的数量 如果不填默认没有卡片右下角显示
		* **liked** 
			* (optional) 如果需要点赞功能，则需要该变量作为用户是否已经点赞的标志，如果为 false 则代表未点赞，icon 为空心 icon，且可以触发点赞动作；如果为 true 则代表已点赞，icon 为实心 icon，且不可再触发点赞动作。
		* **user** 
			* (optional) 如果不传，则不显示卡片用户区
			* (optional param) `avatar`  用户头像 url 如果不填默认没有头像
			* (optional param) `username`   用户名 如果不填默认没有用户名
			* (optional param) `userId` 用户 id， 如果需要点击用户区域相关事件，可以传入 `userId` ,用于相关点击用户区域事件回调

---
* **option**
	* **类型：** `Object`
	* **类别：** optional 选填参数
	* **示例值：**
```js
 {
 		defaultExpandStatus: ? bool | false,
 		backgroundColor: ? string | '#ababab',
 		forceRepaint: ? bool | false
}
```
	* **示例值说明：**
	* **defaultExpandStatus**
		* (optional) 卡片默认展开情况， 默认值为 false ，即为默认收起
	* **backgroundColor**
		* (optional) 每个卡片默认统一的颜色 ，无默认值，卡片随机色，如果已经设置了卡片的颜色，优先使用卡片颜色，即优先级：`card.backgroundColor` > `backgoundColor` > `randomColor`
	* **forceRepaint**
		* (optional) 是否强制重绘，强制重绘则会使原来的展开状态、高度等等全部重置，适用于切换列表的分类时，数据重新渲染。默认值为 `false`，即默认认为源数据的改变只是追加、变更或者减少数据时，不重置卡片的展开状态和高度等等。
---
### 组件事件介绍
如调用的组件的 wxml 声明如下：
```html
<brickLayout 
	dataSet="{{dataSet}}"  
	option="{{brick_option}}" 
	bind:tapCard="tapCard" 
	bind:tapLike="handleLike" 
	bind:tapUser="handleUserEvent"
/>
```

* **用户点击区域说明**
[image:sample.jpg]

	* 红色区域为用户点击区域
	* 黄色区域为点赞区域
	* 蓝色区域为卡片区域，当有点赞事件时，不会捕获点赞的事件。

* **tapCard**
	* **类型：** `function`
	* **类别：** optional 选填参数
	* **说明：** 当用户点击卡片区域时，所触发的自定义事件，可以通过 `event.detail.card_id` 拿到对应的卡片的 id，该卡片 id 为 dataSet 里面的唯一标志，唯一标志该数据记录。
	* **示例：**
```js
 tapCard: function (event) {
	  const cardId =  event.detail.card_id
	  // code here.
    console.log('tap card!')
  },
```

---
* **tapLike**
	* **类型：** `function`
	* **类别：** optional 选填参数
	* **说明：** 当用户点击点赞区域时，所触发的自定义事件，可以通过 `event.detail.card_id` 拿到对应的卡片的 id，该卡片 id 为 dataSet 里面的唯一标志，唯一标志该数据记录。
	* **示例：**
```js
 handleLike: function (event) {
	  const cardId =  event.detail.card_id
	  // code here.
    console.log('tap like!')
  },
```

---
* **tapUser**
	* **类型：** `function`
	* **类别：** optional 选填参数
	* **说明：** 当用户点击用户区域时，所触发的自定义事件，前提是要传入 `userId`，使用过程中，可以通过 `event.detail.user_id` 拿到所对应的用户 userId
	* **示例：**
```js
 handleUserEvent: function (event) {
	  const userId =  event.detail.user_id
	  // code here.
    console.log('tap user!')
  },
```

---
