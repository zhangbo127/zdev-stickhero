/**
 * NPC��
 */
var NpcLayer = cc.Layer.extend({
    _sfc: null,
    _sprite: null,
    ctor: function () {
        this._super();
        this._initSprite();
    },
    _initSprite: function () {

        // ��������֡����
        this._sfc = cc.spriteFrameCache;
        this._sfc.addSpriteFrames(res.npcShakePlist, res.npcShakePng);
        this._sfc.addSpriteFrames(res.npcKickPlist, res.npcKickPng);
        this._sfc.addSpriteFrames(res.npcWalkPlist, res.npcWalkPng);
        this._sfc.addSpriteFrames(res.npcYaoPlist, res.npcYaoPng);

        // ��������
        var npcSprite = new cc.Sprite('#d0001.png');
        var npcSize = npcSprite.getContentSize();
        npcSprite.setScale(1, 1);
        npcSprite.x = cc.winSize.width / 2;
        npcSprite.y = cc.winSize.height / 2;
        this.addChild(npcSprite);
        this._sprite = npcSprite;
    },
    setShake: function () {

        this._sprite.stopAllActions();

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i < 10; i++) {
            str = "dq000" + i + ".png";
            frame = this._sfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this._sprite.runAction(cc.animate(animation).repeatForever());
    },
    setWalk: function () {

        this._sprite.stopAllActions();

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i < 10; i++) {
            str = "z000" + i + ".png";
            frame = this._sfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this._sprite.runAction(cc.animate(animation).repeatForever());
    },
    setKick: function () {

        this._sprite.stopAllActions();

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i < 10; i++) {
            str = "t000" + i + ".png";
            frame = this._sfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.05);
        this._sprite.runAction(cc.animate(animation));
    },
    setYao: function () {

        this._sprite.stopAllActions();

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i < 10; i++) {
            str = "d00" + (i < 10 ? ("0" + i) : i) + ".png";
            frame = this._sfc.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this._sprite.runAction(cc.animate(animation).repeatForever());
    }
});