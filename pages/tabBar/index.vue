<!-- 咨询首页 -->
<template>
	<view class="main">
		<view class="top-content flex-evenly" :style="{'padding': isFullScreen?'100rpx 0 30rpx':'50rpx 0 30rpx'}">
			<view class="camera-qr-code flex-between" @click="scanCode">
				<image src="../../static/camera-code.png" mode=""></image>
			</view>
			<view class="serach-content flex-row-start" @click="goToSerach">
				<image src="../../static/serach-img.png" mode=""></image>
				<text>搜索</text>
			</view>
			<view class="info flex-between" @click="gomyNews">
				<image src="../../static/user-info.png" mode=""></image>
			</view>
		</view>
		<view class="banner-content" :style="{'margin-top':isFullScreen?'194rpx':'142rpx'}">
			<swiper class="swiper-content" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="600" circular="true">
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/banner.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/banner2.png" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="news-content">
			<view>
				<newCover @GoArticleDetails='goDetails' position='left'></newCover>
				<newCover @GoArticleDetails='goDetails' position='moreimg'></newCover>
				<newCover @GoArticleDetails='goDetails' position='right'></newCover>
				<newCover @GoArticleDetails='goDetails' position='text'></newCover>
			</view>
		</view>
		<view class="special-topic">
			<view class="header flex-between">

				<view class="title flex-between">
					<image src="../../static/speaci-topic.png" mode=""></image>
					专题
				</view>
				<view class="check-more flex-between" @click="goSpeacialTopic">
					<view>
						更多
					</view>
					<image src="../../static/right-arrow.png" mode=""></image>
				</view>
			</view>
			<view class="scroll-content">
				<scroll-view class="scroll-content-items" scroll-x="true">
					<view class="item-img">
						<view class="title">
							专题专题专题专题专题专题
						</view>
					</view>
					<view class="item-img">
						<view class="title">
							专2题专题2专题2专题2专题2专题2
						</view>
					</view>
				</scroll-view>
				<newCover position='text'></newCover>
				<newCover position='right'></newCover>
			</view>
		</view>
		<loadingData v-if="reachBtm"></loadingData>
		<view class="refresh" @click="refreshHandle">
			<image src="../../static/refresh.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import newCover from '@/components/news-cover/news-cover.vue'
	import loadingData from '@/components/loadingData/loadingData.vue'
	export default {
		data() {
			return {
				reachBtm: false,
				isFullScreen:false
			};
		},
		onLoad() {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
		},
		onReachBottom() {

			this.reachBtm = true
			this.loadData()
		},
		components: {
			newCover,
			loadingData
		},
		methods: {

			loadData() {
				uni.showLoading()
				setTimeout(() => {
					uni.hideLoading()
					this.reachBtm = false
				}, 1000)
			},
			refreshHandle(){
				console.log('刷新。。')
			},
			goToSerach(){
				uni.navigateTo({
					url:'../searchFor/searchFor'
				})
			},
			goDetails(){
				uni.navigateTo({
					url:'../aiticlePage/aiticlePage'
				})
			},
			goSpeacialTopic(){
				uni.navigateTo({
					url:'../specialTopic/speacialTopicPage'
				})
			},
			gomyNews(){
				uni.navigateTo({
					url:'../user/myNews/myNews'
				})
			},
			scanCode() {
				let mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module")
				mpaasScanModule.mpaasScan({
					'type': 'qr',
					'scanType': ['qrCode', 'barCode'],
					'hideAlbum': true
				}, (res) => {
					console.log('扫描结果', JSON.stringify(res))
				})
			},
			
		}

	}
</script>

<style lang="scss">
	.main {
		background: #FFFFFF;
		position: relative;
	}

	.top-content {
		background: #FFFFFF;
		width: 100%;
		position: fixed;
		z-index: 9999;
		left: 0;
		top: 0;
		right: 0;

		.camera-qr-code {
			margin-right: 4rpx;

			image {
				width: 44rpx;
				height: 44rpx;
			}
		}

		.serach-content {
			width: 65%;
			border-radius: $uni-border-radius-base;
			background: #F5F5F5;
			padding: 10rpx 20rpx;
			color: $uni-subtitle-text-color;
			font-size: 30rpx;
			// display: flex;
			// justify-content: flex-start;
			// align-items: center;

			image {
				width: 35rpx;
				height: 35rpx;
				margin-right: 10rpx;
			}
		}

		.info {
			image {
				width: 44rpx;
				height: 44rpx;
			}
		}
	}

	.banner-content {
		.swiper-content {
			width: 100%;
			height: 380rpx;

			image {
				width: 100%;
				height: 380rpx;
			}
		}
	}

	.news-content{
		padding: 30rpx $uni-spacing-row-lg 20rpx;
	}

	.special-topic {
		padding: 10rpx $uni-spacing-row-lg 60rpx;

		.header {
			.title {
				color: #333333;
				font-size: 38rpx;

				image {
					margin-right: 20rpx;
					width: 44rpx;
					height: 44rpx;
				}
			}

			.check-more {
				color: #999999;
				font-size: 32rpx;

				image {
					width: 14rpx;
					height: 24rpx;
					margin-left: 8rpx;
				}
			}
		}
	}

	.item-img {
		border-radius: $uni-border-radius-base;
		background-image: url(../../static/banner2.png);
		background-size: 100% 100%;
		width: 400rpx;
		height: 214rpx;
		position: relative;
		display: inline-block;
		margin-right: 20rpx;

		.title {
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			background: #999999;
			opacity: .8;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding: 8rpx 20rpx;
			color: #FFFFFF;
			// width: 360rpx;
		}
	}

	.scroll-content {
		padding: 20rpx 0;
		border-bottom: 1px solid #eaeaea;
	}

	.scroll-content-items {
		// height: 220rpx;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	.refresh{
		position: fixed;
		right: 16rpx;
		bottom: 40rpx;
		image{
			width: 133rpx;
			height: 133rpx;
		}
	}
</style>
