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















