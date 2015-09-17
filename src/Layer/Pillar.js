/**
 * 柱子层
 */
var PillarLayer = cc.Layer.extend({
    curSpaceWidth: 0,
    curPillarWidth: 0,
    prevPillarWidth: 0,
    ctor: function () {
        this._super();
        this._initLayer();
    },
    _initLayer: function () {
        var sprite = new cc.Sprite(res.blackPng);
        var spriteSize = sprite.getContentSize();
        sprite.setScale(Data.firstPillarSize.width / sprite.width, Data.firstPillarSize.height / sprite.height);
        sprite.x = cc.winSize.width / 2;
        sprite.y = spriteSize.height / 2;
        this.addChild(sprite);

        this.prevPillarWidth = Data.firstPillarSize.width;
    },
    /**
     * 添加新的柱子
     */
    addPillar: function () {

        var randomWidth = cc.random0To1() * 120 + 10;
        var sprite = new cc.Sprite(res.blackPng);
        var spriteSize = sprite.getContentSize();
        sprite.setScale(randomWidth / spriteSize.width, Data.firstPillarSize.height / spriteSize.height);
        sprite.x = Data.gameLayer.xOffset + Data.firstPillarSize.width + randomWidth / 2;
        sprite.y = spriteSize.height / 2;
        this.addChild(sprite);

        var maxSpaceWidth = cc.winSize.width - this.prevPillarWidth - randomWidth;
        var spaceRatio = (cc.random0To1() + 0.6) / 2;

        this.curSpaceWidth = maxSpaceWidth * spaceRatio;

        sprite.runAction
        (
            cc.sequence(cc.moveBy(0.05, cc.p(this.curSpaceWidth, 0)))
        );
    }
});