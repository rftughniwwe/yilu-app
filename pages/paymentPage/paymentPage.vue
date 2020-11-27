<!-- 支付详情 -->
<template>
	<view class="container">
		<view class="buy-info">
			<view class="item flex-between">
				<view class="titile">
					购买项目
				</view>
				<view class="content">
					驾驶员
				</view>
			</view>
			<view class="item middle-item flex-between">
				<view class="titile">
					行业类别
				</view>
				<view class="content">
					继续教育
				</view>
			</view>
			<view class="item bottom-brd flex-between">
				<view class="titile">
					姓名
				</view>
				<view class="content">
					王大锤
				</view>
			</view>
			<view class="item flex-between">
				<view class="titile">
					购买使用权限
					<view class="tips">
						有效期至：<text class="hight-color">2021-04-22</text>
					</view>
				</view>
				<view class="content">
					1年
				</view>
			</view>
		</view>
		<view class="valid-period">
			<!-- <view class="valid-time flex-between">
				<view :class="num==1?'selected-item':'item-date'" @click="changeTime(1)">
					一个月
				</view>
				<view :class="num==2?'selected-item':'item-date'" @click="changeTime(2)">
					三个月
				</view>
				<view :class="num==3?'selected-item':'item-date'" @click="changeTime(3)">
					半月
				</view>
				<view :class="num==4?'selected-item':'item-date'" @click="changeTime(4)">
					一年
				</view>
			</view>
			<view class="tips">
				有效期至：<text class="hight-color">2020-04-22</text>
			</view> -->
		</view>
		<view class="pay-money">
			<view class="item flex-between">
				<view class="titile">
					原价
				</view>
				<view class="content">
					￥300.00
				</view>
			</view>
			<view class="item middle-item flex-between">
				<view class="titile">
					优惠折扣
				</view>
				<view class="content">
					7折
				</view>
			</view>
			<view class="item flex-between">
				<view class="titile">
					支付金额
				</view>
				<view class="content">
					210
				</view>
			</view>
		</view>
		<view class="pay-mode-title">
			支付方式
		</view>
		<view class="pay-mode">
			<view class="item first-item flex-between" @click="changePayMode(1)">
				<view class="zhifub flex-row-start">
					<image src="../../static/zhifub-pay.png" mode=""></image>
					<view>
						￥210
					</view>	
				</view>
				<image class="options-img" :src="payMode===1?'../../static/selected-img.png':'../../static/no-selected-img.png'" mode=""></image>
			</view>
			<view class="item flex-between"  @click="changePayMode(2)">
				<view class="wechat flex-row-start">
					<image src="../../static/wechat-pay.png" mode=""></image>
					<view>
						￥210
					</view>	
				</view>
				<image class="options-img" :src="payMode===1?'../../static/no-selected-img.png':'../../static/selected-img.png'" mode=""></image>
			</view>
		</view>
		<view class="go-pay-btn">
			<primaryBtn @callBackFun="goPay" text="去支付"/>
		</view>
	</view>
</template>

<script>
	import primaryBtn from '@/components/primaryBtn/primaryBtn.vue'
	export default {
		data() {
			return {
				payMode:1
			};
		},
		components:{
			primaryBtn
		},
		onLoad(options) {

		},
		methods: {
			changePayMode(num){
				this.payMode = num
			},
			caculationDate(num) {
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth()+1
				let day = date.getDate()
				
				
			},
			goPay(){
				console.log("去支付")
			}
		}
	}
</script>

<style lang="scss">
	.container,page {
		background-color: #F5F6F7;
	}

	.buy-info {
		margin-bottom: 40rpx;
		background-color: #FFFFFF;

	}

	.middle-item {
		border-top: 2rpx solid #EAEAEA;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.bottom-brd{
		border-bottom: 2rpx solid #EAEAEA;
	}
	.item {
		padding: 20rpx 30rpx;
		
		.title {
			color: #333333;
			font-size: 38rpx;
			font-weight: bold;
			letter-spacing: 4rpx;
		}

		.content {
			font-size: 32rpx;
			color: #666;
			letter-spacing: 4rpx;
		}
	}
	.selected-item{
		color: #3CA7FF;
		border: 2rpx solid #3CA7FF;
		background-color: #FFFFFF;
		border-radius: 12rpx;
		padding: 12rpx 26rpx;
	}
	.item-date {
		background-color: #EFEFEF;
		border-radius: 12rpx;
		color: #333333;
		padding: 12rpx 26rpx;
	}
	.valid-period {
		margin-bottom: 40rpx;
	}
	.tips {
		text-align: center;
		color: #999999;
		font-size: 24rpx;
		margin-top: 10rpx;
		.hight-color {
			color: #3CA7FF;
		}
	}
	.pay-money {
		background-color: #FFFFFF;
		
	}
	.pay-mode-title{
		background-color: #F5F6F7;
		color: #333333;
		font-size: 34rpx;
		font-weight: bold;
		margin: 40rpx 30rpx;
	}
	.pay-mode{
		background-color: #FFFFFF;
		padding: 14rpx 30rpx;
		.item{
			.options-img{
				width: 46rpx;
				height: 46rpx;
			}
		}
	}
	.zhifub{
		image{
			margin-right: 20rpx;
			width: 46rpx;
			height: 44rpx;
		}
		view{
			color: #333333;
			font-size: 34rpx;
		}
	}
	.wechat{
		image{
			margin-right: 20rpx;
			width: 44rpx;
			height: 38rpx;
		}
		view{
			color: #333333;
			font-size: 34rpx;
		}
	}
	.first-item{
		border-bottom: 2rpx solid #eaeaea;
	}
	.go-pay-btn{
		margin:60rpx 50rpx 40rpx;
	}
</style>
