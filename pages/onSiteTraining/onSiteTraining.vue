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
			<view class="item" @click="goOnlineExam">
				<image src="../../static/online-exam.png" mode=""></image>
			</view>
		</view>
		<view class="sign-in-tips">
			<view class="topic">
				【现场签到步骤】
			</view>
			<view class="content">
				1，点击现场签到,扫描企业二维码进入相关课程页。
			</view>
			<view class="content">
				2，手机进行人脸识别签到，课程结束后也需要进行人脸识别签出，为了保障您的学习时长统计，请不要忘记签到，签出。
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
				let sT = getNotRealTime('start')
				let eT = getNotRealTime('end')
				console.log('st',sT)
				console.log('et',eT)
				// 插件扫码
				let obj = {
					"teacher": '王老师',
					"name": "驾驶员资格证",
					"limit": 500,
					"lon": "121.506292",
					"startTime": sT,
					"trainIntro": "<p>测试介绍</p>",
					"id": 11,
					"endTime": eT,
					"addr": "浦江科技广场21号楼5",
					"type": 1,
					"lat": "31.0991625",
					"teacherIntro": "<p>介绍</p>"
				}

				// 系统扫码
				uni.scanCode({
					scanType: ['qrCode'],
					onlyFromCamera: true,
					success: resp => {
						uni.showLoading({
							title: '解析中...'
						})
						
						// 测试用数据
						// uni.hideLoading()
						// uni.setStorageSync('scanData', obj)
						// uni.navigateTo({
						// 	url: '../onSiteTraining/courseDetails'
						// })
						
						// 实际数据
						requestQrCodeUrl(resp.result).then((res) => {
							scanCodeReturn(res)
							if (res.data.code == 200) {
								uni.navigateTo({
									url: '../onSiteTraining/courseDetails'
								})
							} else {
								request_success(res)
							}
						}, (err) => {
							uni.hideLoading()
							request_err(err, '解析二维码失败')
						})
					},
					fail: err => {
						console.log('扫描失败', err)
					}
				})
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
				// uni.navigateTo({
				// 	url:'/pages/onSiteTraining/examBegin'
				// })
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
			width: 234rpx;
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
