<!-- 课程预告 -->
<template>
	<view class="main">
		<!-- <view class="begin-time flex-row-start">
			<image src="../../static/timeout.png" mode=""></image>
			<view class="text">
				距离课程开始时间  01:29:05
			</view>
		</view> -->
		<view class="topic">
			<view class="title">
				道路危险货物运输管理
			</view>
			<view class="subtitle middle">
				开课时间:2020-09-2019:30-20:30 · 名师:景晴
			</view>
			<view class="subtitle">
				开课地点：上海市浦东新区松林路357号-1楼
			</view>
		</view>
		<view class="ppp">
			
		
		<view class="container-content">
			<view class="header title">
				直播介绍
			</view>
			<view class="subtitle text-overflow5">
				《危险货物道路运输安全管理办法》是为加强危险货物道路运输安全管理，预防危险货物道路运输事故，保护人民群众生命安全、环境安全和财产安全，根据《中华人民共和国安全
			</view>
			<view class="header title">
				老师介绍
			</view>
			<view class="subtitle text-overflow5">
				《危险货物道路运输安全管理办法》是为加强危险货物道路运输安全管理，预防危险货物道路运输事故，保护人民群众生命安全、环境安全和财产安全，根据《中华人民共和国安全
			</view>
		</view>
		<view class="trainingObject">
			<view class="header title">
				培训对象
			</view>
			<view class="subtitle text-overflow5">
				危险货物道路运输危险货物道路运输危险货物道路运输危险货物道路运输危险货物道路运输
			</view>
		</view>
		</view>
		<view class="btn">
			添加提醒
		</view>
	</view>
</template>

<script>
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import Toast from '@/commons/showToast.js'
	export default {
		data() {
			return {
			};
		},
		onLoad(options) {
			this.getCourseDetails(options.id)
		},
		methods:{
			getCourseDetails(id){
				console.log('课程ID',id)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6F7;
	}
	.main{
		position: fixed;
	}
	.btn{
		background-color: #FFFFFF;
		color: #3CA7FF;
		border-top: 2rpx solid #EAEAEA;
		text-align: center;
		padding: 30rpx 0;
		position: fixed;
		left:0;
		right: 0;
		bottom: 0;
		font-size: 30rpx;
	}
	.begin-time {
		padding: 20rpx 30rpx;
		background-color: rgba(60, 167, 255, 0.27);

		image {
			width: 36rpx;
			height: 36rpx;
			margin-right: 22rpx;
		}

		.text {
			color: #3CA7FF;
			font-size: 30rpx;
		}
	}

	.topic {
		padding: 36rpx 30rpx;
		border-bottom: 20rpx solid #F5F6F7;
	}

	.title {
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
	}

	.middle {
		margin: 30rpx 0 10rpx;
	}

	.subtitle {
		color: #333333;
		font-size: 28rpx;
	}

	.container-content,.trainingObject {
		padding: 40rpx 30rpx;
	}
	
	.text-overflow5 {
		margin: 30rpx 0;
	}

	.header {
		padding: 0 20rpx;
		border-left: 8rpx solid #3395FA;
	}
	.ppp{
		padding-bottom: 50rpx;
	}
</style>
