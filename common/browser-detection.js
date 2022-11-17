"use strict"
/**
 * @param {Object} options
 * Possible values  
 * @return {Object} data
 * data.browser: edge, ie, chrome, firefox, safari, opera  
 * data.version: depends on the browser  
 * data.os: mac, win, linux, freebsd, mobile, iphone, ipod, ipad, android, blackberry, j2me, webtv  
 */
export default function browserDetection(options) {
	var data = {};
	var browser = null;
	var version = null;
	var os = null;
	var webkit = null;

	parseUserAgent();
	sysPlatform();

	// exception rules
	renameOsx();
	cutSafariVersion();

	prepareData();
	processOptions();

	return data;

	function sysPlatform() {
		let currentPlatform = window?.navigator.platform;
		if (!currentPlatform) return data.platform = "unknown";
		// let isPC = /Win|Mac|Linux\s[^arm]/.test(currentPlatform)

		let device = currentPlatform.toLowerCase();
		let system = "";
		switch (true) {
			case /win/.test(device):
				system = "winOS";
				break;
			case /mac/.test(device):
				system = "macOS";
				break;
			case /linux\s[^arm]/.test(device):
				system = "linuxOS";
				break;
			case /linux\s[arm|aarch]/.test(device): //ARMv8推出的64位指令集里面，有两个aarch mode： aarch32和aarch64
				system = "androidOS";
				break;
			case /iphone/.test(device):
				system = "IOS";
				break;
			case /ipad/.test(device):
				system = "iPadOS";
				break;
			default:
				system = "unknown:" + device;
		}
		data.system = system;
	}

	function parseUserAgent() {
		var userAgent = navigator.userAgent.toLowerCase(),
			browserParts = /(ie|firefox|chrome|safari|opera|edge)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent),
			osParts = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(
				userAgent);

		if (!!userAgent.match(/trident\/7\./)) {
			browser = "ie";
			version = 11;
		} else if (!!userAgent.match(/edge\/\d+/)) {
			browserParts = /(edge)\/([\w.]+)/.exec(userAgent),
				browser = browserParts[1];
			version = browserParts[2];
		} else if (browserParts && browserParts.length > 2) {
			browser = browserParts[1];
			version = browserParts[2];
		}

		if (osParts && osParts.length > 1) {
			os = osParts[1];
		}

		webkit = navigator.userAgent.toLowerCase().match(/webkit\/(\d+)\.(\d+)\.(\d+)/);
	}

	function prepareData() {
		data.browser = browser;
		data.version = parseInt(version, 10) || null;
		data.os = os;
		if (webkit && webkit.length >= 3) {
			data.webkit = {
				major: parseInt(webkit[1], 10),
				minor: parseInt(webkit[2], 10),
				patch: webkit[3] ? parseInt(webkit[3], 10) : undefined
			};
		}
	}

	function renameOsx() {
		if (os === 'mac') {
			os = 'osx';
		}
	}

	function cutSafariVersion() {
		if (os === 'safari') {
			version = version.substring(0, 1);
		}
	}

	function processOptions() {
		options = options || {};

		if (options.addClasses && data.os && data.browser && data.version) {
			document.body.parentNode.classList.add(data.os, data.browser, data.browser, data.version);
		}
	}

};
