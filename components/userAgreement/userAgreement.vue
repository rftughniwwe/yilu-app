<template>
	<view class="login-protocol">登录/注册代表同意<text class="high-color" @click="userAgreement">《用户协议》、《隐私政策》</text></view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			userAgreement() {
				uni.navigateTo({
					url: '../userAgreement/userAgreement'
				})
			},
		}
	}
</script>

<style lang="scss">
	.login-protocol {
		color: #999999;
		font-size: 26rpx;
	}

	.high-color {
		color: $uni-color-primary;
	}
</style>
