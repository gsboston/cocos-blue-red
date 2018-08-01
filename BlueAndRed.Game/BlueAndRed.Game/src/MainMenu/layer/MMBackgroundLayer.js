var MMBackgroundLayer = cc.Layer.extend({
    _BgImg: undefined,
    _title: undefined,
    _secologo: undefined,
    _totalcount: 0,
    //画线
    _drawNode1: null,
    _drawNode2: null,
    ctor: function () {
        this._super();
        //加载背景

        this.initbackgroundimg();
        this.addTestSprite();
        //this.initmeteor();
        //this.initBackground();
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
        //var actionmovedown = cc.moveTo(30, GC.WIDTH / 2 + 65, GC.HEIGHT / 2 + 65);
        //var actionrotateleft = cc.rotateTo(30, 0);
        //var actionspawnleft = cc.spawn(actionmovedown, actionrotateleft);

        //var actionmoveup = cc.moveTo(30, GC.WIDTH / 2 - 65, GC.HEIGHT / 2 - 65);
        //var actionrotateright = cc.rotateTo(30, -3);
        //var actionspawnright = cc.spawn(actionmoveup, actionrotateright);

        //var actionmove = cc.Sequence.create(actionspawnright, actionspawnleft);

        //var moveaction = cc.repeatForever(actionmove);
        //this._BgImg.runAction(moveaction);
    },
    addTestSprite: function () {
        var ttpp = new cc.Sprite(res.mm_pptt_png);
        ttpp.attr({
            x: GC.WIDTH / 2,
            y: GC.HEIGHT / 2
        });
        ttpp.setScale(0.1);
        this.addChild(ttpp);
        //1.skew
        //var actionBy2 = cc.skewBy(3, 180, 270);
        //var action = cc.sequence(actionBy2, actionBy2.reverse());
        //ttpp.runAction(action);

        //2.
        //var actionTo = cc.skewTo(2, 0, 2);
        //var rotateTo = cc.rotateTo(2, 61.0);
        //var actionScaleTo = cc.scaleTo(2, -0.44, 0.47);
        //var actionScaleToBack = cc.scaleTo(2, 1.0, 1.0);
        //var rotateToBack = cc.rotateTo(2, 0);
        //var actionToBack = cc.skewTo(2, 0, 0);
        //var delay = cc.delayTime(0.25);

        //ttpp.runAction(cc.sequence(actionTo, delay, actionToBack));
        //ttpp.runAction(cc.sequence(rotateTo, delay.clone(), rotateToBack));
        //ttpp.runAction(cc.sequence(actionScaleTo, delay.clone(), actionScaleToBack));


        //3. jump
        //var actionTo = cc.jumpTo(2, cc.p(300, 300), 50, 4);//下楼梯  时间  终点坐标  每次弹跳位移量  弹跳次数
        //var actionBy = cc.jumpBy(2, cc.p(300, 0), 50, 4);
        //var actionUp = cc.jumpBy(2, cc.p(0, 0), 80, 4);
        //var actionByBack = actionBy.reverse();

        //var delay = cc.delayTime(0.25);

        //ttpp.runAction(actionTo);
        //ttpp.runAction(cc.sequence(actionBy, delay, actionByBack));//横向跳跃

        //var action = cc.sequence(actionUp, delay.clone()).repeatForever();  //重复跳跃
        //ttpp.runAction(action);


        //4.bezierBy / bezierTo
        //var delay = cc.delayTime(0.25);
        ////浮力效果
        //var controlPoints = [cc.p(0, 0), cc.p(300, -774), cc.p(300, 100)];
        //var bezierForward = cc.bezierBy(2, controlPoints);
        //var rep = cc.sequence(bezierForward, delay, bezierForward.reverse(), delay.clone()).repeatForever();
        ////ttpp.runAction(rep);

        //// 
        //var controlPoints2 = [cc.p(100, GC.HEIGHT / 2), cc.p(200, GC.HEIGHT / 2), cc.p(555, 160)];
        //var bezierTo1 = cc.bezierTo(2, controlPoints2);
        ////ttpp.runAction(bezierTo1);

        ////
        //var controlPoints3 = controlPoints2.slice();
        //var bezierTo2 = cc.bezierTo(2, controlPoints3);
        //ttpp.runAction(bezierTo2);


        //5.
        // var controlPoints1 = [cc.p(428, 279), cc.p(400, 400), cc.p(400, 400)];
        // var controlPoints2 = [cc.p(100, 100), cc.p(428, 279), cc.p(428, 279)];

        // var bz1 = cc.bezierTo(1.5, controlPoints1);
        // var bz2 = cc.bezierTo(1.5, controlPoints2);
        // var trace = cc.callFunc(this.onTrace, this);
        // var delay = cc.delayTime(0.25);

        // var rep = cc.sequence(bz1, bz2,trace, delay).repeatForever();
        // ttpp.runAction(rep);


        //6.跟随线 运动  cc.catmullRomBy
        //ttpp.x = 50;
        //ttpp.y = 50;
        //var array = [
        //        cc.p(0, 0),
        //        cc.p(80, 80),
        //        cc.p(GC.WIDTH - 80, 80),
        //        cc.p(GC.WIDTH - 80, GC.HEIGHT - 80),
        //        cc.p(80, GC.HEIGHT - 80),
        //        cc.p(80, 80),
        //        cc.p(GC.WIDTH / 2, GC.HEIGHT / 2)
        //];
        //var delay = cc.delayTime(0.25);
        //var action1 = cc.catmullRomBy(3, array);
        //var reverse1 = action1.reverse();
        //var seq1 = cc.sequence(action1, delay, reverse1);

        //ttpp.runAction(seq1);
        ////画线
        //this._drawNode1 = new cc.DrawNode();
        //this._drawNode1.x = 50;
        //this._drawNode1.y = 50;
        //this._drawNode1.setDrawColor(cc.color(255, 255, 255, 255));
        //this.addChild(this._drawNode1);
        //this._drawNode1.drawCatmullRom(array, 50, 1);

        //7.  cc.blink  闪烁 ：时间，次数
        //var action1 = cc.blink(2, 100);
        //ttpp.runAction(action1);

        //8. fadein fadeout   从无到有
        //var delay = cc.delayTime(0.25);
        //ttpp.opacity = 0;  //设置后 精灵 默认不现实  然后fadein
        //var action1 = cc.fadeIn(3.0);
        //var action1Back = action1.reverse();
        //ttpp.runAction(cc.sequence(action1, delay, action1Back));

        //9.tintTo  变色
        //var action1 = cc.tintTo(2, 0, 255, 255);
        //var action2 = cc.tintBy(2, -127, -255, -127);
        //var action2Back = action2.reverse();

        //ttpp.runAction(action1);
        //ttpp.runAction(cc.sequence(action2, cc.delayTime(0.25), action2Back));

        //10.follow  跟随移动
        //ttpp.x = -(GC.WIDTH / 2);
        //ttpp.y = GC.HEIGHT / 2;
        //var move = cc.moveBy(2, cc.p(GC.WIDTH * 2, 0));

        ////var move_back = move.reverse();
        ////var seq = cc.sequence(move, move_back);
        ////var rep = seq.repeatForever();

        //ttpp.runAction(move);
        ////-x  剩余x距离  背景不随之移动
        //this.runAction(cc.follow(ttpp, cc.rect(0, 0, GC.WIDTH * 2 - 200, GC.HEIGHT)));


        //11.orbitCamera  选择翻页效果
        var orbit1 = cc.orbitCamera(2, 1, 0, 0, 180, 0, 0);
        var action1 = cc.sequence(
            orbit1,
            orbit1.reverse());

        var orbit2 = cc.orbitCamera(2, 1, 0, 0, 180, -45, 0);
        var action2 = cc.sequence(
            orbit2,
            orbit2.reverse());

        var orbit3 = cc.orbitCamera(2, 1, 0, 0, 180, 90, 0);
        var action3 = cc.sequence(
            orbit3,
            orbit3.reverse());
        //ttpp.runAction(action2.repeatForever());
        //ttpp.runAction(action3.repeatForever());
        ttpp.runAction(action1.repeatForever());




    },
    initmeteor: function () {
        //流星
        var meteorgrain = new cc.ParticleSystem(res.mm_meteor_plist);
        meteorgrain.setPosition(GC.WIDTH / 2 + 400, GC.HEIGHT + 100);
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