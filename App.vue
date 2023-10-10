<script>
	import 'animate.css';
	import {
		// hideChatTabBarNotify,
		// banDevtool,
		// isMobile,
		getTodayDate,
		newUuid
	} from '@/common/util.js';

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
			chatApiUrl: "https://api.im.mixbench.net/v1",
			newsApiUrl: "https://api.news01.cc/v1",
			AdList: [{
				uuid: newUuid(),
				article_type: -1, //廣告類型
				datetime: getTodayDate(),
				title: "我成功擺脫毛囊角化症啦！偶然發現絕妙方法，親測有效的方法分享給你們",
				cover: "https://img.alicdn.com/imgextra/i2/917298378/O1CN01j635bC2BlAwDppuwX_!!917298378.jpg",
				source: "肌膚護理",
				comment_count: "999+",
				article_url: "https://www.twjpf.com",
			}, {
				uuid: newUuid(),
				article_type: -1, //廣告類型
				datetime: getTodayDate(),
				title: "揭秘：69歲女人不長斑，“返老還童”的秘密",
				cover: "https://img.alicdn.com/imgextra/i3/917298378/O1CN01Salypn2BlAw0fnqbp_!!917298378.jpg",
				source: "頭條新聞",
				comment_count: "999+",
				article_url: "https://www.irisiii.com/",
			}, ],
		},
	};
</script>

<style>
	/*每个页面公共css */
	.uni-tabbar-bottom {
		display: flex !important;
		flex-direction: column !important;
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