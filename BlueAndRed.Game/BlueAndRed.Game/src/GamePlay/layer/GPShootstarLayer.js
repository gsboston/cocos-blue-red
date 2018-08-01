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