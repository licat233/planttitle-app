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
			}
		},
		onLaunch: function() {
			console.log('App Launch');
			hideChatTabBarNotify();
			this.initDeviceInfo();
			this.initVisitorInfo();
		},
		onShow: function() {
			console.log('App Show');
			// this.initFullScreen();
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			//初始化用户信息，此处主要用于判断用户的来源，以及以往的接待的客服
			initVisitorInfo() {
				let info = null;
				uni.getStorage({
					key: "visitor",
					success(data) {
						info = data;
					},
					fail(err) {
						console.log(err)
					}
				});
				//加入版本号，以主动更新缓存，
				//构建或者更新用户基本信息
				let version = getApp().globalData.device.details.appVersion;
				let refer = getReferer() || "直接訪問";
				if (refer == window.location.href){
					refer = "直接訪問"
				}
				if (!info || !info.version) { //构建用户信息
					info = {
						id: 0,
						created_at: new Date().getTime(),
						updated_at: null,
						deleted_at: null,
						name: "visitor",
						avator: "/static/icon/common/user.svg",
						source_ip: "",
						to_id: "",
						visitor_id: "",
						status: 0,
						refer: refer,
						city: "",
						client_ip: "",
						location: "",
						extra: "",
						version: version
					}
					try{
						uni.setStorageSync("visitor", info);
					}catch(e){
						//TODO handle the exception
						console.log(e)
					}
				}else if(info && info.version !== version) { //更新用户信息，注意：这里仅仅是本地更新，不涉及xhr更新
					let newInfo = {}; //后续新版本如果需要设置新的属性，请在这里加入
					let oldInfo = info;
					//Object.assign文档地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign;
					//注意，info只能是浅对象，因为Object.assign只能复制属性，无法深度拷贝
					Object.assign(newInfo, oldInfo); //Object.assign() 不会在 oldInfo 对象值为 null 或 undefined 时抛出错误
					//存储
					try{
						uni.setStorageSync("visitor", newInfo);
					}catch(e){
						//TODO handle the exception
						console.log(e)
					}
				}
				
				getApp().globalData.visitor = info;
				// console.log(info);
			},
			//初始化设备信息
			initDeviceInfo() {
				//获取设备信息
				var summary = browserDetection();
				let device = getApp().globalData.device;
				device.summary = summary;
				uni.getSystemInfo({
					success: res => {
						device.details = res;
					}
				});
				console.log(device);
			}
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
		display: block !important;
	}
	
	.uni-tabbar-bottom .uni-tabbar{
		min-width: 320px;
	}
	
	body,#app{
		min-width: 320px;
	}

	image,
	img {
		-webkit-user-drag: none;
	}
</style>
