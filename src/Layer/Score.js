/**
 * 分数层
 */
var ScoreLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._initLayer();
        return true;
    },
    _initLayer: function () {

        var bgSprite = new cc.Sprite(res.bgScore);
        bgSprite.x = cc.winSize.width / 2;
        bgSprite.y = cc.winSize.height / 2 + 300;
        this.addChild(bgSprite, 1);

        var scoreLable = new cc.LabelTTF("0", "Helvetica", 46);
        scoreLable.x = bgSprite.width / 2;
        scoreLable.y = bgSprite.height / 2;
        scoreLable.setColor(cc.color(255, 255, 255));
        bgSprite.addChild(scoreLable, 1);

        Data.scoreLable = scoreLable;

        this.setVisible(false);
    },
    /**
     * 重置分数
     */
    resetScore: function() {
        Data.scoreLable.setString(0);
        Data.scoreLayer.setVisible(true);
    }
});