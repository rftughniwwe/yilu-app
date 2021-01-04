<!-- 现场培训 -->
<template>
	<view class="container">
		<view class="top-tab flex-between">
			<view class="item" @click="signinNow">
				<image src="../../static/on-site-sign.png" mode=""></image>
			</view>
			<view class="item" @click="goLearningMaterials">
				<image src="../../static/learningzl.png" mode=""></image>
			</view>
		<!-- 	<view class="item" @click="goOnlineExam">
				<image src="../../static/online-exam.png" mode=""></image>
			</view> -->
		</view>
		<view class="sign-in-tips">
			<view class="topic">
				【现场签到步骤】
			</view>
			<view class="content">
				1，使用打卡机进行人脸识别签入，课程结束后也需要进行人脸识别签出，为了保障您的学习时长统计，请不要忘记签到，签出。
			</view>
			<view class="content">
				2，点击现场签到,可以查看您的签入、签出记录
			</view>
		</view>
	</view>
</template>

<script>
	import {
		httpRequest,
		requestQrCodeUrl
	} from '@/utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		getExamIdByTraingId
	} from '@/commons/api/apis.js'
	import {
		scanCodeReturn,
		getNotRealTime
	} from '@/utils/util.js'
	import Toast from '@/commons/showToast.js'

	export default {
		data() {
			return {
				examData: {}
			};
		},
		onLoad() {
			this.getExamId()
		},
		onBackPress() {
			setTimeout(()=>{
				uni.reLaunch({
					url:'../tabBar/learn'
				})
			},300)
			return true
		},
		methods: {
			signinNow() {
				uni.navigateTo({
					url: './signInPage'
				})
				// let sT = getNotRealTime('start')
				// let eT = getNotRealTime('end')
				// 系统扫码
				// uni.scanCode({
				// 	scanType: ['qrCode'],
				// 	onlyFromCamera: true,
				// 	success: resp => {
				// 		uni.showLoading({
				// 			title: '解析中...'
				// 		})
						
				// 		实际数据
				// 		requestQrCodeUrl(resp.result).then((res) => {
				// 			scanCodeReturn(res)
				// 			if (res.data.code == 200) {
				// 				uni.navigateTo({
				// 					url: '../onSiteTraining/courseDetails'
				// 				})
				// 			} else {
				// 				request_success(res)
				// 			}
				// 		}, (err) => {
				// 			uni.hideLoading()
				// 			request_err(err, '解析二维码失败')
				// 		})
				// 	},
				// 	fail: err => {
				// 		console.log('扫描失败', err)
				// 	}
				// })
			},
			// 前往学习资料
			goLearningMaterials() {
				let trainingid = uni.getStorageSync('TrainingId')
				console.log('培训场次id', trainingid)
				if (!trainingid) {
					Toast({
						title: '你没有学习资料'
					})
					return
				}
				uni.navigateTo({
					url: '../user/learningMaterials/learningMaterials?trainid='+trainingid
				})
			},

			// 根据培训场次获取试卷ID
			getExamId() {
				let trainingid = uni.getStorageSync('TrainingId')
				console.log('培训场次id', trainingid)
				if(!trainingid) return
				getExamIdByTraingId(trainingid).then(res => {
					console.log('根据培训场次获取试卷:', res)
					if (res.data.code == 200) {
						this.examData = res.data.data || {}
					} else {
						request_success(res)
					}
				})
			},

			// 前往在线考试
			goOnlineExam() {
				if (!this.examData || !this.examData.id) {
					Toast({
						title: '你没有在线考试'
					})
					return
				}
				let d = encodeURIComponent(JSON.stringify(this.examData))
				uni.navigateTo({
					url: '/pages/exam/examInfo?examdatas=' + d
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 30rpx;
	}

	.top-tab {
		margin: 30rpx 0 40rpx;

		image {
			width: 334rpx;
			height: 234rpx;
		}
	}

	.topic {
		color: #333333;
		font-size: 34rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
	}

	.content {
		color: #333333;
		font-size: 30rpx;
		margin-bottom: 30rpx;
	}
</style>
