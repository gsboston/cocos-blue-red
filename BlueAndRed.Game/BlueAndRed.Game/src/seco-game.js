///#source 1 1 /src/resource.js
var res = {
    mm_meteor_plist: "res/meteor.plist",
    gp_planegrain_plist: "res/fire_jet.plist",
    gp_bobgrain_plist: "res/bob.plist",

    gp_bombmusic_mp3: "res/audio_bomb.mp3",
    gp_bgmusic_mp3: "res/audio_bgmusic.mp3",
    bar_btnmusic2_mp3: "res/audio_btn.mp3",
    bar_btnmusic_mp3: "res/audio_btn2.mp3",
    gp_starmusic_mp3: "res/audio_star.mp3",
    mm_homebgmusic_mp3: "res/audio_home.mp3",

    mm_img_plist: "res/plist_images.plist",
    mm_img_png: "res/plist_images.png",

    font_ubuntu_ttf: "res/Ubuntu-Light_0.ttf",

    gp_bgimg_jpg: "res/bg2.jpg",
    mm_bgimg_jpg: "res/bg1.jpg",


    mm_planegrain_plist: "res/home_fire_jet.plist",
    mm_gamelogo_png: "res/assets/title.png",

    mm_homebluerock_png: "res/assets/home_rocket_blue.png",
    mm_homeredrock_png: "res/assets/home_rocket_red.png",

    mm_introbg_png: "res/info.png",

    mm_gameintro1_jpg: "res/game_info_1.jpg",
    mm_gameintro2_jpg: "res/game_info_2.jpg",
    mm_gameintro3_jpg: "res/game_info_3.jpg"

    //gp_wordfont_png: "res/font.png",
    //gp_wordfont_fnt: "res/font.fnt"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

///#source 1 1 /src/app.js

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );
        return true;
    }
});

//var HelloWorldScene = cc.Scene.extend({
//    onEnter:function () {
//        this._super();
//        var layer = new loadindLayer();
//        this.addChild(layer);
//    }
//});


///#source 1 1 /src/GameConfig/GameConfig.js
var GC = GC || {};
//var winsize=cc.director.getWinSize();
GC.WIDTH = 640;
GC.HEIGHT = 1136;

GC.SOUNDON=true;//音乐开关
GC.BGMUSIC=undefined;//背景音效
GC.BTNMUSIC=undefined;//按钮音效
GC.STARMUSIC=undefined;//吃星星音效
GC.BOMBMUSIC=undefined;//爆炸音效
GC.MMBGMUSIC=undefined;//首页背景音乐

//GC.WIDTH = winsize.width;
//GC.HEIGHT = winsize.height;
GC.GODTIME=2.9;//撞到障碍物后免疫时间
GC.ISGODMODE=false;//当前是否撞到障碍物

GC.ENEMYS = [];//障碍等精灵 数组
GC.ISMISSINGSTAR = false;//是否错过星星
GC.ISGAMEOVER=false;//游戏是否结束
GC.PLAYERSCORE = 0;//分数
GC.bloodsarr=[];//血量数组
GC.emptybloodsarr=[];//空血量数组
GC.HOMELOGOROCKETRED=undefined;
GC.HOMELOGOROCKETBLUE=undefined;
GC.ISGAMEOVERONTOUCH = false;//游戏结束时 传给touchlayer 显示gameover层
GC.ISBTNLOCKED = false;

GC.BACKGROUNDSPEED=0.5;//背景移动速度
GC.CLICKPAUSE = false;//点击暂停按钮
GC.ISLEFTORRIGHTSTAR="";//错过星星时记录左右
GC.STRIKEOBSTACLELEFT=false;//撞击障碍 玩家闪烁
GC.STRIKEOBSTACLERIGHT=false;//撞击障碍 玩家闪烁
GC.MAXCOUNTEACHLINE = 3;//每行最多连续出现多少个精灵 

//if (sc.isboundwechar) {
    //GC.PLAYERTOTALBLOOD = 3;//总血量  血量上限
//} else {
    GC.PLAYERTOTALBLOOD = 1;//总血量  血量上限
//}
GC.PLAYERBLOOD = GC.PLAYERTOTALBLOOD;//玩家当前血量
GC.MAXSPEED = 1.9;//飞船最大速度 （从上倒下运行的秒数）
GC.SPEEDREDUCEDEACHUPDATE = 0.04;//每次更新飞船的速度增加量   （秒数  越小越快）
//GC.UPDATESPRITETIMES=0.3;//刷新障碍精灵的最小时间间隔
//GC.SPUPDATETIMEREDUCED=0.01;//障碍精灵刷新时间 递减量
GC.FIRSTSPUPDATETIME = 1;//初始障碍精灵刷新间隔
//GC.FIRSTSPEED=4;//飞船初始速度
GC.BLOODAPPPRO = 9.95;//心出现的概率 
GC.OBSAPPPRO = 6;//障碍出现的频率百分之    星星的概率为100%-障碍%
GC.SPACING = 300;//障碍物出现间距 （ 1136-x）
GC.CURRENTSPEED = 0;//当前飞船速度

//
GC.MISSSTARTIMES=0;
GC.HITPLANETTIMES=0;
GC.EATBLOODTIMES=0;
GC.STARTIMES=undefined;
GC.STARTIMESTIME=undefined;
GC.ENDTIMES=undefined;
GC.ENDTIMESTIME=undefined;
GC.PLAYTIMES=0;
GC.MAXSCORE=0;


GC.CURRENTY=0;

//游戏速度档  超过指定分数 触发对应速度
GC.FIRSTGEAR = 20;
GC.SECONDGEAR = 40;
GC.THIRDGEAR = 70;
GC.FOURTHGEAR = 130;
GC.FIFTHGEAR = 300;

//每档对应速度
GC.FIRSTSPEED = 5;
GC.SECONDSPEED = 8;
GC.THIRDSPEED = 10;
GC.FOURTHSPEED = 12;
GC.FIFTHSPEED = 15;
GC.SIXTHSPEED = 18;

