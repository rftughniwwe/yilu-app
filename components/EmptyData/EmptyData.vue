<!-- 空数据组件 -->
<template>
	<view class="container">
		<view class="img-content">
			<image src="../../static/serach-no-data.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['type','text']
	}
</script>

<style lang="scss">
.img-content{
	height: 600rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.txt-content{
	font-size: 26rpx;
	color: #999;
	margin: 30rpx 0;
	text-align: center; 
}
</style>
