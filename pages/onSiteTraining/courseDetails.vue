<!-- 课程详情 -->
<template>
	<view>
		<view class="begin-time flex-row-start">
			<image src="../../static/timeout.png" mode=""></image>
			<view class="text">
				距离课程开始时间 01:29:05
			</view>
		</view>
		<view class="topic">
			<view class="title">
				道路危险货物运输管理
			</view>
			<view class="subtitle middle">
				开课时间:2020-09-20 19:30 · 名师:景晴
			</view>
			<view class="subtitle">
				开课地点：上海市浦东新区松林路357号-1楼
			</view>
		</view>
		<view class="container-content">
			<view class="header title">
				直播介绍
			</view>
			<view class="subtitle text-overflow5">
				《危险货物道路运输安全管理办法》是为加强危险货物道路运输安全管理，预防危险货物道路运输事故，保护人民群众生命安全、环境安全和财产安全，根据《中华人民共和国安全
			</view>
			<view class="header title">
				老师介绍
			</view>
			<view class="subtitle text-overflow5">
				《危险货物道路运输安全管理办法》是为加强危险货物道路运输安全管理，预防危险货物道路运输事故，保护人民群众生命安全、环境安全和财产安全，根据《中华人民共和国安全
			</view>
		</view>
		<view class="next-step">
			<nextPageBtn @goNextPage='nextStep' />
		</view>
	</view>
</template>

<script>
	import nextPageBtn from '@/components/nextPageBtn/nextPageBtn.vue'
	import Toast from '@/commons/showToast.js'
	import useFacePlugin from '../../commons/faceplugin.js'
	import {
		faceVerification
	} from '@/commons/api/apis.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'

	export default {
		data() {
			return {

			};
		},
		components: {
			nextPageBtn
		},
		onLoad() {},
		methods: {
			// 下一步
			nextStep() {


				// 人脸采集
				useFacePlugin({
					count: 0,
					random: true
				}).then((res) => {
					uni.showLoading({
						title: "验证中..."
					})
					// 人脸验证
					faceVerification(res).then(resp => {
						uni.hideLoading()
						console.log('人脸验证：',resp)
						if (resp.data.code == 200) {
							uni.navigateTo({
								url: './signInPage'
							})
						} else {
							uni.showModal({
								title: "识别错误",
								content: resp.data.msg + '。请重试',
								cancelText: "取消",
								confirmText: "再次重试",
								success: (res) => {
									if (res.confirm) {
										this.nextStep()
									}
								}
							})
						}
					}, err => {
						uni.hideLoading()
						request_err(err, '验证失败。')
					})
				}, (err) => {
					console.error('识别失败', err)
					request_err(err, '人脸采集失败。')
				})
			},

		}
	}
</script>

<style lang="scss">
	.begin-time {
		padding: 20rpx 30rpx;
		background-color: rgba(60, 167, 255, 0.27);

		image {
			width: 36rpx;
			height: 36rpx;
			margin-right: 22rpx;
		}

		.text {
			color: #3CA7FF;
			font-size: 30rpx;
		}
	}

	.topic {
		padding: 36rpx 30rpx;
		border-bottom: 20rpx solid #F5F6F7;
	}

	.title {
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
	}

	.middle {
		margin: 30rpx 0 10rpx;
	}

	.subtitle {
		color: #333333;
		font-size: 28rpx;
	}

	.container-content {
		padding: 40rpx 30rpx;
	}

	.text-overflow5 {
		margin: 30rpx 0;
	}

	.header {
		padding: 0 20rpx;
		border-left: 8rpx solid #3395FA;
	}

	.next-step {
		padding: 30rpx;
	}
</style>
