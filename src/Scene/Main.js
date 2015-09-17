/**
 * 主场景
 */
var MainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        // 添加背景层
        Data.bgLayer = new BgLayer();
        this.addChild(Data.bgLayer, -1, 0);

        // 添加菜单层
        Data.menuLayer = new MenuLayer();
        this.addChild(Data.menuLayer);

        // 添加分数层
        Data.scoreLayer = new ScoreLayer();
        this.addChild(Data.scoreLayer);

        // 添加游戏层
        Data.gameLayer = new GameLayer();
        this.addChild(Data.gameLayer);
    }
});