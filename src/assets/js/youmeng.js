function ymtj(){
	var jsinner = $('<script src="https://s4.cnzz.com/z_stat.php?id=1261254264&web_id=1261254264" language="JavaScript"></script>');
	$('#app').append(jsinner);
}
ymtj();

setTimeout(function(){
    console.info('youmeng');
    if(_czc){
        _czc.push(['_trackEvent', '首页', '首页打开的次数', '', '', 'SS']);
        console.info('_czc', _czc);
    } 
}, 3000);