<template>
	<view class="main">
		<view :class="isSolid?'infomation-next-btn2':'infomation-next-btn'" @click="next">{{text?text:'下一步'}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props:['isSolid','text'],
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
		margin: 30rpx 0;
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
	}
	.infomation-next-btn2{
		background: $uni-color-primary;
		color: #FFFFFF;
		border: 1px solid $uni-color-primary;
		font-size: 36rpx;
		margin: 30rpx 0;
		text-align: center;
		padding: 20rpx 0;
		border-radius: 10rpx;
	}
</style>
