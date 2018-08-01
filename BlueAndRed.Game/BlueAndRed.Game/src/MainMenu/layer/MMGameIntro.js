//游戏结束弹出层LayerColor
var GPGameIntro = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        // this._super(cc.color(0, 0, 0, 220));
        this._super();
        this.initbackground();
    },
    initbackground: function () {

        var _BgImg = new cc.Sprite(res.mm_gameintro1_jpg);
        _BgImg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: GC.WIDTH / 2,
            y: GC.HEIGHT / 2
        });
        this.addChild(_BgImg);

        //没问题 按钮 
        //var btnintro = new ccui.Button();
        //btnintro.setTouchEnabled(true);
        //btnintro.setPressedActionEnabled(true);
        //btnintro.loadTextures("assets/btn_info_b0.png", "assets/btn_info_b1.png", "", ccui.Widget.PLIST_TEXTURE);//assets/btn_info_b0.png
        //btnintro.x = GC.WIDTH / 2;
        //btnintro.y = GC.HEIGHT / 2 - 400;
        //btnintro.addClickEventListener(this.onbacktomain);
        //this.addChild(btnintro);

        var scope = angular.element('#rankinglist').scope();//element相当于一个jq的选择器scope.needchangescene
        var imgindex = 0;
        //触摸监听
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            //onTouchBegan: this.onTouchBegan,
            onTouchBegan: function (touch, event) {
                var touchcoord = touch.getLocation();
                if (imgindex == 0) {
                    _BgImg.setTexture(res.mm_gameintro2_jpg);
                    imgindex = 1;
                }
                else if (imgindex == 1) {
                    _BgImg.setTexture(res.mm_gameintro3_jpg);
                    imgindex = 2;
                } else if (imgindex == 2) {
                    //判断是开始游戏 还是返回主页
                    if (scope.needchangescene) {
                        //开始游戏
                        cc.director.runScene(new cc.TransitionFade(1.2, new GamePlayScene()));
                        setTimeout(function () {
                            GC.ISBTNLOCKED = false;
                        }, 300)
                    } else {
                        //返回首页
                        _BgImg.parent.parent.removeChild(_BgImg.parent.parent.getChildByName('gameintro'));//_gameintrolayer
                        setTimeout(function () {
                            GC.ISBTNLOCKED = false;
                        }, 300)
                    }
                }
            },
        }, this);
    },
    //没问题按钮
    onbacktomain: function () {
        this.parent.parent.removeChild(this.parent.parent.getChildByName('gameintro'));//_gameintrolayer
    },

})