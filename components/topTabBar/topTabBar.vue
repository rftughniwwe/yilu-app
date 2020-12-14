<!-- 自定义顶部tabBar -->
<template>
	<view>
		<view v-if="text!=='none'" class="main flex-between" :style="{'padding': isFullScreen?'110rpx 30rpx 30rpx':'60rpx 30rpx 30rpx'}">
			<view class="left-arrow" @click="back">
				<image src="../../static/arrow-left.png" mode=""></image>
			</view>
			<view class="middle-text">
				{{text}}
			</view>
			<view class="right-content flex-between">
				<image class="first-img" :src="collection?'../../static/collection-selected.png':'../../static/collection.png'"
				 mode="" @click="changeSelect"></image>
				<image src="../../static/share-img.png" mode="" @click="shareClick"></image>
			</view>
		</view>

		<view v-if="text==='none'" class="s-main flex-between" :style="{'padding': isFullScreen?'110rpx 30rpx 30rpx':'60rpx 30rpx 30rpx'}">
			<view class="left-arrow" @click="back">
				<image src="../../static/arrow-left-white.png" mode=""></image>
			</view>

			<view class="right-content flex-between">
				<image class="first-img" :src="collection?'../../static/collection-selected.png':'../../static/collection-white.png'"
				 mode="" @click="changeSelect"></image>
				<image src="../../static/share-img-white.png" mode="" @click="shareTopicClick"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'

	export default {
		data() {
			return {
				collection: null,
				isFullScreen: false
			};
		},
		props: ['text', 'articleId', 'isCollectTopicId'],
		created() {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
			if (this.articleId) {
				this.isCollection(this.articleId)
			}
			if (this.isCollectTopicId) {
				this.getCollectTopic(this.isCollectTopicId)
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			shareClick(){
				this.$emit('onShare',{})
			},
			shareTopicClick(){
				this.$emit('onTopicShare',{})
			},
			changeSelect() {
				this.collection = !this.collection
				this.$emit('clickCollect', {
					collect: this.collection
				})
			},
			isCollection(id) {
				httpRequest({
					url: '/community/auth/blog/user/record/collection/list',
					method: 'POST',
					data: {
						articleType: 2,
						opType: 1,
						userNo: getUserLoginInfo('userNo')
					},
					success: res => {
						if (res.data.code == 200) {
							let list = res.data.data.list
							list.forEach((item, index) => {
								if (item.blogId == id) {
									this.collection = true
								}
							})
						} else {
							request_success(res)
						}
					},
					fail: err => {
						request_err(err, '查询是否收藏失败')
					}
				}, 3)
			},
			getCollectTopic(id) {
				httpRequest({
					url: '/community/api/labelUserRecord/selectUserRecord',
					method: 'POST',
					data: {
						"labelId": id,
						"opType": 1,
						"userNo": getUserLoginInfo('userNo')
					},
					success: res => {
						console.log('专题是否收藏：',res)
						if (res.data == 0) {
							this.collection = false
						} else {
							this.collection = true
						}
					},
					fail: err => {
						request_err(err, '查询是否收藏失败')
					}
				}, 3)
			}
		}
	}
</script>

<style lang="scss">
	.main {
		border-bottom: 2rpx solid #eaeaea;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: #FFFFFF;
		z-index: 9999;
	}

	.s-main {
		padding: 60rpx 30rpx 30rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .4);
		z-index: 9999;

		.left-arrow {
			image {
				width: 30rpx;
				height: 44rpx;
			}
		}
	}

	.middle-text {
		font-size: 36rpx;
		color: #333333;
		width: 60%;
		text-align: center;
	}

	.left-arrow {
		width: 20%;
		display: flex;
		align-items: center;

		image {
			width: 34rpx;
			height: 44rpx;
		}
	}

	.right-content {
		width: 20%;

		.first-img {
			margin-right: 50rpx;
		}

		image {
			width: 44rpx;
			height: 44rpx;
		}
	}
</style>
