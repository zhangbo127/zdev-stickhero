/**
 * ������
 */
var MainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        // ��ӱ�����
        Data.bgLayer = new BgLayer();
        this.addChild(Data.bgLayer, -1, 0);

        // ��ӿ�ʼ�˵���
        Data.startMenuLayer = new StartMenuLayer();
        this.addChild(Data.startMenuLayer);

        // ��ӷ�����
        Data.scoreLayer = new ScoreLayer();
        this.addChild(Data.scoreLayer);

        // �����Ϸ��
        Data.gameLayer = new GameLayer();
        this.addChild(Data.gameLayer);
    }
});