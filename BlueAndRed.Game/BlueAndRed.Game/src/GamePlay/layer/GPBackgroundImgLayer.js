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