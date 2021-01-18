<!-- 用户页面 -->
<template>
	<view>
		<view class="header-top-content">
			<view class="header-page-title" :style="{'paddingTop': isFullScreen?'60rpx':'20rpx'}">
				我的
				<view class="setting-img" @click="goSystemSetting" :style="{'top': isFullScreen?'70rpx':'28rpx'}">
					<image src="../../static/user-setting.png" mode=""></image>
				</view>
			</view>
			<view class="user-info-content flex-between" @click="goEditorPage">
				<view class="user-head-img-info flex-row-start">
					<view class="user-img-circle">
						<!-- <userHeadImg width='150rpx' height='150rpx' /> -->
						<view class="zzzzzzzzzz">
							<image :src="headimg" mode=""></image>
						</view>
					</view>
					<view class="user-name-phone ">
						<view class="name user-name" :style="{'fontSize':globalSize+'rpx'}">
							<!-- <userName color='#FFF'/> -->
							{{username?username:'未知'}}
						</view>
						<view class="phone" :style="{'fontSize':(globalSize-8)+'rpx'}">
							{{mobile}}
						</view>
					</view>
				</view>
				<view class="right-arrow-white">
					<image src="../../static/right-arrow-white.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="item-content">
			<view class="main-content flex-around">
				<view class="my-course" @click="goMyCourse">
					<image src="../../static/user-my-course.png" mode=""></image>
					<view class="" :style="{'fontSize':globalSize+'rpx'}">
						我的培训
					</view>
				</view>
				<view class="my-sign-in" @click="goMyExamPage">
					<image src="../../static/user-my-exam-img.png" mode=""></image>
					<view class="" :style="{'fontSize':globalSize+'rpx'}">
						我的考试
					</view>
				</view>
				<view class="my-order" @click="goMyOrder">
					<image src="../../static/user-my-order.png" mode=""></image>
					<view class="" :style="{'fontSize':globalSize+'rpx'}">
						我的订单
					</view>
				</view>
			</view>
			<view class="items-content">
				<view class="item flex-between" @click="fillInfomation">
					<view class="item-icon flex-row-start">
						<image src="../../static/user-fill-infomation.png" mode=""></image>
						<view class="title" :style="{'fontSize':globalSize+'rpx'}">
							证件上传
						</view>
					</view>
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
				<view class="item flex-between" @click="goMyNews">
					<view class="item-icon flex-row-start">
						<image src="../../static/user-my-news.png" mode=""></image>
						<view class="title" :style="{'fontSize':globalSize+'rpx'}">
							我的消息
						</view>
					</view>
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
				<view class="item flex-between" @click="goMyCollect">
					<view class="item-icon flex-row-start">
						<image src="../../static/my-correct.png" mode=""></image>
						<view class="title" :style="{'fontSize':globalSize+'rpx'}">
							我的收藏
						</view>
					</view>
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
				<!-- <view class="item flex-between" @click="goLearningMaterials">
					<view class="item-icon flex-row-start">
						<image src="../../static/user-my-zl.png" mode=""></image>
						<view class="title" :style="{'fontSize':globalSize+'rpx'}">
							学习资料
						</view>
					</view>
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view> -->
				<view class="item flex-between" @click="goAboutUs">
					<view class="item-icon flex-row-start">
						<image src="../../static/user-about-us.png" mode=""></image>
						<view class="title" :style="{'fontSize':globalSize+'rpx'}">
							关于我们
						</view>
					</view>
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
				<view class="item flex-between" @click="goFeedBack">
					<view class="item-icon flex-row-start">
						<image src="../../static/user-feedback.png" mode=""></image>
						<view class="title" :style="{'fontSize':globalSize+'rpx'}">
							意见反馈
						</view>
					</view>
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userHeadImg from '@/components/userHeadImg/userHeadImg.vue'
	import userName from '@/components/userName/userName.vue'
	import {
		getUserBasicInfo
	} from '@/commons/api/apis.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	
	
	export default {
		data() {
			return {
				isFullScreen: false,
				globalSize:34,
				mobile:'',
				headimg:'',
				username:''
			};
		},
		components: {
			userHeadImg,
			userName
		},
		onLoad() {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
			this.mobile = uni.getStorageSync('userBasicInfo').mobile
			this.headimg = uni.getStorageSync('userBasicInfo').headImgUrl
			this.username =  uni.getStorageSync('userCompanyInfo').userName
		},
		onShow() {
			this.globalSize = uni.getStorageSync('globalFontSize')
			this.headimg = uni.getStorageSync('userBasicInfo').headImgUrl
			this.getUserInfo()
		},
		onUnload() {
			console.log('页面卸载：：：：：；')
		},
		methods:{
			// 获取用户信息
			getUserInfo() {
				let userBasicInfo = uni.getStorageSync('userBasicInfo')
				if (userBasicInfo.compId) {
					return
				}
				let userNo = getUserLoginInfo('userNo')
				getUserBasicInfo(userNo).then(res => {
					console.log('用户基本信息', res)
					if (res.data.code == 200) {
						uni.setStorageSync('userBasicInfo', res.data.data)
					} else {
						request_success(res)
					}
				}, err => {
					console.log('获取用户基本信息失败')
				})
			},
			// 关于我们
			goAboutUs(){
				uni.navigateTo({
					url:'../user/absoutUs'
				})
			},
			goFeedBack(){
				uni.navigateTo({
					url:'../user/feedback'
				})
			},
			// 前往修改个人信息页面
			goEditorPage(){
				uni.navigateTo({
					url:'../userInfomation/userInfomation'
				})
			},
			// 前往设置页面
			goSystemSetting(){
				uni.navigateTo({
					url:'../settting/settting'
				})
			},
			// 前往我的消息页面
			goMyNews(){
				uni.navigateTo({
					url:'../user/myNews/myNews'
				})
			},
			// 前往我的课程页面
			goMyCourse(){
				uni.navigateTo({
					url:'../user/myTraining/myTraining'
				})
			},
			// 前往我的收藏
			goMyCollect(){
				uni.navigateTo({
					url:'../user/myCollect'
				})
			},
			// 前往我的订单
			goMyOrder(){
				uni.showToast({
					title:'暂无订单',
					icon:'none',
					duration:1500
				})
				return
				uni.navigateTo({
					url:'../user/myOrder/myOrder'
				})
			},
			// 前往学习资料
			goLearningMaterials(){
				uni.navigateTo({
					url:'../user/learningMaterials/learningMaterials'
				})
			},
			// 我的签到
			goMySign(){
				uni.navigateTo({
					url:'../user/mySignInPage/mySignInPage'
				})
			},
			// 完善信息
			fillInfomation(){
				uni.navigateTo({
					url:'../fillInfomation/fillInfomation'
				})
			},
			goMyExamPage(){
				uni.navigateTo({
					url:'../myExamListPage/myExamListPage'
				})
			}
		}
	}
