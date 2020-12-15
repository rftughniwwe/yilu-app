<!-- 签到页面 -->
<template>
	<view class="container-main">
		<view class="wrap-top-tab-bar" :style="{'paddingTop':isFullScreen?'64rpx':'30rpx'}">
			<uni-nav-bar title="培训签到" color="#333333" leftIcon="arrowleft" @clickLeft='goback' @clickRight='rightClick'
			 :right-text="tab==2?'月汇总':''" />
		</view>

		<!-- <view class="top-tab-bar flex-between" :style="{'marginTop':isFullScreen?'64rpx':'30rpx'}">
		 	<view class="back-img" @click="goback">
		 		<image src="../../static/arrow-left.png" mode=""></image>
		 	</view>
			<view class="middle">
				签到
			</view>
			<view class="right-content" @click="rightClick">
				{{tab==2?'月汇总':''}}
			</view>
		 </view> -->
		<view v-show="tab==1" class="sign-wrap">
			<view class='martop' :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}"> </view>
			<view class="top-content">
				<view class="subtitle">
					<view class="flex-row-start">
						<image src="../../static/mini-time.png" mode=""></image>
						<view class="time zzz">
							开始时间：{{signDatas.startTime?signDatas.startTime:'未知'}}
						</view>
					</view>
					<view class="flex-row-start">
						<image src="../../static/mini-time.png" mode=""></image>
						<view class="time zzz">
							结束时间：{{signDatas.endTime?signDatas.endTime:'未知'}}
						</view>
					</view>
					<view class="flex-row-start" style="margin-top: 20rpx;">
						<image src="../../static/mini-course.png" mode=""></image>
						<view class="time">
							当前课程：{{signDatas.name?signDatas.name:oldSignData[0].refName}}
						</view>
					</view>

				</view>
				<view class="sign-content flex-around">
					<view class="sign-in" @click="sign(0)">
						<template v-if="!isOldData">
							<view class="sign-title">
								签入时间：{{signInTime?signInTime:'未签入'}}
							</view>
						</template>
						<template v-else>
							<view class="sign-title">
								签入时间：{{oldSignData[1]?oldSignData[1].signDate[1]:oldSignData[0].signDate[1]}}
							</view>
						</template>
						<view class="sign-img">
							<image v-if='noSign1' src="../../static/signin.png" mode=""></image>
							<image v-if='!noSign1' src="../../static/checkedin.png" mode=""></image>
						</view>
						<view class="sign-tips">
							{{noSign1?'未签入':'已签入'}}
						</view>
					</view>
					<view class="sign-in" @click="sign(1)">
						<template v-if="!isOldData">
							<view class="sign-title">
								签出时间：{{signOutTime?signOutTime:'未签出'}}
							</view>
						</template>
						<template v-else>
							<view class="sign-title">
								签出时间：{{oldSignData[1]?oldSignData[0].signDate[1]:'未签出'}}
							</view>
						</template>

						<view class="sign-img">
							<image v-if='noSign2' src="../../static/signin.png" mode=""></image>
							<image v-if='!noSign2' src="../../static/checkedin.png" mode=""></image>
						</view>
						<view class="sign-tips">
							{{noSign2?'未签出':'已签出'}}
						</view>
					</view>
				</view>
			</view>
			<view class="map-contentzz">
				<view class="top-tips flex-row-start">
					<template v-if="!isOldData">
						<image v-show="isInRange" src="../../static/success.png" mode=""></image>
						<image v-show='!isInRange' src="../../static/signin.png" mode=""></image>
						<view class="txt">
							{{isInRange?'已进入签到范围：':'当前位置未进入签到范围'}}
						</view>
					</template>
					<template v-else>
						<image src="../../static/success.png" mode=""></image>
						<view class="txt">
							{{oldSignData[0].signonType==0?'已签到':'已签出'}}
						</view>
					</template>

				</view>
				<view class="address">
					{{signDatas.addr?signDatas.addr:oldSignData[0].place}}
				</view>
				<map :latitude="signDatas.lat?signDatas.lat:oldSignData[0].latitude" :longitude="signDatas.lon?signDatas.lon:oldSignData[0].longitude"
				 class="mapz"></map>
			</view>
		</view>

		<view v-show="tab==2" class="statis-wrap">
			<view class='martop' :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}"> </view>
			<view class="">
				<picker mode="date" :value="todayweek.date" @change="dateChange">
					<view class="date-topic flex-row-start">
						<view class="header">
							{{todayweek.date}}
						</view>
						<image src="../../static/date.png" mode=""></image>
					</view>
				</picker>
				
			</view>
			<view class="subtitle-s">
				{{todayweek.week}}
			</view>
			<view class="card-content">
				<view class="triangle-up">

				</view>
				<view class="user-info flex-row-start">
					<userHeadImg width='80rpx' height='80rpx' />
					<userName />
				</view>
				<view class="today-learning">
					<view class="subheading">
						今日学习次数
					</view>
					<view class="subtitle-s">
						你真是太棒了，今日一共学习了{{tongJiSign.count}}次!
					</view>
				</view>
				<view class="learning-data">
					<view class="subheading">
						学习数据
					</view>
					<view class="zz flex-between">
						<view class="xxx">
							<view class="topic">
								{{tongJiSign.todayStudyTime}}
							</view>
							<view class="subheading">
								今日学习
							</view>
						</view>
						<view class="xxx">
							<view class="topic">
								{{tongJiSign.countStudyTime}}
							</view>
							<view class="subheading">
								累计学习
							</view>
						</view>
					</view>
				</view>
				<view class="recording">
					<view class="subheading">
						签到记录
					</view>
					<view class="items-content">
						<template v-if="tongJiSign.list && tongJiSign.list.length > 0">
							<view v-for="(item,index) in tongJiSign.list" :key='index' class="item flex-between">
								<view class="head flex-row-start">
									<view class="circle">
									
									</view>
									<view class="record-txt">
										{{item.refName?item.refName:'未知'}}
									</view>
								</view>
								<view class="record-txt middle-type">
									{{item.signonType =='1'?'签出':'签入'}}
								</view>
								<view class="time-content">
									{{item.gmtCreate?item.gmtCreate:'未知'}}
								</view>
							</view>
						</template>
						<template v-else>
							<view class="no-data">
								暂无签到记录
							</view>
						</template>
					</view>
				</view>
			</view>
		</view>

		<view class="tab-bar flex-around">
			<view class="tab-sign" @click="changeTab(1)">
				<image :src="tab==1?'../../static/location-address.png':'../../static/location-address2.png'" mode=""></image>
				<view :class="tab==1?'tab-selected':'tab-sign-txt'">
					签到
				</view>
			</view>
			<view class="tab-statis" @click="changeTab(2)">
				<image :src="tab==2?'../../static/tab-statis-selected.png':'../../static/tab-stati.png'" mode=""></image>
				<view :class="tab==2?'tab-selected':'tab-sign-txt'">
					统计
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import userHeadImg from "@/components/userHeadImg/userHeadImg.vue"
	import Toast from '@/commons/showToast.js'
	import useFacePlugin from '../../commons/faceplugin.js'
	import userName from '@/components/userName/userName.vue'
	import {
		base64ToPath
	} from '../../js_sdk/gsq-image-tools/image-tools/index.js'
	import {
		faceVerification,
		getSignOnDateTime,
		signInOut,
		getOldSignData
	} from '@/commons/api/apis.js'
	import {
		getSystemInfo,
		getUserLoginInfo,
		getCurrentDate,
		dateWeek,
		removeAppStorage
	} from '@/utils/util.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		uploadImage
	} from '@/utils/httpRequest.js'

	export default {
		data() {
			return {
				tab: 1,
				isFullScreen: false,
				addressTxt: '',
				// 目标经度 121.512806,31.105032
				isInRange: false,
				timer: null,
				tongJiSign: [],
				signDatas: {},
				noSign1: true,
				noSign2: true,
				signInTime: '',
				signOutTime: '',
				oldSignData: [],
				isOldData: false,
				todayweek: {},
			};
		},
		components: {
			uniNavBar,
			userHeadImg,
			userName
		},
		onLoad(options) {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
			this.signDatas = uni.getStorageSync('scanData')
			this.todayweek = dateWeek()
			this.getSignInData()
			// 每十秒获取一次位置信息
			this.timer = setInterval(() => {
				this.getLocationFun()
			}, 10000)
		},
		onShow() {
			this.getLocationFun()
			// 回显签到数据
			this.getOldSignDatas()
		},
		onPullDownRefresh() {
			this.getLocationFun()
			// 回显签到数据
			this.getOldSignDatas()
		},
		onUnload() {
			clearInterval(this.timer)
			uni.hideLoading()
		},
		methods: {
			// 获取位置
			getLocationFun() {
				// uni.showLoading({
				// 	title:'获取位置中...'
				// })
				uni.stopPullDownRefresh()
				uni.getLocation({
					// type: 'gcj02',
					geocode: true,
					success: res => {
						// uni.hideLoading()
						uni.setStorageSync('userAddress', res)
						let ads = res.address
						this.addressTxt = ads.city + ads.district + ads.street + ads.streetNum + ads.poiName;
						this.calcLocation(res)
					},
					fail: err => {
						console.log('获取位置失败：', err)
						// uni.hideLoading()
						uni.showModal({
							title: '获取位置失败',
							content: '获取位置失败，请重试',
							confirmText: '再次重试',
							cancelText: '取消',
							success: res => {
								if (res.confirm) {
									this.getLocationFun()
								}
							}
						})
						Toast({
							title: '获取位置失败'
						})
					}
				})
			},
			// 计算位置
			calcLocation(res) {
				let curLong = res.longitude
				let curLati = res.latitude
				let longAbs = Math.abs(curLong - this.signDatas.lon)
				let latiAbs = Math.abs(curLati - this.signDatas.lat)
				if (longAbs >= 1 || latiAbs >= 1) {
					this.isInRange = false
					return
				}
				let lntDegree = (longAbs / 0.0001) * 11;
				let latDegree = (latiAbs / 0.0001) * 10;
				if (lntDegree > this.signDatas.limit || latDegree > this.signDatas.limit) {
					this.isInRange = false
					return
				}
				this.isInRange = true
			},

			// 获取签到数据
			getSignInData() {
				let date = this.todayweek.date
				console.log('date',date)
				getSignOnDateTime(date).then(res => {
					console.log('获取签到统计数据：', res)
					if (res.data.code == 200) {
						
						let _data = res.data.data
						_data.list.forEach((item,index)=>{
							_data.list[index].gmtCreate = item.gmtCreate.split('T')[1]
						})
						this.tongJiSign = _data
					} else {
						request_success(res)
					}
				}, err => {
					request_err(err, '获取签到数据失败')
				})
			},
			// 简单验证合法性
			simpleJudge(num) {
				let end = new Date(this.signDatas.endTime).getTime()
				let start = new Date(this.signDatas.startTime).getTime()
				let now = new Date().getTime()
				// 0签入 1签出
				if (!this.isInRange) {
					Toast({
						title: '未进入打卡范围'
					})
					return
				}
				if (num == 0 && !this.noSign1) {
					Toast({
						title: '您已签入'
					})
					return
				} else if(num == 1 && this.signDatas.type == 1){
					Toast({
						title: '请扫签出码进行签出'
					})
					return
				}else if (num == 1 && !this.noSign2) {
					Toast({
						title: '您已签出'
					})
					return
				} else if (num == 1 && this.noSign1) {
					Toast({
						title: '请先签入'
					})
					return
				}else if(now < start -((60*1000)*10)){
					Toast({
						title: '培训还未开始，请稍后'
					})
					return
				} else if (now > end + (30 * (60 * 1000))) {
					Toast({
						title: '培训已结束，不能签出'
					})
					return
				} else if ((now > start) && num == 0) {
					Toast({
						title: '培训已经开始，不能签入'
					})
					return
				} else if ((now < end) && num == 1) {
					Toast({
						title: '培训还未结束，不能签出'
					})
					return
				}
				return true
			},

			// 签入签出
			sign(num) {
				let that = this

				if (!this.simpleJudge(num)) return

				let address = uni.getStorageSync('userAddress')
				let params = {
					"chapterdId": this.signDatas.chapterList ? this.signDatas.chapterList[0].chapterId : '',
					"compId": uni.getStorageSync('userCompanyInfo').compId,
					"refId": this.signDatas.courseId,
					"coursePeriodId": this.signDatas.periodList ? this.signDatas.periodList[0].periodId : '',
					"numEvent": this.signDatas.id,
					"refName": this.signDatas.name,
					"place": this.addressTxt,
					"signonApp": 0,
					"latitude": address.latitude,
					"longitude": address.longitude,
					"signonTime": getCurrentDate('month'),
					"signonType": num,
					"startTime": this.signDatas.startTime,
					"endTime": this.signDatas.endTime,
					"courseType": '4',
					"faceContrasResult": 'success',
					"userNo": getUserLoginInfo('userNo')
				}

				// 签入签出
				// 人脸采集
				useFacePlugin({
					count: 0,
					random: true
				}).then((res) => {

					// base64转图片
					base64ToPath(res).then(path => {

						// 图片上传到阿里云
						uploadImage('/course/api/upload/pic', 'picFile', path, {}).then(response => {
							let img_data = JSON.parse(response.data)
							if (img_data.code == 200) {
								params.userImage = img_data.data
							} else {
								Toast({
									title: '上传人脸图片失败'
								})
								return
							}

							console.log('签入签出参数：', params)
							uni.showLoading({
								title: num == 0 ? '签入中...' : '签出中...'
							})
							// 人脸验证
							faceVerification(res).then(resp => {
								uni.hideLoading()

								console.log('人脸验证成功：', resp)

								if (resp.data.code == 200) {

									signInOut(params).then(_res => {
										uni.hideLoading()
										console.log('签入签出：', _res)
										if (_res.data.code == 200) {
											that.getOldSignDatas()
											if (num == 0) {
												that.noSign1 = false
												that.signInTime = getCurrentDate('onlyHours')
												uni.setStorageSync('TrainingId', that.signDatas.id)
												Toast({
													title: '签入成功',
													icon: 'success'
												})
											} else if (num == 1) {
												that.noSign2 = false
												that.signOutTime = getCurrentDate('onlyHours')
												uni.setStorageSync('TrainingId', that.signDatas.id)
												uni.showModal({
													title: '提示',
													content: '签出成功，是否立即进行考试？',
													cancelText: '稍后',
													confirmText: '前往考试',
													confirmColor: '#38A6FD',
													success: res => {
														if (res.confirm) {
															uni.reLaunch({
																url: '/pages/exam/examInfo?id=' + that.signDatas.id
															})
														}
														// else if(res.cancel){
														// 	uni.showModal({
														// 		title:'提示',
														// 		content:'可在现场培训的在线考试进行考试',
														// 		confirmText:'我知道了'
														// 	})
														// }
													}
												})
											}

										} else if (_res.data.code == 301) {
											uni.showToast({
												title: '登录过期',
												icon: 'none',
												duration: 1000
											})
											removeAppStorage()
											setTimeout(() => {
												uni.reLaunch({
													url: '../login/normalLogin'
												})
											}, 1000)
										} else {
											request_success(_res)
										}
									})

								} else {
									request_success(resp)
								}
							}, err => {
								uni.hideLoading()
								request_err(err, '验证失败')
							})

						}, error => {
							console.log('上传人脸图片失败：', error)
						})

					}).catch(error => {
						console.error('转换失败', error)
					})

				}, (err) => {
					request_err(err, '人脸采集失败。')
				})
				// 请求
			},

			// 获取回显数据
			getOldSignDatas() {
				this.oldSignData = []
				let params = {
					"chapterdId": this.signDatas.chapterList ? this.signDatas.chapterList[0].chapterId : '',
					"compId": uni.getStorageSync('userCompanyInfo').compId,
					"refId": this.signDatas.courseId,
					"coursePeriodId": this.signDatas.periodList ? this.signDatas.periodList[0].periodId : '',
					"numEvent": this.signDatas.id,
					"refName": this.signDatas.courseName,
					"signonApp": 0,
					"statusId": 1,
					"courseType": '4',
					"userNo": getUserLoginInfo('userNo')
				}
				uni.stopPullDownRefresh()
				console.log('获取回显数据参数:', params)
				getOldSignData(params).then(res => {
					console.log('签到信息：', res)
					if (res.data.code == 200) {
						let _data = res.data.data
						if (_data && _data.length > 0) {

							// 已签入未签出
							this.isOldData = true
							if (_data[0].signonType == 0) {
								this.noSign1 = false
								this.noSign2 = true
								_data[0]['signDate'] = _data[0].gmtCreate.split('T')

								this.oldSignData.push(_data[0])
							} else if (_data[0].signonType == 1) {
								// 已签入签出
								for (let i = 0; i <= 1; i++) {
									_data[i]['signDate'] = _data[i].gmtCreate.split('T')
									this.oldSignData.push(_data[i])
								}
								this.noSign1 = false
								this.noSign2 = false
							}

						}
					} else {
						request_success(res)
					}
				})
			},

			// 底部tab变换
			changeTab(num) {
				this.tab = num
			},
			// 返回
			goback() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 月汇总
			rightClick() {
				uni.navigateTo({
					url: './monthlySummary'
				})
			},
			
			// 日期改变事件
			dateChange(e){
				console.log('eeeeeee',e)
				let d = e.detail.value
				this.todayweek = dateWeek(d)
				this.getSignInData()
			}
		}
	}
