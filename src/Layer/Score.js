/**
 * ·ÖÊý²ã
 */
var ScoreLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._init();
        return;
    },
    _init: function () {

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
    }
});