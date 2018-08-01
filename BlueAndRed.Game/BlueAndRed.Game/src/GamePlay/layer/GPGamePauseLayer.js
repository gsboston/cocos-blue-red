//游戏结束弹出层LayerColor
var GPGamePauseLayer = cc.LayerColor.extend({
	ctor : function(){
		this._super();
		this.init();
	},
	init:function(){
		this._super(cc.color(0, 0, 0, 180));
		this.initmenu();
	},
	initmenu:function(){
		//绑定微信微博 生命+1按钮
		//微bo
		//var btnweibo = new ccui.Button();
		//btnweibo.setTouchEnabled(true);
		//btnweibo.setPressedActionEnabled(true);
		//btnweibo.loadTextures("assets/btn_weibo_s0.png", "assets/btn_weibo_s1.png", "", ccui.Widget.PLIST_TEXTURE);//
		//btnweibo.x =  GC.WIDTH/2-75;
		//btnweibo.y = GC.HEIGHT-130;
		//btnweibo.addClickEventListener(this.onboundweibo);
		//this.addChild(btnweibo);
		//微信
		//var btnweixin = new ccui.Button();
		//btnweixin.setTouchEnabled(true);
		//btnweixin.setPressedActionEnabled(true);
		//btnweixin.loadTextures("assets/btn_wechat_s0.png", "assets/btn_wechat_s1.png", "", ccui.Widget.PLIST_TEXTURE);//
		//btnweixin.x =  GC.WIDTH/2+75;
		//btnweixin.y = GC.HEIGHT-130;
		//btnweixin.addClickEventListener(this.onboundweixin);
		//this.addChild(btnweixin);
		
		//绑定【微信】 【微博】 增加生命上限
		//var boundmessage=new cc.LabelTTF('绑定【微信】 【微博】 增加生命上限','Helvetica',28);
		//boundmessage.setPosition(GC.WIDTH/2, GC.HEIGHT/2+300);
		//this.addChild(boundmessage);
		//继续游戏和主菜单按钮
		//回主菜单
		var btngomenu = new ccui.Button();
		btngomenu.setTouchEnabled(true);
		btngomenu.setPressedActionEnabled(true);
		btngomenu.loadTextures("assets/btn_home_b0.png", "assets/btn_home_b1.png", "",  ccui.Widget.PLIST_TEXTURE);//
		btngomenu.x =  GC.WIDTH/2+120;
		btngomenu.y = GC.HEIGHT/2;
		btngomenu.addClickEventListener(this.ongotomainmenu);
		this.addChild(btngomenu);
		//继续游戏
		var btncontinue = new ccui.Button();
		btncontinue.setTouchEnabled(true);
		btncontinue.setPressedActionEnabled(true);
		btncontinue.loadTextures("assets/btn_continues_b0.png", "assets/btn_continues_b1.png", "",  ccui.Widget.PLIST_TEXTURE);//
		btncontinue.x =  GC.WIDTH/2-120;
		btncontinue.y = GC.HEIGHT/2;
		btncontinue.addClickEventListener(this.oncontinuegame);
		this.addChild(btncontinue);
	
		
	},
	//继续游戏
	oncontinuegame: function () {
	    sc.ga('pause-resume'); //GA检测按钮点击事件代码
		//播放按钮音效 继续背景音效  
		if (GC.SOUNDON){
			GC.BTNMUSIC=new cc.AudioEngine();
			GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
			GC.BGMUSIC.resumeMusic();
		}
		cc.director.resume();
		GC.CLICKPAUSE=false;
	},
	//回主菜单
	ongotomainmenu: function () {
	    sc.ga('pause-home'); //GA检测按钮点击事件代码
		if (GC.SOUNDON){
			GC.BTNMUSIC=new cc.AudioEngine();
			GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
		}
		
		GC.CLICKPAUSE=false;
		GC.BGMUSIC.pauseMusic();
		cc.director.runScene(new MainMenuScene());
		cc.director.resume();
	},
	onboundweixin:function(){
		if (GC.SOUNDON){
			GC.BTNMUSIC=new cc.AudioEngine();
			GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
		}
	},
	onboundweibo:function(){
		if (GC.SOUNDON){
			GC.BTNMUSIC=new cc.AudioEngine();
			GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
		}
	},
})