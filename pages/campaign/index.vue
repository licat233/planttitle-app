<template>
	<view class="fw">
		<view id="wrapper">
			<view id="banner" class="fw pr">
				<img src="/static/campaign/banner.png" alt="">
			</view>

			<view id="btns" class="tc">
				<view class="fl btn btns_lf">
					<text id="time_desc">{{ timeDesc }}時間:{{ time }}</text>
					<!-- <text id="time" class="fr tc">{{ time }}</text> -->
				</view>
				<view @click="myLotteryList" class="btn btns_rt fr pr">
					<text>查看中獎紀錄</text>
				</view>
			</view>

			<view id="card_box" class="pr">
				<!-- 卡牌區域 -->
				<view id="cards">
					<view v-for="(card, $index) in cardArrs" :key="$index" class="card" :class="card.cardFlipClass"
						:style="{ left: parseInt(cardWidth+13) * ($index%3) + 'px', top: parseInt(cardHeight+13) * Math.floor($index/3) + 'px' }"
						@click="clickCard(card, $index)">
						<view class="face front"></view>
						<view class="face back" :class="card.cardFlipClass ? 'flip' : ''"
							:style="{ backgroundImage: `url(${card['logoImgUrl']})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'contain' }">
						</view>
					</view>
				</view>

				<!--遊戲玩法說明-->
				<view class="popover_ fw" v-if="gameStatus==0">
					<view class="modal_">
						<view class="tc rule_title">遊戲玩法說明</view>
						<view id="rule_desc">
							<view>1. 在規定時間內，記憶牌面內容及位置；</view>
							<view>2. 遊戲中，點擊任意兩張牌，若相同則可翻開，規定時間內全部配對成功即過關；</view>
							<view>3. 順利過關可以獲得一次抽獎機會。</view>
						</view>
						<view id="mobile_box" class="tc">
							<input type="tel" name="mobile" v-model="mobile" maxlength="11" class="tc"
								placeholder="請輸入手機號碼" id="mobile_ipt" />
						</view>
						<view class="tc">
							<a class="start" :class="{ active: mobile }" @click="startGame"></a>
						</view>
					</view>
				</view>
			</view>
			<view class="rule-box">
				<view class="rule-tit">活動規則</view>
				<view>{{ ruleContent || '暫無內容' }}</view>
			</view>
		</view>

		<!--彈出層-->
		<view class="popover fw" :class="{'dn': showModalIndex==null}">

			<!---中獎紀錄-->
			<view class="modal m3" v-if="showModalIndex==3">
				<view class="head"></view>
				<view class="info tc">
					<view>請用手機號碼<text class="default_mobile">{{ mobile }}</text></view>
					<view>快捷登錄賬號後領取獎品</view>
				</view>
				<view class="contents tc">
					<view id="records" v-if="myLottery.length">
						<view v-for="(record, $index) in myLottery" :key="$index">{{ record }}</view>
					</view>
					<view id="records" v-else>暫無中獎記錄</view>
					<view>
						<text class="modal_btns" v-if="mobile" @click="receive" id="receive_btn">聯絡客服領獎</text>
					</view>
				</view>
				<text class="close_btn" @click="closeModal"></text>
			</view>

			<!---恭喜過關-->
			<view class="modal m4" v-if="showModalIndex==4">
				<view class="head"></view>
				<view class="contents tc">
					<view class="modal_tips">恭喜您，獲得了一次抽獎機會</view>
					<view>
						<text class="modal_btns active" id="lottery_btn" @click="lottery">趕快去抽獎</text>
					</view>
				</view>
			</view>

			<!---謝謝參與-->
			<view class="modal m5" v-if="showModalIndex==5">
				<view class="head"></view>
				<view class="contents tc">
					<view class="modal_tips">{{!showTip ? '手速不夠快，再來一次！' : '太遺憾了，獎品與你擦肩而過'}}</view>
					<view class="fw oh">
						<text class="modal_btns fl" @click="closeModal">關閉</text>
						<text class="modal_btns fr" @click="playAgain">再玩一次</text>
					</view>
				</view>
			</view>

			<!---恭喜中獎-->
			<view class="modal m7" v-if="showModalIndex==7">
				<view class="head"></view>
				<view class="contents">
					<view class="modal_tips tc">恭喜您獲得了：<text id="lottery_name">{{ lotteryName }}</text>哦～</view>
					<view class="fw oh">
						<text class="modal_btns fl" @click="myLotteryList">查看獎品</text>
						<text class="modal_btns fr" @click="playAgain">再玩一次</text>
					</view>
				</view>
				<text class="close_btn" @click="closeModal"></text>
			</view>

		</view>
	</view>
