<!-- 学习页面 -->
<template>
	<view class="mainzz">
		<chooseLearningType v-if='!chooseTypePager' />
		<view v-else class="learning-content">
			<view :class="type === 2?'no-padding':'learn-top-bar'">
				<view class="flex-between" :style="{'marginTop': isFullScreen?'40rpx':'0'}">
					<view class="left-select">
						<picker class="flex-between" :range="typeArr" @change="bindPickerChange">
							<view class="topic">
								{{typeArr[type]}}
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
					<learnTopSlide :type='type' :safetyType="safetyType" />
				</view>
				<view class="top-img-content">
					<image src="../../static/anquan-top-img.png" mode=""></image>
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
	import course from '@/components/course/course.vue'
	import {
		getCurrentDate
	} from '../../utils/util.js'

	const app = getApp()
	

	export default {
		data() {
			return {
				chooseTypePager: null,
				// 0 安全教育，1继续教育，2 自主学习
				type: 0,
				typeArr: ['安全教育', '继续教育', '自主学习'],
				isHideSafetyModal: true,
				selfLearnType: 1,
				safetyType: 1,
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

			// this.isHideSafetyModal = false
			// 第一次进入学习模块时的事件监听
			uni.$once('chooesedTypezz', (data) => {

				if (data.num !== -1) {
					if (data.num === 0) {
						this.isHideSafetyModal = false
					}
					this.type = data.num
					this.chooseTypePager = true
				}
			})
			// 自主学习中的tab变化
			uni.$on('selfChange', (data) => {
				this.selfLearnType = data.tab
			})

			uni.$on('closeModalMask', (data) => {
				this.isHideSafetyModal = true
			})
		},
		onShow() {
			this.date = getCurrentDate()
		},
		methods: {
			// 扫描二维码
			scanCode() {
				let mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module")
				mpaasScanModule.mpaasScan({
					'type': 'qr',
					'scanType': ['qrCode', 'barCode'],
					'hideAlbum': true
				}, (res) => {
					console.log('扫描结果', JSON.stringify(res))
				})
			},
			closeTypeModal(data) {
				this.isHideSafetyModal = true
				this.safetyType = data.item
			},
			bindPickerChange(e) {
				this.type = e.target.value
				uni.setStorageSync('teachType',this.type)
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
		margin: 20rpx 0 20rpx;

		image {
			width: 100%;
			height: 295rpx;
			border-radius: $uni-border-radius-base;
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
			width: 200rpx;
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
</style>
