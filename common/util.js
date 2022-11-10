import dayjs from "dayjs";

function friendlyDate(timestamp) {
	let formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	let now = Date.now();
	let seconds = Math.floor((now - timestamp) / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	let days = Math.floor(hours / 24);
	let months = Math.floor(days / 30);
	let years = Math.floor(months / 12);

	let diffType = '';
	let diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}

//根据时间戳，判断活期消息日期属于哪天：今天，昨天，9/27二
function msgDate(timestamp) {
	let nowTimestamp = new Date().getTime();
	let seconds = Math.floor((nowTimestamp - timestamp) / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	let durationDay = Math.floor(hours / 24);
	if (durationDay < 0) throw Error("msg time error");
	switch (durationDay) {
		case 0:
			return "今天"
		case 1:
			return "昨天"
		default:
			let targetTime = dayjs(timestamp);
			let targetMonth = targetTime.month();
			let targetDate = targetTime.date();
			let targetDay = targetTime.day();
			let weekArrayList = ['日', '一', '二', '三', '四', '五', '六'];
			let targetWeek = weekArrayList[targetDay];
			return `${targetMonth}/${targetDate}${targetWeek}`;
	}
}

function isToday(timestamp) {
	let nowTimestamp = new Date().getTime();
	let seconds = Math.floor((nowTimestamp - timestamp) / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	let durationDay = Math.floor(hours / 24);
	// if(durationDay < 0) throw Error("msg time error");
	return durationDay === 0;
}

function msgTime(timestamp) {
	let time = dayjs(timestamp);
	// 获取小时
	let hours = time.hour();
	// 获取分钟
	let minute = time.minute();
	// 设置默认文字
	let state = ``;
	// 判断时间段
	if (hours >= 0 && hours <= 6) {
		state = `凌晨`;
	} else if (hours > 6 && hours <= 12) {
		state = `上午`;
	} else if (hours > 12 && hours <= 18) {
		state = `下午`;
		hours -= 12;
	} else if (hours > 18 && hours <= 24) {
		state = `晚上`;
		hours -= 12;
	} else {
		throw Error("hours < 0")
	}
	return `${state}${hours}:${minute}`;
}

function getNowTime() {
	// 获取当前时间
	let now = new Date().getTime();
	return msgTime(now)
}

function isSameDay(startTime, endTime) {
	const startTimeMs = new Date(startTime).setHours(0, 0, 0, 0);
	const endTimeMs = new Date(endTime).setHours(0, 0, 0, 0);
	return startTimeMs === endTimeMs;
}


function setChatTabBar() {
	//如果是第一次打開，沒有讀過消息，則推送一條消息
	let isMsgRead = sessionStorage.getItem("isMsgRead");
	if (isMsgRead !== "read") {
		setTimeout(() => {
			//setTabBarBadge 只能在tabBar页调用
			uni.setTabBarBadge({
				index: 3,
				text: '1'
			});

			// uni.showTabBarRedDot({
			// 	index: 3
			// });
		}, 1000);
	}
}

function hideChatTabBarNotify() {
	sessionStorage.setItem("isMsgRead", "read");
	uni.removeTabBarBadge({
		index: 3,
	});
}

//退出全屏
function exitFullScreen() {
	if (!document) return console.log("document undefined");
	if (!document.fullscreen) return;
	let el = document;
	let cfs = el.cancelFullScreen || el.webkitExitFullscreen || el.webkitCancelFullScreen || el.mozCancelFullScreen ||
		el.exitFullScreen || el.msExitFullscreen;
	if (cfs) {
		cfs.call(el);
	} else if (typeof window.ActiveXObject !== "undefined") {
		let wscript = new ActiveXObject("WScript.Shell");
		if (wscript != null) {
			wscript.SendKeys("{F11}");
		}
	}
}

//进入全屏
function enterFullScreen() {
	if (!document) return console.log("document undefined");
	if (document.fullscreen === null) return console.log("The current device does not support full screen");
	if (document.fullscreen) return;

	let el = document.documentElement;
	if (!el) return console.log("element undefined");
	if (el.requestFullscreen) {
		//w3c标准
		el.requestFullscreen().then(() => {}).catch((e) => {})
	} else if (el.webkitRequestFullscreen) {
		//chrome
		el.webkitRequestFullscreen();
	} else if (el.webkitRequestFullScreen) {
		//chrome
		el.webkitRequestFullScreen();
	} else if (el.mozRequestFullScreen) {
		//火狐
		el.mozRequestFullScreen();
	} else if (el.msRequestFullscreen) {
		//IE
		el.msRequestFullscreen();
	}
}

function switchFullScreen() {
	//注意：document.fullscreen 不可主动修改
	if (document?.fullscreen) {
		exitFullScreen();
	} else {
		enterFullScreen();
	}
}

function initFullScreen() {
	if (typeof window.document.fullscreen !== 'boolean') return
	// $(document).toggle($(document).fullScreen() != null));
	//点击屏幕时，进入全屏
	window.document.addEventListener("click", enterFullScreen);
	//note: 无法通过touch事件触发fullScreen事件
	//触摸屏幕时，进入全屏
	// window.document.addEventListener("touchstart",enterFullScreen);
	//觸摸屏幕滑動時，進入全屏
	// window.document.addEventListener("touchmove",enterFullScreen);
	//鼠标点击屏幕时候，进入全屏
	window.document.addEventListener("mousedown", enterFullScreen);
	//鼠標滑動時，進入全屏
	window.document.addEventListener("mousemove", enterFullScreen);
}

function banDevtool() {
	//屏蔽键盘事件
	document.onkeydown = function() {
		var e = window.event || this._arguments[0];
		//F12
		if (e.keyCode === 123) {
			return false;
			//Ctrl+Shift+I
		} else if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
			return false;
			//Shift+F10
		} else if (e.shiftKey && e.keyCode === 121) {
			return false;
			//Ctrl+U
		} else if (e.ctrlKey && e.keyCode === 85) {
			return false;
		}
	};
	//屏蔽鼠标右键
	document.oncontextmenu = function() {
		return false;
	};
};

function isMobile() {
	const currentPlatform = window?.navigator.platform;
	if (!currentPlatform || !window || !window.sessionStorage) {
		console.warn("不支持當前設備")
		return false
	}
	if (/Win|Mac|Linux\s[^arm]/.test(currentPlatform)) {
		// console.warn("不支持當前設備，請使用移動設備訪問")
		return false
	}
	return true
};

export {
	friendlyDate,
	msgDate,
	msgTime,
	getNowTime,
	setChatTabBar,
	isToday,
	isSameDay,
	hideChatTabBarNotify,
	exitFullScreen,
	enterFullScreen,
	switchFullScreen,
	initFullScreen,
	banDevtool,
	isMobile
}