///#source 1 1 /src/GamePlay/layer/GPBackgroundImgLayer.js
var GPbackgroundImglayer = cc.Layer.extend({
	_distanceY:0,
	_currentdisY:0,
	_bgimg1:undefined,
	_bgimg2:undefined,
	_index:-1,
	ctor : function(){
		this._super();
		//加载背景
		this.initBackgroundImg();
		this.scheduleUpdate();
	},
	initBackgroundImg:function(){
		//第一张图片
		var bgimg=new cc.Sprite(res.gp_bgimg_jpg);
		bgimg.attr({
			x: GC.WIDTH/2,
			y:GC.HEIGHT/2
		});
		this._bgimg1=bgimg;
		this.addChild(bgimg);
		//第二张图片
		var bgimg2=new cc.Sprite(res.gp_bgimg_jpg);
		bgimg2.attr({
			x: GC.WIDTH/2,
			y:GC.HEIGHT/2+GC.HEIGHT
		});
		this._bgimg2=bgimg2;
		this.addChild(bgimg2);
	},
	//每帧
	update:function(dt){
		var speed=GC.BACKGROUNDSPEED;
		var bgpos=this.getPosition();
		//移动图片
		this.setPosition(bgpos.x,bgpos.y-speed);
		//记录总位移 和当前图片的位移
		this._distanceY=this._distanceY+speed;
		this._currentdisY=this._currentdisY+speed;
		//如果当前图片的位移超过一个屏幕的高度 则将当前图片定位到队列后端  -40是防止切换图片时黑线的出现
		if(this._currentdisY>=GC.HEIGHT-40){
			var pagecount=this._distanceY/GC.HEIGHT;//页数
			//防止重复执行
			if (this._index == pagecount) {
				return false;
			}
			//交替将运动出屏幕的图片加载到后端 等待下次从屏幕上出现
			if(pagecount%2<1){
				this._bgimg1.setPosition(GC.WIDTH/2, GC.HEIGHT/2+(pagecount+1)*GC.HEIGHT);
			}else{
				this._bgimg2.setPosition(GC.WIDTH/2, GC.HEIGHT/2+(pagecount+1)*GC.HEIGHT);
			}
			this._index=pagecount;
			this._currentdisY=0;
		}
	},
})
///#source 1 1 /src/GamePlay/layer/GPBackgroundLayer.js
var GPbackgroundlayer = cc.Layer.extend({
	_gpBg:undefined,
	_lines:[],
	_isfirstloda:true,
	_isfirstdraw:true,
	ctor : function(){
		this._super();
		//加载背景
		this._lines=[];
		this._isfirstdraw=true;
		this.initBackground();
		this.addBackgroundLine();
		this.scheduleUpdate();
	},
	//添加背景中线
	initBackground:function(){
		var drawNode = new cc.DrawNode();
		drawNode.drawRect(cc.p(GC.WIDTH/2, 0), cc.p(GC.WIDTH/2+2, GC.HEIGHT), cc.color(255, 255, 255, 50), 3,cc.Color(255,255,255, 50));
		this.addChild(drawNode);
	},
	//添加背景滚动线
	addBackgroundLine : function(){
		var leftdrawNode = new cc.DrawNode();
		var rightdrawNode = new cc.DrawNode();
		leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT), cc.p(GC.WIDTH/4+1, GC.HEIGHT+150), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
		rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT+150), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
		
		if(this._isfirstdraw){
			leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT-200), cc.p(GC.WIDTH/4+1, GC.HEIGHT-50), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT-400), cc.p(GC.WIDTH/4+1, GC.HEIGHT-250), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT-600), cc.p(GC.WIDTH/4+1, GC.HEIGHT-450), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT-800), cc.p(GC.WIDTH/4+1, GC.HEIGHT-650), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT-1000), cc.p(GC.WIDTH/4+1, GC.HEIGHT-850), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			
			rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT-200), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT-60), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT-400), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT-250), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT-600), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT-450), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT-800), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT-650), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT-1000), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT-850), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			this._isfirstdraw=false;
		}
		
		this.addChild(leftdrawNode);
		this.addChild(rightdrawNode);
		this._lines.push(leftdrawNode);
		this._lines.push(rightdrawNode);
	},
	update:function(dt){
		var i; 
		//cc.log(this._lines.length);
		//游戏结束  精灵停止移动
		if(GC.PLAYERBLOOD==0){
			return;
		}
		var dty = GC.CURRENTSPEED * dt * 60;
		for(i in this._lines){
			var lin = this._lines[i];
			var pos=lin.getPosition();
			lin.setPosition(pos.x, pos.y - dty);
			if(pos.y<-1250){
				this.removeChild(lin, true);//清除
				var index = this._lines.indexOf(lin);  
				this._lines.splice(index, 1);  
			}
		}
		var lastline= this._lines[this._lines.length-1];
		var position=lastline.getPosition();
		if(position.y<-200){
			this.addBackgroundLine();
		}
	}
});
///#source 1 1 /src/GamePlay/layer/GPBloodSlotLayer.js
var GPBloodSlotLayer = cc.Layer.extend({
    _currentblood: GC.PLAYERTOTALBLOOD,
    _lifeposy: 0,
    ctor: function () {
        this._super();
        GC.bloodsarr = [];
        GC.PLAYERBLOOD = GC.PLAYERTOTALBLOOD;
        this._currentblood = GC.PLAYERBLOOD;
        this.initBloods();
        this.schedule(this.updateScore);
    },
    initBloods: function () {
        //生命框
        var lifesprite = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_bar.png"));
        lifesprite.attr({
            x: GC.WIDTH / 2,
            y: GC.HEIGHT - 12
        });
        this.addChild(lifesprite);
        //初始化玩家血量显示
        var bloodcount = 0;
        var lifepos = lifesprite.getPosition();
        this._lifeposy = lifepos.y - 10;
        if (GC.PLAYERBLOOD >= 1) {
            var firstblood1 = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart.png"));
            firstblood1.attr({
                x: lifepos.x - 35,
                y: lifepos.y - 10
            });
            this.addChild(firstblood1);
            firstblood1.tag = 1;
            GC.bloodsarr.push(firstblood1);
            bloodcount++;
        }
        if (GC.PLAYERBLOOD >= 2) {
            var firstblood2 = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart.png"));
            firstblood2.attr({
                x: lifepos.x,
                y: lifepos.y - 10
            });
            //cc.log(lifepos.x+'=='+lifepos.y);
            this.addChild(firstblood2);
            firstblood2.tag = 2;
            GC.bloodsarr.push(firstblood2);
            bloodcount++;
            //
        }
        if (GC.PLAYERBLOOD >= 3) {
            var firstblood3 = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart.png"));
            firstblood3.attr({
                x: lifepos.x + 35,
                y: lifepos.y - 10
            });
            this.addChild(firstblood3);
            firstblood3.tag = 3;
            GC.bloodsarr.push(firstblood3);
            bloodcount++;
        }
        //2015.1.7 屏蔽 空血格显示
        //初始血量不满  显示空心
        //if(bloodcount==1){
        //var emptyblood1=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart_none.png"));
        //emptyblood1.attr({
        //	x: lifepos.x,
        //	y:lifepos.y-10
        //});
        //this.addChild(emptyblood1);
        //var emptyblood2=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart_none.png"));
        //emptyblood2.attr({
        //	x: lifepos.x+35,
        //	y:lifepos.y-10
        //});
        //this.addChild(emptyblood2);
        //}else{
        //var emptyblood=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart_none.png"));
        //emptyblood.attr({
        //	x: lifepos.x+35,
        //	y:lifepos.y-10
        //});
        //this.addChild(emptyblood);
        //}
        //2015.1.7 屏蔽 空血格显示
    },
    updateScore: function () {
        cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist);
        //this._labelstatus.setString(GC.PLAYERSCORE);
        //this._labelbloods.setString(GC.PLAYERBLOOD);
        if (GC.bloodsarr.length == 0) {
            return;
        }

        //		//血量减少
        if (this._currentblood > GC.PLAYERBLOOD) {
            //掉血 但是 血量大于0的时候
            if (GC.PLAYERBLOOD > 0) {
                GC.ISGODMODE = true;
                setTimeout(function () {
                    GC.ISGODMODE = false;
                }, GC.GODTIME * 1000);
            }
            var bloodsp = GC.bloodsarr[GC.bloodsarr.length - 1];
            this.removeChild(bloodsp, true);//清除
            var index = GC.bloodsarr.indexOf(bloodsp);
            GC.bloodsarr.splice(index, 1);
            //灰血格
            var emptyblood = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart_none.png"));
            var xpos = 0;
            if (bloodsp.tag == 1) {
                xpos = -35;
            } else if (bloodsp.tag == 2) {
                xpos = 0;
                emptyblood.tag = 2;
            } else if (bloodsp.tag == 3) {
                xpos = 35;
                emptyblood.tag = 3;
            }

            emptyblood.attr({
                x: GC.WIDTH / 2 + xpos,
                y: this._lifeposy
            });
            this.addChild(emptyblood);
            //空血格
            GC.emptybloodsarr.push(emptyblood);
            this._currentblood = GC.PLAYERBLOOD;//更新当前血量
        }
        //处理吃心加血
        if (this._currentblood < GC.PLAYERBLOOD) {
            if (GC.emptybloodsarr.length == 0) {
                return;
            }
            var emptyblood = GC.emptybloodsarr[GC.emptybloodsarr.length - 1];
            var fullbloodx = 0;
            var firstblood = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart.png"));
            if (emptyblood.tag == 2) {
                fullbloodx = 0;
                firstblood.tag = 2;
            } else if (emptyblood.tag == 3) {
                fullbloodx = 35;
                firstblood.tag = 3;
            }
            //显示完整的心图片
            firstblood.attr({
                x: GC.WIDTH + 200,//x: GC.WIDTH/2+fullbloodx,
                y: this._lifeposy
            });

            this.addChild(firstblood);

            //		//渐入效果
            var actionfadeout = cc.fadeOut(0.01);
            //firstblood.runAction(actionfadeout);
            var actionmovex = cc.moveTo(0.1, GC.WIDTH / 2 + fullbloodx, this._lifeposy);
            var actionfadein = cc.fadeIn(1.6);
            //firstblood.setPosition(GC.WIDTH/2+fullbloodx, this._lifeposy)
            //var action2=cc.sequence(actionfadeout,actionfadein);
            var action3 = cc.sequence(actionfadeout, actionmovex, actionfadein)
            firstblood.runAction(action3);

            GC.bloodsarr.push(firstblood);
            //----
            this.removeChild(emptyblood, true);//清除
            var index = GC.emptybloodsarr.indexOf(emptyblood);
            GC.emptybloodsarr.splice(index, 1);

            this._currentblood = GC.PLAYERBLOOD;//更新当前血量
        }
    },
})
///#source 1 1 /src/GamePlay/layer/GPGameOverLayer.js
//游戏结束弹出层
var GPGameOverLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super();
        //this._super(cc.color(0, 0, 0, 180));
        this.init();
        var scope = angular.element('#sharelayer').scope();//element相当于一个jq的选择器
        scope.getgamecount();
        scope.curscore = GC.PLAYERSCORE;
        scope.wecharshare(GC.PLAYERSCORE);
        if (GC.PLAYERSCORE > 0) {
            scope.weiboshare(GC.PLAYERSCORE);
        }
    },
    init: function () {
        this._super(cc.color(0, 0, 0, 220));
        this.initmenu();
    },
    initmenu: function () {
        //var maxscore = 0;
        //$.get(sc.baseUrl + "Admin/Api/GetMaxScore", function (data) {
        //    maxscore = data;
        //})



        cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist);
        //var spR =new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/rocket_blue_1.png"));
        //下方4个按钮 首页 排行榜 微博 微信分享
        var gobackNormal = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/btn_home_s0.png"));
        var gobackSelected = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/btn_home_s1.png"));
        var gobackDisabled = new cc.Sprite();

        //var rankListNormal = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/btn_ranking_s0.png"));
        //var rankListSelected = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/btn_ranking_s1.png"));
        //var rankListDisabled = new cc.Sprite();

        var weiboShareNormal = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/btn_weibo_s0.png"));//assets/btn_weibo.png
        var weiboShareSelected = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/btn_weibo_s1.png"));
        var weiboShareDisabled = new cc.Sprite();

        var weixinShareNormal = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/btn_wechat_s0.png"));//assets/btn_share2.png
        var weixinShareSelected = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/btn_wechat_s1.png"));
        var weixinShareDisabled = new cc.Sprite();
        var goBack = new cc.MenuItemSprite(
				gobackNormal,
				gobackSelected,
				gobackDisabled,
				this.ongoBack,
				this
		);

        //var rankList = new cc.MenuItemSprite(
        //		rankListNormal,
        //		rankListSelected,
        //		rankListDisabled,
        //		this.onrankList,
        //		this
        //);

        var weixinShare = new cc.MenuItemSprite(
				weixinShareNormal,
				weixinShareSelected,
				weixinShareDisabled,
				this.onweixinShare,
				this
		);

        var weiboShare = new cc.MenuItemSprite(
				weiboShareNormal,
				weiboShareSelected,
				weiboShareDisabled,
				this.onweiboShare,
				this
		);
        var menubottom = new cc.Menu(goBack, weixinShare, weiboShare);
        //menubottom.alignItemsVerticallyWithPadding(10);
        menubottom.alignItemsHorizontallyWithPadding(100);
        menubottom.x = GC.WIDTH / 2;
        menubottom.y = GC.HEIGHT / 2 - 240;
        this.addChild(menubottom, 1, 2);

        var secologo = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/logo_secoinfo.png"));
        secologo.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: GC.WIDTH / 2,
            y: 120
        });
        this.addChild(secologo);
        var wordseco = new cc.LabelTTF('北京西科纬众信息技术有限公司', 'Helvetica', 20);
        wordseco.setPosition(GC.WIDTH / 2, 79);
        this.addChild(wordseco);
        var wordwebsite = new cc.LabelTTF('www.secoinfo.net', 'Helvetica', 25);
        wordwebsite.setPosition(GC.WIDTH / 2, 50);
        this.addChild(wordwebsite);

        //再玩一次和排行榜列表
        var btnreplay = new ccui.Button();
        btnreplay.setTouchEnabled(true);
        btnreplay.setPressedActionEnabled(true);
        btnreplay.loadTextures("assets/btn_replay_b0.png", "assets/btn_replay_b1.png", "", ccui.Widget.PLIST_TEXTURE);//
        btnreplay.x = GC.WIDTH / 2 - 120;
        btnreplay.y = GC.HEIGHT / 2 - 30;
        btnreplay.addClickEventListener(this.onreplay);
        this.addChild(btnreplay);

        var btnsharefirends = new ccui.Button();
        btnsharefirends.setTouchEnabled(true);
        btnsharefirends.setPressedActionEnabled(true);
        btnsharefirends.loadTextures("assets/btn_ranking_b0.png", "assets/btn_ranking_b1.png", "", ccui.Widget.PLIST_TEXTURE);//
        btnsharefirends.x = GC.WIDTH / 2 + 120;
        btnsharefirends.y = GC.HEIGHT / 2 - 30;
        btnsharefirends.addClickEventListener(this.onrankList);
        this.addChild(btnsharefirends);


        //绑定【微信】 【微博】 增加生命上限
        //var boundmessage = new cc.LabelTTF('绑定【微信】 【微博】 增加生命上限', 'Helvetica', 25);
        ////boundmessage.setColor(cc.color(0,0,0));
        //boundmessage.setPosition(GC.WIDTH / 2, GC.HEIGHT / 2 - 360);
        ////boundmessage.setScale(1.4);
        //this.addChild(boundmessage);

        if (GC.PLAYERSCORE > sc.allmaxscore)
            sc.allmaxscore = GC.PLAYERSCORE;

        //人类最高分
        var humanrecord = new cc.LabelTTF('人类最高分', 'Helvetica', 40);
        humanrecord.setPosition(GC.WIDTH / 2 - 150, GC.HEIGHT / 2 + 150);
        //humanrecord.setScale(2);
        this.addChild(humanrecord);
        var humanrecordscore = undefined;
        humanrecordscore = new cc.LabelTTF(sc.allmaxscore, 'Helvetica', 50);//res.font_ubuntu_ttf
        humanrecordscore.setPosition(GC.WIDTH / 2 + 220, GC.HEIGHT / 2 + 150);
        //humanrecordscore.setScale(2.5);
        this.addChild(humanrecordscore);
        //最高分
        if (GC.PLAYERSCORE > sc.maxscore) {
            sc.maxscore = GC.PLAYERSCORE;
        }
        var selfrecord = new cc.LabelTTF('最高分', 'Helvetica', 40);
        selfrecord.setPosition(GC.WIDTH / 2 - 190, GC.HEIGHT / 2 + 250);
        //selfrecord.setScale(2);
        this.addChild(selfrecord);
        var selfrecordscore = new cc.LabelTTF(sc.maxscore, 'Helvetica', 40);
        selfrecordscore.setPosition(GC.WIDTH / 2 + 220, GC.HEIGHT / 2 + 250);
        //selfrecordscore.setScale(1.2);
        this.addChild(selfrecordscore);
        //得分
        var thistime = new cc.LabelTTF('得分', 'Helvetica', 40);
        thistime.setPosition(GC.WIDTH / 2 - 210, GC.HEIGHT / 2 + 350);
        //thistime.setScale(2);
        this.addChild(thistime);
        var thistimescore = undefined;
        if (GC.PLAYERSCORE == 0)
            thistimescore = new cc.LabelTTF('0', 'Helvetica', 50);
        else
            thistimescore = new cc.LabelTTF(GC.PLAYERSCORE, 'Helvetica', 50);
        thistimescore.setPosition(GC.WIDTH / 2 + 220, GC.HEIGHT / 2 + 350);
        //thistimescore.setScale(2.5);
        this.addChild(thistimescore);

    },
    //重新开始游戏
    onreplay: function () {
        sc.ga('over-replay'); //GA检测按钮点击事件代码
        if (GC.SOUNDON) {
            GC.BTNMUSIC = new cc.AudioEngine();
            GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
        }
        //		var trans = new cc.TransitionPageTurn(0.5, new GamePlayScene(), false);
        //		cc.director.runScene(trans);
        cc.director.runScene(new GamePlayScene());
        //cc.director.runScene(new cc.TransitionFade(1.2, new GamePlayScene()));
        cc.director.resume();
    },
    ongoBack: function () {
        sc.ga('over-home'); //GA检测按钮点击事件代码
        if (GC.SOUNDON) {
            GC.BTNMUSIC = new cc.AudioEngine();
            GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
        }
        cc.director.runScene(new MainMenuScene());
        cc.director.resume();
    },
    onrankList: function () {
        sc.ga('over-rank'); //GA检测按钮点击事件代码
        //获取排行榜数据
        var scope = angular.element('#rankinglist').scope();
        scope.getrankinglist();
        if (GC.PLAYERSCORE > scope.curuserscore) {
            scope.curuserscore = GC.PLAYERSCORE;
        }
        if (GC.SOUNDON) {
            GC.BTNMUSIC = new cc.AudioEngine();
            GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
        }
        $('#rankinglist').addClass('on');
    },
    onweixinShare: function () {
        sc.ga('over-weixin'); //GA检测按钮点击事件代码
        if (GC.SOUNDON) {
            GC.BTNMUSIC = new cc.AudioEngine();
            GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
        }
        var scope = angular.element('#sharelayer').scope();//element相当于一个jq的选择器
        if (scope.iswecharbrowser)
            scope.opensharelayer(true);
        else
            scope.opensharelayer(false);
        //scope.updatewecharsharetimes();//更新次数
    },
    onweiboShare: function () {
        sc.ga('over-weibo'); //GA检测按钮点击事件代码
        if (GC.SOUNDON) {
            GC.BTNMUSIC = new cc.AudioEngine();
            GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
        }
        //weiboshare
        var scope = angular.element('#rankinglist').scope();//element相当于一个jq的选择器scope.needchangescene
        scope.weiboshare();
    },
    onsharetofriends: function () {
        if (GC.SOUNDON) {
            GC.BTNMUSIC = new cc.AudioEngine();
            GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
        }
    },
})
///#source 1 1 /src/GamePlay/layer/GPGamePauseLayer.js
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
///#source 1 1 /src/GamePlay/layer/GPShootstarLayer.js
var GPShootStar = cc.Layer.extend({
	StarSprites:null,
	
	ctor : function(){
		this._super();
		this.StarSprites = [];
	    this.blingstar();
		//加载流星
		this.schedule(this.update,20*cc.random0To1());
	},
	//闪烁星星
	blingstar : function(){
		var star = new cc.Sprite(res.gp_star_red_png);
		var size = cc.winSize;
		this.setPosition(size.width*cc.random0To1(), size.height*cc.random0To1())
		this.addChild(star);
		
		var starAnima =new cc.Animation();  //利用动画保存每一帧的图片
		starAnima.addSpriteFrameWithFile(res.gp_star_red_png);
		starAnima.addSpriteFrameWithFile(res.gp_star_blue_png);
		starAnima.setDelayPerUnit(0.1);  //每一帧播放的间隔
		starAnima.setRestoreOriginalFrame(true);  //是否回到第一帧播放
		star.runAction(cc.RepeatForever.create(cc.Animate.create(starAnima)));
	},
	//添加流星
	addShootStar : function(){
		var star = new cc.Sprite(res.gp_star_red_png);
		star.setPosition(640, 1136)
		this.addChild(star);

		var sweepAction = cc.MoveTo.create(2.5, cc.p(0,200+600*cc.random0To1()));
		star.runAction(sweepAction);

		this.StarSprites.push(star);
	},
	//移除屏幕外流星
	removeShootStar : function(){
		for (var i = 0; i < this.StarSprites.length; i++) {
			if(10 > this.StarSprites[i].x) {	
				this.StarSprites[i].removeFromParent();
				this.StarSprites[i] = undefined;
				this.StarSprites.splice(i,1);
				i=i-1;
			}
		}
	},
	update : function() {
		this.addShootStar();
		this.removeShootStar();
	},
});
///#source 1 1 /src/GamePlay/layer/GPStatusLayer.js
var GPstatuslayer = cc.Layer.extend({
	_labelstatus:undefined,
	_labelpause:undefined,
	_currentblood:GC.PLAYERBLOOD,
	_lifeposy:0,
	ctor : function(){
		this._super();
		GC.bloodsarr=[];
		GC.PLAYERBLOOD=GC.PLAYERTOTALBLOOD;
		this.initStatus();
		this.schedule(this.updateScore);
	},
	initStatus : function(){
		cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist); 
		//分数
		this._labelstatus=new cc.LabelTTF('0',res.font_ubuntu_ttf,40);
		//this._labelstatus.setColor(cc.color(255,255,0));
		this._labelstatus.setPosition(GC.WIDTH-60, GC.HEIGHT-40);
		//this._labelstatus.setScale(2);
		this.addChild(this._labelstatus);
		//生命框
//		var lifesprite=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_bar.png"));
//		lifesprite.attr({
//			x: GC.WIDTH/2,
//			y:GC.HEIGHT-12
//		});
//		this.addChild(lifesprite);
//		//初始化玩家血量显示
//		var bloodcount=0;
//		var lifepos=lifesprite.getPosition();
//		this._lifeposy=lifepos.y-10;
//		if(GC.PLAYERBLOOD>=1){
//			var firstblood1=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart.png"));
//			firstblood1.attr({
//				x: lifepos.x-35,
//				y:lifepos.y-10
//			});
//			this.addChild(firstblood1);
//			firstblood1.tag=1;
//			GC.bloodsarr.push(firstblood1);
//			bloodcount++;
//		}
//		if(GC.PLAYERBLOOD>=2){
//			var firstblood2=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart.png"));
//			firstblood2.attr({
//				x: lifepos.x,
//				y:lifepos.y-10
//			});
//			//cc.log(lifepos.x+'=='+lifepos.y);
//			this.addChild(firstblood2);
//			firstblood2.tag=2;
//			GC.bloodsarr.push(firstblood2);
//			bloodcount++;
//			//
//		}
//		if(GC.PLAYERBLOOD>=3){
//			var firstblood3=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart.png"));
//			firstblood3.attr({
//				x: lifepos.x+35,
//				y:lifepos.y-10
//			});
//			this.addChild(firstblood3);
//			firstblood3.tag=3;
//			GC.bloodsarr.push(firstblood3);
//			bloodcount++;
//		}
//		//初始血量不满  显示空心
//		if(bloodcount==1){
//			var emptyblood1=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart_none.png"));
//			emptyblood1.attr({
//				x: lifepos.x,
//				y:lifepos.y-10
//			});
//			this.addChild(emptyblood1);
//			var emptyblood2=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart_none.png"));
//			emptyblood2.attr({
//				x: lifepos.x+35,
//				y:lifepos.y-10
//			});
//			this.addChild(emptyblood2);
//		}else{
//			var emptyblood=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart_none.png"));
//			emptyblood.attr({
//				x: lifepos.x+35,
//				y:lifepos.y-10
//			});
//			this.addChild(emptyblood);
//		}
		
		this._labelpause=new cc.LabelTTF(" ||    ",res.font_ubuntu_ttf,50);
		var newGameNormal=this._labelpause;
		var newGameSelected=new cc.Sprite();
		var newGameDisabled=new cc.Sprite();
		
		var pauseGame = new cc.MenuItemSprite(
				newGameNormal,
				newGameSelected,
				newGameDisabled,
				this.onPauseGame
		);

		var menu = new cc.Menu(pauseGame);
		menu.alignItemsVerticallyWithPadding(10);
		menu.x = 70;
		menu.y = GC.HEIGHT-50;
		this.addChild(menu, 1, 2);
		
	},
	//暂停游戏
	onPauseGame:function(){
		GC.CLICKPAUSE=true;
		if (GC.SOUNDON){
			GC.BGMUSIC.pauseMusic();
			GC.BTNMUSIC=new cc.AudioEngine();
			GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
		}
	},
	updateScore: function () {
	    if (GC.ISGAMEOVERONTOUCH) {
	        return;
	    }
		cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist); 
		this._labelstatus.setString(GC.PLAYERSCORE);
		//this._labelbloods.setString(GC.PLAYERBLOOD);
		if(GC.bloodsarr.length==0){
			return;
		}
		
//		//血量减少
//		if(this._currentblood>GC.PLAYERBLOOD){
//			//掉血 但是 血量大于0的时候
//			if(GC.PLAYERBLOOD>0){
//				GC.ISGODMODE=true;
//				setTimeout(function(){
//					GC.ISGODMODE=false;
//				},GC.GODTIME*1000);
//			}
//			var bloodsp=GC.bloodsarr[GC.bloodsarr.length-1];
//			this.removeChild(bloodsp, true);//清除
//			var index = GC.bloodsarr.indexOf(bloodsp);  
//			GC.bloodsarr.splice(index,1);
//			//灰血格
//			var emptyblood=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart_none.png"));
//			var xpos=0;
//			if(bloodsp.tag==1){
//				xpos=-35;
//			}else if(bloodsp.tag==2){
//				xpos=0;
//				emptyblood.tag=2;
//			}else if(bloodsp.tag==3){
//				xpos=35;
//				emptyblood.tag=3;
//			}
//			
//			emptyblood.attr({
//				x: GC.WIDTH/2+xpos,
//				y: this._lifeposy
//			});
//			this.addChild(emptyblood);
//			//空血格
//			GC.emptybloodsarr.push(emptyblood);
//			this._currentblood=GC.PLAYERBLOOD;//更新当前血量
//		}
//		//处理吃心加血
//		if(this._currentblood<GC.PLAYERBLOOD){
//			if(GC.emptybloodsarr.length==0){
//				return;
//			}
//			var emptyblood=GC.emptybloodsarr[GC.emptybloodsarr.length-1];
//			var fullbloodx=0;
//			var firstblood=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/life_heart.png"));
//			if(emptyblood.tag==2){
//				fullbloodx=0;
//				firstblood.tag=2;
//			}else if(emptyblood.tag==3){
//				fullbloodx=35;
//				firstblood.tag=3;
//			}
//			//显示完整的心图片
//			firstblood.attr({
//				x:GC.WIDTH+200,//x: GC.WIDTH/2+fullbloodx,
//				y:this._lifeposy
//			});
//		
//			this.addChild(firstblood);
//			
//			//渐入效果
//			var actionfadeout=cc.fadeOut(0.01);
//			//firstblood.runAction(actionfadeout);
//			var actionmovex=cc.moveTo(0.1, GC.WIDTH/2+fullbloodx, this._lifeposy);
//			var actionfadein=cc.fadeIn(1.6);
//			//firstblood.setPosition(GC.WIDTH/2+fullbloodx, this._lifeposy)
//			//var action2=cc.sequence(actionfadeout,actionfadein);
//			var action3=cc.sequence(actionfadeout,actionmovex,actionfadein)
//			firstblood.runAction(action3);
//			
//			GC.bloodsarr.push(firstblood);
//			//----
//			this.removeChild(emptyblood, true);//清除
//			var index = GC.emptybloodsarr.indexOf(emptyblood);  
//			GC.emptybloodsarr.splice(index,1);
//			
//			this._currentblood=GC.PLAYERBLOOD;//更新当前血量
//		}
	},
});
///#source 1 1 /src/GamePlay/layer/GPTouchLayer.js
//游戏 触摸层
var GPTouchLayer = cc.Layer.extend({
	_car1:undefined,
	_car2:undefined,
	_enemy:undefined,
	_isneedpause:true,
	_gamepauselayer:undefined,
//	_timeiner:undefined,
	ctor : function(){
		this._super();
		//加载玩家汽车
		
		GC.ENEMYS = [];
		GC.CURRENTY=0;
		GC.PLAYERSCORE=0;
		this.initenemy();
		this.initplayer();
		this.addStatusLayer();
		this.schedule(this.updateGame);
	},
	//添加状态层
	addStatusLayer:function(){
		this._statusLayer=new GPstatuslayer();
		this.addChild(this._statusLayer,0);
	},
	//加载玩家精灵
	initplayer : function(){
		this._car1 = new SpriteLeft();
		this.addChild(this._car1,0);
			
		this._car2 = new SpriteRight();
		this.addChild(this._car2,0);
	},
	
	//加载路障精灵
	initenemy:function(){
		//记录开始时间
		var myDate = new Date();
		GC.STARTIMES = new Date().getTime();//myDate.toLocaleString(); 116
		GC.STARTIMESTIME = myDate.toTimeString();
		
		this._enemy=new ObstaclesSprite(); 
		this.addChild(this._enemy, 0,'emenys');
	},
	//游戏结束判断
	updateGame:function(){
//		if(!this._timeiner&&!GC.ISGAMEOVER){
//			//游戏时间++ 秒数
//			this._timeiner=setInterval(function(){
//				cc.log('second++');
//				GC.PLAYTIMES++;
//			},1000);
//		}
		//星星没有吃掉  血量减一
		if(GC.ISMISSINGSTAR){
			if(this._isneedpause){
				GC.MISSSTARTIMES++;
				//错过星星 掉血 
				GC.ISMISSINGSTAR=false;
				GC.PLAYERBLOOD--;
				if(GC.PLAYERBLOOD==0){
					//停止计时
//					clearInterval(this._timeiner);
//					this._timeiner=undefined;
					//记录结束时间
					var myDate = new Date();
					GC.ENDTIMES = new Date().getTime();//myDate.toLocaleString(); 116    myDate.toLocaleString();
					GC.ENDTIMESTIME = myDate.toTimeString();
					GC.ISGAMEOVERONTOUCH = true;
					GC.ISGAMEOVER = true;
				}
			}
			return;
		}
		//撞击星球游戏结束
		if(GC.ISGAMEOVER){
			if(this._isneedpause){
				//停止计时
//				clearInterval(this._timeiner);
//				this._timeiner=undefined;
				//记录结束时间
				var myDate = new Date();
				GC.ENDTIMES = new Date().getTime();//myDate.toLocaleString(); 116    myDate.toLocaleString();
				GC.ENDTIMESTIME = myDate.toTimeString();
				//GC.ISGAMEOVER=false;
				this._isneedpause=false;
				GC.ISGAMEOVERONTOUCH=true;
			}
		}
		//用户点击暂停
		if(GC.CLICKPAUSE&&GC.PLAYERBLOOD!=0){
			//停止计时
//			clearInterval(this._timeiner);
//			this._timeiner=undefined;
			//弹出层
			cc.director.pause();
			
			this._gamepauselayer= new GPGamePauseLayer();
			this.addChild(this._gamepauselayer,1);
		}
		//暂停后 点击继续游戏
		if(!GC.CLICKPAUSE&&this._gamepauselayer){
//			if(this._timeiner==undefined){
//				this._timeiner=setInterval(function(){
//					GC.PLAYTIMES++;
//					cc.log('xxxx');
//				},1000);
//			}
			this.removeChild(this._gamepauselayer);
		}
	},

});
















