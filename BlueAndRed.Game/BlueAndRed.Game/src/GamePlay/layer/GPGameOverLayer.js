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