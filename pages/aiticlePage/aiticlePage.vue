<!-- 文章详情页 -->
<template>
	<view class="main">
		<topTabBar text="文章详情" @clickCollect='collectionClick' :articleId='articleId' @onShare='onShareClick' />
		<view class="article-content">
			<view class="article-topic">
				{{data.summary}}
			</view>
			<view class="article-subtitle flex-between">
				<view class="article-from">
					来源：{{data.author?data.author:'未知用户'}}
				</view>
				<view class="article-time">
					{{data.gmtModified}}
				</view>
			</view>
			<!-- <view class="content" :style="{'fontSize':globalSize+'rpx'}"> -->
			<view class="content">
				<rich-text :nodes="data.content"></rich-text>
			</view>
		</view>
		<uni-popup ref="sharepopup" type="bottom">
			<share-btn :sharedataTemp="sharedata"></share-btn>
		</uni-popup>
	</view>
</template>

<script>
	import topTabBar from '@/components/topTabBar/topTabBar.vue'
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import graceRichText from '@/commons/rich-text.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import Toast from '@/commons/ResponseTips.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import shareBtn from '@/components/share-btn/share-btn.vue'

	export default {
		data() {
			return {
				// globalSize:34,
				data: {},
				articleId: '',
				isCollectionData: false,
				sharedata: {},
				coverimg: ''
			};
		},
		onLoad(options) {
			// this.globalSize = uni.getStorageSync('globalFontSize')
			this.coverimg = options.coverImg
			if (!options.id) {
				Toast({
					title: '获取资讯详情失败'
				})
				return
			}
			this.getNewsData(options.id)
			// this.isCollection(options.id)
			this.articleId = options.id
		},
		components: {
			topTabBar,
			shareBtn,
			uniPopup
		},
		methods: {
			onShareClick() {
				this.sharedata = {
					type: 0,
					strShareUrl: "http://www.baidu.com",
					strShareTitle: this.data.summary,
					strShareSummary: this.data.summary,
					strShareImageUrl: this.coverimg
				}
				 this.$refs.sharepopup.open();
			},
			getNewsData(id) {

				uni.showLoading({
					title: "加载中..."
				})
				httpRequest({
					url: '/community/api/blog/view',
					method: 'POST',
					data: {
						id: id
					},
					success: res => {
						uni.hideLoading()
						console.log('资讯详情：', res)
						if (res.data.code == 200) {
							this.data = res.data.data
						} else {
							request_success(res)
						}

					},
					fail: err => {
						uni.hideLoading()
						request_err(err, '加载失败')
					}
				}, 3)
			},

			collectionClick(e) {
				console.log('eeeeee', e)
				let c = e.collect
				if (c) {
					httpRequest({
						url: '/community/auth/blog/user/record/save',
						method: 'POST',
						data: {
							userIp: '127.0.0.1',
							opType: 1,
							userNo: getUserLoginInfo('userNo'),
							weblogId: this.articleId,
							userTerminal: 'android'
						},
						success: res => {
							console.log('收藏：', res)
							if (res.data.code == 200) {
								uni.showToast({
									title: '收藏成功',
									icon: 'none'
								})
							} else {
								request_success(res)
							}
						},
						fail: err => {
							request_err(err, '收藏失败')
						}
					}, 3)
				} else {
					httpRequest({
						url: '/community/auth/blog/user/record/delete',
						method: 'POST',
						data: {
							opType: 1,
							userNo: getUserLoginInfo('userNo'),
							weblogId: this.articleId
						},
						success: res => {
							console.log('取消收藏：', res)
							if (res.data.code == 200) {
								uni.showToast({
									title: '取消收藏成功',
									icon: 'none'
								})
							} else {
								request_success(res)
							}
						},
						fail: err => {
							request_err(err, '取消收藏失败')
						}
					}, 3)
				}
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding-top: 20rpx;
	}

	.article-content {
		margin-top: 180rpx;
	}

	.article-topic {
		padding: 20rpx $uni-spacing-row-lg 0;
		font-size: 40rpx;
		font-weight: bold;
		letter-spacing: 2rpx;
		color: #121314;

	}

	.article-subtitle {
		border-bottom: 2rpx solid #999999;
		padding: 30rpx $uni-spacing-row-lg;

		.article-from {
			font-size: 30rpx;
			color: #666;
		}

		.article-time {
			font-size: 30rpx;
			color: #999;
		}
	}

	.content {
		padding: 50rpx $uni-spacing-row-lg 80rpx;
	}
</style>
