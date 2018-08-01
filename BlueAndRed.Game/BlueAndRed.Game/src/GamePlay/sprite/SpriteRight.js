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