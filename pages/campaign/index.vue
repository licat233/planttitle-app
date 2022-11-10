<template>
	<view class="fw">
		<view id="wrapper">
			<view id="banner" class="fw pr"></view>

			<view id="btns" class="tc">
				<view class="fl btn btns_lf">
					<text id="time_desc">{{ timeDesc }}时间:</text>
					<text id="time" class="fr tc">{{ time }}</text>
				</view>
				<view @click="myLotteryList" class="btn btns_rt fr pr">
					<text>查看中奖纪录</text>
				</view>
			</view>

			<view id="card_box" class="pr">
				<!-- 卡牌区域 -->
				<view id="cards">
					<view v-for="(card, $index) in cardArrs" :key="$index"
						class="card"
						:class="card.cardFlipClass"
						:style="{ left: parseInt(cardWidth+13) * ($index%3) + 'px', top: parseInt(cardHeight+13) * Math.floor($index/3) + 'px' }"
						@click="clickCard(card['index'], $index)"
						>
						<view class="face front"></view>
						<view class="face back" :class="card.cardFlipClass ? 'flip' : ''" :style="{ backgroundImage: `url(${card['logoImgUrl']})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'contain' }"></view>
					</view>
				</view>

				<!--游戏玩法说明-->
				<view class="popover_ fw" v-if="gameStatus==0">
					<view class="modal_">
						<view class="tc rule_title">游戏玩法说明</view>
						<view id="rule_desc">
							<view>1. 在规定时间内，记忆牌面内容及位置；</view>
							<view>2. 游戏中，点击任意两张牌，若相同则可翻开，规定时间内全部配对成功即过关；</view>
							<view>3. 顺利过关可以获得一次抽奖机会。</view>
						</view>
						<view id="mobile_box" class="tc">
							<input type="tel" name="mobile" v-model="mobile" maxlength="11" class="tc"
								placeholder="请输入手机号码" id="mobile_ipt" />
						</view>
						<view class="tc">
							<a class="start" :class="{ active: mobile }" @click="startGame"></a>
						</view>
					</view>
				</view>
			</view>
			<view class="rule-box">
				<view class="rule-tit">活动规则</view>
				<view >{{ ruleContent || '暂无内容' }}</view>
			</view>
		</view>

		<!--弹出层-->
		<view class="popover fw" :class="{'dn': showModalIndex==null}">

			<!---中奖纪录-->
			<view class="modal m3" v-if="showModalIndex==3">
				<view class="head"></view>
				<view class="info tc">
					<view>请用手机号码<text class="default_mobile">{{ mobile }}</text></view>
					<view>快捷登录账号后领取奖品</view>
				</view>
				<view class="contents tc">
					<view id="records" v-if="myLottery.length">
						<view v-for="(record, $index) in myLottery" :key="$index">{{ record }}</view>
					</view>
					<view id="records" v-else>暂无中奖记录</view>
					<view>
						<text class="modal_btns" v-if="mobile" @click="receive" id="receive_btn">去领奖</text>
					</view>
				</view>
				<text class="close_btn" @click="closeModal"></text>
			</view>

			<!---恭喜过关-->
			<view class="modal m4" v-if="showModalIndex==4">
				<view class="head"></view>
				<view class="contents tc">
					<view class="modal_tips">恭喜您，获得了一次抽奖机会</view>
					<view>
						<text class="modal_btns active" id="lottery_btn" @click="lottery">赶快去抽奖</text>
					</view>
				</view>
			</view>

			<!---谢谢参与-->
			<view class="modal m5" v-if="showModalIndex==5">
				<view class="head"></view>
				<view class="contents tc">
					<view class="modal_tips">{{!showTip ? '手速不够快，再来一次！' : '太遗憾了，奖品与你擦肩而过'}}</view>
					<view class="fw oh">
						<text class="modal_btns fl" @click="closeModal">关闭</text>
						<text class="modal_btns fr" @click="playAgain">再玩一次</text>
					</view>
				</view>
			</view>

			<!---恭喜中奖-->
			<view class="modal m7" v-if="showModalIndex==7">
				<view class="head"></view>
				<view class="contents">
					<view class="modal_tips tc">恭喜您获得了：<text id="lottery_name">{{ lotteryName }}</text>哦～</view>
					<view class="fw oh">
						<text class="modal_btns fl" @click="myLotteryList">查看奖品</text>
						<text class="modal_btns fr" @click="playAgain">再玩一次</text>
					</view>
				</view>
				<text class="close_btn" @click="closeModal"></text>
			</view>

		</view>
	</view>
</template>

