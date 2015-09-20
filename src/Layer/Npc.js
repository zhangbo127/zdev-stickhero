/**
 * NPC层
 */
var NpcLayer = cc.Layer.extend({
    _npcSfc: null,
    _npcSpr: null,
    _npcOffsetX: 0,
    ctor: function () {
        this._super();
        this._initLayer();
    },
    _initLayer: function () {

        // 缓存精灵帧
        var sfc = cc.spriteFrameCache;
        sfc.addSpriteFrames(res.npcShakePlist, res.npcShakePng);
        sfc.addSpriteFrames(res.npcKickPlist, res.npcKickPng);
        sfc.addSpriteFrames(res.npcWalkPlist, res.npcWalkPng);
        sfc.addSpriteFrames(res.npcYaoPlist, res.npcYaoPng);
        this._npcSfc = sfc;

        // 创建精灵
        var spr = new cc.Sprite('#d0001.png');
        var sprSize = spr.getContentSize();
        spr.setScale(1, 1);
        spr.x = cc.winSize.width / 2;
        spr.y = Data.firstPillarSize.height + sprSize.height / 2;
        this.addChild(spr);
        this._npcSpr = spr;
    },
    getNpcSpr: function () {
        return this._npcSpr;
    },
    setNpcShake: function () {

        this._npcSpr.stopAllActions();

        var animFrames = [];
        var str = '';
        var frame;
        for (var i = 1; i < 10; i++) {
            str = 'dq000' + i + '.png';
            frame = this._npcSfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this._npcSpr.runAction(cc.animate(animation).repeatForever());
    },
    setNpcWalk: function (speed) {

        this._npcSpr.stopAllActions();

        var animFrames = [];
        var str = '';
        var frame;
        for (var i = 1; i < 10; i++) {
            str = 'z000' + i + '.png';
            frame = this._npcSfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, speed);
        this._npcSpr.runAction(cc.animate(animation).repeatForever());
    },
    setNpcKick: function () {

        this._npcSpr.stopAllActions();

        var animFrames = [];
        var str = '';
        var frame;
        for (var i = 1; i < 10; i++) {
            str = 't000' + i + '.png';
            frame = this._npcSfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.05);
        this._npcSpr.runAction(cc.animate(animation));
    },
    setNpcYao: function () {

        this._npcSpr.stopAllActions();

        var animFrames = [];
        var str = '';
        var frame;
        for (var i = 1; i < 10; i++) {
            str = 'd00' + (i < 10 ? ('0' + i) : i) + '.png';
            frame = this._npcSfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this._npcSpr.runAction(cc.animate(animation).repeatForever());
    },
    moveNpcTo: function (distance, isGameOver) {

        // 设置NPC为跑步状态
        var npcWalkSpeed = distance / 30;
        Data.npcLayer.setNpcWalk(npcWalkSpeed);

        // 计算NPC跑步时间
        var npcWalkDuration = distance / 500;
        Data.npcLayer.getNpcSpr().runAction
        (
            cc.sequence
            (
                cc.moveBy(npcWalkDuration, cc.p(distance, 0)),
                cc.callFunc(function () {
                    if(isGameOver){
                        this.overGame();
                    }else{
                        this.keepGame();
                    }
                }, Data.gameLayer)
            )
        );
    }
});