/**
 * 事件层
 */
var EventLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._initLayer();
        return true;
    },
    _initLayer: function () {

        // 添加事件监听
        var _this = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return _this.onTouchBegan.call(_this);
            },
            onTouchEnded: function () {
                _this.onTouchEnded.call(_this);
            }
        }, this);
    },
    onTouchBegan: function (touch, event) {
        if(Data.stickLayer.getStickStatus()) {
            Data.stickLayer.schedule(Data.stickLayer.extendStick, 0.02);
            Data.npcLayer.setNpcShake();
            return true;
        }
        return false;
    },
    onTouchEnded: function (touch, event) {

        // 停止伸长棍子
        Data.stickLayer.unschedule(Data.stickLayer.extendStick);

        // 设置NPC新的状态
        Data.npcLayer.setNpcKick();

        // 设置棍子精灵未就绪
        Data.stickLayer.setStickStatus(false);

        // 旋转棍子精灵
        Data.stickLayer.getStickSpr().runAction
        (
            cc.sequence
            (
                cc.delayTime(0.3),
                cc.rotateBy(0.1, 90),
                cc.callFunc(Data.stickLayer.onStickRotateEnd, Data.stickLayer)
            )
        );
    }
});