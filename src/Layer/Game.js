/**
 * 游戏层
 */
var GameLayer = cc.Layer.extend({
    stickSprite: null,  // 棍子精灵
    isStickSpriteReady: false,  // 棍子精灵是否启用
    offsetX: 0,
    ctor: function () {
        this._super();
        this._initLayer();
        return true;
    },
    _initLayer: function () {

        // 添加柱子层
        Data.pillarLayer = new PillarLayer();
        this.addChild(Data.pillarLayer);

        // 添加NPC层
        Data.npcLayer = new NpcLayer();
        Data.npcLayer.setYao();
        this.addChild(Data.npcLayer);

        // 添加事件层
        Data.eventLayer = new EventLayer();
    },
    startGame: function () {

        // 显示分数层
        Data.scoreLable.setString(0);
        Data.scoreLayer.setVisible(true);


        // 设置猴子为跑步状态
        Data.npcLayer.setWalk(0.2);
        Data.npcLayer.npcSprite.runAction
        (
            cc.sequence
            (
                cc.moveBy(0.2, cc.p(Data.firstPillarSize.width / 2 - 50, 0)),
                cc.callFunc(Data.npcLayer.setYao, Data.npcLayer),
                cc.callFunc(Data.pillarLayer.addPillar, Data.pillarLayer),
                cc.callFunc(function(){
                    Data.stickLayer = new StickLayer();
                }, this)
            )
        );

        // 移动游戏层
        this.offsetX = (cc.winSize.width - Data.firstPillarSize.width) / 2;
        this.runAction(cc.sequence(cc.moveBy(0.2, cc.p(-this.offsetX, this._position.y))));
    },
    /**
     * 游戏结束处理
     */
    gameOver: function (distance) {

        // 设置NPC为跑步状态
        var npcWalkSpeed = distance / 30;
        Data.npcLayer.setWalk(npcWalkSpeed);

        // 计算NPC跑步时间
        var npcWalkDuration = distance / 500;
        Data.npcLayer.npcSprite.runAction
        (
            cc.sequence
            (
                cc.moveBy(npcWalkDuration, cc.p(distance, 0)),
                cc.callFunc(this.gameFaile, this)
            )
        );
    },
    gameFaile: function(){

        Data.npcLayer.setYao();
        Data.npcLayer.npcSprite.runAction
        (
            cc.sequence
            (
                cc.moveTo(0.3, cc.p(Data.npcLayer.npcSprite.getPositionX(), -200))
            )
        );

        // 收起棍子
        this.stickSprite.runAction
        (
            cc.sequence(cc.rotateBy(0.1, 90))
        );
    }
});