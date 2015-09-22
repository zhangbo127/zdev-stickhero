/**
 * 棍子层
 */
var StickLayer = cc.Layer.extend({
    _stickStatus: false,
    _stickSpr: null,
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
        spr.x = Data.pillarLayer.prePillarRightOffsetX - (sprSize.width / 2);
        spr.y = Data.firstPillarSize.height;
        spr.setScaleY(0);
        this.addChild(spr);
        this._stickSpr = spr;
    },
    /**
     * 获取棍子精灵
     * @returns {null}
     */
    getStickSpr: function () {
        return this._stickSpr;
    },
    /**
     * 设置棍子状态
     * @param isReady
     */
    setStickStatus: function (isReady) {
        this._stickStatus = isReady;
    },
    /**
     * 获取棍子状态
     * @returns {boolean}
     */
    getStickStatus: function () {
        return this._stickStatus;
    },
    /**
     * 延长棍子
     */
    extendStick: function () {
        var scaleY = this._stickSpr.getScaleY();
        this._stickSpr.setScaleY(scaleY + 0.07);
    },
    /**
     * 旋转棍子结束时回调函数
     */
    onStickRotateEnd: function () {

        // 获取当前棍子精灵的高度
        var stickSprSize = this._stickSpr.getContentSize();
        var stickSprHg = this._stickSpr.getScaleY() * stickSprSize.height;

        // 计算能通过的最小长度和最大长度
        var minLen = Data.pillarLayer.curSpaceWidth + 5;
        var maxLen = Data.pillarLayer.curSpaceWidth + Data.pillarLayer.newPillarWidth - 5;


        console.log(minLen, maxLen, stickSprHg);

        // 判断是否结束游戏
        var isGameOver = true;
        if (minLen <= stickSprHg && stickSprHg <= maxLen) {
            var isGameOver = false;
        }

        Data.npcLayer.moveNpcTo(stickSprHg, isGameOver);
    }
});