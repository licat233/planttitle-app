<template>
	<!--
	本页面模板教程：https://ext.dcloud.net.cn/plugin?id=2651
	uni-list 文档：https://ext.dcloud.net.cn/plugin?id=24
	uniCloud 文档：https://uniapp.dcloud.io/uniCloud/README
	unicloud-db 组件文档：https://uniapp.dcloud.io/uniCloud/unicloud-db
	DB Schema 规范：https://uniapp.dcloud.net.cn/uniCloud/schema
	 -->

	<view class="list">
			<!-- 刷新页面后的顶部提示框 -->
			<!-- 当前弹出内容没有实际逻辑 ，可根据当前业务修改弹出提示 -->
			<view class="tips" :class="{ 'tips-ani': tipShow }">更新成功</view>
			<!-- 页面分类标题 -->
			<uni-section title="熱銷商品" type="line"><button class="button-box" @click="select">切換視圖</button></uni-section>

			<!-- <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="formData" :collection="collection" :field="field" @load="load"> -->
			<!-- 基于 uni-list 的页面布局 -->
			<uni-list :class="{ 'uni-list--waterfall': options.waterfall }">
				<!-- 通过 uni-list--waterfall 类决定页面布局方向 -->
				<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
				<uni-list-item :border="!options.waterfall" class="uni-list-item--waterfall" title="商品列表"
					v-for="item in product_data" :key="item.id">
					<!-- 通过header插槽定义列表左侧图片 -->
					<template v-slot:header>
						<view class="uni-thumb shop-picture" :class="{ 'shop-picture-column': options.waterfall }">
							<image :src="item.goods_thumb" mode="aspectFill"  @click="goDetail(item)"></image>
						</view>
					</template>
					<template v-slot:body>
						<view class="shop" @click="goDetail(item)">
							<view>
								<view class="uni-title">
									<text class="uni-ellipsis-2">{{ item.name }}</text>
								</view>
								<view>
									<text class="uni-tag hot-tag">{{ item.goods_tip }}</text>
									<text v-for="tag in item.tag" :key="tag" class="uni-tag">{{ tag }}</text>
								</view>
							</view>
							<view>
								<view class="shop-price">
									<text>NT$</text>
									<text class="shop-price-text">{{ item.goods_price }}</text>
									<text>.00</text>
								</view>
								<view class="uni-note">{{ item.comment_count }}評論 月銷量 {{ item.month_sell_count }}</view>
								<view class="uni-note ellipsis">
									<text class="uni-ellipsis-1">{{ item.shop_name }}</text>
									<text class="uni-link">查看詳細></text>
								</view>
							</view>
						</view>
					</template>
					<!-- 通过body插槽定义商品布局 -->

				</uni-list-item>
			</uni-list>
			<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
			<uni-load-more v-if="loading || options.status === 'noMore' " :status="options.status" />
			<!-- </unicloud-db> -->
	</view>

</template>

