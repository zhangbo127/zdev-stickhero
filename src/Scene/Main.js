/**
 * 主场景
 */
var MainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        // 添加背景层
        Data.bgLayer = new BgLayer();
        this.addChild(Data.bgLayer, -1, 0);

        // 添加开始菜单层
        Data.startMenuLayer = new StartMenuLayer();
        this.addChild(Data.startMenuLayer);

        // 添加分数层
        Data.scoreLayer = new ScoreLayer();
        this.addChild(Data.scoreLayer);

        // 添加NPC层
        Data.npcLayer = new NpcLayer();
        Data.npcLayer.setNpcYao();
        this.addChild(Data.npcLayer);
    }
});