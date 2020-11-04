<!-- 新闻的模块 -->
<template>
	<view class="main" @click="goArticleDetails">
		<view v-if="position==='left'" class="topic-left-content">
			<view class="left" :style="{'fontSize':globalSize+'rpx'}">
				自我测评是否疲劳驾驶和缓解劳的方法自我测评是否疲劳驾驶和缓解劳的方法自我测评是否疲劳驾驶和缓解劳的方法
			</view>
			<view class="right">
				<image src="../../static/banner.png" mode=""></image>
			</view>
			<view class="form-time flex-between">
				<image class="top-img" src="../../static/top.png" mode=""></image>
				<text>央视新闻</text>
			</view>
		</view>
		<view v-if="position==='text'" class="topic-top-content">
			<view class="left only-text" :style="{'fontSize':globalSize+'rpx'}">
				自我测评是否疲劳驾驶和缓解劳的方法自我测评是否疲劳驾驶和缓解劳的方法自我测评是否疲劳驾驶和缓解劳的方法
			</view>
			<view class="form-time flex-between">
				<image class="top-img" src="../../static/top.png" mode=""></image>
				<text>央视新闻</text>
			</view>
		</view>
		<view v-if="position==='right'||position==='moreimg'" class="topic-top-content">
			<view class="left" :style="{'fontSize':globalSize+'rpx'}">
				自我测评是否疲劳驾驶和缓解劳的方法自我测评是否疲劳驾驶和缓解劳的方法自我测评是否疲劳驾驶和缓解劳的方法
			</view>
			<view v-if="position==='right'" class="bottom">
				<image src="../../static/banner2.png" mode=""></image>
			</view>
			<view v-else class="more-img flex-between">
				<image src="../../static/banner2.png" mode=""></image>
				<image src="../../static/banner2.png" mode=""></image>
				<image src="../../static/banner2.png" mode=""></image>
			</view>
			<view class="form-time flex-between">
				<image class="top-img" src="../../static/top.png" mode=""></image>
				<text>央视新闻</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				globalSize:34
			};
		},
		props: ['position'],
		mounted() {
			
			this.globalSize = uni.getStorageSync('globalFontSize')
		},
		methods:{
			goArticleDetails(){
				this.$emit('GoArticleDetails')
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
				margin-right: 30rpx;
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
