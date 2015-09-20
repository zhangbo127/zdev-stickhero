/**
 * 分数层
 */
var ScoreLayer = cc.Layer.extend({
    _score: 0,
    _scoreLbl: null,
    ctor: function () {
        this._super();
        this._initLayer();
        return true;
    },
    _initLayer: function () {

        this.setVisible(false);

        var bgSpr = new cc.Sprite(res.bgScore);
        bgSpr.x = cc.winSize.width / 2;
        bgSpr.y = cc.winSize.height / 2 + 300;
        this.addChild(bgSpr, 1);

        var scoreLbl = new cc.LabelTTF("0", "Helvetica", 46);
        scoreLbl.x = bgSpr.width / 2;
        scoreLbl.y = bgSpr.height / 2;
        scoreLbl.setColor(cc.color(255, 255, 255));
        bgSpr.addChild(scoreLbl, 1);
        this._scoreLbl = scoreLbl;
    },
    /**
     * 重置分数
     */
    resetScore: function() {
        this._score = 0;
        this._scoreLbl.setString(this._score);
        this.setVisible(true);
    },
    /**
     * 增加分数
     */
    incScore: function () {
        this._score++;
        this._scoreLbl.setString(this._score);
        return this._score;
    }
});