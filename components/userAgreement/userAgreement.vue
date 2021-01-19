<template>
	<view class="login-protocol">登录/注册代表同意<text class="high-color"><text @click="userAgreement(1)">《用户协议》</text>、<text @click="userAgreement(2)">《隐私政策》</text></text></view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			userAgreement(type) {
				uni.navigateTo({
					url: '../userAgreement/userAgreement?type='+type
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
