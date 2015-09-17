/**
 * 开始菜单层
 */
var StartMenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._init();
        return true;
    },
    _init: function () {

        // 创建开始菜单项
        var startMenuItem = new cc.MenuItemImage(
            res.btnStartNormal,
            res.btnStartSelect,
            this.onStart, this);

        // 创建开始菜单
        var startMenu = new cc.Menu(startMenuItem);
        startMenu.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);

        // 显示开始菜单
        this.addChild(startMenu);
    },
    onStart: function () {
        this.removeFromParent();
        Data.gameLayer.startGame();
    }
});