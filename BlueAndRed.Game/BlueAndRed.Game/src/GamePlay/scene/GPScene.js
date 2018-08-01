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