<template>
	<view class="main" @click="clearValue">
		<image src="../../static/input-clear.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			clearValue(){
				uni.$emit("clearValue")
			}
		}
	}
</script>

<style lang="scss">
	.main{
		position: absolute;
		top: 40rpx;
		right: 10rpx;
		image{
			width: 30rpx;
			height: 30rpx;
		}
	}
</style>