<script>
	import axios from 'axios';
	import {
		nanoid
	} from 'nanoid';
	export default {
		data() {
			return {
				// 查询字段，多个字段用 , 分割
				// field: 'goods_thumb,name,goods_tip,tag,goods_price,comment_count,month_sell_count,shop_name',
				options: {
					waterfall: true, // 布局方向切换，默認為瀑布流
					status: 'loading', // 加载状态
				},
				tipShow: false, // 是否显示顶部提示框,
				product_data: [],
				loading: false,
				loadBlock: false,
				_isWidescreen: false
			};
		},
		created() {
			this._isWidescreen = false;
			// #ifdef H5
			let mediaQueryOb = uni.createMediaQueryObserver(this)
			mediaQueryOb.observe({
				minWidth: 768
			}, matches => {
				this._isWidescreen = matches;
			})
			// #endif
		},
		mounted() {
			this.loadData({
				clear: true
			});
		},
		methods: {
			/**
			 * 切换商品列表布局方向
			 */
			select() {
				this.options.waterfall = !this.options.waterfall;
			},

			load(data, ended) {
				if (ended) {
					this.options.status = 'noMore'
				}
			},
			convertGoods(item) {
				if (!item) return null;
				return {
					"id": item.product_id,
					"category_id": "",
					"goods_sn": "",
					"name": item.pro_name,
					"keywords": "護膚保養",
					"goods_desc": "",
					"goods_thumb": "https://www.planttitle.com" + item.url,
					"goods_banner_imgs": "",
					"goods_price": Math.floor(item.min_price),
					"remain_count": "999999",
					"month_sell_count": "999+",
					"total_sell_count": "9999+",
					"comment_count": "999+",
					"is_real": true,
					"is_on_sale": true,
					"is_alone_sale": true,
					"is_best": false,
					"is_new": true,
					"is_hot": false,
					"add_date": "",
					"last_modify_date": "",
					"seller_note": "",
					"shop_name": "planttitle官方商城",
					"tag": ["保養", "護膚"],
					"goods_tip": "正品"
				}
			},
			goDetail(item) {
				let data = {
					id: item.id,
					name: item.name
				};
				if (this._isWidescreen) { //若为宽屏，则触发右侧详情页的自定义事件
					uni.$emit('goodsDetail', {
						detail: encodeURIComponent(JSON.stringify(data))
					})
					return
				}
				let url =  './detail?goods=' + encodeURIComponent(JSON.stringify(data))
				uni.navigateTo({
					url: url,
					fail: (res) => {
						console.log(res.errMsg)
					}
				});
			},
			loadData(options, callback) {
				if (this.loadBlock) return;
				this.loading = true;
				axios.get('https://www.planttitle.com/wp-content/themes/planttitle/goods.php')
					.then((response) => {
						if (!Array.isArray(response.data)) return console.error("goods data type error")
						let data = response.data
						let new_product_data = data.map(item => this.convertGoods(item));

						if (options && options.clear === true) {
							this.product_data.length = 0;
							this.product_data = new_product_data;
						} else {
							//判断是否有新数据new_product_data.fileter
							let filter_date = new_product_data.filter(item => {
								if (this.product_data.some(a => a.id === item.id)) return false;
								return true;
							});
							if (filter_date.length === 0) {
								//没有新增数据，后续将不再重复加载
								this.loadBlock = true
							}
							this.product_data = this.product_data.concat(filter_date);
						}
					})
					.catch((error) => {
						console.log(error);
					}).finally(() => {
						this.loading = false;
						if (typeof callback === 'function') {
							callback();
						}
					})
			},
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			this.options.status = 'more'
			this.loadData({
				clear: true
			}, () => {
				this.tipShow = true
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.tipShow = false
				}, 1000)
				uni.stopPullDownRefresh()
			})
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {
			this.loadData()
		},
	};
</script>

<style lang="scss">
	@import '../../common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		min-height: 100%;
		height: 100%;
		width: 100%;
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

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.shop {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.shop-picture {
		width: 110px;
		height: 110px;
	}

	.shop-picture-column {
		width: 100%;
		height: 170px;
		margin-bottom: 10px;
	}

	.shop-price {
		margin-top: 5px;
		font-size: 12px;
		color: #ff5a5f;
	}

	.shop-price-text {
		font-size: 16px;
	}

	.hot-tag {
		background: #ff5a5f;
		border: none;
		color: #fff;
	}

	.button-box {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		background: #007AFF;
		color: #fff;
	}

	.uni-link {
		flex-shrink: 0;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}


	// 默认加入 scoped ，所以外面加一层提升权重
	.list {

		.uni-list--waterfall {

			/* #ifndef H5 || APP-VUE */
			// 小程序 编译后会多一层标签，而其他平台没有，所以需要特殊处理一下
			::v-deep .uni-list {
				/* #endif */
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 5px;
				box-sizing: border-box;

				/* #ifdef H5 || APP-VUE */
				// h5 和 app-vue 使用深度选择器，因为默认使用了 scoped ，所以样式会无法穿透
				::v-deep

				/* #endif */
				.uni-list-item--waterfall {
					width: 50%;
					box-sizing: border-box;

					.uni-list-item__container {
						padding: 5px;
						flex-direction: column;
					}
				}

				/* #ifndef H5 || APP-VUE */
			}

			/* #endif */
		}
	}
</style>