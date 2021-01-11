<!-- 关于我们 -->
<template>
	<view class="container">
		<view class="logo">
			<image src="../../static/logo.png" mode=""></image>
		</view>
		<view class="item flex-between">
			<view class="title">
				版本号
			</view>
			<view class="subtitle">
				1.0.0
			</view>
		</view>
		<view class="item flex-between">
			<view class="title">
				微信公众号
			</view>
			<view class="subtitle">
				宜陆
			</view>
		</view>
		<view class="item flex-between">
			<view class="title">
				客服电话
			</view>
			<view class="subtitle">
				021-58992985

			</view>
		</view>
		<view class="item flex-between">
			<view class="title">
				客服手机
			</view>
			<view class="subtitle">
				15838241811
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.container{
	padding: 30rpx;
}
.logo{
	margin: 100rpx 0;
	text-align: center;
	image{
		width: 156rpx;
		height: 156rpx;
	}
}
.item{
	border-bottom: 2rpx solid #F4F4F4;
	padding: 20rpx 0;
}
.title{
	color: #333333;
	font-size: 34rpx;
	
}
.subtitle{
	color: #999;
	font-size: 32rpx;
}
</style>
