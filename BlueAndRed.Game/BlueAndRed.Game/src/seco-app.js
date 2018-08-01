//安全起见，全局配置放这里并压缩
var sc = sc || {}; //secoinfo namespace
//sc.baseUrl = 'http://localhost:18259/';
//sc.baseUrl = 'http://192.168.1.137:8005/';
sc.baseUrl = 'http://lab.secoinfo.net/baradmin/';
sc.baseUrlGame = 'http://lab.secoinfo.net/';
sc.userid = 0;
sc.username = '';
sc.isboundwechar = false;
sc.maxscore = '请绑定帐号';
sc.allmaxscore = '未知';
sc.pagesize = 100;



//禁用手势滑动
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

sc.app = angular.module('scApp', ['ngAnimate'])
    .controller('RootController', ['$scope', '$http', function ($scope, $http) {
        sc.scope = $scope;
        $scope.list = [];
        $scope.isfirstlogin = true;
        $scope.needchangescene = false;
        $scope.curscore = 0;
        $scope.rankindex = 'loading……';
        //TODO
        //$scope.testcode = function (pic) {
        //    alert(pic);
        //};

        $scope.getwecharticket = function () {
            //获取
            var urlhref = window.location.href;
            //if (window.location.href.indexOf('?') > -1) {
            //    urlhref = urlhref.split('?')[0];
            //}
            //微信相关

            urlhref = encodeURIComponent(urlhref);
            $http.get(sc.baseUrl + 'Admin/Api/GetTicket?href=' + urlhref).success(function (data) {
                $scope.time = data.split(',')[0];
                $scope.ranstr = data.split(',')[1];
                $scope.signstr = data.split(',')[2];

                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wxbbd0d3f092cc62cb', // 必填，公众号的唯一标识
                    timestamp: $scope.time, // 必填，生成签名的时间戳
                    nonceStr: $scope.ranstr, // 必填，生成签名的随机串
                    signature: $scope.signstr,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                //wx.error(function (res) {
                //    alert('error'+res.document);
                //});
                wx.ready(function (res) {
                    setTimeout(function () {
                        $scope.wecharshare();
                    }, 500);
                });
            });
        };
        $scope.getwecharticket();

        //获取用户是否是第一次登录 
        $scope.getisfirstlogin = function (userid) {
            $http.get(sc.baseUrl + 'Admin/Api/GetIsFirstLogin?id=' + userid).success(function (data) {
                if (data == 'NO') {
                    $scope.isfirstlogin = false;
                } else {
                    $scope.isfirstlogin = true;
                }
            }).error(function (data) {

            });
        };
        //已经游戏过后 修改状态
        $scope.updatefirstlogin = function () {
            $http.get(sc.baseUrl + 'Admin/Api/UpdateStatus?id=' + sc.userid).success(function (data) {
                if (data == 'OK') {
                    $scope.isfirstlogin = false;
                }
            }).error(function (data) {

            });
        };
        //微信分享
        $scope.wecharshare = function (score) {
            //想知道左右脑的协调度吗？来驾驶小火箭测测吧~
            //传说，普通人只能看见50颗星星，但我觉得你能看见更多！来试试吧。
            //还没开过火箭的进！一次让你控制俩。
            //吃星星、躲星球，这个小火箭真是好玩~
            //这个游戏还不错，值得一试~
            //我说在我的想象中有两只小火箭，与众不同最时尚玩起来肯定棒~
            //我的小火箭时尚时尚最时尚，回家的路上我情不自禁，点击 点击……
            var content = '';
            if (score) {
                var i = parseInt(10 * Math.random());
                switch (i) {
                    case 1:
                    case 2:
                    case 3: content = '一口气吃了' + score + '颗星星，点击比比谁吃的多！'; break;
                    case 4:
                    case 5: content = '我在玩红蓝小火箭，我得了' + score + '分，敢来挑战我么？'; break;
                    case 6:
                    case 7: content = '这一把我得了' + score + '分，快来红蓝小火箭里和我一起玩吧！'; break;
                    default: content = '传说，普通人只能看见50颗星星，但我看见了' + score + '颗！你也来试试吧。'; break;
                }
            } else {
                var i = parseInt(10 * Math.random());
                switch (i) {
                    case 1:
                    case 2: content = '想知道左右脑的协调度吗？来驾驶小火箭测测吧~'; break;
                    case 3:
                    case 4: content = '传说，普通人只能看见50颗星星，但我觉得你能看见更多！来试试吧。'; break;
                    case 5:
                    case 6: content = '吃星星、躲星球，这个小火箭真是好玩~'; break;
                    case 7:
                    case 8: content = '我说在我的想象中有两只小火箭，与众不同最时尚玩起来肯定棒~'; break;
                    default: content = '我的小火箭时尚时尚最时尚，回家的路上我情不自禁，点击 点击……'; break;
                }
            }
            //分享朋友圈
            wx.onMenuShareTimeline({
                title: content, // 分享标题
                link: sc.baseUrlGame + 'bar/', // 分享链接
                imgUrl: sc.baseUrlGame + 'bar/res/wechat.jpg', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    $scope.updatewecharsharetimes();
                    $scope.wecharshare();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            //分享给好友
            wx.onMenuShareAppMessage({
                title: '红蓝小火箭（Red & Blue）', // 分享标题
                desc: content, // 分享描述
                link: sc.baseUrlGame + 'bar/', // 分享链接
                imgUrl: sc.baseUrlGame + 'bar/res/wechat.jpg', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    $scope.updatewecharsharetimes();
                    $scope.wecharshare();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        };



        //微博分享
        $scope.weiboshare = function (score) {
            if (score) {
                var i = parseInt(10 * Math.random());
                switch (i) {
                    case 1:
                    case 2:
                    case 3: $scope.content = '我在玩红蓝小火箭，我得了' + score + '分，敢来挑战我么？'; break;
                    case 4:
                    case 5:
                    case 6: $scope.content = '这一局我得了' + score + '分，快来红蓝小火箭里和我一起玩吧！'; break;
                    default: $scope.content = '传说，普通人只能看见50颗星星，但我看见了' + score + '颗！你也来试试吧。'; break;
                }
                return;
            }
            if ($scope.content == '' || !$scope.content) {
                var i = parseInt(10 * Math.random());
                switch (i) {
                    case 1:
                    case 2: $scope.content = '想知道左右脑的协调度吗？来驾驶小火箭测测吧~'; break;
                    case 3:
                    case 4: $scope.content = '传说，普通人只能看见50颗星星，但我觉得你能看见更多！来试试吧。'; break;
                    case 5:
                    case 6: $scope.content = '吃星星、躲星球，这个小火箭真是好玩~'; break;
                    case 7:
                    case 8: $scope.content = '我说在我的想象中有两只小火箭，与众不同最时尚玩起来肯定棒~'; break;
                    default: $scope.content = '我的小火箭时尚时尚最时尚，回家的路上我情不自禁，点击 点击……'; break;
                }
            }

            var url = 'http://service.weibo.com/share/share.php?url='
            + sc.baseUrlGame + 'bar/'
            + '&pic=' + sc.baseUrlGame + 'bar/res/weibo.jpg'
            + '&title=' + $scope.content;
            if ($scope.isweixinbrowser)
                location.href = url;
            else
                window.open(url);
        };

        //更新微信分享次数
        $scope.updatewecharsharetimes = function () {
            $http.get(sc.baseUrl + 'Admin/Api/UpdateWecharSharetimes?id=' + sc.userid).success(function (data) {

            });
        };

        //$scope.updateolduser = function () {
        //    $http.get(sc.baseUrl + 'Admin/Api/UpdateOldUser').success(function (data) {
        //        alert(data);
        //    }).error(function (data) {
        //        alert(data);
        //    });
        //};

        //获取排行榜数据 以及个人数据
        $scope.getrankinglist = function () {
            $scope.list.length = 0;
            $scope.rankindex = 'loading……';
            $http.get(sc.baseUrl + 'Admin/Api/GameinfoList?size=' + sc.pagesize + '&page=1').success(function (data) {
                angular.forEach(data, function (val) {
                    if (val.pic.indexOf('.png') == -1 && val.pic.indexOf('.jpg') > -1) {
                        val.pic = sc.baseUrl + 'Uploads/' + val.pic;
                    }
                    if (val.pic == '') {
                        val.pic = sc.baseUrlGame + 'bar/res/icon/5.png';
                    }
                    $scope.list.push(val);
                });
                // $scope.list = data;
                $('.m-loading').addClass('on');
                //$scope.list = data;
                $(document).ready(function () {
                    setTimeout(function () {
                        var myScroll;
                        myScroll = new IScroll('.group_scroll', {
                            scrollX: false, scrollY: true, mouseWheel: true, freeScroll: true
                        });
                    }, 1000);
                });
            }).error(function (data) {
                alert('服务器错误，请稍后重试');
            });

            //获取个人数据
            $http.get(sc.baseUrl + 'Admin/Api/GetOwnerData?userid=' + sc.userid).success(function (data) {
                $scope.rankindex = data.split(',')[1];
                $scope.curuserscore = data.split(',')[0];
            }).error(function (data) {
                alert('个人信息获取失败，请重新登录再试');
            });

        };
        //获取游戏总次数
        $scope.getgamecount = function () {
            $http.get(sc.baseUrl + "Admin/Api/GetGameCount").success(function (data) {
                $scope.gametotalcount = data;
            });
        };
        $scope.getgamecount();

        $scope.closeranklist = function () {
            if ($('#rankinglist').hasClass('on')) {
                $('#rankinglist').removeClass('on');
            }
            $('.m-loading').removeClass('on');
        };

        $scope.closewecharshare = function (flag) {
            if (flag) {
                if ($('#sharelayer').hasClass('on')) {
                    $('#sharelayer').removeClass('on');
                }
            } else {
                if ($('#pcsharelayer').hasClass('on')) {
                    $('#pcsharelayer').removeClass('on');
                }
            }
        };

        $scope.opensharelayer = function (iswecharbrowser) {
            if (iswecharbrowser)
                $('#sharelayer').addClass('on');
            else
                $('#pcsharelayer').addClass('on');
        };


        //人类最高分
        $scope.gethumanscore = function () {
            $http.get(sc.baseUrl + "Admin/Api/GetMaxScore").success(function (data) {
                sc.allmaxscore = data;
            }).error(function (data) {
                sc.allmaxscore = '未知';
            });
        };

        //用户绑定
        $scope.userbound = function (iswechar) {
            //cookie里有token  则进行验证
            if (document.cookie.indexOf('bar_ui') > -1) {
                var barui = document.cookie.split('bar_ui=')[1];
                //if (barui.indexOf(';') > -1) {
                var token = '';
                if (barui.indexOf(';') > -1) {
                    token = barui.split(';')[0];
                } else {
                    token = barui;
                }
                //var token = barui.split(';')[0];
                //查询数据库 是否有匹配数据  有 不做操作  没有 则跳转到微信绑定页面
                $http.get(sc.baseUrl + 'Admin/Api/CheckUserIsBound?token=' + token).success(function (data) {
                    if (data == "NO") {//数据不存在 需要重新绑定
                        if (iswechar)//是微信 再跳转绑定页面
                            window.location.href = sc.baseUrl + 'Weixin/Auth';
                        else {//不是微信  再次进行注册
                            $http.post(sc.baseUrl + 'Admin/Api/UnWecharRegister', { url: sc.baseUrlGame }).success(function (data) {
                                sc.userid = data.split(',')[1];
                                $scope.uid = sc.userid;
                                sc.username = data.split(',')[0];
                                $scope.token = data.split(',')[2];
                                $scope.curusername = sc.username;
                                $scope.gethumanscore();
                            }).error(function (data) {
                            });
                        }
                    } else { //cookie 信息正确
                        if (data.indexOf(',') > -1) {// u.UserBase.UserName + "," + u.UserId + "," + u.UserBase.Token + "," + u.sex + "," + u.IsBoundWechar
                            sc.userid = data.split(',')[1];
                            $scope.uid = sc.userid;
                            sc.username = data.split(',')[0];
                            sc.maxscore = data.split(',')[2];
                            $scope.token = token;
                            $scope.curusername = sc.username;
                            $scope.curuserscore = sc.maxscore;
                            //$scope.rankindex = data.split(',')[3];
                            if (data.split(',')[4] == '' || !data.split(',')[4]) //
                                $scope.curpic = sc.baseUrlGame + 'bar/res/icon/' + 11 + '.png';
                            else {
                                if (data.split(',')[4].indexOf('.png') > -1) {//默认头像不用加路径
                                    $scope.curpic = data.split(',')[4];
                                } else {//微信头像
                                    $scope.curpic = sc.baseUrl + 'Uploads/' + data.split(',')[4];
                                }
                            }
                            $scope.gethumanscore();//人类最高分
                            //$scope.getrankinglist();//绑定排行榜
                            if (iswechar)
                                sc.isboundwechar = true;
                            else
                                sc.isboundwechar = false;
                            //获取是否是第一次游戏
                            $scope.getisfirstlogin(sc.userid);
                        }
                    }
                }).error(function (data) {
                    alert('服务器错误，请稍候重试');
                });
                // }
            } else {//没有cookie 直接跳转
                if (iswechar)
                    window.location.href = sc.baseUrl + 'Weixin/Auth';
                else {//不是微信 没有cookie  进行注册
                    $http.post(sc.baseUrl + 'Admin/Api/UnWecharRegister', { url: sc.baseUrlGame }).success(function (data) {
                        sc.userid = data.split(',')[1];
                        $scope.uid = sc.userid;
                        sc.username = data.split(',')[0];
                        $scope.token = data.split(',')[2];
                        if (data.split(',')[3] == '' || !data.split(',')[3]) //
                            $scope.curpic = sc.baseUrlGame + 'bar/res/icon/' + 11 + '.png';
                        else {
                            if (data.split(',')[4].indexOf('.png') > -1) {//默认头像不用加路径
                                $scope.curpic = data.split(',')[4];
                            } else {//微信头像
                                $scope.curpic = sc.baseUrl + 'Uploads/' + data.split(',')[3];
                            }
                        }
                        $scope.curusername = sc.username;
                        $scope.gethumanscore();
                        //获取是否是第一次游戏
                        $scope.getisfirstlogin(sc.userid);
                    }).error(function (data) {
                    });
                }
            }
        };

        ////通过MicroMessenger判断  非微信浏览器 跳转
        $scope.isweixinbrowser = false;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {//是微信
            //var llurl = window.location.href;
            //if (llurl.indexOf('&') > -1) {
            //    llurl = llurl.replace('&', '');
            //    window.location.href = llurl;
            //} else {
            $scope.userbound(true);
            $scope.iswecharbrowser = true;
            //}
        } else {//不是微信
            $scope.userbound(false);
            $scope.iswecharbrowser = false;
        }

        //$scope.getrankinglist();

    }])

//车神榜滚动
.directive('viScroll', ['$rootScope', function ($rootScope) {
    var scroll;
    return {
        link: function (scope, element, attrs) {
            setTimeout(function () {
                scroll = new IScroll(element[0], {
                    scrollX: false,
                    scrollY: true,
                    mouseWheel: true,
                    click: true
                });
            }, 1000);
        }
    };
}])
//angular代码结束
;

sc.ga = function (event) {
    if (typeof ga !== undefined) {
        ga('send', 'event', event, 'touch');
    }
};
