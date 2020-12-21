<!-- 题目练习考试  -->
<template>
	<view class="container">
		<view class="topic-content">
			<examTopContent :datas='topDatas' :currentTab='currentQuestion' :isFromError='isFromError' />
		</view>
		<view class="swiper-contnet">
			<examSwpier />
		</view>
		<view class="bottom-content">
			<questionBottom @answerSheet='answerSheet' @complete='completeExam' :isFromError='isFromError' />
		</view>

		<view v-show="answerShow" class="answer-sheet-modal" @touchmove.stop.prevent="moveStop" @click.stop.prevent="answerSheet">
			<view class="answer" @click.stop.prevent="moveStop">
				<view class="top-content flex-between">
					<view class="left-content" @click.stop.prevent="moveStop">
						<view class="flex-row-start">
							<view class="zz flex-between">
								<view class="circle circle-right">

								</view>
								<view>正确</view>
							</view>
							<view class="zz flex-between">
								<view class="circle circle-error">

								</view>
								<view>错误</view>
							</view>
							<view class="zz flex-between">
								<view class="circle circle-empty">

								</view>
								<view>未做</view>
							</view>
						</view>
						<view class="tips">
							点击题目序号可以跳转到该题哦!
						</view>
					</view>
					<view class="right-content" @click.stop.prevent="answerSheet">
						<image src="../../static/close-img.png" mode=""></image>
					</view>
				</view>
				<view class="main-content">
					<view class="serial-content">
						<!-- <view class="title">
							单选题
						</view> -->
						<scroll-view class="scroll-contents" scroll-y="true">
							<view class="inline-block-item flex-row-start">
								<template v-if="options && options.length > 0">
									<view v-for="(item,index) in options" :key='index'>
										<view v-if="!item.userAnswer" class="item empty-item" @click="gogogo(index)">
											{{index+1}}
										</view>
										<view v-else-if="item.userAnswer !== item.problemAnswer" class="item error-item" @click="gogogo(index)">
											{{index+1}}
										</view>
										<view v-else-if="item.userAnswer === item.problemAnswer" class="item right-item" @click="gogogo(index)">
											{{index+1}}
										</view>
									</view>

								</template>
								<template v-else>
									<view class="no_data">暂无题目</view>
								</template>
							</view>
						</scroll-view>
					</view>
				</view>
				<view v-if="!isFromError" class="jiaojuan" @click.stop.prevent="moveStop">
					<primaryBtn text='交卷并查看结果' @callBackFun='completeExam' />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import questionBottom from '@/components/questionBottom/questionBottom.vue'
	import examTopContent from '@/components/ExamTopContent/ExamTopContent.vue'
	import examSwpier from '@/components/examSwpier/examSwpier.vue'
	import primaryBtn from '@/components/primaryBtn/primaryBtn.vue'
	import useFacePlugin from '../../commons/faceplugin.js'
	import {
		faceVerification,
		getExamDetails
	} from '@/commons/api/apis.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'

	export default {
		data() {
			return {
				topDatas: {},
				answerShow: false,
				options: [],
				examInfo: {},
				currentQuestion: 1,
				zzzz: 0,
				examId: '',
				startExamTime: '',
				isFromError: false,
				examTime:''
			};
		},
		components: {
			questionBottom,
			examTopContent,
			examSwpier
		},
		onShow() {

		},
		onUnload() {

		},
		onLoad(options) {
			if (options.fromError) {
				uni.setNavigationBarTitle({
					title: '错题集'
				})
				let a = uni.getStorageSync('autoExamQuestions')
				this.options  = a.length > 200 ? a.slice(0,200):a
				this.topDatas = {
					total: a.length
				}
				this.isFromError = true
			} else {
				uni.setNavigationBarTitle({
					title: '在线考试'
				})
				this.examId = options.id
				this.startExamTime = new Date()
				this.examInfo = uni.getStorageSync('userAutoQuestions')
				if (!this.examInfo) {
					uni.showToast({
						title: '获取题目失败',
						icon: 'none',
						duration: 1500
					})
				}
				this.getQuestions()
				this.setTopData()

				uni.$on('optionsChange', res => {
					this.options = uni.getStorageSync('autoExamQuestions')
				})
				
				uni.$on('timeChange',(res)=>{
					this.examTime = res.time
				})
			}


		},
		methods: {
			setTopData() {
				let exam = this.examInfo
				this.topDatas = {
					time: exam.times,
					total: exam.paperNum,
				}

			},
			moveStop() {},
			// 答题卡
			answerSheet() {
				this.options = uni.getStorageSync('autoExamQuestions')
				this.answerShow = !this.answerShow
			},
			// 获取试题
			getQuestions() {
				uni.showLoading({
					title: '出题中',
				})
				httpRequest({
					url: '/exam/api/tbCourPaper/list',
					method: 'POST',
					success: res => {
						uni.hideLoading()

						if (res.data.code == 200) {
							uni.setStorageSync('autoExamQuestions', res.data.data)
							this.setExamdata(res.data.data)
						} else {
							request_success(res)
						}
					},
					fail: err => {
						uni.hideLoading()
						console.log('获取试题失败', err)
					}
				}, 5)
			},
			setExamdata(data) {
				// uni.showLoading({
				// 	title:'加载试题中...'
				// })
				this.options = data
			},
			// 交卷
			completeExam() {



				let examdatas = uni.getStorageSync('autoExamQuestions')
				let questionList = []
				let userno = getUserLoginInfo('userNo')
				let now_date = new Date()
				examdatas.forEach((item, index) => {
					questionList.push({
						questionId: item.id,
						perScore: item.perScore,
						answerCode: item.userAnswer,
						isTrue: item.userAnswer == item.problemAnswer ? 1 : 0,
						createDate: now_date,
						createUser: userno
					})
				})


				uni.showModal({
					title: '提交',
					content: '确认交卷吗？',
					success: res => {
						if (res.confirm) {
							this.submitExam(questionList)
							// useFacePlugin({}).then(res => {
							// 	// 人脸验证
							// 	uni.showLoading({
							// 		title: '验证中...'
							// 	})
							// 	faceVerification(res).then(res => {
							// 		console.log('考试前的人脸验证：', res)
							// 		uni.hideLoading()
							// 		if (res.data.code == 200) {
							// 			uni.redirectTo({
							// 				url: '../onSiteTraining/examResult'
							// 			})
							// 		} else {
							// 			request_success(res)
							// 		}
							// 	}, err => {
							// 		uni.hideLoading()
							// 		request_err(err, '人脸验证失败，稍后重试')
							// 	})
							// })

						}
					}
				})

			},
			submitExam(list) {
				let userno = getUserLoginInfo('userNo')
				let now_date = new Date()
				let data = {
					questionList: JSON.stringify(list),
					tbMockTest: {
						createUser: userno,
						paperId: this.examId
					}

				};
				console.log('交卷参数:', data)
				uni.showLoading({
					title:'交卷中...'
				})
				httpRequest({
					url: '/exam/api/tbCourPaper/submitPaper',
					method: 'POST',
					data: data,
					success: res => {
						console.log('交卷：', res)
						uni.hideLoading()
						if (res.data) {
							let a = res.data
							a.examtime = this.examTime
							a.totalTime = this.examInfo.times
							let d = encodeURIComponent(JSON.stringify(res.data))
							uni.navigateTo({
								url: '../onSiteTraining/examResult?result=' + d
							})
						}else {
							uni.showToast({
								title:'交卷失败',
								icon:'none'
							})
						}
					},
					fail: err => {
						uni.hideLoading()
						console.log('交卷失败：', err)
					}
				}, 5)
			},
			// 答题卡跳转
			gogogo(index) {
				this.answerShow = !this.answerShow
				uni.$emit('tabChange', {
					index: index
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F3F7F6;
		min-height: 100vh;
	}

	.container {
		background-color: #F3F7F6;
	}

	.topic-content {
		// padding: 0 30rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 998;
	}

	.bottom-content {
		padding: 40rpx;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}

	.swiper-contnet {
		margin-top: 90rpx;
	}

	.answer-sheet-modal {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 1000;
		background-color: rgba(0, 0, 0, .6);
	}

	.answer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		// top: 0;
		z-index: 1001;
		height: 85%;
		background-color: #FFFFFF;
	}

	.top-content {
		padding: 30rpx;
		border-bottom: 2rpx solid #DDDDDD;
	}

	.circle {
		width: 24rpx;
		margin-right: 10rpx;
		height: 24rpx;
		border-radius: $uni-border-radius-half-circle;
	}

	.circle-right {
		background-color: #26A8FD;
	}

	.circle-error {
		background-color: #FD6468;
	}

	.circle-empty {
		background-color: #FFFFFF;
		border: 2rpx solid #D8D8D8;
	}

	.zz {
		color: #333;
		font-size: 28rpx;
		margin-right: 32rpx;
	}

	.tips {
		font-size: 26rpx;
		color: #333333;
		margin-top: 16rpx;
	}

	.right-content {
		margin-right: 30rpx;

		image {
			width: 32rpx;
			height: 32rpx;
		}
	}

	.jiaojuan {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10000;
		padding: 30rpx 80rpx;
		background-color: #FFFFFF;
	}

	.main-content {
		padding: 30rpx;
	}

	.title {
		color: #333333;
		font-size: 30rpx;
		font-weight: bold;
	}

	.inline-block-item {
		padding: 30rpx 0;
		flex-wrap: wrap
	}

	.item {
		width: 86rpx;
		height: 86rpx;
		border-radius: $uni-border-radius-half-circle;
		font-size: 34rpx;
		vertical-align: middle;
		text-align: center;
		white-space: nowrap;
		text-overflow: hidden;
		margin: 0 20rpx 30rpx 20rpx;
		line-height: 2.5;
	}

	.empty-item {
		background-color: #FFFFFF;
		border: 2rpx solid #d8d8d8;
	}

	.error-item {
		background-color: rgba(255, 227, 223, 1);
		color: #FD6468;
		border: 2rpx solid rgba(255, 227, 223, 1);
	}

	.right-item {
		background-color: rgba(220, 242, 253, 1);
		color: #26A8FD;
		border: 2rpx solid rgba(220, 242, 253, 1);
	}

	.no_data {
		text-align: center;
		margin: 30rpx auto;
		font-size: 32rpx;
		color: #000000;
	}

	.scroll-contents {
		height: 900rpx;
	}
</style>
