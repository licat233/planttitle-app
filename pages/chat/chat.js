function visitorLogin({
	kefu,
	refer,
	lang
}) {
	await fetch("http://localhost:81/visitor_login", {
		"credentials": "include",
		"headers": {
			"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:106.0) Gecko/20100101 Firefox/106.0",
			"Accept": "*/*",
			"Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			"X-Requested-With": "XMLHttpRequest",
			"Sec-Fetch-Dest": "empty",
			"Sec-Fetch-Mode": "cors",
			"Sec-Fetch-Site": "same-origin"
		},
		"body": "visitor_id=e2e52abe-663c-4303-b8e4-24ad361fb248&refer=http%3A%2F%2Flocalhost%3A81%2F&to_id=kefu2&extra=",
		"method": "POST",
		"mode": "cors"
	});
};

function wsHandler() {
	if (!'WebSocket' in window) {
		console.warn("😰Sorry!Your browser does not support WebSocket");
		return false
	}
	if (this.wsconnStatus) return;
	this.wsconnStatus = true;

	const httpProtocol = window.location.protocol;
	let wsProtocol = ""
	if (httpProtocol === 'https:') {
		wsProtocol = 'wss:'
	} else if (httpProtocol === 'http:') {
		wsProtocol = 'ws:'
	} else {
		this.warnMessage("Unable to determine the protocol for the current page")
		// throw new Error("Unable to determine the protocol for the current page");
		return false
	}
	let url = wsProtocol + getApp().globalData.backendBasePath + '/v1/api/chat/public/ws/visitor'
	let token = getApp().globalData.token;
	if (!token) {
		console.info("%c not found token!", "color:#b9a000")
		return false
	}
	console.info("%c ⏳Connecting to webSocket server ...", "color:#49BB00")
	let _this = this;
	const ws = new WebSocket(url + "?token=" + token);
	// ws.addEventListener('open', () => {
	// 	ws.send('Authorization: Bearer ' + token + '\r\n');
	// });
	ws.onopen = () => {
		console.info("%c 👌The WebSocket server is connected", "color:#49BB00")
		_this.wsconnStatus = true
		// ws.send(token); //发送token进行鉴权
	}
	// let hasFirstMsg = false;

	ws.onmessage = function(event) {
		const str = event.data;
		if (str === 'ping') {
			ws.send('pong');
			return
		}
		try {
			const message = JSON.parse(str);
			_this.handleMessage(message);
		} catch (error) {
			//不是有效的JSON序列化消息，丢掉就好，不用管
		}
	};
	ws.onerror = () => {
		_this.wsconnStatus = false
		console.info("%c 💥Connection WebSocket Error!", "color:#c80000")
	}
	ws.onclose = () => {
		_this.wsconnStatus = false
		if (ws.readyState === WebSocket.CLOSED) {
			console.info("%c 💔Websocket connection has been closed by the server!", "color:#b9a000")
			//再重新登录一次
			//调用登录程序，且防止重等次数过多，限制一下
			// if (_this.reloginCount < 2) {
			// 	_this.reloginCount++
			// 	_this.connWS();
			// }
		} else {
			console.info("%c 💔WebSocket connection is closed!", "color:#b9a000")
		}
		// this.connWS();
	}

	window.onbeforeunload = (event) => {
		// 确保提示消息在某些浏览器中显示
		event.preventDefault();
		_this.wsconnStatus = false
		ws.close();
	}

	this.ws = ws

	// 判断当前浏览器是否支持 visibilitychange 事件
	if (typeof document.hidden !== "undefined") {
		// 添加 visibilitychange 事件监听器
		document.addEventListener("visibilitychange", handleVisibilityChange);
	}

	// 处理 visibilitychange 事件的函数
	function handleVisibilityChange() {
		if (document.hidden) {
			console.log("%c 👋The user has left the current window", "color:#b9a000");
		} else {
			console.log("%c 🤝The user has returned to the current window", "color:#49BB00");
		}
	}
},