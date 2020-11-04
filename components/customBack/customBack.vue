<template>
	<view class="arrow-left-content">
		<image @click="back" src="../../static/chevron-left.svg" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	.arrow-left-content {
		padding: 30rpx 0 0;
		height: 120rpx;

		image {
			width: 80rpx;
			height: 170rpx;
		}
	}
</style>
