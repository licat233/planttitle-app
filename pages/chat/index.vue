<template>
	<view class="consultcontainer">
		<view class="consultcontent">
			<view class="chatuibox">
				<view class="chatpanel">
					<view class="chatui">
						<view class="chatfriend">
							<view class="chatfriendbox">
								<image class="chatfriendlogo"
									src="https://img.alicdn.com/imgextra/i4/917298378/O1CN01gRKStN2BlAu0OuLrK_!!917298378.png"
									alt="" @click="showInfoDrawer()"></image>
								<view class="chatfriendname" @click="showInfoDrawer()"><embed
										src="/static/icon/chat/identified.svg" type="image/svg+xml">植題-問題肌膚修復</view>
								<view class="chatfriendicon">
									<view class="chatfriendseach">
										<embed src="/static/icon/chat/search.svg" type="image/svg+xml">
										<view class="chatfriendseachbtn" @mousedown="notSupport()"></view>
									</view>
									<view class="chatfriendinfo">
										<embed src="/static/icon/chat/info.svg" type="image/svg+xml">
										<view class="chatfriendinfobtn" @click="showInfoDrawer()"></view>
									</view>
									<view class="chatfriendmenu">
										<embed src="/static/icon/chat/menu.svg" type="image/svg+xml">
										<view class="chatfriendmenubtn" @mousedown="notSupport()"></view>
									</view>
								</view>
							</view>
						</view>
						<view class="chathistorybox">
							<!-- 聊天記錄區start -->
							<scroll-view class="chathistory" scroll-y :scroll-with-animation="scroller.animation"
								:scroll-top="scroller.top" :upper-threshold="0" scroll-anchoring
								@scrolltoupper="loadmore">
								<uni-list ref="chatList" class="uni-list_chat">
									<uni-list-item v-for="(msg, index) in massageStore" :key="msg.uuid"
										class="uni-list-item_chat" :border="false">
										<template v-slot:body>
											<msg-card :msg="msg" :msgList="massageStore" :isShowDate="isShowDate(index)"
												:showInfo="showInfoDrawer">
											</msg-card>
										</template>
									</uni-list-item>
								</uni-list>
							</scroll-view>
							<!-- 聊天記錄區end -->
						</view>
						<view class="chattoolbox">
							<view class="chattoolblock">
								<view class="chattool">
									<view class="chatinputtool animate__fadeIn" v-show="showChatInputTool">
										<view class="chattools">
											<view class="chatinputadd">
												<embed src="/static/icon/chat/add.svg" type="image/svg+xml">
												<view class="chatinputaddbtn" @mousedown="notSupport($event)"></view>
											</view>
											<view class="chatinputcamera">
												<embed src="/static/icon/chat/camera.svg" type="image/svg+xml">
												<view class="chatinputcamerabtn" @mousedown="notSupport($event)"></view>
											</view>
											<view class="chatinputimg">
												<embed src="/static/icon/chat/image.svg" type="image/svg+xml">
												<view class="chatinputimgbtn" @mousedown="notSupport($event)"></view>
											</view>
										</view>
									</view>
									<view class="chattoolright animate__fadeIn" @click="showChattoolright"
										v-show="!showChatInputTool">
										<embed src="/static/icon/chat/right.svg" type="image/svg+xml">
										<view class="chattoolrightbtn"></view>
									</view>
									<view class="chatinputbox" :style="chatinputboxStyle">
										<textarea class="chatinputtxt" @focus="inputFocus()" @blur="inputBlur()"
											@input="oninput()" type="text" v-bind:placeholder="placeholdertext"
											v-model="inputContext" rows="1" maxlength="800" name="chatinputtxt"
											wrap="hard" confirm-type="return" placeholder-class="placeholder-text"
											v-bind:focus="isFocus" @keydown="handleKeyDown" confirm-hold adjust-position
											disable-default-padding auto-blur auto-height />

										<view class="chatinputemoji">
											<view class="chatinputemojibox">
												<embed src="/static/icon/chat/smail.svg" type="image/svg+xml">
												<view class="chatinputemojibtn" @mousedown="notSupport($event)"></view>
											</view>
										</view>
									</view>
									<view class="chatinputmic" v-show="showChatInputMic">
										<embed src="/static/icon/chat/ic-mic-o.svg" type="image/svg+xml">
										<view class="chattoolmicbtn" @mousedown="notSupport($event)"></view>
									</view>
									<view class="chatinputsubmit" v-show="!showChatInputMic"
										@mousedown="submitMsg($event)">
										<embed src="/static/icon/chat/send.svg" type="image/svg+xml">
										<view class="chatinputsubmitbtn"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="chatDisclaimer"></view>
		</view>
		<uni-drawer ref="showInfoLeft" mode="left" :width="drawerWidth">
			<view class="scroll-view">
				<scroll-view class="scroll-view-box" scroll-y="true">
					<iframe src="https://zh.tw-wikipedia.com/wiki/anna" frameborder="0"
						style="width: 100%;height: 100%;"></iframe>
				</scroll-view>
			</view>
		</uni-drawer>
		<mpopup ref="alertmsgRef" :isdistance="true"></mpopup>
	</view>
