<template>
	<view class="main">
		<view class="items-block">
			<view class="time">
				{{msgData.gmtCreate}}
			</view>
			<view class="news-content-wrap">
				<view class="news-title flex-row-start">
					<view class="pppp">
						<image src="../../../static/class-img.png" mode=""></image>
					</view>
					<view class="topic text-overflow2">
						{{msgData.msgTitle}}
					</view>
				</view>
				<view class="news-content">
					<rich-text :nodes="msgData.msgText"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		messageInfo
	} from '@/commons/api/user.js'
	export default {
		data() {
			return {
				msgData: {}
			};
		},
		onLoad(options) {
			this.getMsgInfo(options.id)
		},
		methods: {
			getMsgInfo(id) {
				messageInfo({
					id: id
				}).then(res => {
					console.log('消息详情：', res)
					this.msgData = res
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.main {
		padding: 40rpx 30rpx;
	}

	.items-block {
		text-align: center;
		padding: 30rpx 0;
	}

	.time {
		display: inline-block;
		padding: 10rpx 26rpx;
		background: #D3D8DB;
		color: #FFFFFF;
		font-size: 24rpx;
		margin-bottom: 22rpx;
		border-radius: 9999rpx;
	}

	.news-content-wrap {
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 14rpx;
	}

	.news-title {
		margin: 20rpx 0;

		.pppp{
			width: 15%;
			
			image {
				width: 54rpx;
				height: 54rpx;
				margin-right: 22rpx;
			}
		}
		.topic {
			width: 80%;
			font-size: 34rpx;
			color: #333;
			font-weight: bold;
			text-align: left;
		}
	}

	.news-content {
		font-size: 28rpx;
		color: #666666;
		line-height: 1.3;
		margin-bottom: 20rpx;
		text-align: start;
	}

	.look-more {
		border-top: 2rpx solid #DDDDDD;
		padding: 20rpx 0 0;
	}

	.right-arrow-img {
		image {
			width: 14rpx;
			height: 22rpx;
		}
	}
</style>
