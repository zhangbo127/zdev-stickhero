/**
 * 柱子层
 */
var PillarLayer = cc.Layer.extend({
    curSpaceWidth: 0,   // 当前间距
    curPillarWidth: 0,  // 当前柱子宽度
    prePillarRightOffsetX: 0,  // 前一根柱子右侧的横坐标偏移量
    ctor: function () {
        this._super();
        this._initLayer();
    },
    /**
     * 初始化层
     * @private
     */
    _initLayer: function () {

        // 添加第一根柱子精灵
        var spr = new cc.Sprite(res.blackPng);
        var sprSize = spr.getContentSize();
        spr.setScale(Data.firstPillarSize.width / spr.width, Data.firstPillarSize.height / spr.height);
        spr.x = cc.winSize.width / 2;
        spr.y = Data.firstPillarSize.height / 2;
        this.addChild(spr);

        // 获取前一根柱子右侧的横坐标偏移量
        this.prePillarRightOffsetX = Data.firstPillarSize.width;
    },
    /**
     * 添加柱子
     */
    addPillar: function () {

        // 生成新的柱子精灵的宽度（10-120）
        var sprRdWidth = cc.random0To1() * 120 + 10;

        // 添加新的柱子精灵
        var spr = new cc.Sprite(res.blackPng);
        var sprSize = spr.getContentSize();
        spr.setScale(sprRdWidth / sprSize.width, Data.firstPillarSize.height / sprSize.height);
        spr.x = Data.gameLayer.offsetX + Data.firstPillarSize.width + sprRdWidth / 2;
        spr.y = Data.firstPillarSize.height / 2;
        this.addChild(spr);

        // 计算出最大的间距
        var maxSpaceWidth = cc.winSize.width - this.prePillarRightOffsetX - sprRdWidth;

        // 计算出间距的因子，确保间距不能太大也不能太小（0.3 - 0.8）
        var ratio = (cc.random0To1() + 0.6) / 2;

        // 计算出当前间距
        this.curSpaceWidth = maxSpaceWidth * ratio;

        // 移动新柱子到指定位置
        spr.runAction
        (
            cc.sequence(cc.moveBy(0.05, cc.p(this.curSpaceWidth, 0)))
        );

        // 设置棍子精灵就绪
        Data.gameLayer.isStickSpriteReady = true;
    }
});