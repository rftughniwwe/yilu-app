<!-- 排行榜 -->
<template>
	<view>
		<view class="header-content">
			<view class="header-tab">
				<view class="tab tab-one">
					本单位排行
				</view>
				<view class="tab tab-two">
					全行业排行
				</view>
			</view>
			<view class="top-three-content">
				<view class="top-two">
					<view class="circle-img">
						<image src="../../static/number-two.png" mode=""></image>
						<userHeadImg width='112rpx' height='112rpx'/>
					</view>
					<view class="name">
						第二名
					</view>
					<view class="totla-time">
						300小时
					</view>
				</view>
				<view class="top-one">
					<view class="circle-img">
						<image src="../../static/number-one.png" mode=""></image>
						<userHeadImg width='112rpx' height='112rpx'/>
					</view>
					<view class="name">
						第一名
					</view>
					<view class="totla-time">
						600小时
					</view>
				</view>
				<view class="top-three">
					<view class="circle-img">
						<image src="../../static/number-three.png" mode=""></image>
						<userHeadImg width='112rpx' height='112rpx'/>
					</view>
					<view class="name">
						第三名
					</view>
					<view class="totla-time">
						400小时
					</view>
				</view>
			</view>
			<view class="current-top-content flex-evenly">
				<view class="current-top-img">
					<userHeadImg width='52rpx' height='52rpx'/>
				</view>
				<view class="current-top-text">
					当前排名第666名
				</view>
			</view>
		</view>
		<view class="rank-content">
			<view class="table-header flex-between">
				<view class="no">
					排名
				</view>
				<view class="t-name">
					姓名
				</view>
				<view class="company">
					所属单位
				</view>
				<view class="total-date">
					学习总时长
				</view>
			</view>
			<view class="table flex-between">
				<view class="no">
					4
				</view>
				<view class="t-name flex-between">
					<view class="t-circle-img">
						<userHeadImg width='70rpx' height='70rpx'/>
					</view>
				    <view class="real-name">
				    	张三
				    </view> 
				</view>
				<view class="company">
					上海毅力科技有限公司
				</view>
				<view class="total-date">
					777
				</view>
			</view>
			<view class="table flex-between">
				<view class="no">
					4
				</view>
				<view class="t-name flex-between">
					<view class="t-circle-img">
						<userHeadImg width='70rpx' height='70rpx'/>
					</view>
				    <view class="real-name">
				    	张三
				    </view> 
				</view>
				<view class="company">
					上海毅力科技有限公司
				</view>
				<view class="total-date">
					777
				</view>
			</view>
			<view class="table flex-between">
				<view class="no">
					4
				</view>
				<view class="t-name flex-between">
					<view class="t-circle-img">
						<userHeadImg width='70rpx' height='70rpx'/>
					</view>
				    <view class="real-name">
				    	张三
				    </view> 
				</view>
				<view class="company">
					上海毅力科技有限公司
				</view>
				<view class="total-date">
					777
				</view>
			</view>
			<view class="table flex-between">
				<view class="no">
					4
				</view>
				<view class="t-name flex-between">
					<view class="t-circle-img">
						<userHeadImg width='70rpx' height='70rpx'/>
					</view>
				    <view class="real-name">
				    	张三
				    </view> 
				</view>
				<view class="company">
					上海毅力科技有限公司
				</view>
				<view class="total-date">
					777
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userHeadImg from '@/components/userHeadImg/userHeadImg.vue'
	export default {
		data() {
			return {

			};
		},
		components: {
			userHeadImg
		}
	}
</script>

<style lang="scss">
	.header-content {
		height: 600rpx;
		background-image: url(../../static/leaderborder-bg.png);
		background-size: 100% 100%;
		padding: 0 30rpx;
		text-align: center;
		position: relative;
	}

	.header-tab {
		// width: 66%;
		// margin: 0 auto;
		padding-top: 40rpx;
		display: inline-block;
	}

	.tab {
		padding: 8rpx 20rpx;
		color: #333333;
		background-color: #FFFFFF;
		width: 204rpx;
		text-align: center;
		font-size: 30rpx;
		display: inline-block;
	}

	.tab-one {
		border-top-left-radius: $uni-border-radius-half-circle;
		border-bottom-left-radius: $uni-border-radius-half-circle;
		margin-right: 4rpx;
	}

	.tab-two {
		border-top-right-radius: $uni-border-radius-half-circle;
		border-bottom-right-radius: $uni-border-radius-half-circle;
	}

	.top-three-content {
		display: flex;
		justify-content: space-evenly;
		align-items: flex-start;
		margin-top: 50rpx;

	}
	.t-circle-img{
	}
	.circle-img {
		width: 112rpx;
		text-align: center;
		margin: 0 auto;
		position: relative;
	}

	.name {
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		margin: 20rpx 0 8rpx;
		// width: 170rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.totla-time {
		font-size: 24rpx;
		color: #FFFFFF;
		text-align: center;
		// width: 170rpx;
	}

	.top-one {

		width: 33%;

		image {
			position: absolute;
			z-index: 999;
			top: -32rpx;
			left: -38rpx;
			transform: rotate(-15deg);
			width: 80rpx;
			height: 71rpx;
		}
	}

	.top-two {
		margin-top: 60rpx;

		width: 33%;

		image {
			position: absolute;
			z-index: 999;
			top: -26rpx;
			left: -26rpx;
			transform: rotate(-12deg);
			width: 68rpx;
			height: 62rpx;
		}
	}

	.top-three {
		margin-top: 60rpx;

		width: 33%;

		image {
			position: absolute;
			z-index: 999;
			top: -26rpx;
			left: -26rpx;
			transform: rotate(-12deg);
			width: 68rpx;
			height: 62rpx;
		}
	}
	.current-top-content{
		background-image: url(../../static/current-top-bg.png);
		background-size: 100% 100%;
		padding: 16rpx 180rpx;
		position: absolute;
		bottom: 0;
		width: 326rpx;
		// left: 30rpx;
	}
	.current-top-img{
		
	}
	.current-top-text{
		color: #F9DFAE;
		font-size: 28rpx;
	}
	.no,.t-name,.real-name,.company,.total-date{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 32rpx;
		text-align: center;
	}
	.table-header{
		color: #333333;
		
		background-color: #FFFFFF;
		padding: 20rpx 30rpx;
		.no{
			width: 10%;
			font-size: 28rpx;
		}
		
		.t-name{
			font-size: 28rpx;
			width: 25%;
		}
		.company{
			width: 40%;
			font-size: 28rpx;
		}
		.total-date{
			font-size: 28rpx;
			width: 25%;
		}
	}
	.table{
		padding: 20rpx 30rpx;
		border-bottom: 2rpx solid #D1D2D5;
		.no{
			width: 10%;
			font-size: 28rpx;
		}
		.total-date{
			color: #FB842A;
			font-size: 28rpx;
			
		}
		.t-name{
			width: 22%;
			
			margin: 0 4rpx;
			.real-name{
				font-size: 28rpx;
			}
		}
		.company{
			width: 40%;
			font-size: 28rpx;
		}
		.total-date{
			font-size: 28rpx;
			width: 25%;
		}
	}
</style>
