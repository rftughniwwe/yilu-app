<template>
	<view class="bottom-content">
		<view v-if="mode !=1" class="item" @click="faceLogin">
			<image src="../../static/facelogin.png" mode=""></image>
			<view class="zxc">
				刷脸登录
			</view>
		</view>
		<view v-if="mode !=2" class="item" @click="codeLogin">
			<image src="../../static/codelogin.png" mode=""></image>
			<view class="zxc">
				短信登录
			</view>
		</view>
		<!-- <view v-if="mode !=3"class="item" @click="fastLogin">
			<image src="../../static/fastlogin.png" mode=""></image>
			<view>
				一键登录
			</view>
		</view> -->
		<view v-if="mode !=4" class="item" @click="psdLogin">
			<image src="../../static/passwordlogin.png" mode=""></image>
			<view class="zxc">
				密码登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: ['mode'],
		methods: {
			// 密码登录
			psdLogin() {
				uni.redirectTo({
					url:'../../pages/login/normalLogin'
				})
			},
			// 一键登录
			fastLogin() {

			},
			// 刷脸登录
			faceLogin() {
				uni.navigateTo({
					url:'../../pages/login/faceLogin'
				})
			},
			// 短信登录
			codeLogin() {
				uni.redirectTo({
					url:'../../pages/login/codeLogin'
				})
			}
		}
	}
</script>

<style lang="scss">
	.bottom-content {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 40rpx 0;

		.item {
			image {
				width: 101rpx;
				height: 101rpx;
			}

			view {
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
	.zxc{
		text-align: center;
	}
</style>
