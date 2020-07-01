//后台请求筛选器
export default function bkHttpHandler(requestOp) {	
	if (typeof requestOp.url != 'undefined' && requestOp.url.indexOf('http') < 0) {
		requestOp.url = uni.$config.backEndUrl + requestOp.url;
	}
	if (typeof requestOp.data == 'undefined') {
		requestOp.data = {};
	}
	if (typeof requestOp.data.uId == 'undefined') {
		requestOp.data.uId = uni.$config.uuid;
	}
	if (typeof requestOp.data.pId == 'undefined' || requestOp.data.pId < 0) {
		requestOp.data.pId = 1;
	}
	if (typeof requestOp.data.pSize == 'undefined' || requestOp.data.pSize < 0) {
		requestOp.data.pSize = 1;
	}
	if (typeof requestOp.data['_csrf'] == 'undefined') {
		requestOp.data['_csrf'] = uni.$config.csrf;
	} 
	if (uni.$user) {
		if (typeof uni.$user.authToken != 'undefined')
			requestOp.data['authToken'] = uni.$user.authToken;
		if (typeof uni.$user.userId != 'undefined')
			requestOp.data['userId'] = uni.$user.userId;
	}
	const tem = requestOp.success;
	requestOp.success = null; 
	requestOp.success = function(res) { 
		if (typeof res!='undefined'&&typeof res.data!='undefined'&&res.data.code == '102') {
			uni.reLaunch({ 
				url: '/pages/login/login'
			});
		}
		tem(res);
		if (typeof res != 'undefined' && !!res && !!res.header && typeof res.header['x-response-csrf'] != 'undefined')
			uni.$config.csrf = res.header['x-response-csrf'];
		else
			console.log("无csrf返回:" + res.data.msg);
	};
	uni.request({
		...requestOp
	});
}
