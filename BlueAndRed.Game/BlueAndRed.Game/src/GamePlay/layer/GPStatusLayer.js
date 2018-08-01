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