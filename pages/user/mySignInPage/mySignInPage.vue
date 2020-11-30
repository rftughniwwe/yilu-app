<!-- 我的签到页面 -->
<template>
	<view class="container">
		<view class="top-content">
			<view class="topic flex-row-start">
				<view class="topic-txt">
					本月汇总
				</view> 
				<image src="../../../static/down-push-arrow.png" mode=""></image>
			</view>
			<view class="tongji">
				<text class="signined">已打卡 3次</text>
				<text>未打卡 0次</text>
			</view>
		</view>
		<view class="main-content">
			<view class="item flex-between">
				<view class="cover-content">
					<image src="../../../static/learning-banner2.png" mode=""></image>
				</view>
				<view class="sign-desc">
					<view class="sign-topic text-overflow2">
						安全教育学习安全教育学习
					</view>
					<view class="sign-time">
						2020-09-09 19:30-20:30
					</view>
					<view class="sign-bottom flex-row-start">
						<view class="sign-txt ttt">
							已打卡
						</view>
						<view class="detail-btn" @click="goDetails">
							查看详情
						</view>
					</view>
				</view>
			</view>
			<view class="item flex-between">
				<view class="cover-content">
					<image src="../../../static/learning-banner2.png" mode=""></image>
				</view>
				<view class="sign-desc">
					<view class="sign-topic text-overflow2">
						安全教育学习安全教育学习
					</view>
					<view class="sign-time">
						2020-09-09 19:30-20:30
					</view>
					<view class="sign-bottom flex-row-start">
						<view class="no-sign-txt ttt">
							未打卡
						</view>
						<view class="detail-btn" @click="goDetails">
							去学习
						</view>
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
		},
		methods:{
			goDetails(){
				uni.navigateTo({
					url:'./mySignInDetail'
				})
			}
		}
	}
</script>

<style lang="scss">
.top-content{
	padding:24rpx 30rpx;
	background-color: #F8F8F8;
	.topic{
		
		.topic-txt{
			margin-right: 16rpx;
			color: #333333;
			font-size: 32rpx;
			font-weight: bold;
		}
		image{
			width: 30rpx;
			height: 30rpx;
		}
	}
	.tongji{
		color: #666;
		font-size: 24rpx;
		.signined{
			margin-right: 30rpx;
		}
	}
}
.main-content{
	padding: 50rpx 30rpx;
	
	.item{
		margin-bottom: 34rpx;
		.cover-content{
			width: 40%;
			height: 230rpx;
			border-radius: 8rpx;
			background-color: #eaeaea;
			margin-right: 24rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
			
		}
		
		.sign-desc{
			width: 55%;
			.sign-topic{
				color: #333333;
				font-size: 32rpx;
				letter-spacing: 2rpx;
			}
			.sign-time{
				color: #666666;
				font-size: 24rpx;
				margin: 20rpx 0 50rpx;
			}
		}
	}
}
.ttt{
	font-size: 24rpx;
	margin-right: 50rpx;
}
.sign-txt{
	color: #3CA7FF;
}
.no-sign-txt{
	color: #FA6169;
}
.detail-btn{
	border: none;
	border-radius: $uni-border-radius-half-circle;
	background-color: rgba(60, 167, 255, 0.1);
	padding: 8rpx 24rpx;
	font-size: 24rpx;
	color: #3CA7FF;
}
</style>