</template>

<script>
	import msgCard from "./msg-card.nvue";
	import mpopup from "@/components/xuan-popup/xuan-popup.vue";
	import {
		hideChatTabBarNotify,
		getNowTime,
		isSameDay,
		msgTime,
		msgDate,
		showNotification
	} from "@/common/util.js";
	import {
		formatTimestamp
	} from "@/common/format.js";
	import * as func from "@/common/functions.js";
	import {
		nanoid
	} from 'nanoid';
	import "./uni.css";
	import axios from "axios";
	import {
		Channel,
		ChannelTypePerson,
		WKSDK,
		ConnectStatus,
		MessageText,
		MediaMessageContent,
	} from "wukongimjssdk";

	getApp().globalData.apiUrl = "http://api.im.catli.net/v1";

	if (!window.projectUuid) {
		window.projectUuid = "87b28048c7af4357af08a105d92ad45a"
	}

	// const api = new chat.ChatApi(getApp().globalData.apiClient);
	const MsgType = {
		VisitorMsgType: 0,
		KefuMsgType: 1,
		PublicMsgType: 2,
		SystemMsgType: 3,
		OnlineMsgType: 4,
		offlineMsgType: 5
	};

	export default {
		components: {
			msgCard,
			mpopup
		},
		data() {
			return {
				showChatInputTool: true,
				showChatInputMic: true,
				nowtime: getNowTime(),
				placeholdertext: "Aa",
				inputContext: "",
				massageStore: [],
				waiterAvatar: "https://img.alicdn.com/imgextra/i1/917298378/O1CN01Su4K112BlAqorDkFr_!!917298378.jpg",
				isShowInfo: false,
				scroller: {
					top: 0,
					animation: false,
				},
				isFocus: false,
				chatinputboxStyle: {
					height: "auto"
				},
				chatInputInitHeight: "34px",
				drawerWidth: 340,
				// ws: null,
				// wsconnStatus: false,
				// reloginCount: 0,
				isloadrecod: false,
				wsaddrs: [],
				loginInfo: {
					"token": "",
					"user_uid": "",
					"kefu_uid": "",
					"project_uid": window.projectUuid,
				},
				addrUsed: false,
				unreadMsgCount: 0,
			}
		},
		created() {

		},
		async mounted() {
			hideChatTabBarNotify();
			this.chatInputInitHeight = this.getChatinputboxHeight() + "px";
			this.scrollBottom();
			this.drawerWidth = this.getWindowWidth();

			let chatinputtxtE = document.querySelector(".chatinputtxt");
			chatinputtxtE.addEventListener("keydown", this.handleKeyDown);

			await this.startup(); //上线后需要放置到mounted生命周期中
		},
		watch() {
			//长度限制800
			if (this.inputContext.length > 800) {
				this.inputContext = String(this.inputContext).slice(0, 800);
			}
		},
		onLoad() {
			if (!("Notification" in window)) {
				console.log("This browser does not support notification functionality");
			} else {
				if (window.Notification.permission === "default" || window.Notification.permission === "denied") {
					window.Notification.requestPermission().then(function(permission) {
						if (permission === "granted") {
							// 用户允许显示通知
						} else if (permission === "denied") {
							// 用户拒绝显示通知
						}
					});
				}
			}
		},
		methods: {
			async startup() {
				const data = await this.visitorLogin();
				if (!data) return;
				const _this = this;
				WKSDK.shared().config.uid = this.loginInfo.user_uid; // 用户uid（需要在悟空通讯端注册过）
				WKSDK.shared().config.token = this.loginInfo.token; // 用户token （需要在悟空通讯端注册过）
				// 获取im连接地址
				WKSDK.shared().config.provider.connectAddrCallback = async (callback) => {
					if (!this.wsaddrs || this.wsaddrs.length == 0) {
						this.wsaddrs = await this.getWsaddrs()
					}
					if (this.wsaddrs.length > 0) {
						// console.log("connectAddrs--->", this.wsaddrs)
						this.addrUsed = true
						callback(this.wsaddrs[0])
					}
				}
				// 连接
				WKSDK.shared().connectManager.connect();
				// 连接状态监听
				WKSDK.shared().connectManager.addConnectStatusListener(
					(status, reasonCode) => {
						if (status === ConnectStatus.Connected) {
							console.log('连接成功');
						} else if (status === ConnectStatus.Disconnect) {
							if (this.addrUsed && this.wsaddrs.length > 1) {
								const oldwsAddr = this.wsaddrs[0]
								this.wsaddrs.splice(0, 1)
								this.wsaddrs.push(oldwsAddr)
								this.addrUsed = false
								console.log("连接失败！切换地址->", this.wsaddrs)
							}
						} else {
							console.log('连接失败', reasonCode); //  reasonCode: 2表示认证失败（uid或token错误）
						}
					},
				);
				// 消息发送状态监听
				WKSDK.shared().chatManager.addMessageStatusListener((packet) => {
					// console.log('消息clientSeq->', packet.clientSeq); // 客户端序号用来匹配对应的发送的消息
					// if (packet.reasonCode === 1) {
					// 	// 发送成功
					// 	console.log("发送成功")
					// } else {
					// 	// 发送失败
					// 	console.log("发送失败")
					// }
				});
				// 消息监听
				WKSDK.shared().chatManager.addMessageListener((message) => {
					// console.log(message)
					//只接收个人频道的消息
					if (message.channel.channelType !== ChannelTypePerson) return;
					this.massageStore.push(message);
					//缓存至本地: 1.先读取，再写入
					this.saveCacheMessages(this.massageStore);
					//消息提醒
					this.messageNotification(message);
					this.notifyMessage(message);
				});
				// 提供频道内消息同步的数据源
				WKSDK.shared().config.provider.syncMessagesCallback = async (channel, opts) => {
					// 后端提供的获取某个频道的消息列表的接口数据，然后构建成Message对象数组返回
					return this.getCacheMessages();
				}
				//加载聊天记录
				this.loadChatRecod();
			},
			loadChatRecod(callback) {
				const _this = this
				if (!this.isloadrecod) {
					this.isloadrecod = true;
					const messages = this.getCacheMessages();
					this.massageStore.push(...messages);
				}
			},
			notifyMessage(message) {
				const isSelf = this.authMsgFromSelf(message);
				if (isSelf) return

				if (window.Notification.permission !== 'granted') return;
				let content = "";
				if (typeof this.msg?.contentType !== "number") return false
				let contentType = this.msg.content.realContentType || this.msg.content._contentType || this.msg.content
					?.contentObj?.type
				switch (contentType) {
					case 1, undefined:
						//文本消息
						let text = this.msg.content.text || this.msg.content?.contentObj?.content
						if (typeof text !== "string") {
							return false
						}
						text = text.trim()
						if (text.length === 0) return false;
						content = text
					case 2:
						//图片消息
						let url = this.msg.content?.contentObj?.url
						if (!url) return false
						url = url + ""
						if (url.trim().length === 0) return false
						content = [圖片]
					default:
						//其它类型消息，暂不支持
						return false
				}
				showNotification("新訊息", {
					body: content,
					icon: "/static/favicon.ico" // 可选的图标路径
				}, () => {
					uni.switchTab({
						url: "/pages/chat/index",
					})
				});
			},
			//发送message
			sendMessage(message) {
				WKSDK.shared().chatManager.send(message, new Channel(this.loginInfo.kefu_uid, ChannelTypePerson))
			},
			//用户登录
			async visitorLogin() {
				if (!getApp().globalData.apiUrl) return
				const cacheValue = localStorage.getItem("loginInfo")
				let loginInfo = null
				try {
					loginInfo = JSON.parse(cacheValue)
				} catch (e) {
					//TODO handle the exception
				}

				const _this = this
				return axios.post(`${getApp().globalData.apiUrl}/visitor/login`, {
						"platform": window.navigator.platform,
						"referer": window.location.href,
						"projectUuid": window.projectUuid,
						"token": loginInfo?.token || "",
					})
					.then(function(response) {
						_this.loginInfo = response.data;
						localStorage.setItem("loginInfo", JSON.stringify(response.data));
						getApp().globalData.chatUid = response.data?.user_uid || ""
						return response.data
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			async getWsaddrs() {
				// if (!this.loginInfo || !this.loginInfo.uuid) return [];
				return axios.get(`${getApp().globalData.apiUrl}/users/${this.loginInfo.uuid}/im`).then(resp => {
					const data = resp.data
					let addr = data.wss_addr
					if (!addr || addr === '') {
						addr = data.ws_addr
					}
					return [addr]
				})
			},
			getCacheMessages() {
				const key = "chatonlineMessages";
				const messagesText = localStorage.getItem(key);
				let messages = [];
				try {
					messages = JSON.parse(messagesText);
				} catch (e) {
					//TODO handle the exception
				} finally {
					if (!Array.isArray(messages)) {
						localStorage.removeItem(key);
						messages = [];
					}
				}
				return messages;
			},
			saveCacheMessages(messages) {
				const messagesText = JSON.stringify(messages);
				const key = "chatonlineMessages";
				localStorage.setItem(key, messagesText);
			},
			authMsgFromSelf(msg) {
				return msg.fromUID === getApp().globalData.chatUid || msg.channel.channelID !== msg.fromUID
			},
			showChattoolright: function() {
				this.style.display = "";
				showChatInputTool = true;
			},
			inputFocus() {
				this.placeholdertext = "輸入消息";
				this.showChatInputTool = false;
				this.chatinputboxStyle.height = "auto";
				this.inputScrollBottom()
				uni.hideTabBar()
				let tabbarE = document.querySelector(".uni-tabbar-bottom");
				if (!tabbarE) return
				tabbarE.style.height = 0;
				tabbarE.style.zIndex = -99;
			},
			inputBlur() {
				//blur事件优先于click事件，会阻止click事件的触发
				//解决方案①：使用延迟压栈，解决click与blur事件冲突问题
				// let _this = this;
				// setTimeout(()=>{
				// 	_this.onBlurHandle()
				// });
				//解决方案②：使用mousedown事件替代click事件，mousedown按下即可触发，不需要松开才触发
				//由于点击发送后，会发生丢失焦点，收起键盘，再发第二条信息时，又要点击一次获取焦点，很麻烦
				//解决方案: 如果是点击了发送按钮，则保持焦点
				this.onBlurHandle()
				//延迟压栈，渲染完成后再滚动到底部
				let _this = this
				setTimeout(() => {
					_this.inputScrollBottom()
				})
			},
			onBlurHandle() {
				this.placeholdertext = "Aa";
				this.showChatInputTool = true;
				this.chatinputboxStyle.height = this.chatInputInitHeight;
				uni.showTabBar()
				let tabbarE = document.querySelector(".uni-tabbar-bottom");
				if (!tabbarE) return
				tabbarE.style.height = "";
				tabbarE.style.zIndex = "";
			},
			oninput() {
				if (this.inputContext.length === 0) {
					this.showChatInputMic = true;
				} else {
					this.showChatInputMic = false;
				}
			},
			submitMsg(event) {
				let text = this.inputContext.trim();
				this.inputContext = "";
				if (text.length === 0) {
					return;
				}
				this.sendMessage(new MessageText(text));
				this.holdFocus = true; //保持聚焦
				this.isFocus = true;
				this.oninput();
				//压栈，渲染完成后再执行
				setTimeout(() => {
					this.scrollBottom(true);
				});
				//防止阻止系统默认(行为)，主要是为了阻止onblur事件
				event && event.preventDefault && event.preventDefault();
			},
			// doSend(e) {
			// 	if (e.ctrlKey && e.keyCode === 13) {
			// 		//用户点击了ctrl+enter触发
			// 		this.inputContext += '\n';
			// 	} else if (e.shiftKey && e.keyCode === 13) {
			// 		//shift+enter组合
			// 		this.inputContext += '\n';
			// 	} else {
			// 		//用户点击了enter触发    执行一些逻辑方法
			// 		if (e !== undefined) {
			// 			//发送消息的方法
			// 			this.submitMsg();
			// 			// 阻止浏览器默认的敲击回车换行的方法
			// 			e.preventDefault && e.preventDefault();
			// 		}
			// 	}
			// },
			handleKeyDown(event) {
				if (event.shiftKey && event.keyCode === 13) {
					// 按下 Shift+Enter，添加换行符
					this.inputContext += '\n';
				} else if (!event.shiftKey && event.keyCode === 13) {
					// 按下 Enter，发送消息
					event.preventDefault(); // 阻止默认的换行行为
					this.submitMsg(event);
				}
			},
			scrollBottom(animation = false) {
				//获取内容高度,滚动到底部
				uni.createSelectorQuery().in(this).select(".uni-list_chat").boundingClientRect(data => {
					let height = Math.round(data.height);
					this.scroller.animation = animation;
					this.scroller.top = height;
				}).exec();
			},
			inputScrollBottom() {
				// let height = 0;
				// uni.createSelectorQuery().in(this).select(".uni-textarea-textarea").boundingClientRect(data => {
				// 	height = data.height;
				// }).exec();
				let chatinputtxtE = document.querySelector(".chatinputtxt");
				if (!chatinputtxtE) return;
				chatinputtxtE.scrollTo(0, 10000);
			},
			isShowDate(currentIndex) {
				const lastIndex = currentIndex - 1;
				if (lastIndex < 0) return true;
				const lastMsg = this.massageStore[lastIndex];
				if (!lastMsg) return true;
				const currentMsg = this.massageStore[currentIndex];
				if (!currentMsg) return true;
				if (!lastMsg.timestamp || !currentMsg.timestamp) return true;
				return !isSameDay(lastMsg.timestamp, currentMsg.timestamp);
			},
			loadmore() {
				// console.log("loadmore");
			},
			showInfoDrawer() {
				this.drawerWidth = this.getWindowWidth();
				this.$refs.showInfoLeft.open();
			},
			closeInfoDrawer() {
				this.$refs.showInfoLeft.close();
			},
			notSupport(event) {
				let msg = this.$t('common.notSupport');
				this.$refs.alertmsgRef.open({
					type: 'warn',
					content: msg,
					timeout: 1000,
					isClick: false
				});
				event && event.preventDefault && event.preventDefault();
			},
			warnMessage(msg) {
				if (!msg) return
				this.$refs.alertmsgRef.open({
					type: 'warn',
					content: msg,
					timeout: 1000,
					isClick: false
				});
			},
			errorMessage(msg) {
				if (!msg) return
				this.$refs.alertmsgRef.open({
					type: 'err',
					content: msg,
					timeout: 1000,
					isClick: false
				});
			},
			getChatinputboxHeight() {
				let height = 34
				uni.createSelectorQuery().in(this).select(".chatinputbox").boundingClientRect(data => {
					height = data.height
				}).exec();
				return height;
			},
			getWindowWidth() {
				let getWindowInfo = uni.getWindowInfo();
				return getWindowInfo.windowWidth
			},
			messageNotification(message) {
				//todo: 监听是否处于当前窗口
				if (this.unreadMsgCount < 1) {
					uni.removeTabBarBadge({
						index: 3
					})
					return
				}
				uni.setTabBarBadge({
					index: 3,
					text: this.unreadMsgCount + ""
				})

			}
		},
	}


	function goodbye() {
		return "確定離開當前頁面嗎？...";
	}

	function trim(s) {
		return trimRight(trimLeft(s));
	}
	//去掉左边的空白  
	function trimLeft(s) {
		if (s == null) {
			return "";
		}
		let whitespace = new String(" \t\n\r");
		let str = new String(s);
		if (whitespace.indexOf(str.charAt(0)) != -1) {
			let j = 0,
				i = str.length;
			while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
				j++;
			}
			str = str.substring(j, i);
		}
		return str;
	}

	//去掉右边的空白 
	function trimRight(s) {
		if (s == null) return "";
		let whitespace = new String(" \t\n\r");
		let str = new String(s);
		if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
			let i = str.length - 1;
			while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
				i--;
			}
			str = str.substring(0, i + 1);
		}
		return str;
	}
