<!-- 课程详情 -->
<template>
	<view>
		<!-- <view class="begin-time flex-row-start">
			<image src="../../static/timeout.png" mode=""></image>
			<view class="text">
				距离课程开始时间: {{countdownStr?countdownStr:'00:00:00'}}
			</view>
		</view> -->
		<view class="topic">
			<view class="left-img">
				<image src="../../static/banner2.png" mode=""></image>
			</view>
			<view class="right-content">
				<view class="text-overflow2 titles text-left">{{courseInfo.name || '未知'}}</view>
				<view class="lecturer text-left">
					{{courseInfoIntroduce.lecturer}}:{{courseInfo.teacher || '未知'}}
				</view>
			</view>
		</view>
		<view class="container-content">
			<view class="top-tab-content flex-around">
				<view class="sign-record flex-evenly" @click="signinNow">
					<image class="iiimg" src="../../static/course-info-sign-img.png" mode=""></image>
					<view class="ttttttttttttext">
						签到记录
					</view>
				</view>
				<view class="line"></view>
				<view class="learning-material flex-evenly" @click="goLearningMaterials">
					<image class="iiimg" src="../../static/course-info-leraning-material.png" mode=""></image>
					<view class="ttttttttttttext">
						学习资料
					</view>
				</view>
			</view>
			<view class="header title">
				{{courseInfoIntroduce.introduce}}
			</view>
			<view class="subtitle text-overflow5">
				<rich-text :nodes="courseInfo.trainintro?courseInfo.trainintro:'未知'"></rich-text>
				<!-- {{courseInfo.trainintro?courseInfo.trainintro:'未知'}} -->
			</view>
			
			<view class="header title">
				{{courseInfoIntroduce.time}}
			</view>
			<view class="subtitle text-overflow5">
				<!-- <rich-text :nodes="courseInfo.teacherIntro"></rich-text> -->
				{{courseInfo.trainStart}}
				<!-- {{courseInfo.teacherIntro?courseInfo.teacherIntro:'未知'}} -->
			</view>
			
			<view class="header title">
				{{courseInfoIntroduce.address}}
			</view>
			<view class="subtitle text-overflow2 address-content">
				{{courseInfo.address || '未知'}}
			</view>
		</view>
		<!-- <view class="next-step">
			<nextPageBtn @goNextPage='nextStep' />
		</view> -->
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
				count: 0,
				courseInfoIntroduce: {
					lecturer: '主持人',
					introduce: '宣教及培训介绍',
					time: '培训时间',
					address: '培训地点'
				}
			};
		},
		components: {
			nextPageBtn
		},
		onLoad(options) {
			this.courseInfo = uni.getStorageSync('scanData')
			let d = this.courseInfo
			switch (d.type) {
				case 3:
					this.courseInfoIntroduce = {
						lecturer: '主持人',
						introduce: '会议介绍',
						time: '会议时间',
						address: '会议地点'
					}
					break
				case 4:
					this.courseInfoIntroduce = {
						lecturer: '总指挥',
						introduce: '应急预案介绍',
						time: '演练时间',
						address: '演练地点'
					}
					break
			}
		},
		onShow() {
			// this.countDown()
		},
		onUnload() {
			// clearInterval(this.timer)
			// this.timer = null
		},
		onHide() {
			// clearInterval(this.timer)
			// this.timer = null
		},
		methods: {
			// 下一步
			nextStep() {
				uni.navigateTo({
					url: './onSiteTraining'
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
			signinNow() {
				uni.navigateTo({
					url: './signInPage'
				})
			},
			// 前往学习资料
			goLearningMaterials() {
				// let trainingid = uni.getStorageSync('TrainingId')
				// console.log('培训场次id', trainingid)
				// if (!trainingid) {
				// 	Toast({
				// 		title: '你没有学习资料'
				// 	})
				// 	return
				// }
				uni.navigateTo({
					url: '../user/learningMaterials/learningMaterials?trainid='+this.courseInfo.id
				})
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
				}
				// else {
				// 	let end = new Date(this.courseInfo.endTime).getTime()
				// 	let now = new Date().getTime()
				// 	if (now > end) {
				// 		this.countdownStr = '培训已经结束'
				// 	} else {
				// 		this.countdownStr = '培训已开始'
				// 	}
				// }

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
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
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

	.left-img {
		width: 35%;
		margin-right: 20rpx;
		// background-color: #D1D1D1;

		image {
			width: 256rpx;
			height: 168rpx;
			border-radius: 12rpx;
		}
	}
	 
	.right-content{
		width: 60%;
	}

	.titles {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.lecturer {
		font-size: 28rpx;
		color: #333333;
		margin-top: 20rpx;
	}

	.top-tab-content {
		padding: 40rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 0 0 10rpx #e8e8e8;
		margin: 0 0 30rpx;
	}

	.iiimg {
		width: 44rpx;
		height: 44rpx;
	}

	.ttttttttttttext {
		margin-left: 20rpx;
		font-size: 32rpx;
		color: #333333;
		letter-spacing: 2rpx;
	}

	.line {
		height: 46rpx;
		width: 2rpx;
		background-color: #eaeaea;
	}
	.text-left{
		text-align: left;
	}
	.address-content{
		margin: 30rpx 0;
	}
</style>
