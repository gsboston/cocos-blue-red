

var MainMenulayer = cc.Layer.extend({

    _backgroundLayer: null,
    _touchLayer: null,
    ctor: function () {
        this._super();


        this.addTestLayer();
    },
    addTestLayer: function () {
        this._testLayer = new TestLayer();
        this.addChild(this._testLayer);
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new MainMenulayer();
        this.addChild(layer);
    }
});