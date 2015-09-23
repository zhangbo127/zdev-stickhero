/**
 * 游戏层
 */
var GameLayer = cc.Layer.extend({
    offsetX: 0,
    ctor: function () {
        this._super();
        this._initLayer();
        return true;
    },
    _initLayer: function () {

        // 添加柱子层
        Data.pillarLayer = new PillarLayer();
        Data.pillarLayer.addFirstPillar();
        this.addChild(Data.pillarLayer);

        // 添加NPC层
        Data.npcLayer = new NpcLayer();
        Data.npcLayer.setNpcYao();
        this.addChild(Data.npcLayer);

        // 添加棍子层
        Data.stickLayer = new StickLayer();
        this.addChild(Data.stickLayer);

        // 添加事件层
        Data.eventLayer = new EventLayer();
        this.addChild(Data.eventLayer);

    },
    startGame: function () {

        // 重置分数
        Data.scoreLayer.resetScore();


        // 设置猴子为跑步状态
        Data.npcLayer.setNpcWalk(0.2);
        Data.npcLayer.getNpcSpr().runAction
        (
            cc.sequence
            (
                cc.moveBy(0.2, cc.p(Data.firstPillarSize.width / 2 - 50, 0)),
                cc.callFunc(Data.npcLayer.setNpcYao, Data.npcLayer),
                cc.callFunc(Data.pillarLayer.addNewPillar, Data.pillarLayer),
                cc.callFunc(function () {
                    Data.stickLayer.setStickStatus(true);
                }, this)
            )
        );

        // 移动游戏层
        this.offsetX = (cc.winSize.width - Data.firstPillarSize.width) / 2;
        this.runAction(cc.sequence(
            cc.moveBy(0.2, cc.p(-this.offsetX, this._position.y))
        ));
    },
    /**
     * 继续游戏
     */
    keepGame: function () {

        var curScore = Data.scoreLayer.incScore();

        // 替换最佳分数
        if (cc.sys.localStorage.getItem("best_score") < curScore) {
            cc.sys.localStorage.setItem("best_score", curScore);
        }

        // 设置NPC摇
        Data.npcLayer.setNpcYao();

        // 计算游戏层要移动的距离
        var moveDistance = Data.pillarLayer.curSpaceWidth + Data.pillarLayer.curPillarWidth;

        // 移动游戏层
        this.runAction
        (
            cc.sequence
            (
                cc.moveBy(0.3, cc.p(-moveDistance, 0)),
                cc.callFunc(Data.pillarLayer.addNewPillar, Data.pillarLayer)
            )
        );

        // 更新游戏层偏移量
        this.offsetX += moveDistance;
    },
    /**
     * 结束游戏
     */
    overGame: function () {

        // 设置NPC掉落
        Data.npcLayer.setNpcYao();
        Data.npcLayer.getNpcSpr().runAction
        (
            cc.sequence
            (
                cc.moveTo(0.3, cc.p(Data.npcLayer.getNpcSpr().getPositionX(), -200))
            )
        );

        // 设置棍子掉落
        Data.stickLayer.getStickSpr().runAction
        (
            cc.sequence(cc.rotateBy(0.1, 90))
        );
    }
});