<!-- 签到页面 -->
<template>
	<view class="container-main">
		<view class="wrap-top-tab-bar" :style="{'paddingTop':isFullScreen?'64rpx':'30rpx'}" >
			<uni-nav-bar title="签到" color="#333333" leftIcon="arrowleft"
			 @clickLeft='goback' @clickRight='rightClick' :right-text="tab==2?'月汇总':''" />
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
				<view class="subtitle flex-row-start">
					<image src="../../static/mini-time.png" mode=""></image>
					<view class="time zzz">
						2020-09-17 19:20
					</view>
					<image src="../../static/mini-course.png" mode=""></image>
					<view class="time">
						当前课程：驾驶员
					</view>
				</view>
				<view class="sign-content flex-around">
					<view class="sign-in">
						<view class="sign-title">
							签入时间：09:20
						</view>
						<view class="sign-img">
							<image src="../../static/checkedin.png" mode=""></image>
						</view>
						<view class="sign-tips">
							09:20已签入
						</view>
					</view>
					<view class="sign-in">
						<view class="sign-title">
							签入时间：19:20
						</view>
						<view class="sign-img">
							<image src="../../static/signin.png" mode=""></image>
						</view>
						<view class="sign-tips">
							19:20未签入
						</view>
					</view>
				</view>
			</view>
			<view class="map-contentzz">
				<view class="top-tips flex-row-start">
					<image v-show="isInRange" src="../../static/success.png" mode=""></image>
					<view class="txt" :class="{'color':isInRange?'#666':'#FFE1DE'}">
						{{isInRange?'已进入签到范围：':'未进入打卡范围'}}
					</view>
				</view>
				<view class="address">
					{{addressTxt}}
				</view>
				<map :latitude="121.5249" :longitude="31.1310" class="mapz"></map>
			</view>
		</view>
		
		<view v-show="tab==2" class="statis-wrap">
			<view class='martop' :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}"> </view>
			<view class="date-topic flex-row-start">
				<view class="header">
					2020年09/17日
				</view>
				<image src="../../static/date.png" mode=""></image>
			</view>
			<view class="subtitle-s">
				星期三
			</view>
			<view class="card-content">
				<view class="triangle-up">
					
				</view>
				<view class="user-info flex-row-start">
					<userHeadImg width='80rpx' height='80rpx'/>
					<view class="user-name">
						王大锤
					</view>
				</view>
				<view class="today-learning">
					<view class="subheading">
						今日学习次数
					</view>
					<view class="subtitle-s">
						你真是太棒了，今日一共学习了2次!
					</view>
				</view>
				<view class="learning-data">
					<view class="subheading">
						学习数据
					</view>
					<view class="zz flex-between">
						<view class="xxx">
							<view class="topic">
                                1小时51分钟
							</view>
							<view class="subheading">
								今日学习
							</view>
						</view>
						<view class="xxx">
							<view class="topic">
							    10小时51分钟
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
						<view class="item flex-between">
							<view class="head flex-row-start">
								<view class="circle">
									
								</view>
								<view class="record-txt">
									驾驶员
								</view>
							</view>
							<view class="time-content">
								01：13：39
							</view>
						</view>
						<view class="item flex-between">
							<view class="head flex-row-start">
								<view class="circle">
									
								</view>
								<view class="record-txt">
									驾驶员
								</view>
							</view>
							<view class="time-content">
								01：13：39
							</view>
						</view>
						<view class="item flex-between">
							<view class="head flex-row-start">
								<view class="circle">
									
								</view>
								<view class="record-txt">
									驾驶员
								</view>
							</view>
							<view class="time-content">
								01：13：39
							</view>
						</view>
						<view class="item flex-between">
							<view class="head flex-row-start">
								<view class="circle">
									
								</view>
								<view class="record-txt">
									驾驶员
								</view>
							</view>
							<view class="time-content">
								01：13：39
							</view>
						</view>
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
	
	export default {
		data() {
			return {
				tab: 1,
				isFullScreen: false,
				addressTxt:'',
				// 目标经度121.512806,31.105032
				targetLongitude: 121.512806,
				// 目标纬度
				targetLatitude: 31.105032,
				range: 800,
				isInRange: false,
				timer:null
			};
		},
		components: {
			uniNavBar,
			userHeadImg
		},
		onLoad() {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
			// 每五秒获取一次位置信息
			this.timer = setInterval(()=>{
				this.getLocationFun()
			},10000)
		},
		onShow() {
			this.getLocationFun()
		},
		onPullDownRefresh() {
			this.getLocationFun()
		},
		onUnload() {
			clearInterval(this.timer)
		},
		methods: {
			// 获取位置
			getLocationFun() {
				// uni.showLoading({
				// 	title:'获取位置中...'
				// })
				uni.stopPullDownRefresh()
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: res => {
						// uni.hideLoading()
						uni.setStorageSync('userAddress',res)
						let ads = res.address
						this.addressTxt = ads.city + ads.district + ads.street+ ads.streetNum+ ads.poiName;
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
				let longAbs = Math.abs(curLong - this.targetLongitude)
				let latiAbs = Math.abs(curLati - this.targetLatitude)
				console.log('经度差：', longAbs)
				console.log('纬度差：', latiAbs)
				if (longAbs >= 1 || latiAbs >= 1) {
					this.isInRange = false
					return
				}
				let lntDegree = (longAbs / 0.0001) * 11;
				let latDegree = (latiAbs / 0.0001) * 10;
				if(lntDegree > this.range || latDegree > this.range){
					this.isInRange = false
					return
				}
				this.isInRange = true
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
					url:'./monthlySummary'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container-main {
		position: relative;
	}
	
	.top-tab-bar{
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
		font-size: 32rpx;
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
		.txt{
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
		height: 300rpx;
	}

	.tab-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		border-top: 2rpx solid #DDDDDD;
		padding: 10rpx 0;
		background-color: #FFFFFF;
		z-index: 9988;
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
	
	.statis-wrap{
		background-color: #CEE5FE;
		height: 100vh;
		padding: 40rpx 30rpx;
	}
	.date-topic{
		image{
			width: 54rpx;
			height: 55rpx;
		}
	}
	.header{
		margin-right: 30rpx;
		font-size: 58rpx;
		font-weight: bold;
		color: #333333;
		
	}
	.subtitle-s{
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
		margin: 10rpx 0 20rpx;
		letter-spacing: 2rpx;
	}
	.subheading{
		font-size: 28rpx;
		color: #666;
		
	}
	.user-info{
		margin-bottom: 80rpx;
	}
	.user-name{
		font-size: 36rpx;
		color: #333333;
		margin-left: 20rpx;
	}
	.card-content{
		background: #FFFFFF;
		border-radius: 20rpx;
		position: relative;
		padding: 40rpx 30rpx;
		margin: 60rpx 0 30rpx;
	}
	.today-learning{
		margin: 30rpx 0 50rpx;
	}
	.topic{
		color: #333333;
		font-size: 38rpx;
		text-align: center;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	.xxx{
		.subheading{
			text-align: center;
		}
	}
	.learning-data{
		margin-bottom:56rpx;
	}
	.zz{
		margin: 20rpx 0;
	}
	.items-content{
		margin: 20rpx 0;
	}
	.item{
		padding: 10rpx 0;
	}
	.circle{
		margin-right: 16rpx;
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background-color: #3CA7FF;
	}
	.record-txt{
		font-size: 28rpx;
		color: #333333;
	}
	.time-content{
		font-size: 28rpx;
		color: #333333;
	}
	.triangle-up{
		position: absolute;
		top: -40rpx;
		left: 40rpx;
		width: 0;
		height: 0;
		border-left: 30rpx solid transparent;
		border-right: 30rpx solid transparent;
		border-bottom: 40rpx solid #FFFFFF;
	}
	.back-img{
		image{
			width: 30rpx;
			height: 38rpx;
		}
	}
</style>
