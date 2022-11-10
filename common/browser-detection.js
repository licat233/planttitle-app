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

		// exception rules
		renameOsx();
		cutSafariVersion();

		prepareData();
		processOptions();

		return data;

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