///#source 1 1 /src/GamePlay/scene/GPScene.js
var GamePlayLayer = cc.Layer.extend({
    //属性声明
    _bgLayer: undefined,
    _touchLayer: undefined,
    _statusLayer: undefined,
    _bgimgLayer: undefined,
    ctor: function () {
        this._super();
        if (sc.isboundwechar && GC.PLAYERTOTALBLOOD < 2) {
            GC.PLAYERTOTALBLOOD = GC.PLAYERTOTALBLOOD + 1;
        }
        GC.ISGAMEOVER = false;
        GC.CLICKPAUSE = false;
        GC.ISGODMODE = false;
        GC.ISGAMEOVERONTOUCH = false;
        this.addBackgroundImgLayer();
        this.addBackgroundLayer();
        this.addTouchLayer();
        //this.addStatusLayer();
        this.initBgMusic();
        this.addBloodSlotLayer();//血条
        this.schedule(this.updateGame);
        GC.MMBGMUSIC.stopMusic();
    },
    updateGame: function () {
        GC.MMBGMUSIC.stopMusic();
        //游戏结束

        if (GC.ISGAMEOVERONTOUCH) {
            GC.ISGAMEOVERONTOUCH = false;

            var tt = GC.STARTIMES.toString();
            //var tt1 = GC.STARTIMES.toString();
            //var tt2 = '';
            //if (tt.indexOf('年') > -1) {
            //    tt = tt.replace('年', '/').replace('月', '/').replace('日', ' ');
            //    tt1 = tt.split(' ')[0];
            //    tt2 = GC.STARTIMESTIME.substring(0, 8);
            //}

            var ttt = GC.ENDTIMES.toString();
            //var tt3 = GC.ENDTIMES.toString();
            //var tt4 = '';
            //if (ttt.indexOf('年') > -1) {
            //    ttt = ttt.replace('年', '/').replace('月', '/').replace('日', ' ');
            //    tt3 = ttt.split(' ')[0];
            //    tt4 = GC.ENDTIMESTIME.substring(0, 8);
            //}
            var scope = angular.element('#rankinglist').scope();//element相当于一个jq的选择器scope.needchangescene
            var hash = CryptoJS.SHA1(scope.token + GC.PLAYERSCORE + GC.HITPLANETTIMES + GC.MISSSTARTIMES).toString();
            $.post(sc.baseUrl + 'Admin/Api/CreateGameInfo', {
                token: scope.token,
                score: GC.PLAYERSCORE,
                hitplanettime: GC.HITPLANETTIMES,
                missstartimes: GC.MISSSTARTIMES,
                eatpeachtimes: GC.EATBLOODTIMES,
                bloodupperlimit: GC.PLAYERTOTALBLOOD,
                starttime: tt.substring(0, 10),//tt1 + ' ' + tt2,   //116
                overtime: ttt.substring(0, 10),//tt3 + ' ' + tt4,   //116
                hash: hash
            }, function (data) {
                //alert(data);
            });
            //$.get(sc.baseUrl + "GetMaxScore", {}, function (data) {
            //	GC.MAXSCORE=data;
            //});
            //重置信息
            GC.MISSSTARTIMES = 0;
            GC.EATBLOODTIMES = 0;
            GC.HITPLANETTIMES = 0;
            GC.STARTIMES = 0;
            GC.ENDTIMES = 0;
            GC.PLAYTIMES = 0;


            var gameoverlayer = new GPGameOverLayer();
            var currentlayer = this;
            setTimeout(function () {
                GC.BGMUSIC.stopMusic();//停止音乐
                cc.director.pause();
                currentlayer.addChild(gameoverlayer);
            }, 800);
        }
    },
    addBloodSlotLayer: function () {
        var gpbloodslotlayer = new GPBloodSlotLayer();
        this.addChild(gpbloodslotlayer, 0);
    },
    initBgMusic: function () {
        //播放背景音乐
        if (GC.SOUNDON) {
            //cc.audioEngine.playMusic(res.gp_bgmusic_mp3, true);
            GC.BGMUSIC = new cc.AudioEngine();
            GC.BGMUSIC.playMusic(res.gp_bgmusic_mp3, true);

        }
    },
    //添加移动背景层
    addBackgroundImgLayer: function () {
        this._bgimgLayer = new GPbackgroundImglayer();
        this.addChild(this._bgimgLayer);
    },
    //GPbackgroundlayer
    //添加背景方法
    addBackgroundLayer: function () {
        this._bgLayer = new GPbackgroundlayer();
        this.addChild(this._bgLayer);
    },
    //添加流星
    //	addStarLayer : function(){
    //		this._starLayer = new GPShootStar();
    //		this.addChild(this._starLayer);
    //	},
    //添加触摸层
    addTouchLayer: function () {
        this._touchLayer = new GPTouchLayer();
        this.addChild(this._touchLayer);
    },
    //添加状态层
    addStatusLayer: function () {
        this._statusLayer = new GPstatuslayer();
        this.addChild(this._statusLayer, 0);
    },

});
//游戏主页面场景
var GamePlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GamePlayLayer();
        this.addChild(layer);
    }
});
///#source 1 1 /src/GamePlay/sprite/Obstacles.js
//敌人精灵类
var ObstaclesSprite = cc.Sprite.extend({
	_speed:GC.FIRSTSPEED,
	_timeinter:GC.FIRSTSPUPDATETIME,
	_lleftcount:0,
	_lrightcount:0,
	_rleftcount:0,
	_rrightcount:0,
	_leftplaneY:GC.FIRSTSPEED,
	_displace:0,
	ctor:function(){
		this._super();
		this.addTarget();
		this.scheduleUpdate();
	},
	//更新 添加障碍物
	addTarget:function(){
		cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist);
		var enemys=undefined;//new cc.Sprite();
		var enemyright=undefined;//new cc.Sprite();
		var ranleft=Math.random()*10;
		if(Math.random()*10>GC.BLOODAPPPRO){//心
			enemys=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/heart_red.png"));
			enemys.setTag(3);
		}
		else if(ranleft<GC.OBSAPPPRO){//障碍
			enemys=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/planet_red.png"));
			enemys.setTag(2);
		}else{//星星
			enemys=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/star_red.png"));
			enemys.setTag(1);
		}

		var ranright=Math.random()*10;
		if(Math.random()*10>GC.BLOODAPPPRO){//心
			enemyright=	new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/heart_blue.png"));
			enemyright.setTag(3);
		}
		else if(ranright<GC.OBSAPPPRO){//障碍
			enemyright=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/planet_blue.png"));
			enemyright.setTag(2);
		}else{//星星assets/star_blue.png
			enemyright=new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/star_blue.png"));
			enemyright.setTag(1);
		}
		this.addChild(enemys);
		this.addChild(enemyright);


		var pointleft=Math.random()*10;
		var pointright=Math.random()*10;

		var showUpPositionleft=0;
		var showUpPositionright=0;
		//右侧方块
		if(pointright<=5&&this._rrightcount<GC.MAXCOUNTEACHLINE){
			this._rrightcount++;
			this._rleftcount=0;
			showUpPositionright = GC.WIDTH/2+240; 
		}else{
			if(this._rleftcount<GC.MAXCOUNTEACHLINE){
				this._rleftcount++;
				this._rrightcount=0;
				showUpPositionright = GC.WIDTH/2+80; 
			}else{
				this._rrightcount++;
				this._rleftcount=0;
				showUpPositionright = GC.WIDTH/2+240; 
			}
		}

		//左侧方块
		if(pointleft<=5&&this._lrightcount<GC.MAXCOUNTEACHLINE){
			this._lrightcount++;
			this._lleftcount=0;
			showUpPositionleft = GC.WIDTH/2-240;   
		}else{
			if(this._lleftcount<GC.MAXCOUNTEACHLINE){
				this._lleftcount++;
				this._lrightcount=0;
				showUpPositionleft = GC.WIDTH/2-80;  
			}else{
				this._lrightcount++;
				this._lleftcount=0;
				showUpPositionleft = GC.WIDTH/2-240;
			}
		}
		var currentpos=this.getPosition();
		enemys.setPosition(cc.p(showUpPositionleft,Math.abs(currentpos.y)+GC.HEIGHT+30)); // 出现地点  
		enemyright.setPosition(cc.p(showUpPositionright,Math.abs(currentpos.y)+GC.HEIGHT+180)); 

		GC.ENEMYS.push(enemys);
		GC.ENEMYS.push(enemyright);
	},
	//刷新
	aftereatstar:function(sprite,iseatstar){  // 精灵完成动作后将其移除  
		this.removeChild(sprite, true);//清除
		var index = GC.ENEMYS.indexOf(sprite);  
		GC.ENEMYS.splice(index,1); 
	},
	update:function(dt){
		//cc.log(GC.ENEMYS.length);
		//超过指定距离刷新障碍精灵
		if(this._displace>GC.SPACING){
			//cc.log('update');
			this.addTarget();
			this._displace=0;
		}

		//速度
		if(GC.PLAYERSCORE>GC.FIFTHGEAR){//六档
		    if (this._leftplaneY < GC.SIXTHSPEED) {
		        this._leftplaneY = this._leftplaneY + 0.01;
		    }
		}else if(GC.PLAYERSCORE>GC.FOURTHGEAR){//五档
			if(this._leftplaneY<GC.FIFTHSPEED){
				this._leftplaneY=this._leftplaneY+0.01;
			}
		}else if(GC.PLAYERSCORE>GC.THIRDGEAR){//四档
			if(this._leftplaneY<GC.FOURTHSPEED){
				this._leftplaneY=this._leftplaneY+0.01;
			}
		}else if(GC.PLAYERSCORE>GC.SECONDGEAR){//三档
			if(this._leftplaneY<GC.THIRDSPEED){
				this._leftplaneY=this._leftplaneY+0.01;
			}
		}else if(GC.PLAYERSCORE>GC.FIRSTGEAR){//二档
			if(this._leftplaneY<GC.SECONDSPEED){
				this._leftplaneY=this._leftplaneY+0.01;
			}
		}
		//乘DT系数  防止由于设备性能问题造成的位移量错误
		var dtPlaneY=this._leftplaneY*dt*60;
		//游戏结束  精灵停止移动
		if(GC.PLAYERBLOOD==0){
		   // dtPlaneY = 0;
		    this._leftplaneY = 0;
		}
		GC.CURRENTSPEED=this._leftplaneY;
		var layerpos=this.getPosition();
		GC.CURRENTY=layerpos.y;
		//移动当前层
		this.setPosition(layerpos.x, layerpos.y - dtPlaneY);//this._leftplaneY);
		this._displace = this._displace + dtPlaneY;//记录位移量this._leftplaneY;
		var i;
		for(i in GC.ENEMYS){
			var lin = GC.ENEMYS[i];
			var pos=lin.getPosition();
			
			//如果星星超过飞船则爆炸
			if(pos.y<Math.abs(layerpos.y)+130){
				if(lin.tag==1){//星星  掉血
					//播放爆炸音乐
					if (GC.SOUNDON){
						GC.BOMBMUSIC=new cc.AudioEngine();
						GC.BOMBMUSIC.playMusic(res.gp_bombmusic_mp3, false);
					}
					//当前不是无敌状态则掉血 否则不掉血
					if(!GC.ISGODMODE){
						GC.ISMISSINGSTAR=true;
						GC.STRIKEOBSTACLELEFT=true;
						GC.STRIKEOBSTACLERIGHT=true;
					}
					if(lin.getPositionX()<400){
						GC.ISLEFTORRIGHTSTAR="left";
					}else{
						GC.ISLEFTORRIGHTSTAR="right";
					}
					this.bobGrain(lin);
					this.removeChild(lin, true);//清除
					var index = GC.ENEMYS.indexOf(lin);  
					GC.ENEMYS.splice(index,1);
					continue;
				}
			}
			//如果超出屏幕低端  移除
			if(pos.y<Math.abs(layerpos.y)){
//				if(lin.tag==1){//星星  掉血
//					GC.ISMISSINGSTAR=true;
//				}
				this.removeChild(lin, true);//清除
				var index = GC.ENEMYS.indexOf(lin);  
				GC.ENEMYS.splice(index,1);
			}
		
			
		}
	},
	//撞击星球爆炸效果
	bobGrain:function(sprite){
		var bobgrain =new cc.ParticleSystem(res.gp_bobgrain_plist);
		var pos=sprite.getPosition();
		bobgrain.setPosition(pos.x, pos.y);
		bobgrain.setPositionType(1);
		this.addChild(bobgrain);
	},
});


