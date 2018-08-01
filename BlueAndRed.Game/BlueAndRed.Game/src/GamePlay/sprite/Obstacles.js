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

