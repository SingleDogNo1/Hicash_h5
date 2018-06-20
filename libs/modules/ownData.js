/**
 * 非请求接口信息----通付盾
 */
var getOwnData = function (req, res) {
	var result = {
		appId: '8066967',
		sessionId: req.sessionID,
		ts: new Date().getTime()
	};
	res.send(result, 200)
	console.log('req=====', req.sessionID)
}

exports.getOwnData = getOwnData;