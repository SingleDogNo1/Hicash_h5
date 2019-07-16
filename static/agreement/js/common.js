function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        if (r) return decodeURIComponent(r[2]);
    return null;
}
//设置cookie
function setCookie(c_name, value) {
    document.cookie = c_name + "=" + escape(value) + "; path=/;";
}

// 读取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        if (!localStorage) {
            return '';
        } else {
            var ls = localStorage.getItem(name);
            return ls;
        }
    }
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function clearCookie() {
    var myDate = new Date();
    var today = "AD" + myDate.getFullYear() + (myDate.getMonth() + 1) + myDate.getDate();
    var isRead = "pjread";//评级是否已读，0未读，1已读
    var pjUser = "pj";//用户评级
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            /*document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() */
            /*	delCookie(keys[i]);*/
            if (keys[i] != today && keys[i] != isRead && keys[i] != pjUser) {
                setCookie(keys[i], "");
            }
        }
    }
}

function jqAjax(params){
    return new Promise((resovle, reject) => {
        $.ajax({
            type: params.type,
            url: params.url,
            async: false,
            data: params.data,
            dataType: "JSON",
            success: res => {
                resovle(res);
            },
            error: err => {
                reject(err);
            }
        })
    })
}