</script>

<style lang="scss">
	.header-top-content {
		height: 434rpx;
		background-color: #eeeeee;
		background-image: url(../../static/user-header-bg.png);
		background-size: 100% 100%;
		padding: 30rpx;
	}

	.header-page-title {
		text-align: center;
		color: #FFFFFF;
		font-size: 38rpx;
		position: relative;

	}

	.setting-img {
		position: absolute;
		
		right: 0;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.user-img-circle {
		margin-right: 20rpx;
	}

	.right-arrow-white {
		image {
			width: 22rpx;
			height: 40rpx;
		}
	}

	.user-info-content {
		margin: 70rpx 0;
	}

	.user-name-phone {
		.name {
			// font-size: 34rpx;
			color: #FFFFFF;
			margin-bottom: 10rpx;
		}

		.phone {
			color: #FFFFFF;
			// font-size: 26rpx;
			margin-left: 20rpx;
		}
	}

	.item-content {
		margin: 0 30rpx;
	}

	.main-content {
		background-color: #FFFFFF;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.15);
		border-radius: 30rpx;
		padding: 30rpx 0;
		transform: translateY(-50%);
	}

	.my-course,
	.my-order,
	.my-sign-in {
		text-align: center;
		// font-size: 30rpx;
		color: #333333;

		image {
			width: 64rpx;
			height: 64rpx;
			margin-bottom: 4rpx;
		}
	}

	.items-content {
		background-color: #FFFFFF;
		box-shadow: 0 0 4rpx rgba(0, 0, 0, 0.15);
		border-radius: 30rpx;
		padding: 0 20rpx;
		transform: translateY(-40rpx);
		// margin-top: 40rpx;
	}

	.item-icon {
		image {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.right-arrow-img {
		image {
			width: 14rpx;
			height: 26rpx;
		}
	}

	.title {
		margin-left: 12rpx;
	}

	.item {
		border-bottom: 2rpx solid #EEEEEE;
		padding: 28rpx 0;
	}
	.zzzzzzzzzz{
		border-radius: $uni-border-radius-circle;
		background-image: url(../../static/user2.png);
		background-size: 100% 100%;
		background-color: #eeeeee;
		width:150rpx;
		height:150rpx;
		image{
			width: 100%;
			height: 100%;
			border-radius: $uni-border-radius-circle;
		}
	}
	.user-name {
		font-size: 36rpx;
		color: #333333;
		margin-left: 20rpx;
	}
</style>
