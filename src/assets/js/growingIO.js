!(function(e, t, n, g, i) {
	(e[i] =
		e[i] ||
		function() {
			(e[i].q = e[i].q || []).push(arguments);
		}),
		(n = t.createElement("script")),
		(tag = t.getElementsByTagName("script")[0]),
		(n.async = 1),
		(n.src =
			("https:" == document.location.protocol ? "https://" : "http://") +
			g),
		tag.parentNode.insertBefore(n, tag);
})(window, document, "script", "assets.growingio.com/2.1/gio.js", "gio");
gio("init", "b854dbc28713dfe5", {});

//custom page code begin here
// 挖財页面hashtag变为true
if(window.location.href.indexOf("WaCaiBindbank") > -1 || window.location.href.indexOf("WaCaiSignature") > -1 ) {
	window.gio("config", {'hashtag': true});
} else {
	window.gio("config", {'hashtag': false});
}
//custom page code end here

gio("send");
