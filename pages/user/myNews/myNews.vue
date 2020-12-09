<!-- 我的消息页面 -->
<template>
	<view class="main">
		<template v-if="msgList && msgList.length > 0">
			<view class="item flex-row-start" @click="newsDetail(item.id)" v-for="(item,index) in msgList" :key='index'>
				<view class="img zxczxc">
					<image src="../../../static/system-news.png" mode=""></image>
					<!-- <view class="buble">
						1
					</view> -->
				</view>
				<view class="middle-content">
					<view class="topic">
						{{item.msgTitle}}
					</view>
					<view class="subtitle">
						{{item.msgTitle}}
					</view>
				</view>
				<view class="time">
					{{item.gmtCreate}}
				</view>
			</view>
		</template>
		<template v-else>
			<EmptyData type='chat'/>
		</template>
		
	</view>
</template>

<script>
	import {
		myMessageList
	} from '@/commons/api/user.js'
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	
	export default {
		data() {
			return {
				noMore: false,
				pageCurrent:1,
				totalPage:1,
				msgList: []
			};
		},
		onLoad() {
			this.getMsg()
		},
		onReachBottom: function () {
		  if (this.pageCurrent < this.totalPage) {
			this.pageCurrent += 1
		    this.getMessageList();
		  }
		},
		methods: {
			newsDetail(id) {
				uni.navigateTo({
					url: './newsDetail?id='+id
				})
			},
			getMsg() {
				uni.showLoading({
					title: '加载中...'
				});
				myMessageList({
					pageCurrent: this.pageCurrent,
					pageSize: 10
				}).then(res => {
					console.log(res);
					uni.hideLoading()
					console.log('我的消息：',res)
					this.totalPage = res.totalPage
					this.msgList = this.msgList.concat(res.list)
					if (res.totalPage == res.pageCurrent) {
						this.noMore = true
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.main {
		padding: 30rpx;
	}

	.item {
		padding: 30rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
		border-radius: 18rpx;
	}

	.img {
		border-radius: $uni-border-radius-half-circle;
		height: 102rpx;
		margin-right: 20rpx;
		// position: relative;

		image {
			border-radius: $uni-border-radius-half-circle;
			width: 102rpx;
			height: 100%;
		}
	}
	.zxczxc{
		width: 20%;
	}
	.middle-content {
		width: 50%;

		.topic {
			color: #333;
			font-size: 34rpx;
			font-weight: bold;
			margin-bottom: 12rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

		}

		.subtitle {
			color: #666;
			font-size: 24rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.time {
		color: #999;
		font-size: 24rpx;
		width: 20%;
	}

	.buble {
		width: 33rpx;
		height: 33rpx;
		background: #FE5A00;
		color: #FFFFFF;
		border-radius: 50%;
		position: absolute;
		right: -10rpx;
		top: -6rpx;
		z-index: 9899;
		padding: 4rpx;
		text-align: center;
		line-height: 33rpx;
		font-size: 24rpx;
	}
</style>
