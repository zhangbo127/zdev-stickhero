/**
 * 柱子层
 */
var PillarLayer = cc.Layer.extend({
    curSpaceWidth: 0,           // 当前间距
    newPillarWidth: 0,          // 新柱子宽度
    curPillarWidth: 0,          // 当前柱子的宽度
    curPillarRsideOffsetX: 0,   // 当前柱子的右侧在屏幕的偏移量
    ctor: function () {
        this._super();
        return true;
    },
    /**
     * 添加第一根柱子
     */
    addFirstPillar: function () {

        // 添加柱子精灵
        var spr = new cc.Sprite(res.blackPng);
        var sprSize = spr.getContentSize();
        spr.setScale(Data.firstPillarSize.width / spr.width, Data.firstPillarSize.height / spr.height);
        spr.x = cc.winSize.width / 2;
        spr.y = Data.firstPillarSize.height / 2;
        this.addChild(spr);

        // 设置当前柱子的宽度
        this.curPillarWidth = Data.firstPillarSize.width;

        // 设置当前柱子的右侧在屏幕的偏移量
        this.curPillarRsideOffsetX = (cc.winSize.width + Data.firstPillarSize.width) / 2;
    },
    /**
     * 添加新的柱子
     */
    addNewPillar: function () {

        // 生成新柱子的宽度（10-120）
        var newPillarWidth = cc.random0To1() * 120 + 10;
        this.newPillarWidth = newPillarWidth;

        // 添加新柱子精灵
        var spr = new cc.Sprite(res.blackPng);
        var sprSize = spr.getContentSize();
        spr.setScale(newPillarWidth / sprSize.width, Data.firstPillarSize.height / sprSize.height);
        spr.setAnchorPoint(0, 1);   // 设置锚点为左中点
        spr.x = this.curPillarRsideOffsetX;
        spr.y = Data.firstPillarSize.height;
        this.addChild(spr);

        // 计算最大间距
        var maxSpaceWidth = cc.winSize.width - this.curPillarWidth - newPillarWidth;

        // 计算间距因子，确保间距不能太大也不能太小（0.3 - 0.8）
        var spaceWidthRatio = (cc.random0To1() + 0.6) / 2;

        // 计算当前间距
        this.curSpaceWidth = maxSpaceWidth * spaceWidthRatio;

        // 移动新柱子到间距位置
        spr.runAction
        (
            cc.sequence(cc.moveBy(0.05, cc.p(this.curSpaceWidth, 0)))
        );
    }
});