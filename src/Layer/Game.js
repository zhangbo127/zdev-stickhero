/**
 * ”Œœ∑≤„
 */
var GameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._initLayer();
        return true;
    },
    _initLayer: function () {

        Data.npcLayer = new NpcLayer();
        Data.npcLayer.setYao();
        this.addChild(Data.npcLayer);
    },
    startGame: function () {

        Data.scoreLayer.setVisible(true);
        Data.scoreLable.setString(0);

        this.runAction(cc.sequence(cc.moveBy(0.2, cc.p(-200, 100))));
    }
});