</script>

<style lang="scss">
	.container-main {
		position: relative;
	}

	.top-tab-bar {
		padding: 30rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		background: #FFFFFF;
	}

	.top-content {
		// padding: 40rpx 30rpx;
		border-bottom: 20rpx solid #F5F6F7;
	}

	.subtitle {
		margin: 20rpx 0;
		padding: 20rpx 30rpx;

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 8rpx;
		}
	}

	.time {
		color: #666;
		font-size: 30rpx;
	}

	.sign-content {
		margin: 30rpx 0;
	}

	.sign-in {
		background-color: #F0F4F7;
		height: 292rpx;
		border-radius: 12rpx;
		padding: 30rpx;
		margin: 0 30rpx;
	}

	.sign-img {
		text-align: center;
		margin: 40rpx 0;

		image {
			width: 102rpx;
			height: 102rpx;

		}
	}

	.sign-title {
		color: #333333;
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
	}

	.sign-tips {
		font-size: 28rpx;
		color: #666;
		text-align: center;
	}

	.zzz {
		margin-right: 30rpx;
	}

	.top-tips {
		.txt {
			font-size: 30rpx;
		}

		image {
			width: 44rpx;
			height: 44rpx;
			margin-right: 20rpx;
		}
	}

	.address {
		margin: 30rpx 0;
		font-weight: bold;
		font-size: 32rpx;
		letter-spacing: 2rpx;
	}

	.map-contentzz {
		padding: 40rpx 30rpx;
	}

	.mapz {
		width: 690rpx;
		height: 350rpx;
	}

	.tab-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		border-top: 2rpx solid #DDDDDD;
		padding: 10rpx 0;
		background-color: #FFFFFF;
		z-index: 9998;
	}

	.tab-sign,
	.tab-statis {
		text-align: center;

		image {
			width: 44rpx;
			height: 44rpx;
			// margin-bottom: 2rpx;
		}
	}

	.tab-sign-txt {
		font-size: 24rpx;
		color: #A5A5A5;
		text-align: center;
	}

	.tab-selected {
		font-size: 24rpx;
		color: #38A6FD;
		text-align: center;
	}

	.statis-wrap {
		background-color: #CEE5FE;
		min-height: 100vh;
		padding: 40rpx 30rpx;
	}

	.date-topic {
		image {
			width: 54rpx;
			height: 55rpx;
		}
	}

	.header {
		margin-right: 30rpx;
		font-size: 58rpx;
		font-weight: bold;
		color: #333333;

	}

	.subtitle-s {
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
		margin: 10rpx 0 20rpx;
		letter-spacing: 2rpx;
	}

	.subheading {
		font-size: 28rpx;
		color: #666;

	}

	.user-info {
		margin-bottom: 80rpx;
	}


	.card-content {
		background: #FFFFFF;
		border-radius: 20rpx;
		position: relative;
		padding: 40rpx 30rpx;
		margin: 60rpx 0 100rpx;
	}

	.today-learning {
		margin: 30rpx 0 50rpx;
	}

	.topic {
		color: #333333;
		font-size: 38rpx;
		text-align: center;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.xxx {
		.subheading {
			text-align: center;
		}
	}

	.learning-data {
		margin-bottom: 56rpx;
	}

	.zz {
		margin: 20rpx 0;
	}

	.items-content {
		margin: 20rpx 0;
	}

	.item {
		padding: 10rpx 0;
	}

	.circle {
		margin-right: 16rpx;
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background-color: #3CA7FF;
	}

	.record-txt {
		font-size: 28rpx;
		color: #333333;
	}

	.time-content {
		font-size: 28rpx;
		color: #333333;
		width: 40%;
		text-align: right;
	}

	.triangle-up {
		position: absolute;
		top: -40rpx;
		left: 40rpx;
		width: 0;
		height: 0;
		border-left: 30rpx solid transparent;
		border-right: 30rpx solid transparent;
		border-bottom: 40rpx solid #FFFFFF;
	}

	.back-img {
		image {
			width: 30rpx;
			height: 38rpx;
		}
	}
	.head{
		width: 40%;
	}
	.middle-type{
		width: 20%;
		text-align: center;
	}
	.no-data {
		text-align: center;
		color: #999999;
		margin: 30rpx 0;
	}
</style>
