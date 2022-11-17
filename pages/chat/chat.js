function visitorLogin(){
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
		"referrer": "http://localhost:81/chatIndex?kefu_id=kefu2",
		"body": "visitor_id=e2e52abe-663c-4303-b8e4-24ad361fb248&refer=http%3A%2F%2Flocalhost%3A81%2F&to_id=kefu2&extra=",
		"method": "POST",
		"mode": "cors"
	});
};
