/**
 * 事件层
 */
var EventLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._initLayer();
    },
    _initLayer: function () {

        // 添加事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                if(_this.isStickSpriteReady) {
                    _this.onTouchBegan.call(_this);
                    return true;
                }
                return false;
            },
            onTouchEnded: function () {
                _this.onTouchEnded.call(_this);
            }
        }, this);
    },
    onTouchBegan: function (touch, event) {

        return false;
    },
    onTouchEnded: function (touch, event) {

    }
});