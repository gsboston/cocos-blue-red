var GPbackgroundlayer = cc.Layer.extend({
	_gpBg:undefined,
	_lines:[],
	_isfirstloda:true,
	_isfirstdraw:true,
	ctor : function(){
		this._super();
		//加载背景
		this._lines=[];
		this._isfirstdraw=true;
		this.initBackground();
		this.addBackgroundLine();
		this.scheduleUpdate();
	},
	//添加背景中线
	initBackground:function(){
		var drawNode = new cc.DrawNode();
		drawNode.drawRect(cc.p(GC.WIDTH/2, 0), cc.p(GC.WIDTH/2+2, GC.HEIGHT), cc.color(255, 255, 255, 50), 3,cc.Color(255,255,255, 50));
		this.addChild(drawNode);
	},
	//添加背景滚动线
	addBackgroundLine : function(){
		var leftdrawNode = new cc.DrawNode();
		var rightdrawNode = new cc.DrawNode();
		leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT), cc.p(GC.WIDTH/4+1, GC.HEIGHT+150), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
		rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT+150), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
		
		if(this._isfirstdraw){
			leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT-200), cc.p(GC.WIDTH/4+1, GC.HEIGHT-50), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT-400), cc.p(GC.WIDTH/4+1, GC.HEIGHT-250), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT-600), cc.p(GC.WIDTH/4+1, GC.HEIGHT-450), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT-800), cc.p(GC.WIDTH/4+1, GC.HEIGHT-650), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			leftdrawNode.drawRect(cc.p(GC.WIDTH/4, GC.HEIGHT-1000), cc.p(GC.WIDTH/4+1, GC.HEIGHT-850), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			
			rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT-200), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT-60), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT-400), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT-250), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT-600), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT-450), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT-800), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT-650), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			rightdrawNode.drawRect(cc.p((GC.WIDTH/4)*3, GC.HEIGHT-1000), cc.p((GC.WIDTH/4)*3+1, GC.HEIGHT-850), cc.color(255, 0, 0, 50), 1,cc.Color(255, 0, 0, 50));
			this._isfirstdraw=false;
		}
		
		this.addChild(leftdrawNode);
		this.addChild(rightdrawNode);
		this._lines.push(leftdrawNode);
		this._lines.push(rightdrawNode);
	},
	update:function(dt){
		var i; 
		//cc.log(this._lines.length);
		//游戏结束  精灵停止移动
		if(GC.PLAYERBLOOD==0){
			return;
		}
		var dty = GC.CURRENTSPEED * dt * 60;
		for(i in this._lines){
			var lin = this._lines[i];
			var pos=lin.getPosition();
			lin.setPosition(pos.x, pos.y - dty);
			if(pos.y<-1250){
				this.removeChild(lin, true);//清除
				var index = this._lines.indexOf(lin);  
				this._lines.splice(index, 1);  
			}
		}
		var lastline= this._lines[this._lines.length-1];
		var position=lastline.getPosition();
		if(position.y<-200){
			this.addBackgroundLine();
		}
	}
});