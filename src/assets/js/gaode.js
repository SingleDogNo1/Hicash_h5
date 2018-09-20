var bb = document.getElementsByTagName('script')[0];
var amap = document.createElement('script'); 
amap.src = 'https://webapi.amap.com/maps?v=1.4.8&Key=8eff867abeb5b41cd30bead8d054ff3c';
bb.parentNode.appendChild(amap);

window.onload = function(){
    var map = new AMap.Map('container', {
        resizeEnable: true
    });
    AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            buttonPosition:'RB',    //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20),   //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status,result){
            if(status=='complete'){
                onComplete(result)
            }else{
                onError(result)
            }
        });
    });
    //解析定位结果
    function onComplete(data) {
        var str = [];
        str.push('定位结果：' + data.position);
        str.push('定位类别：' + data.location_type);
        if(data.accuracy){
             str.push('精度：' + data.accuracy + ' 米');
        }
        console.info('onComplete str', str);
        alert('onComplete'+data.position.lng);
    }
    //解析定位错误信息
    function onError(data) {
        console.info('onComplete data', data);
        alert('err'+data.message);
    }


}