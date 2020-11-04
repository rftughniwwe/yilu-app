<template>
	<view class="top-tips" :style="{'textAlign':align?align:'left','marginTop':marginTop?marginTop:'50rpx'}">
		{{text}}
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: ['text', 'align', 'marginTop']
	}
</script>

<style lang="scss">
	.top-tips {
		color: $uni-text-color-grey;
		font-size: 28rpx;
	}
</style>