<script>
	const [TM1, TM2] = [10, 20] // 记忆时间和倒计时时间
	export default {
		data () {
			return {
				time: TM1, // 倒计时时间
				timeDesc: '', // 区分是记忆时间还是倒计时
				timer: null, // 计时器
				showTip: false, // 区别显示modal5里的提示文案
				mobile: '', // 手机号
				ruleContent: '', // 活动规则
				showModalIndex: null, // 当前显示的遮罩
				gameStatus: 0, // 游戏状态
				myLottery: [], // 我的中奖记录数组
				lotteryName: '', // 当前中奖的名称
				cardArrs: [], // 卡牌列表
				cardWidth: 80, // 卡牌宽度
				cardHeight: 80, // 卡牌高度
				cardSelectedArr: [] // 临时存放当前点击的卡牌信息
			}
		},
		mounted () {
			this.init()
		},
		methods: {
			init () {
				let self = this
				
				// 时间文案
				self.time = TM1
				self.timeDesc = '记忆'

				// 加载活动规则
				self.ruleContent = `填写手机号，在记忆时间内看一遍所有卡牌，记忆时间（${TM1}秒）结束后开始游戏，游戏时间${TM2}秒，每点击一张卡牌后，需要找到相同的另一张卡牌即可配对成功，所有卡牌匹配完成后即可获得抽奖机会。`

				// 重置中奖的名称
				self.lotteryName = ''

				// 加载卡牌列表（模拟真实数据）
				self.cardArrs = [
					{
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
				]

				// 初始化游戏状态
				self.initStatus(0)
			},
			initStatus (status = 0) {
				// 初始化游戏状态 0：未开始，1：记忆时间；2：倒计时时间
				this.gameStatus = status
			},
			startGame () {
				// 开始游戏前
				let self = this
				let telReg = !!self.mobile.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/)
				if (!self.mobile) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none',
						duration: 2000
					})
				} else if (self.mobile.length != 11 || telReg == false) {
					uni.showToast({
						title: '手机号码格式错误',
						icon: 'none',
						duration: 2000
					})
				} else {
					// 已输入手机号，准备开始
					uni.showToast({
						title: '准备开始记忆啦~',
						icon: 'none',
						duration: 2000
					})
					// 更改游戏状态为记忆阶段
					self.initStatus(1)
					// 翻开所有牌子
					self.cardArrs.map(item => {
						item.cardFlipClass = 'card-flipped'
					})
					// 开始进入倒计时
					setTimeout(self.countdown, 1000)
				}
			},
			startPlaying () {
				// 倒计时 开始游戏
				let self = this
				self.cardArrs.map(item => {
					item.cardFlipClass = '' // 恢复翻开的牌子
				})
				uni.showToast({
					title: '游戏开始，加油！',
					icon: 'none',
					duration: 2000
				})
				setTimeout(function() {
					self.initStatus(2) // 更改状态为倒计时阶段，游戏开始
					self.countdown()
				}, 500)
			},
			clickCard (val, index) {
				// 点击卡牌
				let self = this
				if (self.gameStatus != 2) {
					uni.showToast({
						title: '游戏还未开始！',
						icon: 'none',
						duration: 2000
					})
					return
				}
				// 防止重复点击
				if (self.cardArrs[index].cardFlipClass === 'card-flipped') return
				
				// 给卡牌添加classname,表示已翻开
				self.cardArrs[index].cardFlipClass = 'card-flipped'
				self.cardArrs[index].cardStatus = 'going'
				
				// 记录点击的卡牌信息
				self.cardSelectedArr.push(val)
				
				// 若翻动了两张牌，检测一致性
				if (self.cardSelectedArr.length === 2) {
					clearTimeout(checkTimer)
					let checkTimer = setTimeout(() => {
						for (let j = 0, jLen = self.cardArrs.length; j < jLen; j++) {
							if (self.cardArrs[j].cardStatus === 'going') {
								if (self.cardSelectedArr[0] != self.cardSelectedArr[1]) {
									// 两张卡牌不一致，重置
									self.cardArrs[j].cardFlipClass = '' // 恢复翻开的牌子
									self.cardArrs[j].cardStatus = '' // 置空状态
								} else {
									// 两张卡牌一致
									self.cardArrs[j].cardStatus = 'success'
								}
							}
						}
						// 清空数组，为了保证数组里最多存在2条数据
						self.cardSelectedArr = []
						// 判断已点开卡牌数量和总数量是否相等，如果相等，表示游戏结束
						const flipedNum = self.cardArrs.filter(item => item.cardStatus === 'success').length
						if (flipedNum == self.cardArrs.length) {
							// 游戏结束,清除定时器，并初始化游戏，显示提示弹出层
							clearTimeout(self.timer)
							self.showTip = true
							self.showModal(4)
							self.init()
						}
					}, 300)
				}
			},
			lottery () {
				// 抽奖
				// 此处请求抽奖接口
				const status = 1 // 假设1为中奖状态
				
				if (status === 1) {
					// 中奖了 演示而已
					const lotteryArr = ['特等奖', '一等奖', '二等奖', '三等奖', '安慰奖']
					let randomV = Math.floor(Math.random() * (lotteryArr.length + 1))
					this.lotteryName = lotteryArr[randomV] // 暂存奖品名称
					this.myLottery.push(this.lotteryName)
					this.showModal(7)
				} else {
					// 未中奖
					this.showTip = false
					this.showModal(5)
				}
			},
			myLotteryList () {
				// 我的中奖纪录
				if (!this.mobile) {
					uni.showToast({
						title: '请输入手机号码！',
						icon: 'none',
						duration: 2000
					})
					return
				}
				// 此处请求中奖记录接口 TODO
				this.showModal(3)
			},
			playAgain () {
				// 再玩一次
				this.closeModal()
				this.init()
				this.startGame()
			},
			receive () {
				// 去领奖 TODO
				uni.showToast({
					title: '这里的逻辑自己看着写吧！',
					icon: 'none',
					duration: 2000
				})
			},
			showModal (index) {
				// 显示遮罩层
				this.showModalIndex = index
				this.gameStatus != 0 && clearTimeout(this.timer) // 游戏中显示弹出层 暂停倒计时
			},
			closeModal () {
				// 关闭遮罩层
				this.showModalIndex = null
				this.gameStatus != 0 && this.countdown() // 关闭弹出框 继续开始计时器
			},
			countdown () {
				// 倒计时
				let self = this
				if (self.time == 0) {
					// 计时结束
					if (self.gameStatus == 1) {
						// 如果状态为记忆阶段，则进入倒计时阶段
						self.timeDesc = '倒计'
						self.time = TM2
						self.startPlaying()
					} else {
						// 重置为记忆阶段
						self.timeDesc = '记忆'
						self.time = TM1
						self.showTip = false
						self.showModal(5)
						self.init()
					}
				} else {
					// 开启定时器
					self.time--
					self.timer = setTimeout(self.countdown, 1000)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
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
		background-color: #41d1eb;
	}
	#banner {
		height: 250rpx;
		background: url('/static/campaign/banner.png') no-repeat center top;
		background-size: 100% 100%;
	}
	.rule-box {
		.rule-tit {
			font-size: 30rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		padding: 30rpx;
		font-size: 24rpx;
		color: #fff;
	}

	#btns {
		height: 70rpx;
		margin: 0 4% 40rpx;
		padding-top: 10rpx;
		.btn {
			width: 35%;
			height: 70rpx;
			line-height: 70rpx;
			border-radius: 14rpx;
			display: inline-block;
			font-size: 28rpx;
			font-weight: 700;
			letter-spacing: 2rpx;
			&.btns_lf {
				background-color: #ffda48;
				color: #ff8734;
				box-shadow: 0 0 6rpx #ffc838 inset;
			}

			&.btns_rt {
				background-color: #f46949;
				color: #fff;
				box-shadow: 0 0 6rpx #eb473b inset;
			}
		}
		#time {
			width: 52rpx;
			height: 52rpx;
			line-height: 52rpx;
			margin: 10rpx 10rpx 0 0;
			display: inline-block;
			font-size: 34rpx;
			color: #f56042;
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
			margin-bottom: 10rpx;
		}
		#rule_desc {
			margin: auto 3% 30rpx;
			color: #0cf6ee;
			font-size: 24rpx;
			line-height: 48rpx;
			letter-spacing: 2rpx;
			margin-bottom: 10rpx;
		}
		
		#mobile_box {
			border-top: 2rpx solid #0cf6ee;
			padding-top: 40rpx;
		}
		
		#mobile_ipt {
			padding: 24rpx 20rpx;
			color: #333;
			font-size: 28rpx;
			background-color: #fff;
			border-radius: 10rpx;
			border: 0 none;
		}
		
		.start {
			width: 180px;
			height: 50px;
			margin-top: 50rpx;
			display: inline-block;
			background: url('/static/campaign/start_btn2.png') no-repeat center center;
			background-size: 84%;
			&.active {
				background: url('/static/campaign/start_btn.png') no-repeat center center;
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
			color: #9a9a9a;
			font-size: 24rpx;
		}
		
		.modal_btns {
			width: 100px;
			border-radius: 10rpx;
			display: inline-block;
			text-align: center;
			background-color: #ff5f54;
			color: #fff;
			font-size: 32rpx;
			letter-spacing: 4rpx;
			padding: 10rpx 0;
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
