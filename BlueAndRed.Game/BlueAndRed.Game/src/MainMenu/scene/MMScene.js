
var MainMenuLayer = cc.Layer.extend({
	_touchLayer      : undefined,
	_backgroundLayer : undefined,
	ctor : function(){
		this._super();
		var winsize=cc.director.getWinSize();
		GC.WIDTH=winsize.width;
		GC.HEIGHT=winsize.height;
		GC.PLAYERBLOOD=GC.PLAYERTOTALBLOOD;
		this.addBackgroundLayer();
		//this.addTouchLayer();
		GC.CLICKPAUSE=false;
//		if(sc.isboundwechar){
//			GC.PLAYERTOTALBLOOD=3;
//			GC.PLAYERBLOOD=GC.PLAYERTOTALBLOOD;
//		}
	},
	//添加触摸层
	addTouchLayer : function(){
		this._touchLayer = new MMTouchLayer();
		this.addChild(this._touchLayer);
	},
	addBackgroundLayer : function(){
		this._backgroundLayer = new MMBackgroundLayer();
		this.addChild(this._backgroundLayer);
	}
});
//游戏首页场景
var MainMenuScene=cc.Scene.extend({
	onEnter:function () {
		this._super();
//		if(sc.isboundwechar){//绑定微信+血
//			GC.PLAYERTOTALBLOOD = 3;
//			GC.PLAYERBLOOD = GC.PLAYERTOTALBLOOD;//玩家当前血量
//		}
		var layer = new MainMenuLayer();
		this.addChild(layer);
	}
});