<template>
	<view>
		<view class="item-content">
			<view class="item flex-between" @click="editPhoneNum">
				<view class="head">
					手机号
				</view>
				<view class="right-content flex-between">
					<view class="head-img">
						{{phone}}
					</view>
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
			</view>
			<!-- <view class="item flex-between" @click="fillInfomation">
				<view class="head">
					完善信息
				</view>
				<view class="right-content">
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
			</view> -->
			<view class="item flex-between" @click="goEditPassword">
				<view class="head">
					修改密码
				</view>
				<view class="right-content">
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item flex-between">
				<view class="head">
					清除缓存
				</view>
				<view class="right-content">

					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>

				</view>
			</view>
			<view class="item flex-between">
				<view class="head">
					版本号
				</view>
				<view class="right-content">
					<view class="head-img">
						V1.0
					</view>
				</view>
			</view>
			<view class="item flex-between" @click="setFontSize">
				<view class="head">
					字体大小
				</view>
				<view class="right-content">
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="logout-content">
			<primaryBtn text='退出登录' @callBackFun='logout'/>
			<view class="serverAgreement" @click="goUserAgreement">
				<text class="first-txt">服务协议</text>
				<text>隐私政策</text>
			</view>
		</view>
	</view>
</template>

<script>
	import primaryBtn from '@/components/primaryBtn/primaryBtn.vue'
	import {
		removeAppStorage
	} from '../../utils/util.js'
	export default {
		data() {
			return {
				phone:''
			};
		},
		components:{
			primaryBtn
		},
		onLoad() {
			this.phone = uni.getStorageSync('userBasicInfo').mobile
		},
		methods: {
			// 前往修改密码
			goEditPassword() {
				uni.navigateTo({
					url:'../resetPassword/resetPassword'
				})
			},
			// 前往用户协议
			goUserAgreement(){
				uni.navigateTo({
					url:'../userAgreement/userAgreement'
				})
			},
			// 前往修改手机号
			editPhoneNum(){
				uni.navigateTo({
					url:'./changePhoneNumber'
				})
			},
			// 前往设置字体大小
			setFontSize(){
				uni.navigateTo({
					url:'./setFontSize'
				})
			},
			// 退出登录
			logout(){
				removeAppStorage()
				uni.reLaunch({
					url:'../login/codeLogin'
				})
			},
			// 完善信息
			fillInfomation(){
				uni.navigateTo({
					url:'../fillInfomation/fillInfomation'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.item-content {
		background-color: #FFFFFF;
	}

	.item {
		padding: 26rpx 30rpx;

		&:not(:last-child) {
			border-bottom: 2rpx solid #EFEFEF;
		}
	}

	.head {
		color: #666;
		font-size: 34rpx;
		letter-spacing: 2rpx;
	}

	.right-content {
		max-width: 60%;
	}

	.head-img {
		color: #333333;
		font-size: 32rpx;
	}

	.right-arrow-img {
		image {
			width: 12rpx;
			height: 20rpx;
			margin-left: 20rpx;
		}

	}
	.logout-content{
		margin-top: 100rpx;
		padding: 0 30rpx;
	}
	.serverAgreement{
		margin-top: 20rpx;
		text-align: center;
		.first-txt{
			border-right: 2rpx solid #BFBFBF;
			
		}
		text{
			color: #3CA7FF;
			padding: 0 18rpx;
			font-size: 26rpx;
		}
	}
</style>
