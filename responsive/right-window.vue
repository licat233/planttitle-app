<template>
	<view class="uni-right-window-content">
		<newDetail ref="detailPage" v-if="showName===news.name"></newDetail>
		<goodsDetail ref="goodsDetailPage" v-if="showName===goods.name"></goodsDetail>
		<adDetail ref="adDetailPage" v-if="showName===ad.name"></adDetail>
	</view>
</template>

<script>
	import newDetail from '@/pages/news/detail.nvue'
	import goodsDetail from '@/pages/mall/detail.nvue'
	import adDetail from '@/pages/news/ad.nvue'
	export default {
		components: {
			newDetail,
			goodsDetail,
			adDetail
		},
		data() {
			return {
				title: "詳情",
				timer: null,
				showName: "",
				news: this.newPageObj("news"),
				goods: this.newPageObj("goods"),
				ad: this.newPageObj("ad"),
			}
		},
		created(e) {
			//监听自定义事件，该事件由详情页列表的点击触发
			uni.$on('articleDetail', (e) => {
				if (!this.loadHandler(this.news, e.detail)) return
				this.timer = setTimeout(() => {
					// 执行 /pages/news/detail.nvue页面的load方法
					this.$refs.detailPage?.load(e.detail);
				});
			});
			uni.$on('goodsDetail', (e) => {
				if (!this.loadHandler(this.goods, e.detail)) return
				this.timer = setTimeout(() => {
					// 执行 /pages/mall/detail.nvue页面的load方法
					this.$refs.goodsDetailPage?.load(e.detail);
				});
			});
			uni.$on('adDetail', (e) => {
				if (!this.loadHandler(this.ad, e.detail)) return
				this.timer = setTimeout(() => {
					// 执行 /pages/news/ad.nvue页面的load方法
					this.$refs.adDetailPage?.load(e.detail);
				});
			});
		},
		methods: {
			newPageObj(name){
				return {
					name: name,
					currentDetail: null,
					lastLoadTime: null
				}
			},
			loadHandler(item, detail) {
				let now = new Date().getTime()
				if (item.currentDetail === detail && item.lastLoadTime && now - item.lastLoadTime < 3000) return false
				item.lastLoadTime = now
				item.currentDetail = detail
				this.showName = item.name
				clearTimeout(this.timer)
				return true
			}
		}
	}
</script>

<style>
	.uni-right-window-content{
		position: inherit !important;
	}
</style>