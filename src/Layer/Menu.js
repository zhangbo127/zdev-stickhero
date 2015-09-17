/**
 * ��ʼ�˵���
 */
var StartMenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._init();
        return true;
    },
    _init: function () {

        // ������ʼ�˵���
        var startMenuItem = new cc.MenuItemImage(
            res.btnStartNormal,
            res.btnStartSelect,
            this.onStart, this);

        // ������ʼ�˵�
        var startMenu = new cc.Menu(startMenuItem);
        startMenu.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        // ��ʾ��ʼ�˵�
        this.addChild(startMenu);
    },
    onStart: function () {
        this.removeFromParent();
        Data.gameLayer.startGame();
    }
});