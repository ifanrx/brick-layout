
function init(config){
    let _this =  this;

    // 暴露点击卡片事件给用户
    _this.onBrickItemTap= e =>{
        let card_id = e.currentTarget.dataset.cardId
        this.triggerEvent('tapCard',{card_id})
    }
    
    _this.onLikeButtonTap = e =>{
        let card_id = e.currentTarget.dataset.cardId
        this.triggerEvent('tapLike',{card_id})
    }

    _this.onUserAreaTap = e =>{
        let user_id = e.currentTarget.dataset.userId
        this.triggerEvent('tapUser',{user_id})
    }
}

module.exports = {
    init
}