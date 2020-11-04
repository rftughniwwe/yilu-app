<!-- 自定义顶部tabBar -->
<template>
	<view>
		<view v-if="text!=='none'" class="main flex-between" :style="{'padding': isFullScreen?'100rpx 30rpx 30rpx':'60rpx 30rpx 30rpx'}">
			<view class="left-arrow" @click="back">
				<image src="../../static/arrow-left.png" mode=""></image>
			</view>
			<view class="middle-text">
				{{text}}
			</view>
			<view class="right-content flex-between">
				<image class="first-img" :src="collection?'../../static/collection-selected.png':'../../static/collection.png'"
				 mode="" @click="changeSelect"></image>
				<image src="../../static/share-img.png" mode=""></image>
			</view>
		</view>
		
		<view v-if="text==='none'" class="s-main flex-between">
			<view class="left-arrow" @click="back">
				<image src="../../static/arrow-left-white.png" mode=""></image>
			</view>
			
			<view class="right-content flex-between">
				<image class="first-img" :src="collection?'../../static/collection-selected.png':'../../static/collection-white.png'"
				 mode="" @click="changeSelect"></image>
				<image src="../../static/share-img-white.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collection: false,
				isFullScreen:false
			};
		},
		props: ['text'],
		created() {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			changeSelect() {
				this.collection = !this.collection
			}
		}
	}
</script>

<style lang="scss">
	.main {
		border-bottom: 2rpx solid #eaeaea;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: #FFFFFF;
		z-index: 9999;
	}
	.s-main{
		padding: 60rpx 30rpx 30rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .4);
		z-index: 9999;
		.left-arrow{
			image{
				width: 30rpx;
				height: 44rpx;
			}
		}
	}
	.middle-text {
		font-size: 38rpx;
		font-weight: bold;
		color: #333333;
		width: 60%;
		text-align: center;
	}

	.left-arrow {
		width: 20%;
		display: flex;
		align-items: center;

		image {
			width: 34rpx;
			height: 44rpx;
		}
	}

	.right-content {
		width: 20%;

		.first-img {
			margin-right: 50rpx;
		}

		image {
			width: 44rpx;
			height: 44rpx;
		}
	}
</style>
