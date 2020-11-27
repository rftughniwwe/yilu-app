<!-- 课程详情 -->
<template>
	<view>
		<view class="begin-time flex-row-start">
			<image src="../../static/timeout.png" mode=""></image>
			<view class="text">
				距离课程开始时间: {{countdownStr?countdownStr:'00:00:00'}}
			</view>
		</view>
		<view class="topic">
			<view class="title">
				{{courseInfo.name}}
			</view>
			<view class="subtitle middle">
				开课时间：{{courseInfo.startTime?courseInfo.startTime:'未知'}} · 名师：{{courseInfo.teacher?courseInfo.teacher:'未知'}}
			</view>
			<view class="subtitle">
				开课地点：{{courseInfo.addr?courseInfo.addr:'未知'}}
			</view>
		</view>
		<view class="container-content">
			<view class="header title">
				培训介绍
			</view>
			<view class="subtitle text-overflow5">
				<rich-text :nodes="courseInfo.trainIntro"></rich-text>
				<!-- {{courseInfo.trainIntro?courseInfo.trainIntro:'未知'}} -->
			</view>
			<view class="header title">
				讲师介绍
			</view>
			<view class="subtitle text-overflow5">
				<rich-text :nodes="courseInfo.teacherIntro"></rich-text>
				<!-- {{courseInfo.teacherIntro?courseInfo.teacherIntro:'未知'}} -->
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
	import {
		getSystemInfo,
		getUserLoginInfo,
		getCountDown
	} from '@/utils/util.js'

	export default {
		data() {
			return {
				courseInfo: {},
				timer: null,
				countdownStr: '',
				count: 0
			};
		},
		components: {
			nextPageBtn
		},
		onLoad(options) {
			this.courseInfo = uni.getStorageSync('scanData')
		},
		onShow() {
			this.countDown()
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
		},
		onHide() {
			clearInterval(this.timer)
			this.timer = null
		},
		methods: {
			// 下一步
			nextStep() {
				// if (this.count > 600) {
				// 	Toast({
				// 		title: '还没有到签入时间!'
				// 	})
				// } else if (this.count <= 0) {
				// 	Toast({
				// 		title: '签入时间已过！不能签入'
				// 	})
				// } else {
					
				// }
				uni.navigateTo({
					url: './signInPage'
				})
				// 人脸采集
				// useFacePlugin({
				// 	count: 0,
				// 	random: true
				// }).then((face) => {
				// 	uni.showLoading({
				// 		title: "验证中..."
				// 	})
				// 	// 人脸验证
				// 	faceVerification(face).then(resp => {
				// 		uni.hideLoading()
				// 		console.log('人脸验证：',resp)
				// 		if (resp.data.code == 200) {
				// 			uni.navigateTo({
				// 				url: './signInPage?scanResult='+this.courseInfo
				// 			})
				// 		} else {
				// 			uni.showModal({
				// 				title: "识别错误",
				// 				content: resp.data.msg + '。请重试',
				// 				cancelText: "取消",
				// 				confirmText: "再次重试",
				// 				success: (res) => {
				// 					if (res.confirm) {
				// 						this.nextStep()
				// 					}
				// 				}
				// 			})
				// 		}
				// 	}, err => {
				// 		uni.hideLoading()
				// 		request_err(err, '验证失败')
				// 	})
				// }, (err) => {
				// 	console.error('识别失败', err)
				// 	request_err(err, '人脸采集失败。')
				// })
			},

			// 倒计时
			countDown() {
				let start = new Date(this.courseInfo.startTime).getTime()
				let now = new Date().getTime()

				let time = Math.floor(start / 1000) - Math.floor(now / 1000)
				if (time > 0) {
					this.timer = setInterval(() => {
						if (time <= 0) {
							clearInterval(this.timer)
							this.timer = null
							uni.showModal({
								title: '提示',
								content: '培训已经开始，是否进行签到？',
								success: res => {
									if (res.confirm) {
										this.nextStep()
									}
								}
							})
							return
						}
						time--
						this.count = time
						this.countdownStr = getCountDown(time)
					}, 1000)
				} else {
					let end = new Date(this.courseInfo.endTime).getTime()
					let now = new Date().getTime()
					if (now > end) {
						this.countdownStr = '培训已经结束'
					} else {
						this.countdownStr = '培训已开始'
					}
				}

			}
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
