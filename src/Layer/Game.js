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

        // 添加事件监听
        var _this = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if(_this.isStickSpriteReady) {
                    _this.onTouchBegan.call(_this);
                    return true;
                }
                return false;
            },
            onTouchEnded: function () {
                _this.onTouchEnded.call(_this);
            }
        }, this);
    },
    startGame: function () {

        // 显示分数层
        Data.scoreLable.setString(0);
        Data.scoreLayer.setVisible(true);

        // 移动当前层
        this.offsetX = (cc.winSize.width - Data.firstPillarSize.width) / 2;
        this.runAction(cc.sequence(cc.moveBy(0.2, cc.p(-this.offsetX, this._position.y))));

        // 设置猴子为跑步状态
        Data.npcLayer.setWalk(0.2);
        Data.npcLayer.npcSprite.runAction
        (
            cc.sequence
            (
                cc.moveBy(0.2, cc.p(Data.firstPillarSize.width / 2 - 50, 0)),
                cc.callFunc(Data.npcLayer.setYao, Data.npcLayer),
                cc.callFunc(Data.pillarLayer.addPillar, Data.pillarLayer),
                cc.callFunc(this.addStickSprite, this)
            )
        );
    },
    /**
     * 添加棍子精灵
     */
    addStickSprite: function () {

        var spr = new cc.Sprite(res.blackPng);
        var sprSize = spr.getContentSize();

        spr.setAnchorPoint(cc.p(0.5, 0));
        spr.x = this.offsetX + Data.pillarLayer.prePillarRightOffsetX - sprSize.width;
        spr.y = Data.firstPillarSize.height;
        spr.setScaleY(0);
        this.addChild(spr);

        this.stickSprite = spr;
    },
    /**
     * 延长棍子精灵
     */
    extendStickSprite: function () {
        var scaleY = this.stickSprite.getScaleY();
        this.stickSprite.setScaleY(scaleY + 0.07);
    },
    /**
     * 当棍子精灵旋转结束时回调函数
     */
    onStickSpriteRotateEnd: function () {

        // 获取当前棍子精灵的高度
        var sSprSize = this.stickSprite.getContentSize();
        var sSprHeight = this.stickSprite.getScaleY() * sSprSize.height;

        // 计算能通过的最小长度和最大长度
        var minLen = Data.pillarLayer.curSpaceWidth + 5;
        var maxLen = Data.pillarLayer.curSpaceWidth + Data.pillarLayer.curPillarWidth - 5;

        // 判断是否可以通过
        if (minLen <= sSprHeight && sSprHeight <= maxLen) {

        } else {
            // 判断是太短还是太长导致游戏结束
            if (sSprHeight < minLen) {
                this.gameOver(minLen);
            } else {
                this.gameOver(maxLen);
            }
        }
    },
    /**
     * 触碰开始时回调函数
     */
    onTouchBegan: function () {
        Data.gameLayer.schedule(Data.gameLayer.extendStickSprite, 0.02);
        Data.npcLayer.setShake();
    },
    /**
     * 触碰结束时回调函数
     */
    onTouchEnded: function () {

        // 停止伸长棍子精灵
        Data.gameLayer.unschedule(Data.gameLayer.extendStickSprite);

        // 设置NPC新的状态
        Data.npcLayer.setKick();

        // 设置棍子精灵未就绪
        Data.gameLayer.isStickSpriteReady = false;

        // 旋转棍子精灵
        Data.gameLayer.stickSprite.runAction
        (
            cc.sequence
            (
                cc.delayTime(0.3),
                cc.rotateBy(0.1, 90),
                cc.callFunc(Data.gameLayer.onStickSpriteRotateEnd, Data.gameLayer)
            )
        );
    },
    /**
     * 游戏结束处理
     */
    gameOver: function (distance) {

        // 设置NPC为跑步状态
        Data.npcLayer.setWalk(distance / 30);

        // 计算NPC移动时间
        var npcMoveDuration = distance / 500;
        Data.npcLayer.npcSprite.runAction
        (
            cc.sequence
            (
                cc.moveBy(npcMoveDuration, cc.p(distance, 0))
            )
        );
    }
});