/**
 * 背景层
 */
var BgLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._initLayer();
    },
    _initLayer: function () {

        var bgIndex = Math.floor(cc.random0To1()*4);
        var bgRes = res['bg' + bgIndex];

        var bgSprite = new cc.Sprite(bgRes);
        bgSprite.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            scale: 1.0,
            rotation: 0
        });

        this.addChild(bgSprite);
    }
});