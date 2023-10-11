<script>
	import 'animate.css';
	import {
		// hideChatTabBarNotify,
		// banDevtool,
		// isMobile,
		getTodayDate,
		newUuid
	} from '@/common/util.js';

	if (typeof window.news === "undefined") {
		window.news = {
			adData: [],
		}
	}
	//处理adItems
	const adData = window.news.adData;
	let adItems = []
	if (Array.isArray(adData)) {
		adItems = adData.map(item => {
			return {
				uuid: newUuid(),
				article_type: item.article_type || -1, //廣告類型
				datetime: item.datetime ||getTodayDate(),
				title: item.title,
				cover: item.cover,
				source: item.source,
				comment_count: item.comment_count,
				article_url: item.article_url,
			}
		});
	}

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
			adItems: adItems || [],
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