///#source 1 1 /src/GamePlay/sprite/SpriteLeft.js
var SpriteLeft = cc.Sprite.extend({
    _lisleft: false,
    _lisright: true,
    _car: undefined,
    ctor: function () {
        cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist);
        this._super();
        this.initcar();
        //this.scheduleUpdate();
        this.schedule(this.updateGame);
    },
    initcar: function () {
        cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist);
        var spRred = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/rocket_red_1.png"));
        spRred.attr({
            x: GC.WIDTH / 2 - 80,
            y: 200
        });

        this.addChild(spRred);
        this._car = spRred;

        //		var leftcargrain =new cc.ParticleSystem(res.gp_planegrain_plist);
        //		leftcargrain.setAnchorPoint(0.5, 0.5);
        //		leftcargrain.setPosition(GC.WIDTH/2-80,235);
        //		leftcargrain.setPositionType(1);
        //		leftcargrain.setSpeed(240);
        //		this.addChild(leftcargrain);


        var _lisright = true;
        var _lisleft = false;
        //向左移动
        var actionToLeft = cc.moveTo(0.32, 80, 200);
        var actionRotateLeft = cc.rotateTo(0.21, -50);
        var actionRotateLeftReset = cc.rotateTo(0.11, 0);
        var actionseleft = cc.sequence(actionRotateLeft, actionRotateLeftReset);//依次旋转
        var actionspleft = cc.spawn(actionToLeft, actionseleft);//同步执行
        actionspleft.tag = "left";

        //向右移动
        var actionToRight = cc.moveTo(0.32, 240, 200);
        var actionRotateRight = cc.rotateTo(0.21, 50);
        var actionRotateRightReset = cc.rotateTo(0.1, 0);
        var actionseRight = cc.sequence(actionRotateRight, actionRotateRightReset);//依次旋转
        var actionspRight = cc.spawn(actionToRight, actionseRight);//同步执行
        actionspRight.tag = "right";

        //粒子移动
        //		var grainleft=cc.moveTo(0.5,80,235);
        //		grainleft.tag="grainleft";
        //		var grainright=cc.moveTo(0.5,240,235);
        //		grainright.tag="grainright";
        //		// 键盘事件
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                if (keyCode == 65 && !_lisleft) {//左
                    _lisleft = true;
                    _lisright = false;
                    spRred.stopActionByTag("right");
                    //leftcargrain.stopActionByTag("grainright");
                    spRred.runAction(actionspleft);
                    //leftcargrain.setAngle(305);

                    //leftcargrain.runAction(grainleft);
                    //setTimeout(function(){
                    //leftcargrain.setAngle(270);
                    //	},1000)

                }
                if (keyCode == 68 && !_lisright) {
                    _lisright = true;
                    _lisleft = false;
                    spRred.stopActionByTag("left");
                    //	leftcargrain.stopActionByTag("grainleft");
                    spRred.runAction(actionspRight);
                    //					leftcargrain.setAngle(240);
                    //					leftcargrain.runAction(grainright);
                    //					setTimeout(function(){
                    //						leftcargrain.setAngle(270);
                    //					},1000)
                }
            },
            onKeyReleased: function (keyCode, event) {
            }
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            //onTouchBegan: this.onTouchBegan,
            onTouchBegan: function (touch, event) {
                var touchcoord = touch.getLocation();
                if (touchcoord.x < 320) {//左移动
                    if (_lisright) {
                        _lisleft = true;
                        _lisright = false;
                        spRred.stopActionByTag("right");
                        //leftcargrain.stopActionByTag("grainright");
                        spRred.runAction(actionspleft);
                        //						leftcargrain.setAngle(305);
                        //						leftcargrain.runAction(grainleft);
                        //						setTimeout(function(){
                        //							leftcargrain.setAngle(270);
                        //						},1000)
                    } else {
                        _lisright = true;
                        _lisleft = false;
                        spRred.stopActionByTag("left");
                        //leftcargrain.stopActionByTag("grainleft");
                        spRred.runAction(actionspRight);
                        //						leftcargrain.setAngle(240);
                        //						leftcargrain.runAction(grainright);
                        //						setTimeout(function(){
                        //							leftcargrain.setAngle(270);
                        //						},1000)
                    }
                }
            },
        }, this);
    },
    //碰撞检测
    updateGame: function () {
        var rect = this._car.getBoundingBox();
        rect.y = Math.abs(GC.CURRENTY) + 175;
        //无敌时间结束 停止闪烁
        //		if(!GC.ISGODMODE){
        //			this._car.stopActionByTag("leftcarblink");
        //			var action=cc.fadeIn(0.1);
        //			this._car.runAction(action);
        //		}
        if (GC.STRIKEOBSTACLELEFT) {
            GC.STRIKEOBSTACLELEFT = false;
            setTimeout(function () {
                GC.STRIKEOBSTACLERIGHT = false;
            }, 100);
            GC.ISGODMODE = true;
            //闪烁
            var actionfadeout = cc.fadeOut(0.2);
            var actionfadein = cc.fadeIn(0.2);
            var actionshan = cc.sequence(actionfadeout, actionfadein);
            //cc.log(Math.floor(GC.GODTIME/0.4));
            var action = cc.repeat(actionshan, Math.floor(GC.GODTIME / 0.4));
            //action.tag="leftcarblink";
            this._car.runAction(action);
        }
        var i;
        //遗漏星星 火箭闪烁
        //		if(GC.ISMISSINGSTAR){
        //			var actionfadeout = cc.fadeOut(0.1);
        //			var actionfadein = cc.fadeIn(0.1);
        //			var actionshan=cc.sequence(actionfadeout,actionfadein);
        //			var action=cc.repeat(actionshan, 13);
        //			if(GC.ISLEFTORRIGHTSTAR=='left'){
        //				this._car.runAction(action);
        //				GC.ISLEFTORRIGHTSTAR='';
        //			}
        //		}
        for (i in GC.ENEMYS) {
            var obs = GC.ENEMYS[i];
            var obsRect = obs.getBoundingBox();

            if (obs.tag == 1) {//星星
                obsRect.width = obsRect.width - 60;
                obsRect.x = obsRect.x + 30;
                obsRect.height = obsRect.height - 20;
                obsRect.y = obsRect.y + 10;
            } else if (obs.tag == 2) {//障碍
                obsRect.width = obsRect.width - 80;
                obsRect.x = obsRect.x + 40;
                obsRect.height = obsRect.height - 30;
                obsRect.y = obsRect.y + 15;
            } else {//吃心
                obsRect.width = obsRect.width - 60;
                obsRect.x = obsRect.x + 30;
                obsRect.height = obsRect.height - 20;
                obsRect.y = obsRect.y + 10;
            }
            if (cc.rectIntersectsRect(rect, obsRect)) {
                if (obs.tag == 1) {//吃星星
                    this.parent.getChildByName('emenys').aftereatstar(obs, true);//调用障碍物精灵类中的精灵刷新的方法
                    if (GC.SOUNDON) {
                        GC.STARMUSIC = new cc.AudioEngine();
                        GC.STARMUSIC.playMusic(res.gp_starmusic_mp3, false);
                    }
                    if (GC.PLAYERBLOOD > 0 && !GC.ISGAMEOVER)
                        GC.PLAYERSCORE++;
                } else if (obs.tag == 2 && !GC.ISGODMODE) {
                    GC.STRIKEOBSTACLELEFT = true;
                    GC.STRIKEOBSTACLERIGHT = true;
                    this.parent.getChildByName('emenys').aftereatstar(obs, true);//调用障碍物精灵类中的精灵刷新的方法
                    //爆炸效果
                    this.parent.getChildByName('emenys').bobGrain(obs);

                    GC.PLAYERBLOOD--;//血量减少
                    GC.HITPLANETTIMES++;//撞星球次数+1
                    //播放爆炸音乐
                    if (GC.SOUNDON) {
                        cc.audioEngine.playMusic(res.gp_bombmusic_mp3, false);
                    }
                    if (GC.PLAYERBLOOD == 0) {//血量为0游戏结束
                        //cc.director.pause();
                        GC.ISGAMEOVER = true;
                    }
                    //					//闪烁
                    //					var actionfadeout = cc.fadeOut(0.2);
                    //					var actionfadein = cc.fadeIn(0.2);
                    //					var actionshan=cc.sequence(actionfadeout,actionfadein);
                    //					var action=cc.repeat(actionshan, 3);
                    //					this._car.runAction(action);
                } else if (obs.tag == 3) {//吃血
                    if (GC.SOUNDON) {
                        GC.STARMUSIC = new cc.AudioEngine();
                        GC.STARMUSIC.playMusic(res.gp_starmusic_mp3, false);
                    }
                    if (GC.PLAYERBLOOD < GC.PLAYERTOTALBLOOD) {//不是满血状态  吃血有效
                        var newsprite = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/heart_red.png"));
                        var oldpos = obs.getPosition();
                        newsprite.setPosition(oldpos.x, oldpos.y - Math.abs(GC.CURRENTY));
                        this.addChild(newsprite);
                        var actiontotop = cc.moveTo(0.5, GC.WIDTH / 2, GC.HEIGHT);
                        var actionscale = cc.scaleTo(0.5, 0.2, 0.2);
                        var actionscaleandtop = cc.spawn(actiontotop, actionscale);
                        var action = cc.sequence(actionscaleandtop, cc.callFunc(this.onCallBack1, this));
                        newsprite.runAction(new cc.EaseOut(action, 3));
                        GC.PLAYERBLOOD++
                        GC.EATBLOODTIMES++;//吃血次数+1
                    }
                    //血量满时 直接将心消除
                    this.parent.getChildByName('emenys').aftereatstar(obs, true);

                }
            }
        }
    },
    onCallBack1: function (sprite) {
        //this.parent.getChildByName('emenys').aftereatstar(sprite,true);
        this.removeChild(sprite, true);
    },
});
///#source 1 1 /src/GamePlay/sprite/SpriteRight.js
var SpriteRight = cc.Sprite.extend({
    _risleft: true,
    _enemy: undefined,
    _risright: false,
    _carright: undefined,
    ctor: function () {
        cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist);
        this._super();
        this.initcar();
        this.schedule(this.updateGame);
    },
    initcar: function () {
        cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist);
        var spR = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/rocket_blue_1.png"));
        this._playerSprite = spR;
        spR.attr({
            x: GC.WIDTH / 2 + 80,
            y: 200
        });
        this.addChild(spR);
        this._carright = spR;

        //		var leftcargrain =new cc.ParticleSystem(res.gp_planegrain_plist);
        //		leftcargrain.setAnchorPoint(0.5, 0.5);
        //		leftcargrain.setPosition(GC.WIDTH/2+80,235);
        //		leftcargrain.setPositionType(1);
        //		leftcargrain.setSpeed(240);
        //		this.addChild(leftcargrain);

        var _risleft = true;
        var _risright = false;
        //向左移动
        var actionToLeft = cc.moveTo(0.32, 400, 200);
        var actionRotateLeft = cc.rotateTo(0.21, -50);
        var actionRotateLeftReset = cc.rotateTo(0.11, 0);
        var actionseleft = cc.sequence(actionRotateLeft, actionRotateLeftReset);//依次旋转
        var actionspleft = cc.spawn(actionToLeft, actionseleft);//同步执行
        actionspleft.tag = 'left';

        //向右移动
        var actionToRight = cc.moveTo(0.32, 560, 200);
        actionToRight.tag = this._tag_moveright;
        var actionRotateRight = cc.rotateTo(0.21, 50);
        var actionRotateRightReset = cc.rotateTo(0.11, 0);
        var actionseRight = cc.sequence(actionRotateRight, actionRotateRightReset);//依次旋转
        var actionspRight = cc.spawn(actionToRight, actionseRight);//同步执行
        actionspRight.tag = 'right';

        //粒子移动
        //		var grainleft=cc.moveTo(0.5,400,235);
        //		grainleft.tag="grainleft";
        //		var grainright=cc.moveTo(0.5,560,235);
        //		grainright.tag="grainright";

        // 键盘事件
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                if (keyCode == 37 && !_risleft) {//左
                    _risleft = true;
                    _risright = false;
                    spR.stopActionByTag('right');
                    //leftcargrain.stopActionByTag("grainright");
                    spR.runAction(actionspleft);

                    //					leftcargrain.setAngle(305);
                    //					leftcargrain.runAction(grainleft);
                    //					setTimeout(function(){
                    //						leftcargrain.setAngle(270);
                    //					},1000)
                }
                if (keyCode == 39 && !_risright) {
                    _risright = true;
                    _risleft = false;
                    spR.stopActionByTag('left');
                    //leftcargrain.stopActionByTag("grainleft");
                    spR.runAction(actionspRight);

                    //					leftcargrain.setAngle(240);
                    //					leftcargrain.runAction(grainright);
                    //					setTimeout(function(){
                    //						leftcargrain.setAngle(270);
                    //					},1000)
                }
            },
            onKeyReleased: function (keyCode, event) {
            }
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            //onTouchBegan: this.onTouchBegan,
            onTouchBegan: function (touch, event) {
                var touchcoord = touch.getLocation();
                if (touchcoord.x > 320) {//左移动
                    if (_risright) {
                        _risleft = true;
                        _risright = false;
                        spR.stopActionByTag('right');
                        //leftcargrain.stopActionByTag("grainright");
                        spR.runAction(actionspleft);

                        //						leftcargrain.setAngle(305);
                        //						leftcargrain.runAction(grainleft);
                        //						setTimeout(function(){
                        //							leftcargrain.setAngle(270);
                        //						},1000)
                    } else {
                        _risright = true;
                        _risleft = false;
                        spR.stopActionByTag('left');
                        //leftcargrain.stopActionByTag("grainleft");
                        spR.runAction(actionspRight);

                        //						leftcargrain.setAngle(240);
                        //						leftcargrain.runAction(grainright);
                        //						setTimeout(function(){
                        //							leftcargrain.setAngle(270);
                        //						},1000)
                    }
                }
            },
        }, this);


        //this.scheduleUpdate();
    },
    //测试
    //	update: function(dt) {
    //		if (this._lastPos !== this._playerSprite.getPositionX()) {
    //			this._frames++;
    //			cc.log(this._playerSprite.getPositionX(), this._frames);
    //			this._lastPos = this._playerSprite.getPositionX();
    //		}
    //		else {
    //			this._frames = 0;
    //		}
    //	},
    //碰撞检测
    updateGame: function () {
        var rect = this._carright.getBoundingBox();
        //cc.log(rect.x+'--'+rect.width);
        rect.width = rect.width - 10;
        rect.y = Math.abs(GC.CURRENTY) + 175;
        //无敌时间结束 停止闪烁
        //		if(!GC.ISGODMODE){
        //			this._carright.stopActionByTag("rightcarblink");
        //			var action=cc.fadeIn(0.1);
        //			this._carright.runAction(action);
        //		}
        if (GC.STRIKEOBSTACLERIGHT == true) {
            GC.STRIKEOBSTACLERIGHT = false;
            setTimeout(function () {
                GC.STRIKEOBSTACLELEFT = false;
            }, 100)
            GC.ISGODMODE = true;
            //闪烁
            var actionfadeout = cc.fadeOut(0.2);
            var actionfadein = cc.fadeIn(0.2);
            var actionshan = cc.sequence(actionfadeout, actionfadein);

            var action = cc.repeat(actionshan, Math.floor(GC.GODTIME / 0.4));
            //action.tag="rightcarblink";
            this._carright.runAction(action);
        }
        //遗漏星星 火箭闪烁
        //		if(GC.ISMISSINGSTAR){
        //			var actionfadeout = cc.fadeOut(0.1);
        //			var actionfadein = cc.fadeIn(0.1);
        //			var actionshan=cc.sequence(actionfadeout,actionfadein);
        //			var action=cc.repeat(actionshan, 13);
        //			if(GC.ISLEFTORRIGHTSTAR=='right'){
        //				this._carright.runAction(action);
        //				GC.ISLEFTORRIGHTSTAR='';
        //			}
        //		}
        var i;
        for (i in GC.ENEMYS) {
            var obs = GC.ENEMYS[i];
            var obsRect = obs.getBoundingBox();
            if (obs.tag == 1) {//星星
                obsRect.width = obsRect.width - 60;
                obsRect.x = obsRect.x + 30;
                obsRect.height = obsRect.height - 20;
                obsRect.y = obsRect.y + 10;
            } else if (obs.tag == 2) {//障碍
                obsRect.width = obsRect.width - 80;
                obsRect.x = obsRect.x + 40;
                obsRect.height = obsRect.height - 30;
                obsRect.y = obsRect.y + 15;
            } else {//吃心
                obsRect.width = obsRect.width - 60;
                obsRect.x = obsRect.x + 30;
                obsRect.height = obsRect.height - 20;
                obsRect.y = obsRect.y + 10;
            }


            if (cc.rectIntersectsRect(rect, obsRect)) {
                if (obs.tag == 1) {//吃星星
                    this.parent.getChildByName('emenys').aftereatstar(obs, true);//调用障碍物精灵类中的精灵刷新的方法
                    if (GC.SOUNDON) {
                        GC.STARMUSIC = new cc.AudioEngine();
                        GC.STARMUSIC.playMusic(res.gp_starmusic_mp3, false);
                    }
                    if (GC.PLAYERBLOOD > 0 && !GC.ISGAMEOVER)
                        GC.PLAYERSCORE++;
                } else if (obs.tag == 2 && !GC.ISGODMODE) {
                    GC.STRIKEOBSTACLERIGHT = true;
                    GC.STRIKEOBSTACLELEFT = true;
                    this.parent.getChildByName('emenys').aftereatstar(obs, true);//调用障碍物精灵类中的精灵刷新的方法
                    //爆炸效果
                    this.parent.getChildByName('emenys').bobGrain(obs);
                    //播放爆炸音乐
                    if (GC.SOUNDON) {
                        cc.audioEngine.playMusic(res.gp_bombmusic_mp3, false);
                    }
                    GC.PLAYERBLOOD--;//血量减少
                    GC.HITPLANETTIMES++;//撞星球次数+1
                    if (GC.PLAYERBLOOD == 0) {//血量为0游戏结束
                        //cc.director.pause();
                        GC.ISGAMEOVER = true;
                    }
                    //					//闪烁
                    //					var actionfadeout = cc.fadeOut(0.2);
                    //					var actionfadein = cc.fadeIn(0.2);
                    //					var actionshan=cc.sequence(actionfadeout,actionfadein);
                    //					var action=cc.repeat(actionshan, 3);
                    //					this._carright.runAction(action);
                } else if (obs.tag == 3) {
                    if (GC.SOUNDON) {
                        GC.STARMUSIC = new cc.AudioEngine();
                        GC.STARMUSIC.playMusic(res.gp_starmusic_mp3, false);
                    }
                    if (GC.PLAYERBLOOD < GC.PLAYERTOTALBLOOD) {//不是满血状态 有效 触发动画
                        var newsprite = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/heart_blue.png"));
                        var oldpos = obs.getPosition();
                        newsprite.setPosition(oldpos.x, oldpos.y - Math.abs(GC.CURRENTY));
                        this.addChild(newsprite);
                        var actiontotop = cc.moveTo(0.5, GC.WIDTH / 2, GC.HEIGHT);
                        var actionscale = cc.scaleTo(0.5, 0.2, 0.2);
                        var actionscaleandtop = cc.spawn(actiontotop, actionscale);
                        var action = cc.sequence(actionscaleandtop, cc.callFunc(this.onCallBack1, this));
                        newsprite.runAction(new cc.EaseOut(action, 3));
                        GC.PLAYERBLOOD++
                        GC.EATBLOODTIMES++;//吃血次数+1
                    }
                    //血量满时 直接将心消除
                    this.parent.getChildByName('emenys').aftereatstar(obs, true);

                }
            }
        }
    },
    onCallBack1: function (sprite) {
        //cc.log('321313');
        //this.parent.getChildByName('emenys').aftereatstar(sprite,true);
        this.removeChild(sprite, true);
    },
});
///#source 1 1 /src/MainMenu/layer/MMBackgroundLayer.js
var MMBackgroundLayer = cc.Layer.extend({
    _BgImg: undefined,
    _title: undefined,
    _secologo: undefined,
    _totalcount: 0,
    ctor: function () {
        this._super()
        //加载背景
        this.initbackgroundimg();
        this.initmeteor();
        this.initBackground();
        //this.initSpriteAnimation();
    },
    initbackgroundimg: function () {
        this._BgImg = new cc.Sprite(res.mm_bgimg_jpg);
        this._BgImg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: GC.WIDTH / 2 + 65,
            y: GC.HEIGHT / 2 + 65
        });
        this.addChild(this._BgImg);
        var actionmovedown = cc.moveTo(30, GC.WIDTH / 2 + 65, GC.HEIGHT / 2 + 65);
        var actionrotateleft = cc.rotateTo(30, 0);
        var actionspawnleft = cc.spawn(actionmovedown, actionrotateleft);

        var actionmoveup = cc.moveTo(30, GC.WIDTH / 2 - 65, GC.HEIGHT / 2 - 65);
        var actionrotateright = cc.rotateTo(30, -3);
        var actionspawnright = cc.spawn(actionmoveup, actionrotateright);

        var actionmove = cc.Sequence.create(actionspawnright, actionspawnleft);

        var moveaction = cc.repeatForever(actionmove);
        this._BgImg.runAction(moveaction);
    },
    initmeteor: function () {
        //流星
        var meteorgrain = new cc.ParticleSystem(res.mm_meteor_plist);
        meteorgrain.setPosition(GC.WIDTH / 2 + 400, GC.HEIGHT+100);
        meteorgrain.setPositionType(1);
        meteorgrain.setScale(3);
        this.addChild(meteorgrain);
    },
    initBackground: function () {
        cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist);


        //标题logo
        //this._title = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/title.png"));//mm_gamelogo_png
        this._title = new cc.Sprite(res.mm_gamelogo_png);
        this._title.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: GC.WIDTH / 2,
            y: GC.HEIGHT / 2 + 370
        });
        this.addChild(this._title);
        //公司logo
        this._secologo = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/logo_secoinfo.png"));
        this._secologo.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 90,
            y: 40
        });
        this.addChild(this._secologo);

        //if (this._totalcount == 0) {
        var scope = angular.element('#sharelayer').scope();//element相当于一个jq的选择器
        //scope.getgamecount();
        this._totalcount = new cc.LabelTTF(scope.gametotalcount, 'Helvetica', 50);//res.font_ubuntu_ttf
        this._totalcount.setPosition(GC.WIDTH - 40, 40);
        this._totalcount.setScale(0.7);
        this.addChild(this._totalcount);

        //} else if (this._totalcount > 0) {
        //    var scope = angular.element('#sharelayer').scope();//element相当于一个jq的选择器
        //    scope.
        //}
    },

});
///#source 1 1 /src/MainMenu/layer/MMGameIntro.js
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
///#source 1 1 /src/MainMenu/layer/MMTouchLayer.js
var MMTouchLayer = cc.Layer.extend({
    _rocketsred: undefined,
    _rocketsblue: undefined,
    ctor: function () {
        this._super();
        //加载按钮
        this.playBGMusic();
        this.initRockets();
        this.initMenu();

    },
    initRockets: function () {
        cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist);
        //红蓝火箭logo
        //this._rocketsred =new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/home_rocket_red.png")); mm_homebluerock_png
        this._rocketsred = new cc.Sprite(res.mm_homebluerock_png);
        this._rocketsred.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            //x: -160,
            //y: -70
            x: GC.WIDTH / 2 - 70,
            y: GC.HEIGHT / 2 + 70
        });
        this.addChild(this._rocketsred);
        GC.HOMELOGOROCKETRED = this._rocketsred;
        //this._rocketsblue = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/home_rocket_blue.png"));
        this._rocketsblue = new cc.Sprite(res.mm_homeredrock_png);
        this._rocketsblue.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            //x: -70,
            //y: -70
            x: GC.WIDTH / 2 + 20,
            y: GC.HEIGHT / 2 + 70
        });
        this.addChild(this._rocketsblue);
        GC.HOMELOGOROCKETBLUE = this._rocketsblue;

        //var startactionred = cc.moveTo(1, GC.WIDTH / 2 - 70, GC.HEIGHT / 2 + 70);
        //var startactionblue = cc.moveTo(1, GC.WIDTH / 2 + 20, GC.HEIGHT / 2 + 70);
        //this._rocketsred.runAction(startactionred);
        //this._rocketsblue.runAction(startactionblue);
        var curthis = this;
        var thisred = this._rocketsred;
        var thisblue = this._rocketsblue;

        //  setTimeout(function () {
        //粒子
        var leftcargrain = new cc.ParticleSystem(res.mm_planegrain_plist);
        leftcargrain.setPosition(GC.WIDTH / 2 - 45, GC.HEIGHT / 2 + 105);
        leftcargrain.setPositionType(1);
        leftcargrain.setSpeed(240);
        leftcargrain.setAngle(235);
        curthis.addChild(leftcargrain);

        var rightcargrain = new cc.ParticleSystem(res.mm_planegrain_plist);
        rightcargrain.setPosition(GC.WIDTH / 2 + 45, GC.HEIGHT / 2 + 105);
        rightcargrain.setPositionType(1);
        rightcargrain.setSpeed(240);
        rightcargrain.setAngle(235);
        curthis.addChild(rightcargrain);

        //小火箭动画
        //var redpos = thisred.getPosition();
        var actionredright = cc.moveTo(0.7, GC.WIDTH / 2 - 70 + 4, GC.HEIGHT / 2 + 70);
        var actionredleft = cc.moveTo(1.1, GC.WIDTH / 2 - 70, GC.HEIGHT / 2 + 70);
        var action1 = cc.sequence(actionredright, actionredleft);
        var actionrepeatred = cc.repeatForever(action1);
        thisred.runAction(actionrepeatred);
        //blue
        //var bluepos = thisblue.getPosition();
        var actionblueup = cc.moveTo(0.8, GC.WIDTH / 2 + 20 - 3, GC.HEIGHT / 2 + 73);
        var actionbluedown = cc.moveTo(1, GC.WIDTH / 2 + 20, GC.HEIGHT / 2 + 70);
        var action2 = cc.sequence(actionblueup, actionbluedown);
        var actionblueeatred = cc.repeatForever(action2);
        thisblue.runAction(actionblueeatred);
        // }, 1200);


    },
    initMenu: function () {
        //		cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist); //使用精灵帧缓存，方便后面多次使用
        //	//	开始按钮
        //		var newGameNormal =new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/btn_play_b0.png"));
        //		var newGameSelected =new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/btn_play_b1.png"));
        //		var newGameDisabled = new cc.Sprite.createWithSpriteFrame(cc.spriteFrameCache.getSpriteFrame("assets/btn_play.png"));
        //		
        //		//newGameSelected.setScale(2);
        //		
        //		var newGame = new cc.MenuItemSprite(
        //				newGameNormal,
        //				newGameSelected,
        //				newGameDisabled,
        //				this.onNewGame
        //		);
        //		
        //		
        //		var menu = new cc.Menu(newGame);
        //		menu.alignItemsVerticallyWithPadding(10);
        //		menu.x = 320;
        //		menu.y = GC.HEIGHT/2-60;
        //		this.addChild(menu, 1, 2);
        //		//	开始按钮
        //cc.spriteFrameCache.addSpriteFrames(res.mm_img_plist);
        //var frame = cc.spriteFrameCache.getSpriteFrame("assets/btn_play_b0.png");

        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setPressedActionEnabled(true);
        button.loadTextures("assets/btn_play_b0.png", "assets/btn_play_b1.png", "", ccui.Widget.PLIST_TEXTURE);//
        button.x = 320;
        button.y = GC.HEIGHT / 2 - 60;
        button.addClickEventListener(this.onNewGame);
        this.addChild(button);

        //下方3个按钮 排行榜 微信 微博分享
        //排行榜 
        var btnrank = new ccui.Button();
        btnrank.setTouchEnabled(true);
        btnrank.setPressedActionEnabled(true);
        btnrank.loadTextures("assets/btn_ranking_s0.png", "assets/btn_ranking_s1.png", "", ccui.Widget.PLIST_TEXTURE);//
        btnrank.x = GC.WIDTH / 2 - 150;
        btnrank.y = GC.HEIGHT / 2 - 300;
        btnrank.addClickEventListener(this.onrankList);
        this.addChild(btnrank);
        //微信分享
        var btnweixin = new ccui.Button();
        btnweixin.setTouchEnabled(true);
        btnweixin.setPressedActionEnabled(true);
        btnweixin.loadTextures("assets/btn_wechat_s0.png", "assets/btn_wechat_s1.png", "", ccui.Widget.PLIST_TEXTURE);//
        btnweixin.x = GC.WIDTH / 2;
        btnweixin.y = GC.HEIGHT / 2 - 300;
        btnweixin.addClickEventListener(this.onweixinShare);
        this.addChild(btnweixin);
        //微博分享
        var btnweibo = new ccui.Button();
        btnweibo.setTouchEnabled(true);
        btnweibo.setPressedActionEnabled(true);
        btnweibo.loadTextures("assets/btn_weibo_s0.png", "assets/btn_weibo_s1.png", "", ccui.Widget.PLIST_TEXTURE);//
        btnweibo.x = GC.WIDTH / 2 + 150;
        btnweibo.y = GC.HEIGHT / 2 - 300;
        btnweibo.addClickEventListener(this.onweiboShare);
        this.addChild(btnweibo);
        ////分享好友按钮 好友也想玩
        //var btnwithfriends = new ccui.Button();
        //btnwithfriends.setTouchEnabled(true);
        //btnwithfriends.setPressedActionEnabled(true);
        //btnwithfriends.loadTextures("assets/btn_share.png", "assets/btn_share.png", "",  ccui.Widget.PLIST_TEXTURE);//
        //btnwithfriends.x = GC.WIDTH-110;
        //btnwithfriends.y = GC.HEIGHT-30;
        //btnwithfriends.addClickEventListener(this.onShareGame);
        //this.addChild(btnwithfriends);


        //游戏介绍
        var btnintro = new ccui.Button();
        btnintro.setTouchEnabled(true);
        btnintro.setPressedActionEnabled(true);
        btnintro.loadTextures("assets/btn_gameinfo.png", "assets/btn_gameinfo.png", "", ccui.Widget.PLIST_TEXTURE);//assets/btn_info_b0.png
        btnintro.x = GC.WIDTH / 2;
        btnintro.y = GC.HEIGHT / 2 - 450;
        btnintro.addClickEventListener(this.onGameIntro);
        this.addChild(btnintro);
    },
    //播放音乐
    playBGMusic: function () {
        // 播放背景音乐，true代表循环无限次播放，false表示只播放一次。GC.SOUND_ON在config下的GameConfig.js中配置
        if (GC.SOUNDON) {
            //cc.audioEngine.playMusic(res.mm_homebgmusic_mp3, true);
            GC.MMBGMUSIC = new cc.AudioEngine();
            GC.MMBGMUSIC.playMusic(res.mm_homebgmusic_mp3, true);
        }
    },
    onNewGame: function () {
        if (GC.ISBTNLOCKED)
            return;
        sc.ga('home-play'); //GA检测按钮点击事件代码

        var scope = angular.element('#rankinglist').scope();//element相当于一个jq的选择器
        //  scope.方法();

        GC.MMBGMUSIC.stopMusic();
        //点击play按钮后 小火箭动画
        var actionred = cc.moveTo(0.8, GC.WIDTH + 40, GC.HEIGHT + 150);
        var actionblue = cc.moveTo(0.8, GC.WIDTH + 130, GC.HEIGHT + 150);
        GC.HOMELOGOROCKETRED.runAction(actionred);
        GC.HOMELOGOROCKETBLUE.runAction(actionblue);
        //判断是否需要观看游戏说明
        //观看游戏说明
        if (scope.isfirstlogin) {
            var gameintrolayer = new GPGameIntro();
            gameintrolayer.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: 0,//GC.WIDTH / 2,
                y: 0//GC.HEIGHT / 2
            });
            GC.ISBTNLOCKED = true;
            this.parent.addChild(gameintrolayer, 1, 'gameintro');
            scope.needchangescene = true;
            //修改状态
            scope.updatefirstlogin();
        } else {  //直接开始游戏
            cc.director.runScene(new cc.TransitionFade(1.2, new GamePlayScene()));
        }

        //cc.director.runScene(new  GamePlayScene());
    },
    onrankList: function () {
        if (GC.ISBTNLOCKED)
            return;
        sc.ga('home-rank'); //GA检测按钮点击事件代码
        //获取排行榜数据
        var scope = angular.element('#rankinglist').scope();
        scope.getrankinglist();
        if (GC.PLAYERSCORE > scope.curuserscore) {
            scope.curuserscore = GC.PLAYERSCORE;
        }
        if (GC.SOUNDON) {
            GC.BTNMUSIC = new cc.AudioEngine();
            GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
        }
        $('#rankinglist').addClass('on');
    },
    onweixinShare: function () {
        cc.log(GC.ISBTNLOCKED);
        if (GC.ISBTNLOCKED)
            return;
        sc.ga('home-weixin'); //GA检测按钮点击事件代码
        if (GC.SOUNDON) {
            GC.BTNMUSIC = new cc.AudioEngine();
            GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
        }
        var scope = angular.element('#sharelayer').scope();//element相当于一个jq的选择器
        if (scope.iswecharbrowser)
            scope.opensharelayer(true);
        else
            scope.opensharelayer(false);
        //scope.wecharshare();
        //scope.updatewecharsharetimes();//更新次数
    },
    onweiboShare: function () {
        if (GC.ISBTNLOCKED)
            return;
        sc.ga('home-weibo'); //GA检测按钮点击事件代码
        if (GC.SOUNDON) {
            GC.BTNMUSIC = new cc.AudioEngine();
            GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
        }
        //weiboshare
        var scope = angular.element('#rankinglist').scope();//element相当于一个jq的选择器scope.needchangescene
        scope.weiboshare();
    },
    onShareGame: function () {
        if (GC.ISBTNLOCKED)
            return;
        if (GC.SOUNDON) {
            GC.BTNMUSIC = new cc.AudioEngine();
            GC.BTNMUSIC.playMusic(res.bar_btnmusic_mp3, false);
        }
    },
    onGameIntro: function () {
        if (GC.ISBTNLOCKED)
            return;
        sc.ga('home-guide'); //GA检测按钮点击事件代码
        var scope = angular.element('#rankinglist').scope();//element相当于一个jq的选择器scope.needchangescene
        scope.needchangescene = false;
        var gameintrolayer = new GPGameIntro();
        gameintrolayer.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0,//GC.WIDTH / 2,
            y: 0//GC.HEIGHT / 2
        });
        GC.ISBTNLOCKED = true;
        this.parent.addChild(gameintrolayer, 1, 'gameintro');
    },
});
///#source 1 1 /src/MainMenu/scene/MMScene.js

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
		this.addTouchLayer();
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
///#source 1 1 /src/loading.js
var logoData = "data:image/png;base64,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";
var MyLoaderScene = cc.Scene.extend({
    _interval: null,
    _label: null,
    _className: "MyLoaderScene",
    numberSprites: [],

    init: function () {
        var self = this;

   
        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(32, 32, 32, 255));
        bgLayer.setPosition(cc.visibleRect.bottomLeft);
        self.addChild(bgLayer, 0);

        //you codes
        //var bgimg = new cc.Sprite("res/bg1.jpg");
        //bgimg.attr({
        //    x: GC.WIDTH / 2,
        //    y: GC.HEIGHT / 2
        //});
        //this._bgimg1 = bgimg;
        //this.addChild(bgimg);

        var bgimg = new cc.Sprite("res/loading_bg.jpg");
        bgimg.attr({
            x: GC.WIDTH / 2,
            y: GC.HEIGHT/2
        });
        this.addChild(bgimg);

        var logoimg = new cc.Sprite("res/logo.png");
        logoimg.attr({
            x: GC.WIDTH / 2,
            y: 70
        });
        logoimg.setScale(1.4);
        this.addChild(logoimg);

        //���һ���ı�����ʾ
        var l = new cc.LabelTTF("Loading 0%", "Arial", 25);
        //����
        l.x = GC.WIDTH / 2;
        l.y = 30;
        this.addChild(l, 11, 12);

    },
    onEnter: function () {
        cc.Node.prototype.onEnter.call(this);
        var loader = (this.loadType == 'resource') ? this._startLoading : this._startAjax;
        this.schedule(loader, 0.3);
    },
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        //you codes
    },

    initWithResources: function (resources, cb) {
        if (cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
        this.loadType = 'resource';
    },
    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res, self._loadProgress.bind(self), function () {
            setTimeout(function () {
                if (self.cb) self.cb();
            }, 300);
        });
    },
    //initAjax: function (ajaxSetting) {
    //    this.ajaxSetting = ajaxSetting;
    //    this.loadType = 'ajax';
    //},
    //_startAjax: function () {
    //    var self = this,
    //        preNum = 0;
    //    self.unschedule(self._startAjax);
    //    if (!this.ajaxSetting.progress) {
    //        this.ajaxSetting.progress = function (n) {
    //            n = n.toFixed(2);
    //            if (preNum === n) return;
    //            preNum = n;
    //            self._loadProgress(null, 1, n);
    //        };
    //    }
    //    Utils.ajax(this.ajaxSetting);
    //},
    _loadProgress: function (result, count, loadedCount) {
        var percent = ((loadedCount + 1) / count * 100) | 0;
        percent = Math.min(percent, 100);
        //console.log(loadedCount + '/' + count);
        var subTile = this.getChildByTag(12);
        subTile.setString("Loading " + percent + "%");
    }
});
MyLoaderScene.preload = function (resources, cb) {
    var _cc = cc;
    if (!_cc.loaderScene) {
        _cc.loaderScene = new MyLoaderScene();
        _cc.loaderScene.init();
    }
    _cc.loaderScene.initWithResources(resources, cb);
    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene;
};
