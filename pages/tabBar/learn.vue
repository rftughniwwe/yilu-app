<!-- 学习页面 -->
<template>
	<view class="mainzz">
		<chooseLearningType v-if='!chooseTypePager' />
		<view v-else class="learning-content">
			<view :class="type === 2?'no-padding':'learn-top-bar'">
				<view class="flex-between" :style="{'marginTop': isFullScreen?'40rpx':'0'}">
					<view class="left-select">
						<picker class="flex-between" :range="typeArrStr" :value="type" @change="bindPickerChange">
							<view class="topic">
								{{typeArrStr.length>0?typeArrStr[type]:'安全教育'}}
							</view>
							<image src="../../static/down-push-arrow.png" mode=""></image>
						</picker>
					</view>
					<view v-show="type !== 2" class="right-scannin-code" @click="scanCode">
						<image src="../../static/camera-code.png" mode=""></image>
					</view>
					<view v-show="type === 2" class="right-leader-board" @click="goLeaderBoard">
						<image src="../../static/leader-board.png" mode=""></image>
					</view>
				</view>
			</view>

			<!-- 继续教育和安全教育 -->
			<view v-show="type !== 2" class="learning-teach">
				<view class="top-slide-content" :style="{'margin': isFullScreen?'170rpx 0 10rpx':'130rpx 0 10rpx'}">
					<learnTopSlide :type='type' :AnquanType="AnquanType" />
				</view>

				<view class="top-img-content">
					<swiper class="swiper-content" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="600" circular="true">
						<swiper-item class="swiper-item-wrap">
							<view class="swiper-item">
								<image src="../../static/learning-banner2.png" mode=""></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item">
								<image src="../../static/learning-banner1.png" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
					<!-- <image src="../../static/anquan-top-img.png" mode=""></image> -->
				</view>
				<view class="online-notice">
					<view class="top-tips flex-row-start">
						<image src="../../static/shuxian.png" mode=""></image>
						直播中
					</view>
					<view class="notice-card flex-between">
						<view class="notice-cover">
							<image src="../../static/learning-banner2.png" mode=""></image>
						</view>
						<view class="notice-desc">
							<view class="notice-title text-overflow2">
								道路危险货物运输管理（上）
							</view>
							<view class="notice-time">
								时间：2020-12-12 20:00
							</view>
							<view class="notive-teacher-join flex-between">
								<view class="teacher">
									<view class="xxx">老师：王带锤</view>
									<view class="xxx">9999人参与</view>
								</view>
								<view class="join-room">
									进入直播间
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="learning-center">
					<view class="top-tips flex-row-start">
						<image src="../../static/shuxian.png" mode=""></image>
						学习中心
					</view>
					<view class="signin">
						<view class="top-text">
							现场培训
						</view>
						<view class="bottom-text">
							签到打卡学习
						</view>
						<view class="join-btn" @click="joinNow(1)">
							<image src="../../static/join-now1.png" mode=""></image>
						</view>
					</view>
					<view class="distance-education">
						<view class="top-text">
							远程教育
						</view>
						<view class="bottom-text">
							直播录播课程随你来学
						</view>
						<view class="join-btn" @click="joinNow(2)">
							<image src="../../static/join-now2.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>

			<!-- 自主学习 -->
			<view v-show="type === 2" class="self-learning">
				<view class="top-slide-content" :style="{'margin': isFullScreen?'170rpx 0 10rpx':'130rpx 0 10rpx'}">
					<learnTopSlide type='2' :selfLearnType='selfLearnType' />
				</view>

				<view v-show="selfLearnType === 1" class="tab-course">
					<!-- 课程 -->
					<course />
					<course />
					<course />
					<course />
				</view>
				<view v-show="selfLearnType === 2" class="tab-exercise flex-between">
					<!-- 练习 -->
					<view class="exercise">
						<view class="topic">
							练习题
						</view>
						<view class="subtitle">
							掌握程度，当场知晓
						</view>
					</view>
					<view class="error-title">
						<view class="topic">
							错题回顾
						</view>
						<view class="subtitle">
							错题重刷，轻松考过
						</view>
					</view>
				</view>
				<view v-show="selfLearnType === 3" class="tab-statistics">
					<!-- 统计 -->
					<view class="overview-content">
						<view class="overview">
							<view class="learning-time">
								<text class="big-text">学习总时长：666</text>小时
							</view>
							<view class="flex-between">
								<view class="total-answer">
									<view class="top">
										<text class="big-text">77</text>道
									</view>
									累计答题
								</view>
								<view class="correct-rate middle-correct">
									<view class="top">
										<text class="big-text">77</text>%
									</view>
									正确率
								</view>
								<view class="total-date">
									<view class="top">
										<text class="big-text">666</text>
									</view>
									累计天数
								</view>
							</view>
						</view>
					</view>
					<view class="select-date-month flex-between">
						<view class="">
							本月
						</view>
						<view>
							<picker class="date-picker flex-between" mode="date" fields="month" @change="filterChange">
								<view>{{date}}</view>
								<image src="../../static/down-push-arrow.png" mode=""></image>
							</picker>
						</view>
					</view>
					<view class="details-info">
						<view class="first-item flex-row-start">
							<image src="../../static/camera.png" mode=""></image>
							<view class="wzc">
								王大锤
							</view>
						</view>
						<view class="items flex-between">
							<view class="header">
								学习天数
							</view>
							<view class="tail">
								10天
							</view>

						</view>
						<view class="items flex-between">
							<view class="header">
								学习总时长
							</view>
							<view class="tail">
								30小时
							</view>
						</view>
						<view class="items flex-between">
							<view class="header">
								答题数量
							</view>
							<view class="tail">
								22题
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<chooseLearningModeModal v-if="!isHideSafetyModal" />

	</view>
