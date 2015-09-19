/**
 * 棍子层
 */
var StickLayer = cc.Layer.extend({
    isStickSpriteReady: false,
    stickSprite: null,
    ctor: function () {
        this._super();
        this._initLayer();
        return true;
    },
    _initLayer: function () {

        // 添加棍子精灵
        var spr = new cc.Sprite(res.blackPng);
        var sprSize = spr.getContentSize();

        spr.setAnchorPoint(cc.p(0.5, 0));
        spr.x = Data.gameLayer.offsetX + Data.pillarLayer.prePillarRightOffsetX - sprSize.width;
        spr.y = Data.firstPillarSize.height;
        spr.setScaleY(0);
        this.addChild(spr);

        this.stickSprite = spr;
    },

    /**
     * 延长棍子
     */
    extendStick: function () {
        var scaleY = this.stickSprite.getScaleY();
        this.stickSprite.setScaleY(scaleY + 0.07);
    },
    /**
     * 旋转棍子结束时回调函数
     */
    onStickRotateEnd: function () {

        // 获取当前棍子精灵的高度
        var sSprSize = this.stickSprite.getContentSize();
        var sSprHeight = this.stickSprite.getScaleY() * sSprSize.height;

        // 计算能通过的最小长度和最大长度
        var minLen = Data.pillarLayer.curSpaceWidth + 5;
        var maxLen = Data.pillarLayer.curSpaceWidth + Data.pillarLayer.curPillarWidth - 5;

        // 判断是否可以通过
        if (minLen <= sSprHeight && sSprHeight <= maxLen) {

        } else {
            this.gameOver(sSprHeight);
        }
    }
});