</template>

<script>
	const [TM1, TM2] = [10, 20] // 記憶時間和倒計時時間
	export default {
		data() {
			return {
				time: TM1, // 倒計時時間
				timeDesc: '', // 區分是記憶時間還是倒計時
				timer: null, // 計時器
				showTip: false, // 區別顯示modal5裏的提示文案
				mobile: '', // 手機號
				ruleContent: '', // 活動規則
				showModalIndex: null, // 當前顯示的遮罩
				gameStatus: 0, // 遊戲狀態
				myLottery: [], // 我的中獎記錄數組
				lotteryName: '', // 當前中獎的名稱
				cardArrs: [], // 卡牌列表
				cardWidth: 80, // 卡牌寬度
				cardHeight: 80, // 卡牌高度
				cardSelectedArr: [], // 臨時存放當前點擊的卡牌信息
				lastSelectedCard: null, // 點擊的上一張牌
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let self = this

				// 時間文案
				self.time = TM1
				self.timeDesc = '記憶'

				// 加載活動規則
				self.ruleContent =
					`填寫手機號，在記憶時間內看一遍所有卡牌，記憶時間（${TM1}秒）結束後開始遊戲，遊戲時間${TM2}秒，每點擊一張卡牌後，需要找到相同的另一張卡牌即可配對成功，所有卡牌匹配完成後即可獲得抽獎機會。`

				// 重置中獎的名稱
				self.lotteryName = '100元優惠券'

				// 加載卡牌列表（模擬真實數據）
				self.cardArrs = self.getCardData();

				// 打亂卡牌順序
				self.cardArrs = self.cardArrs.sort((a, b) => Math.random() - 0.5)

				// 初始化遊戲狀態
				self.initStatus(0)
			},
			initStatus(status = 0) {
				// 初始化遊戲狀態 0：未開始，1：記憶時間；2：倒計時時間
				this.gameStatus = status
			},
			getCardData() {
				return [{
						index: 0,
						logoImgUrl: '/static/campaign/img-1.jpg'
					},
					{
						index: 5,
						logoImgUrl: '/static/campaign/img-2.jpeg'
					},
					{
						index: 1,
						logoImgUrl: '/static/campaign/img-3.jpeg'
					},
					{
						index: 4,
						logoImgUrl: '/static/campaign/img-4.jpeg'
					},
					{
						index: 2,
						logoImgUrl: '/static/campaign/img-5.jpg'
					},
					{
						index: 3,
						logoImgUrl: '/static/campaign/img-6.jpg'
					},
					{
						index: 1,
						logoImgUrl: '/static/campaign/img-3.jpeg'
					},
					{
						index: 0,
						logoImgUrl: '/static/campaign/img-1.jpg'
					},
					{
						index: 5,
						logoImgUrl: '/static/campaign/img-2.jpeg'
					},
					{
						index: 2,
						logoImgUrl: '/static/campaign/img-5.jpg'
					},
					{
						index: 4,
						logoImgUrl: '/static/campaign/img-4.jpeg'
					},
					{
						index: 3,
						logoImgUrl: '/static/campaign/img-6.jpg'
					}
				];
			},
			startGame() {
				// 開始遊戲前
				let self = this
				// let telReg = !!self.mobile.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/)
				if (!self.mobile) {
					uni.showToast({
						title: '請輸入手機號碼',
						icon: 'none',
						duration: 2000
					})
				} else if (self.mobile.length < 6) {
					uni.showToast({
						title: '手機號碼格式錯誤',
						icon: 'none',
						duration: 2000
					})
				} else {
					// 已輸入手機號，準備開始
					uni.showToast({
						title: '準備開始記憶啦~',
						icon: 'none',
						duration: 2000
					})
					// 更改遊戲狀態為記憶階段
					self.initStatus(1)
					// 翻開所有牌子
					self.cardArrs.map(item => {
						item.cardFlipClass = 'card-flipped'
					})
					// 開始進入倒計時
					setTimeout(self.countdown, 1000)
				}
			},
			startPlaying() {
				// 倒計時 開始遊戲
				let self = this
				self.cardArrs.map(item => {
					item.cardFlipClass = '' // 恢復翻開的牌子
				})
				uni.showToast({
					title: '遊戲開始，加油！',
					icon: 'none',
					duration: 2000
				})
				setTimeout(function() {
					self.initStatus(2) // 更改狀態為倒計時階段，遊戲開始
					self.countdown()
				}, 500)
			},
			clickCard(card, index) {
				// 點擊卡牌
				let self = this
				if (self.gameStatus != 2) {
					uni.showToast({
						title: '遊戲還未開始！',
						icon: 'none',
						duration: 2000
					})
					return
				}
				// 防止重復點擊
				if (card.cardFlipClass === 'card-flipped' || card.cardStatus === 'success' || card.cardStatus === 'going')
					return

				// 給卡牌添加classname,表示已翻開
				card.cardFlipClass = 'card-flipped'
				card.cardStatus = 'going'

				// 記錄點擊的卡牌信息
				// self.cardSelectedArr.push(val)
				// 如果沒有上一張，則記錄
				if (!self.lastSelectedCard) {
					self.lastSelectedCard = card;
					return;
				}
				// console.log(card);

				// 若翻動了兩張牌，檢測一致性
				// if (self.cardSelectedArr.length === 2) {
				// if (self.lastSelectedCard === var) {
				// let timer = null;
				// clearTimeout(timer)
				// timer = 
				let lastSelectedCard = self.lastSelectedCard;
				let crrentCard = card
				// setTimeout(() => {
				// 檢查是否一致
				if (lastSelectedCard.index === crrentCard.index) {
					//如果一致
					lastSelectedCard.cardStatus = 'success';
					crrentCard.cardStatus = 'success';
					//判斷是否還有未翻開的牌
					let exist = self.cardArrs.some(c => c.cardStatus !== 'success')
					if (!exist) {
						// 遊戲結束,清除定時器，並初始化遊戲，顯示提示彈出層
						clearTimeout(self.timer)
						self.showTip = true
						self.showModal(4)
						self.init()
					}
				} else {
					//如果不一致
					setTimeout(() => {
						lastSelectedCard.cardFlipClass = '' // 恢復翻開的牌子
						lastSelectedCard.cardStatus = '' // 置空狀態
						crrentCard.cardFlipClass = '' // 恢復翻開的牌子
						crrentCard.cardStatus = '' // 置空狀態
					}, 300)
				}
				//清除記錄
				self.lastSelectedCard = null //清空上一张



				// for (let j = 0, jLen = self.cardArrs.length; j < jLen; j++) {
				// 	if (self.cardArrs[j].cardStatus === 'going') {
				// 		if (self.cardSelectedArr[0] != self.cardSelectedArr[1]) {
				// 			// 兩張卡牌不一致，重置
				// 			self.cardArrs[j].cardFlipClass = '' // 恢復翻開的牌子
				// 			self.cardArrs[j].cardStatus = '' // 置空狀態
				// 		} else {
				// 			// 兩張卡牌一致
				// 			self.cardArrs[j].cardStatus = 'success'
				// 		}
				// 	}
				// }
				// 清空數組，為了保證數組裏最多存在2條數據
				// self.cardSelectedArr = []
				// 判斷已點開卡牌數量和總數量是否相等，如果相等，表示遊戲結束
				// const flipedNum = self.cardArrs.filter(item => item.cardStatus === 'success').length
				// if (flipedNum == self.cardArrs.length) {
				// 	// 遊戲結束,清除定時器，並初始化遊戲，顯示提示彈出層
				// 	clearTimeout(self.timer)
				// 	self.showTip = true
				// 	self.showModal(4)
				// 	self.init()
				// }
				// }, 300)
				// }
			},
			lottery() {
				// 抽獎
				// 此處請求抽獎接口
				const status = 1 // 假設1為中獎狀態

				if (status === 1) {
					// 中獎了 演示而已
					const lotteryArr = ['特等獎', '一等獎', '二等獎', '三等獎', '安慰獎']
					let randomV = Math.floor(Math.random() * (lotteryArr.length + 1))
					this.lotteryName = lotteryArr[randomV] // 暫存獎品名稱
					this.myLottery.push(this.lotteryName)
					this.showModal(7)
				} else {
					// 未中獎
					this.showTip = false
					this.showModal(5)
				}
			},
			myLotteryList() {
				// 我的中獎紀錄
				if (!this.mobile) {
					uni.showToast({
						title: '請輸入手機號碼！',
						icon: 'none',
						duration: 2000
					})
					return
				}
				// 此處請求中獎記錄接口 TODO
				this.showModal(3)
			},
			playAgain() {
				// 再玩一次
				this.closeModal()
				this.init()
				this.startGame()
			},
			receive() {
				// 去領獎 TODO
				// uni.showToast({
				// 	title: '這裏的邏輯自己看著寫吧！',
				// 	icon: 'none',
				// 	duration: 2000
				// })
				uni.switchTab({
					url: "/pages/chat/index",
				})
			},
			showModal(index) {
				// 顯示遮罩層
				this.showModalIndex = index
				this.gameStatus != 0 && clearTimeout(this.timer) // 遊戲中顯示彈出層 暫停倒計時
			},
			closeModal() {
				// 關閉遮罩層
				this.showModalIndex = null
				this.gameStatus != 0 && this.countdown() // 關閉彈出框 繼續開始計時器
			},
			countdown() {
				// 倒計時
				let self = this
				if (self.time == 0) {
					// 計時結束
					if (self.gameStatus == 1) {
						// 如果狀態為記憶階段，則進入倒計時階段
						self.timeDesc = '倒計'
						self.time = TM2
						self.startPlaying()
					} else {
						// 重置為記憶階段
						self.timeDesc = '記憶'
						self.time = TM1
						self.showTip = false
						self.showModal(5)
						self.init()
					}
				} else {
					// 開啟定時器
					self.time--
					self.timer = setTimeout(self.countdown, 1000)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}
	@media screen and (min-width: 768px) {
		page {
			max-width: 450px;
		}
	}
	
	@media screen and (min-width: 450px) {
		page {
			min-width: 450px;
		}
	}
	/*公共样式*/
	.fw {
		width: 100%;
	}

	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.oh {
		overflow: hidden;
	}

	.pr {
		position: relative;
	}

	.tc {
		text-align: center;
	}

	.dn {
		display: none;
	}

	/*主体样式*/
	#wrapper {
		// background-color: #41d1eb;
		min-height: 100vh;
		background-image: linear-gradient(to bottom, #17bbe0, #42e4af);
	}

	#banner {
		// height: 192px;
		// max-width: 450px;
		// width: 100%;
		// height: 192px;
		// background: url('/static/campaign/banner.png') no-repeat center top;
		// background-size: 100% 100%;
	}
	
	#banner img{
		// max-width: 450px;
		width: 100%;
	}

	.rule-box {
		.rule-tit {
			font-size: 24px;
			font-weight: bold;
			margin-bottom: 20px;
		}

		padding: 20px;
		font-size: 18px;
		color: #fff;
	}

	#btns {
		height: 70rpx;
		margin: 0 4% 40rpx;
		padding-top: 10rpx;

		.btn {
			width: 35%;
			height: 40px;
			line-height: 40px;
			border-radius: 10px;
			display: inline-block;
			font-size: 20px;
			font-weight: 700;
			letter-spacing: 2px;

			&.btns_lf {
				background-color: #ffda48;
				color: #5b42e4;
				box-shadow: 0 0 6rpx #ffc838 inset;
			}

			&.btns_rt {
				background-color: #f46949;
				color: #fff;
				box-shadow: 0 0 6rpx #eb473b inset;
			}
		}

		#time {
			width: 52px;
			height: 52px;
			line-height: 52px;
			margin: 10px 10px 0 0;
			display: inline-block;
			font-size: 20px;
			color: #5b42e4;
			font-weight: 700;
			letter-spacing: 0;
		}
	}

	#card_box {
		width: 294px;
		margin: 0 auto;
		padding: 6rpx 0;
		background-color: #1bafd2;
		border-radius: 4rpx;

		#cards {
			width: 266px;
			height: 370px;
			margin: 22rpx auto auto;
			position: relative;

			.card {
				width: 80px;
				height: 80px;
				position: absolute;
				animation: flips2 .3s ease both;

				.face {
					width: 100%;
					height: 100%;
					position: absolute;
					z-index: 10;
					transition: all .3s ease;
					border-radius: 10rpx;
					backface-visibility: hidden;
				}

				.front {
					background: #2EC7E4;
					background-size: contain;
					z-index: 12;
				}

				.back {
					background-color: #fff;
					transform: rotateY(-180deg);
					z-index: 10;

					&.flip {
						z-index: 13;
						animation: flips .3s ease-in both;
					}
				}

				&.card-flipped {
					.front {
						z-index: 10;
						transform: rotateY(180deg);
					}

					.back {
						z-index: 12;
						animation: flips .3s ease-in both;
						background-size: contain;
					}
				}
			}
		}
	}

	@keyframes flips {
		100% {
			transform: rotateY(0deg);
		}
	}

	@keyframes flips2 {
		0% {
			transform: rotateY(0deg);
		}

		100% {
			transform: rotateY(180deg);
		}
	}

	/*弹出层*/
	.popover,
	.popover_ {
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .7);
		z-index: 333;
	}

	.popover_ {
		position: absolute;

		.modal_ {
			width: 92%;
			margin: 10% auto auto;
		}

		.rule_title {
			color: #0cf6ee;
			margin-bottom: 10px;
		}

		#rule_desc {
			margin: auto 3% 30px;
			color: #0cf6ee;
			font-size: 16px;
			line-height: 1.4;
			letter-spacing: 2px;
			margin-bottom: 10px;
		}

		#mobile_box {
			border-top: 2px solid #0cf6ee;
			padding-top: 20px;
		}

		#mobile_ipt {
			padding: 12px 10px;
			color: #333;
			font-size: 18px;
			background-color: #fff;
			border-radius: 10px;
			border: 0 none;
		}

		.start {
			width: 150px;
			height: 50px;
			margin-top: 20px;
			display: inline-block;
			background: url('/static/campaign/start_btn2.png') no-repeat center center;
			background-size: 84%;

			&.active {
				background: url('/static/campaign/start_btn.png') no-repeat center center;
				background-size: contain;
			}
		}
	}

	.popover {
		position: fixed;

		.modal {
			width: 90%;
			position: fixed;
			top: 15%;
			left: 5%;
			z-index: 334;
		}

		.close_btn {
			width: 80rpx;
			height: 80rpx;
			display: block;
			background: url('/static/campaign/close_btn.png') no-repeat center center;
			background-size: 60%;
			position: fixed;
			top: 8%;
			right: 0;
		}

		.head {
			width: 100%;
			height: 55px;
			border-top-left-radius: 6rpx;
			border-top-right-radius: 6rpx;
			background-size: 100% 100%;
			background-color: #08dbe7;
			background-position: center center;
			background-repeat: no-repeat;
		}

		.m2 .head {
			background-image: url('/static/campaign/t2.jpg');
		}

		.m3 .head {
			background-image: url('/static/campaign/t3.jpg');
		}

		.m4 .head {
			background-image: url('/static/campaign/t4.jpg');
		}

		.m5 .head {
			background-image: url('/static/campaign/t5.jpg');
		}

		.m7 .head {
			background-image: url('/static/campaign/t6.jpg');
		}

		.contents {
			background-color: #fff;
			padding: 40rpx;
			min-height: 160rpx;
			border-bottom-left-radius: 6prx;
			border-bottom-right-radius: 6prx;
		}

		.m2 .contents {
			height: 245px;
			font-size: 24rpx;
			overflow: auto;
			color: #9a9a9a;
			line-height: 36rpx;
			margin-bottom: 10rpx;
			letter-spacing: 2rpx;
		}

		.info {
			background-color: #1bdbdf;
			padding: 10rpx 0;
			line-height: 36rpx;
			color: #fff;
			font-size: 24rpx;
		}

		#records {
			height: 150px;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			color: #ff5f54;
			font-size: 24rpx;
		}

		.modal_btns {
			max-width: 200px;
			border-radius: 10rpx;
			display: inline-block;
			text-align: center;
			background-color: #ff5f54;
			color: #fff;
			font-size: 32rpx;
			letter-spacing: 4rpx;
			padding: 10rpx 20rpx;
			margin-top: 50rpx;

			&.fl {
				background-color: #19d4da;
			}

			&.fr {
				background-color: #ff5f54;
			}
		}

		#receive_btn {
			margin-top: 10rpx;
			border-radius: 20rpx;
		}

		.modal_tips {
			color: #a7a7a7;
			font-size: 28rpx;
			letter-spacing: 2rpx;
		}

		#lottery_btn {
			width: 140px;
		}
	}
</style>