</template>

<script>
	import chooseLearningType from '@/components/chooseLearningType/chooseLearningType.vue'
	import learnTopSlide from '@/components/learnTopSlide/learnTopSlide.vue'
	import chooseLearningModeModal from '@/components/chooseLearningModeModal/chooseLearningModeModal.vue'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import course from '@/components/course/course.vue'
	import {
		getCurrentDate,
		LEARNING_MODE_DATA,
		scanCodeReturn,
		getNotRealTime
	} from '../../utils/util.js'
	import {
		httpRequest,
		requestQrCodeUrl
	} from '@/utils/httpRequest.js'

	const app = getApp()


	export default {
		data() {
			return {
				chooseTypePager: null,
				// 0 安全教育，1继续教育，2 自主学习
				type: 0,
				typeArr: [],
				typeArrStr: [],
				isHideSafetyModal: true,
				selfLearnType: 1,
				AnquanType: 0,
				date: '',
				isFullScreen: false
			};
		},
		components: {
			chooseLearningType,
			learnTopSlide,
			chooseLearningModeModal,
			course
		},
		onLoad() {
			// 第一次进入学习页面显示选择模块
			this.chooseTypePager = uni.getStorageSync('isShowChooseType')
			this.isFullScreen = uni.getStorageSync('isFullScreen')
			this.type = uni.getStorageSync('teachType')

			this.typeArr = LEARNING_MODE_DATA
			this.setOptions(LEARNING_MODE_DATA)
			// 第一次进入学习模块时的事件监听
			uni.$once('chooesedTypezz', (data) => {

				if (data.num !== -1) {
					if (data.num === 0) {
						this.isHideSafetyModal = false
					}
					this.type = data.num ? data.num : 0
					this.chooseTypePager = true
				}
			})
			// 自主学习中的tab变化
			uni.$on('selfChange', (data) => {
				this.selfLearnType = data.tab
			})

			// 安全教育中第一次选择subtitle变化
			uni.$on('closeModalMask', (data) => {
				this.isHideSafetyModal = true
			})


		},
		onShow() {
			this.date = getCurrentDate('month')
		},
		methods: {

			setOptions(data) {
				let d = data
				d.forEach((item, index) => {
					this.typeArrStr.push(item.categoryName)
				})
			},
			// 扫描二维码
			scanCode() {
				let sT = getNotRealTime('start')
				let eT = getNotRealTime('end')
				console.log('st',sT)
				console.log('et',eT)
				// 插件扫码
				let obj = {
					"teacher": '王老师',
					"name": "ceshi",
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
				
				uni.scanCode({
					scanType: ['qrCode'],
					onlyFromCamera: true,
					success: resp => {
						
						// 测试用数据
						// uni.setStorageSync('scanData', obj)
						// uni.navigateTo({
						// 	url: '../onSiteTraining/courseDetails'
						// })
						
						console.log('扫描结果：', resp.result)
						uni.showLoading({
							title: '解析中...'
						})

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

			// closeTypeModal(data) {
			// 	this.isHideSafetyModal = true
			// 	this.safetyType = data.item
			// },
			// 左上角选择学习模块
			bindPickerChange(e) {
				this.type = e.target.value
				let item = this.typeArr[e.target.value]
				uni.setStorageSync('teachType', this.type)
				// 主项
				uni.setStorageSync('selectedLearningType', item)
				// 子项
				if (e.target.value == 0) {
					let tab = uni.getStorageSync('anquanTab')
					uni.setStorageSync('LearningSubTypeSubItem', item['listSub'][tab])
				} else if (e.target.value == 1) {
					let tab = uni.getStorageSync('jixuTab')
					// uni.setStorageSync('LearningSubType', item.listSub)
					uni.setStorageSync('LearningSubTypeSubItem', item['listSub'][tab])
				}


				// app.globalData.LearningSubType = item.listSub
				if (this.type === 0) {
					this.isHideSafetyModal = uni.getStorageSync('isHideSafetyModal')
				}
			},
			joinNow(num) {
				let that = this
				if (num == 1) {
					uni.navigateTo({
						url: '../onSiteTraining/onSiteTraining'
					})
				} else if (num == 2) {
					uni.navigateTo({
						url:'../user/myCourse'
					})
					// uni.navigateTo({
					// 	url: '../course/list/list'
					// })
				}
				// 需判断是否付费
				// uni.showModal({
				// 	content: '您尚未购买课程，无法使用学习功能',
				// 	confirmText: '去购买',
				// 	confirmColor: '#3CA7FF',
				// 	success(res) {
				// 		if (res.confirm) {
				// 			// 跳转到支付页面 
				// 			uni.navigateTo({
				// 				url: '../paymentPage/paymentPage'
				// 			})
				// 		}

				// 	},
				// 	fail() {

				// 	}
				// })
			},
			selfLearningChange(e) {
				console.log('zxc', e)
			},
			filterChange(e) {
				this.date = e.detail.value
			},
			goLeaderBoard() {
				uni.navigateTo({
					url: '../leaderBoard/leaderBoard'
				})
			}
		}
	}
</script>

<style lang="scss">
	.mainzz {
		position: relative;
	}


	.learn-top-bar {
		padding: 60rpx 30rpx 20rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: #FFFFFF;
		z-index: 9991;
	}

	.no-padding {
		padding: 60rpx 0 20rpx 30rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: #FFFFFF;
		z-index: 9991;
	}

	.right-scannin-code {


		image {
			width: 44rpx;
			height: 44rpx;
		}
	}

	.left-select {
		.topic {
			margin-right: 20rpx;
			color: #333333;
			font-size: 38rpx;
			font-weight: bold;
		}

		image {
			width: 30rpx;
			height: 30rpx;
		}
	}

	.top-slide-content {}

	.top-img-content {
		margin: 30rpx 0 40rpx;
		border-radius: 20rpx;
		// image {
		// 	width: 100%;
		// 	height: 295rpx;
		// 	border-radius: $uni-border-radius-base;
		// }
	}

	.swiper-content {
		width: 100%;
		height: 260rpx;
		border-radius: 20rpx;

		image {
			width: 100%;
			height: 300rpx;
			border-radius: 20rpx;
		}
	}

	.top-tips {
		margin-bottom: 30rpx;
		font-size: 36rpx;
		color: #333333;

		image {
			margin-right: 10rpx;
			width: 8rpx;
			height: 36rpx;
		}
	}

	.signin,
	.distance-education {
		// width: 100%;
		height: 208rpx;
		border-radius: $uni-border-radius-base;
		padding: 40rpx 50rpx;
	}

	.signin {
		background-image: url(../../static/sign-in-bg.png);
		background-size: 100% 100%;
		margin: 30rpx 0;

		.top-text {
			color: #1984E2;
			font-size: 38rpx;
			margin: 20rpx 0;
		}

		.bottom-text {
			color: #333333;
			font-size: 28rpx;
			margin-bottom: 20rpx;
		}
	}

	.distance-education {
		background-image: url(../../static/distance.png);
		background-size: 100% 100%;

		.top-text {
			color: #EF8C2B;
			font-size: 38rpx;
			margin-bottom: 20rpx;
		}

		.bottom-text {
			color: #333333;
			font-size: 28rpx;
			margin-bottom: 20rpx;
		}
	}

	.join-btn {
		image {
			width: 210rpx;
			height: 60rpx;
		}
	}

	.learning-teach {
		margin: 50rpx 30rpx;
	}

	.right-leader-board {
		image {
			width: 164rpx;
			height: 68rpx;
		}
	}

	.tab-course,
	.tab-exercise {
		padding: 20rpx 30rpx;
	}

	.exercise,
	.error-title {
		width: 326rpx;
		height: 364rpx;
		border-radius: 14rpx;
	}

	.subtitle {
		color: #FFFFFF;
		font-size: 30rpx;
		margin: 6rpx 0 30rpx;
	}

	.exercise {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		background-image: url(../../static/course.png);
		background-size: 100% 100%;

		.topic {
			color: #FFFFFF;
			font-size: 38rpx;
			font-weight: bold;
		}
	}

	.error-title {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		background-image: url(../../static/error-title.png);
		background-size: 100% 100%;

		.topic {
			color: #FFFFFF;
			font-size: 38rpx;
			font-weight: bold;
		}
	}

	.overview-content {
		margin: 40rpx 30rpx;
		background-image: url(../../static/learning-count-bg.png);
		background-size: 100% 100%;
		height: 284rpx;
		border-radius: 12rpx;
		color: #FFFFFF;
	}

	.overview {
		padding: 40rpx;
	}

	.learning-time {
		font-size: 32rpx;
		margin-bottom: 40rpx;

		.big-text {
			font-size: 40rpx;
		}
	}

	.top {
		font-size: 28rpx;
		margin-bottom: 10rpx;
		text-align: center;
	}

	.big-text {
		font-size: 48rpx;
	}

	.total-answer,
	.correct-rate,
	.total-date {
		font-size: 28rpx;
		text-align: center;
		width: 30%;
	}

	.middle-correct {
		border-right: 2rpx solid #FFFFFF;
		border-left: 2rpx solid #FFFFFF;
	}

	.select-date-month {
		padding: 20rpx 30rpx;
		background-color: #F8F8F8;
		color: #333333;
		font-size: 32rpx;
	}

	.date-picker {
		padding: 4rpx 10rpx;

		image {
			margin-left: 10rpx;
			width: 30rpx;
			height: 30rpx;
		}
	}

	.first-item {
		padding: 30rpx;

		image {
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
		}
	}

	.wzc {
		font-size: 34rpx;
		color: #333333;
		font-weight: bold;
	}

	.items {
		border-top: 2rpx solid #eeeeee;
		padding: 30rpx;

		.header {
			color: #333333;
			font-size: 32rpx;

		}

		.tail {
			color: #999999;
			font-size: 30rpx;
		}
	}

	.notice-card {
		border-radius: 8rpx;
		box-shadow: 0px 0px 18rpx rgba(234, 234, 234, 0.63);
		margin: 40rpx 0;
		background-color: #FFFFFF;
		padding: 30rpx 24rpx;
	}

	.notice-cover {
		width: 25%;
		border-radius: 8rpx;
		background-color: #eaeaea;
		height: 206rpx;
		margin-right: 30rpx;

		image {
			border-radius: 8rpx;
			width: 100%;
			height: 100%;

		}
	}

	.notice-desc {
		width: 70%;

		.notice-title {
			color: #333333;
			font-size: 32rpx;
			font-weight: bold;
			letter-spacing: 2rpx;
			margin-bottom: 10rpx;
		}

		.notice-time {
			color: #333333;
			font-size: 24rpx;
			margin-bottom: 40rpx;
		}

		.teacher {
			.xxx {
				color: #999;
				font-size: 24rpx;
			}
		}

		.join-room {
			border-radius: $uni-border-radius-half-circle;
			border: none;
			background: rgba(60, 167, 255, 0.1);
			color: #3CA7FF;
			font-size: 24rpx;
			text-align: center;
			padding: 12rpx 24rpx;
		}
	}

	.swiper-item,
	.swiper-item-wrap {
		border-radius: 20rpx;
	}

	.swiper-item {
		image {
			border-radius: 20rpx;
		}
	}
</style>