</script>

<style>
	page {
		height: 100%;
		min-height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	* {
		box-sizing: border-box;
	}

	.consultcontainer {
		height: 100%;
		min-height: 100%;
		width: 100%;
	}

	@media screen and (min-width: 768px) {
		page {
			max-width: 450px;
		}
	}

	.consultcontent {
		padding: 3px;
		height: 100%;
		overflow: hidden;
		background-color: #fff;
	}

	.chatuibox {
		height: 100%;
		width: 100%;
		max-width: 100%;
		font-family: 黑體-繁, 微軟正黑體, Microsoft JhengHei, sans-serif !important;
		letter-spacing: 1px;
	}

	.chatpanel {
		height: 100%;
		width: 100%;
	}

	.chatui {
		background-color: #fff;
		height: 100%;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-direction: column;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.chatfriend {
		height: 40px;
		min-height: 40px;
		width: 100%;
		position: relative;
		background-color: #85a1d2;
	}

	.chatfriendbox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 10px;
		height: 100%;
	}

	.chatfriendlogo {
		overflow: hidden;
		height: 20px;
		width: 15px;
		margin-right: 5px;
		background-color: #fff;
	}

	.chatfriendname {
		text-align: left;
		font-size: 16px;
		font-weight: bold;
		height: 20px;
		line-height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.chatfriendname>embed {
		display: inline-block;
		height: 20px;
		line-height: 20px;
		vertical-align: baseline;
	}

	.chatfriendicon {
		display: flex;
	}

	.chatfriendseach,
	.chatfriendinfo,
	.chatfriendmenu {
		height: 20px;
		position: relative;
		margin-left: 10px;
	}

	.chatfriendseach {
		display: none;
	}

	.chatfriendinfo>embed {
		height: 20px;
	}

	.chatfriendmenu>embed {
		height: 20px;
	}

	.chatfriendseach>embed {
		height: 20px;
	}

	.chatfriendinfobtn,
	.chatfriendmenubtn,
	.chatfriendseachbtn {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
	}

	.chathistorybox {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #85a1d2;
	}

	.chathistory {
		height: 100%;
		width: 100%;
		overflow-y: auto;
		padding: 0 5px 4px;
		box-sizing: border-box;
	}

	/* 聊天记录style */
	.uni-list_chat {
		background: none;
		padding-bottom: 50px;
	}

	.uni-list-item_chat {
		width: 100%;
		box-sizing: border-box;
		background: none;
		border: none;
	}

	/* end聊天记录 */

	.chattoolbox {
		min-height: 42px;
		width: 100%;
		padding: 5px 10px;
		background-color: #fff;
		overflow: hidden;
		height: auto;
		flex: none;
	}

	.chattoolblock {
		display: block;
		box-sizing: border-box;
	}

	.chattool {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.chattool embed {
		height: 100%;
		width: 100%;
	}

	.chattools {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-right: 5px;
		height: 32px;
	}

	.chattoolright {
		position: relative;
		height: 32px;
		width: 20px;
		min-width: 20px;
		margin-right: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.chattoolrightbtn {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.chatinputimg,
	.chatinputcamera,
	.chatinputadd {
		width: 22px;
		min-width: 22px;
		height: 22px;
		margin-right: 10px;
		position: relative;
	}

	.chatinputmic {
		margin: 0;
		width: 20px;
		min-width: 20px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.chatinputimgbtn,
	.chatinputcamerabtn,
	.chatinputaddbtn,
	.chatinputmicbtn,
	.chattoolmicbtn,
	.chatinputsubmitbtn {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.chatinputimg>embed {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.chatinputsubmit {
		margin: 0;
		width: 22px;
		min-width: 22px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.chatinputsubmit>embed {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.chatinputbox {
		width: 100%;
		height: auto;
		max-height: 180px;
		border-radius: 15px;
		background-color: #f5f5f5;
		border: 1px solid #e4e4e4;
		position: relative;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		padding: 3px 8px;
		transition: width .3s;
		-webkit-transition: width .3s;
		margin-right: 10px;
		overflow: hidden;
	}

	.chatinputcontent {
		min-height: 26px;
		width: 100%;
		position: relative;
	}

	.chatinputcontentlabel {
		position: absolute;
		left: 8px;
		color: gray;
		font-size: 12px;
		height: 26px;
		line-height: 26px;
		text-align: left;
	}

	.chatinputtxt {
		outline: none;
		border: 0;
		background-color: inherit;
		font-size: 16px;
		width: 100%;
		height: auto;
		max-height: 180px;
		line-height: 26px;
		min-height: 26px;
		overflow-y: auto;
	}

	.auto-height {
		height: auto;
	}

	.placeholder-text {
		color: #999;
		font-size: 12px;
		line-height: 26px;
	}

	.chatinputtxt::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #999;
		font-size: 12px;
		line-height: 26px;
	}

	.chatinputtxt::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #999;
		font-size: 12px;
		line-height: 26px;
	}

	.chatinputtxt::-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #999;
		font-size: 12px;
		line-height: 26px;
	}

	.chatinputemoji {
		position: relative;
		width: 20px;
		min-width: 20px;
		height: 26px;
		overflow: hidden;
	}

	.chatinputemojibox {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.chatinputemojibox>embed {
		width: 20px;
		height: 20px;
	}

	.chatinputemojibtn {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.scroll-view {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1
	}

	.scroll-view-box {
		flex: 1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.chatDisclaimer {
		width: 100%;
	}
</style>