<!-- 新闻的模块 -->
<template>
	<view class="main" @click="goArticleDetails">
		<view v-if="position==='left'" class="topic-left-content">
			<view class="left" :style="{'fontSize':globalSize+'rpx'}">
				{{datas.title || '未知'}}
			</view>
			<view class="right">
				<image :src="datas.blogImg" mode=""></image>
			</view>
			<view class="form-time flex-between">
				<!-- <image v-if="datas.isTop" class="top-img" src="../../static/top.png" mode=""></image> -->
				<image class="head-user-img" :src="datas.bloggerUserImg" mode=""></image>
				<text>{{datas.bloggerNickname?datas.bloggerNickname:'未知用户'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				globalSize:34,
				item:{}
			};
		},
		props: ['position','datas'],
		
		mounted() {
			this.globalSize = uni.getStorageSync('globalFontSize')
		},
		methods:{
			goArticleDetails(){
				this.$emit('GoArticleDetails',{'item':this.datas})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		border-bottom: 1px solid #eaeaea;
	}

	.top-img {
		width: 56rpx;
		height: 33rpx;
	}
	.head-user-img{
		width: 36rpx;
		height: 36rpx;
		border-radius: $uni-border-radius-half-circle;
		border: 2rpx solid #eaeaea;
	}
	.only-text {
		margin: 0 0 40rpx;
	}

	.topic-left-content {
		padding: 20rpx 0;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		.form-time {
			position: absolute;
			bottom: 10rpx;
			left: 0;

			image {
				margin-right: 20rpx;
			}

			text {
				color: #999999;
				font-size: 26rpx;
			}
		}

		.left {
			max-width: 65%;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			margin-right: 20rpx;
			color: #333333;
		}



		.right {
			image {
				width: 225rpx;
				height: 144rpx;
				border: 2rpx solid #eaeaea;
			}
		}
	}

	.topic-top-content {
		padding: 30rpx 0;
		position: relative;

		.form-time {
			position: absolute;
			bottom: 20rpx;
			left: 0;

			image {
				margin-right: 30rpx;
			}

			text {
				color: #999999;
				font-size: 26rpx;
			}
		}

		.left {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			color: #333333;
		}

		.bottom {
			margin: 20rpx 0 30rpx;

			image {
				width: 100%;
				height: 308rpx;
			}
		}

		.more-img {
			margin: 20rpx 0 40rpx;

			&:first-of-type(2) {
				margin: 0 6rpx;
			}

			image {
				height: 146rpx;
				width: 224rpx;
			}
		}
	}
</style>
