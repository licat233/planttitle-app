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
									<uni-list-item v-for="(msg, index) in dataList" :key="msg._id"
										class="uni-list-item_chat" :border="false">
										<template v-slot:body>
											<msgItem :msg="msg" :msgList="dataList" :isShowDate="isShowDate(index)"
												:showInfo="showInfoDrawer" />
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
											v-bind:focus="isFocus" confirm-hold adjust-position disable-default-padding
											auto-blur auto-height />

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
	import msgItem from "./msg-item.nvue";
	import mpopup from "@/components/xuan-popup/xuan-popup.vue";
	import {
		hideChatTabBarNotify,
		getNowTime,
		isSameDay,
		msgTime,
		msgDate
	} from "@/common/util.js";
	import * as func from "@/common/functions.js";
	import {
		nanoid
	} from 'nanoid';
	import "./uni.css";
	import axios from "axios";

	export default {
		components: {
			msgItem,
			mpopup
		},
		data() {
			return {
				showChatInputTool: true,
				showChatInputMic: true,
				nowtime: getNowTime(),
				placeholdertext: "Aa",
				inputContext: "",
				dataList: [],
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
				drawerWidth: 340
			}
		},
		created() {
			this.initData(); //上线后需要放置到mounted生命周期中
		},
		async mounted(){
			hideChatTabBarNotify();
			this.chatInputInitHeight = this.getChatinputboxHeight() + "px";
			this.scrollBottom();
			this.drawerWidth = this.getWindowWidth();
			await this.VisitorLogin();
		},
		methods: {
			//用户登录
			async VisitorLogin() {
				let info = getApp().globalData.visitor
				try{
					
				}catch(e){
					//TODO handle the exception
				}
				await axios.post("http://localhost:81/visitor_login", { visitor_id: info.visitor_id, refer: info.refer, to_id: info.to_id, extra: info.extra }).then((resp)=>{
					console.log(resp);
					//每次请求完都要重新设置一下用户信息
				}).catch((err)=>{
					console.log(err);
				});
				
				getApp().globalData.visitor = info;
				// console.log(info);
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
				let messagetxt = this.inputContext.trim();
				this.inputContext = "";
				if (messagetxt.length === 0) {
					return;
				}
				const msg = {
					_id: nanoid(),
					state: 0,
					timestamp: new Date().getTime(),
					contentType: 0,
					content: messagetxt,
					isSelf: true,
					error: "",
				};
				this.dataList.push(msg);
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
			doSend(e) {
				if (e.ctrlKey && e.keyCode === 13) {
					//用户点击了ctrl+enter触发
					this.inputContext += '\n';
				} else {
					//用户点击了enter触发    执行一些逻辑方法
					if (e !== undefined) {
						//发送消息的方法
						this.submitMsg();
						// 阻止浏览器默认的敲击回车换行的方法
						e.preventDefault && e.preventDefault();
					}
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
			initData() {
				const firstMsg = {
					_id: nanoid(),
					state: 0, //0-未读，1-已读
					timestamp: new Date().getTime(), //时间戳
					content: "你好！我是Anna老師，請問有什麼可以幫您？ \n皺紋問題請回 1 \n色斑問題請回 2 \n眼袋問題請回 3 \n其它肌膚問題請回 4", //内容
					contentType: 0, //消息類型
					isSelf: false, //发件人
					error: "",
				};
				const data = [];
				for (let i = 0; i < 1; i++) {
					const msg = JSON.parse(JSON.stringify(firstMsg));
					msg._id = nanoid();
					data.push(msg);
				}
				const selfMsg = {
					_id: nanoid(),
					state: 0, //0-未读，1-已读
					timestamp: new Date().getTime(), //时间戳
					content: "你好！\n 人工客服", //内容
					contentType: 0, //消息類型
					isSelf: true, //发件人
					error: "",
				};
				
				selfMsg.content = JSON.stringify(getApp().globalData.device.summary);
				data.push(selfMsg);
				this.dataList = data;
			},
			isShowDate(currentIndex) {
				const lastIndex = currentIndex - 1;
				if (lastIndex < 0) return true;
				const lastMsg = this.dataList[lastIndex];
				if (!lastMsg) return true;
				const currentMsg = this.dataList[currentIndex];
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
			}
		},
		//获取当前用户信息
		getUserInfo: function() {
			let obj = this.getCache("visitor");
			var visitor_id = ""
			var to_id = KEFU_ID;
			if (obj) {
				visitor_id = obj.visitor_id;
				//to_id=obj.to_id;
			}
			let _this = this;
			var extra = getQuery("extra");
			//发送消息
			$.post("/visitor_login", {
				visitor_id: visitor_id,
				refer: REFER,
				to_id: to_id,
				extra: extra
			}, function(res) {
				if (res.code != 200) {
					_this.$message({
						message: res.msg,
						type: 'error'
					});
					_this.sendDisabled = true;
					return;
				}
				_this.visitor = res.result;
				_this.setCache("visitor", res.result);
				//_this.getMesssagesByVisitorId();
				_this.initConn();
			});
		},
	}

	function messageContentHandle(str) {
		let arr = new Array();
		for (let i = 0; i < str.length; i++) {
			arr[i] = htmlEscape(str[i]);
		}
		let result = arr.join("");
		result = trim(result);
		result = result.replace(/\r\n/g, "<br>");
		result = result.replace(/\n/g, "<br>");
		result = result.replace(/(\r\n)|(\n)/g, '<br>');
		result = result.replace(/\s/g, "&nbsp;");
		arr = null;
		return result;
	}

	function htmlEscape(text) {
		switch (text) {
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case "\"":
				return "&quot;";
			default:
				return text;
		}
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
	}

	* {
		box-sizing: border-box;
	}

	.consultcontainer {
		height: 100%;
		min-height: 100%;
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
