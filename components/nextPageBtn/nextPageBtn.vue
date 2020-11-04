<template>
	<view class="main">
		<view class="infomation-next-btn" @click="next">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods: {
			next() {
				
				this.$emit('goNextPage')
				
			}
		}
	}
</script>

<style lang="scss">
	.main {
		// width: 100%;
	}

	/* 第一次注册的信息采集页面的下一步按钮 */
	.infomation-next-btn {
		background: #FFFFFF;
		color: $uni-color-primary;
		border: 1px solid $uni-color-primary;
		font-size: 36rpx;
		margin: 30rpx 0;
		text-align: center;
		padding: 20rpx 0;
		border-radius: 10rpx;
		// width: 100%;
	}
</style>
