/**
 * NPC层
 */
var NpcLayer = cc.Layer.extend({
    npcSFC: null,
    npcSprite: null,
    ctor: function () {
        this._super();
        this._init();
        return true;
    },
    _init: function () {

        // 添加精灵帧缓存
        var npcSFC = cc.spriteFrameCache;
        npcSFC.addSpriteFrames(res.npcShakePlist, res.npcShakePng);
        npcSFC.addSpriteFrames(res.npcKickPlist, res.npcKickPng);
        npcSFC.addSpriteFrames(res.npcWalkPlist, res.npcWalkPng);
        npcSFC.addSpriteFrames(res.npcYaoPlist, res.npcYaoPng);
        this.npcSFC = npcSFC;

        // 添加精灵
        var npcSprite = new cc.Sprite('#d0001.png');
        var npcSize = npcSprite.getContentSize();
        npcSprite.setScale(1, 1);
        npcSprite.x = cc.winSize.width / 2;
        npcSprite.y = cc.winSize.height / 2;
        this.addChild(npcSprite);
        this.npcSprite = npcSprite;

        // 添加事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchEnded: this.onTouchEnded
        }, this);
    },
    setNpcShake: function () {

        this.npcSprite.stopAllActions();

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i < 10; i++) {
            str = "dq000" + i + ".png";
            frame = this.npcSFC.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.npcSprite.runAction(cc.animate(animation).repeatForever());
    },
    setNpcWalk: function () {

        this.npcSprite.stopAllActions();

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i < 10; i++) {
            str = "z000" + i + ".png";
            frame = this.npcSFC.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.npcSprite.runAction(cc.animate(animation).repeatForever());
    },
    setNpcKick: function () {

        this.npcSprite.stopAllActions();

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i < 10; i++) {
            str = "t000" + i + ".png";
            frame = this.npcSFC.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.05);
        this.npcSprite.runAction(cc.animate(animation));
    },
    setNpcYao: function () {

        this.npcSprite.stopAllActions();

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i < 10; i++) {
            str = "d00" + (i < 10 ? ("0" + i) : i) + ".png";
            frame = this.npcSFC.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.npcSprite.runAction(cc.animate(animation).repeatForever());
    }
});