<script>
	import 'animate.css';
	import {
		hideChatTabBarNotify,
		banDevtool,
		isMobile
	} from '@/common/util.js';
	import browserDetection from "@/common/browser-detection.js";

	export default {
		onLaunch: function() {
			hideChatTabBarNotify();
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
			// this.initFullScreen();
		},
		onHide: function() {
			console.log('App Hide');
		},
		mounted() {
			var data = browserDetection();
			console.log(data)
			if (!isMobile()) { //禁止其它設備打開dev工具
				banDevtool()
			}
		}
	};
</script>

<style>
	/*每个页面公共css */
	.uni-tabbar-bottom {
		display: block !important;
	}

	image,
	img {
		-webkit-user-drag: none;
	}
</style>
