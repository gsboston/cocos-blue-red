var GC = GC || {};
//var winsize=cc.director.getWinSize();
GC.WIDTH = 640;
GC.HEIGHT = 1136;

GC.SOUNDON=true;//音乐开关
GC.BGMUSIC=undefined;//背景音效
GC.BTNMUSIC=undefined;//按钮音效
GC.STARMUSIC=undefined;//吃星星音效
GC.BOMBMUSIC=undefined;//爆炸音效
GC.MMBGMUSIC=undefined;//首页背景音乐

//GC.WIDTH = winsize.width;
//GC.HEIGHT = winsize.height;
GC.GODTIME=2.9;//撞到障碍物后免疫时间
GC.ISGODMODE=false;//当前是否撞到障碍物

GC.ENEMYS = [];//障碍等精灵 数组
GC.ISMISSINGSTAR = false;//是否错过星星
GC.ISGAMEOVER=false;//游戏是否结束
GC.PLAYERSCORE = 0;//分数
GC.bloodsarr=[];//血量数组
GC.emptybloodsarr=[];//空血量数组
GC.HOMELOGOROCKETRED=undefined;
GC.HOMELOGOROCKETBLUE=undefined;
GC.ISGAMEOVERONTOUCH = false;//游戏结束时 传给touchlayer 显示gameover层
GC.ISBTNLOCKED = false;

GC.BACKGROUNDSPEED=0.5;//背景移动速度
GC.CLICKPAUSE = false;//点击暂停按钮
GC.ISLEFTORRIGHTSTAR="";//错过星星时记录左右
GC.STRIKEOBSTACLELEFT=false;//撞击障碍 玩家闪烁
GC.STRIKEOBSTACLERIGHT=false;//撞击障碍 玩家闪烁
GC.MAXCOUNTEACHLINE = 3;//每行最多连续出现多少个精灵 

//if (sc.isboundwechar) {
    //GC.PLAYERTOTALBLOOD = 3;//总血量  血量上限
//} else {
    GC.PLAYERTOTALBLOOD = 1;//总血量  血量上限
//}
GC.PLAYERBLOOD = GC.PLAYERTOTALBLOOD;//玩家当前血量
GC.MAXSPEED = 1.9;//飞船最大速度 （从上倒下运行的秒数）
GC.SPEEDREDUCEDEACHUPDATE = 0.04;//每次更新飞船的速度增加量   （秒数  越小越快）
//GC.UPDATESPRITETIMES=0.3;//刷新障碍精灵的最小时间间隔
//GC.SPUPDATETIMEREDUCED=0.01;//障碍精灵刷新时间 递减量
GC.FIRSTSPUPDATETIME = 1;//初始障碍精灵刷新间隔
//GC.FIRSTSPEED=4;//飞船初始速度
GC.BLOODAPPPRO = 9.95;//心出现的概率 
GC.OBSAPPPRO = 6;//障碍出现的频率百分之    星星的概率为100%-障碍%
GC.SPACING = 300;//障碍物出现间距 （ 1136-x）
GC.CURRENTSPEED = 0;//当前飞船速度

//
GC.MISSSTARTIMES=0;
GC.HITPLANETTIMES=0;
GC.EATBLOODTIMES=0;
GC.STARTIMES=undefined;
GC.STARTIMESTIME=undefined;
GC.ENDTIMES=undefined;
GC.ENDTIMESTIME=undefined;
GC.PLAYTIMES=0;
GC.MAXSCORE=0;


GC.CURRENTY=0;

//游戏速度档  超过指定分数 触发对应速度
GC.FIRSTGEAR = 20;
GC.SECONDGEAR = 40;
GC.THIRDGEAR = 70;
GC.FOURTHGEAR = 130;
GC.FIFTHGEAR = 300;

//每档对应速度
GC.FIRSTSPEED = 5;
GC.SECONDSPEED = 8;
GC.THIRDSPEED = 10;
GC.FOURTHSPEED = 12;
GC.FIFTHSPEED = 15;
GC.SIXTHSPEED = 18;
