<template>
	<view class="main">
		<view class="top-content">
			<view class="topic text-overflow2">
				2020年运输危险品_危化品运输中常见的危险品  新进员工考核
			</view>
		</view>
		<view class="main-content">
			<view class="top-card-content flex-around">
				<view class="top-left">
					<view class="title">
						15
					</view>
					<view class="subtitle">
						分钟
					</view>
					<view class="desc">
						考试用时
					</view>
				</view>
				<view class="top-right">
					<view class="title">
						2
					</view>
					<view class="subtitle">
						次
					</view>
					<view class="desc">
						考试次数
					</view>
				</view>
			</view>
			<view class="btm-card-content flex-around">
				<view class="btm-left">
					<view class="title">
						60
					</view>
					<view class="subtitle">
						分
					</view>
					<view class="desc">
						考试分数
					</view>
				</view>
				<view class="btm-right">
					<view class="flex-around">
						<view class="bujige">
							不及格
						</view>
					</view>
					<view class="desc">
						考试情况
					</view>
				</view>
			</view>
		</view>
		<view class="face-log-content">
			
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
.main{
}
.top-content{
	height: 400rpx;
	padding: 40rpx 30rpx 0;
	background-image: url(../../../static/exam-detail-bg.png);
	background-size: 100% 100%;
}
.topic{
	color: #FFFFFF;
	font-size: 38rpx;
	font-weight: bold;
	text-align: center;
}
.main-content{
	background-color: #FFFFFF;
	padding: 50rpx 0;
	box-shadow: 0 0 14rpx #e8e8e8;
	margin: 0 30rpx;
	border-radius: 20rpx;
	transform: translateY(-220rpx);
}
.subtitle,.title,.desc{
	text-align: center;
}
.title{
	color: #333333;
	font-size: 52rpx;
}
.subtitle{
	color: #666666;
	font-size: 24rpx;
}
.desc{
	color: #333333;
	font-size: 28rpx;
	margin-top: 20rpx;
}
.jige{
	width: 95rpx;
	height: 95rpx;
	border-radius: 50%;
	background-color: #3CA7FF;
	color: #FFFFFF;
	font-size: 26rpx;
	text-align: center;
	line-height: 95rpx;
}
.bujige{
	width: 95rpx;
	height: 95rpx;
	border-radius: 50%;
	background-color: #F92E6D;
	color: #FFFFFF;
	font-size: 26rpx;
	text-align: center;
	line-height: 95rpx;
}
.btm-card-content{
	padding-top: 40rpx;
}
</style>
