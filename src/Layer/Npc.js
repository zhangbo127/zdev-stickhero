/**
 * NPC层
 */
var NpcLayer = cc.Layer.extend({
    _sfc: null,
    npcSprite: null,
    ctor: function () {
        this._super();
        this._initLayer();
    },
    _initLayer: function () {

        // 创建精灵帧缓存
        this._sfc = cc.spriteFrameCache;
        this._sfc.addSpriteFrames(res.npcShakePlist, res.npcShakePng);
        this._sfc.addSpriteFrames(res.npcKickPlist, res.npcKickPng);
        this._sfc.addSpriteFrames(res.npcWalkPlist, res.npcWalkPng);
        this._sfc.addSpriteFrames(res.npcYaoPlist, res.npcYaoPng);

        // 创建精灵
        var npcSprite = new cc.Sprite('#d0001.png');
        var npcSize = npcSprite.getContentSize();
        npcSprite.setScale(1, 1);
        npcSprite.x = cc.winSize.width / 2;
        npcSprite.y = Data.firstPillarSize.height - npcSize.height / 2;
        this.addChild(npcSprite);
        this.npcSprite = npcSprite;
    },
    setShake: function () {

        this._sprite.stopAllActions();

        var animFrames = [];
        var str = '';
        var frame;
        for (var i = 1; i < 10; i++) {
            str = 'dq000' + i + '.png';
            frame = this._sfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.npcSprite.runAction(cc.animate(animation).repeatForever());
    },
    setWalk: function (speed) {

        this.npcSprite.stopAllActions();

        var animFrames = [];
        var str = '';
        var frame;
        for (var i = 1; i < 10; i++) {
            str = 'z000' + i + '.png';
            frame = this._sfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, speed);
        this.npcSprite.runAction(cc.animate(animation).repeatForever());
    },
    setKick: function () {

        this.npcSprite.stopAllActions();

        var animFrames = [];
        var str = '';
        var frame;
        for (var i = 1; i < 10; i++) {
            str = 't000' + i + '.png';
            frame = this._sfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.05);
        this.npcSprite.runAction(cc.animate(animation));
    },
    setYao: function () {

        this.npcSprite.stopAllActions();

        var animFrames = [];
        var str = '';
        var frame;
        for (var i = 1; i < 10; i++) {
            str = 'd00' + (i < 10 ? ('0' + i) : i) + '.png';
            frame = this._sfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.npcSprite.runAction(cc.animate(animation).repeatForever());
    }
});