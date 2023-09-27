<script>
	import 'animate.css';
	import {
		hideChatTabBarNotify,
		banDevtool,
		isMobile
	} from '@/common/util.js';
	import browserDetection from "@/common/browser-detection.js";
	import {
		getCache,
		setCache,
		getReferer
	} from "@/common/functions.js";

	export default {
		globalData: {
			device: {
				summary: null,
				details: null
			},
			visitor: null,
			tabbarState: {
				news: "",
				mall: "",
				campaign: "",
				chat: ""
			},
		},
		onLaunch: function() {
			console.log('App Launch');
			hideChatTabBarNotify();
			this.init();
		},
		onShow: function() {
			// console.log('App Show');
			// this.initFullScreen();
		},
		onHide: function() {
			// console.log('App Hide');
		},
		methods: {
			//初始化用户信息，此处主要用于判断用户的来源，以及以往的接待的客服
			init() {
				let refer = getReferer() || "直接訪問";
				if (refer == window.location.href) {
					refer = "直接訪問"
				}
				getApp().globalData.referer = refer
			},
		},
		mounted() {
			if (!isMobile()) { //禁止其它設備打開dev工具
				banDevtool()
			}
		}
	};
</script>

<style>
	/*每个页面公共css */
	.uni-tabbar-bottom {
		display: flex;
		flex-direction: column;
	}

	.uni-tabbar-bottom .uni-tabbar {
		/* #ifdef H5 */
		min-width: 320px;
		/* #endif */
		width: 100%;
	}

	/* #ifdef H5 */
	@media screen and (min-width: 768px) {
		.uni-tabbar-bottom .uni-tabbar {
			max-width: 450px;
		}
	}

	@media screen and (min-width: 450px) {
		.uni-tabbar-bottom .uni-tabbar {
			min-width: 450px;
		}
	}

	body,
	#app {
		min-width: 320px;
	}

	/* #endif */
	
	image,
	img {
		-webkit-user-drag: none;
	}

	.banner {
		display: flex;
	}
</style>