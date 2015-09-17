/**
 * 游戏层
 */
var GameLayer = cc.Layer.extend({
    xOffset: 0,
    ctor: function () {
        this._super();
        this._initLayer();
    },
    _initLayer: function () {

        // 添加柱子层
        Data.pillarLayer = new PillarLayer();
        this.addChild(Data.pillarLayer);

        // 添加NPC层
        Data.npcLayer = new NpcLayer();
        Data.npcLayer.setYao();
        this.addChild(Data.npcLayer);
    },
    startGame: function () {

        // 显示分数层
        Data.scoreLable.setString(0);
        Data.scoreLayer.setVisible(true);

        // 移动当前层
        this.xOffset = (cc.winSize.width - Data.firstPillarSize.width) / 2;
        this.runAction(cc.sequence(cc.moveBy(0.2, cc.p(-this.xOffset, this._position.y))));

        // 设置猴子为跑步状态
        Data.npcLayer.setWalk(0.2);
        Data.npcLayer.npcSprite.runAction
        (
            cc.sequence
            (
                cc.moveBy(0.2, cc.p(Data.firstPillarSize.width / 2 - 50, 0)),
                cc.callFunc(Data.npcLayer.setYao, Data.npcLayer),
                cc.callFunc(Data.pillarLayer.addPillar, Data.pillarLayer)
            )
        );
    }
});