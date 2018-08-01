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