<!-- 课程item -->
<template>
	<view class="main">
		<view class="item-content flex-between">
			<view class="img-content">
				<image src="../../static/learning-banner2.png" mode=""></image>
			</view>
			<view class="right-content flex-column-between">
				<view class="title text-overflow2">
					道路危险货物运输管理课程(上)道路危险货物运输管理课程(上)道路危险货物运输管理课程(上)道路危险货物运输管理课程(上)道路危险货物运输管理课程(上)
				</view>
				<view class="time-from">
					<view class="time">
						09月25日 09：30-20：00
					</view>
					<view class="from">
						老师：张成功
					</view>
				</view>
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
	.item-content {
		border-bottom: 2rpx solid #EAEAEA;
		padding: 20rpx 0;
	}
	.title{
		width: 100%;
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	.time,.from{
		color: #999;
		font-size: 24rpx;
	}
	.img-content{
		width:40%;
		image{
			width: 100%;
			height: 170rpx;
		}
	}
	.right-content{
		width: 55%;
		margin: 0 20rpx;
	}
</style>
