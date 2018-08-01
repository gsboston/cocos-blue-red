if (Modernizr) {
    Modernizr.addTest('ie8', function () {
        return !!navigator.userAgent.match(/MSIE 8/);
    });

    Modernizr.addTest('ie9', function () {
        return !!navigator.userAgent.match(/MSIE 9/);
    });

    Modernizr.addTest('ie10', function () {
        return !!navigator.userAgent.match(/MSIE 10/);
    });

    Modernizr.addTest('ie11', function () {
        return !!navigator.userAgent.match(/Trident/) && navigator.appName == 'Netscape';
    });

    Modernizr.addTest('ipad', function () {
        return !!navigator.userAgent.match(/iPad/i);
    });

    Modernizr.addTest('iphone', function () {
        return !!navigator.userAgent.match(/iPhone/i);
    });

    Modernizr.addTest('oldie', function () {
        return !!navigator.userAgent.match(/MSIE [6789]/i);
    });

    Modernizr.addTest('mobile', function () {
        return /iPod|iPhone|Android|BlackBerry|SymbianOS|SCH-M\d+|Opera Mini|Windows CE|Nokia|SonyEricsson|webOS|PalmOS/.test(navigator.userAgent);
    });
}