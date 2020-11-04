<!-- 学习资料 -->
<template>
	<view>
		
		<view class="wrap-top-tab-bar" >
			<uni-nav-bar leftIcon="arrowleft" @clickLeft="goBack" :style="{'paddingTop':isFullScreen?'64rpx':'30rpx'}">
				<learnTopSlide slot='default' type='3' :tabArr='tabArr' @tabChange="tabSelected" />
			</uni-nav-bar>
		</view>

		<view class="container" :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}">
			<view v-show="num=='0'">
				<view class="item-block flex-row-start">
					<image class="pdf-docx-img" src="../../../static/files-PDF.png" mode=""></image>
					<view class="file-content">
						<view class="title">
							驾驶员安全教育.pdf
						</view>
						<view class="file-size">
							999MB
						</view>
					</view>
				</view>
				<view class="item-block flex-row-start">
					<image class="file-img" src="../../../static/files-img.png" mode=""></image>
					<view class="file-content">
						<view class="title">
							驾驶员安全教育
						</view>
						<view class="file-size">
							999MB
						</view>
					</view>
				</view>
				<view class="item-block flex-row-start">
					<image class="pdf-docx-img" src="../../../static/files-DOCX.png" mode=""></image>
					<view class="file-content">
						<view class="title">
							驾驶员安全教育.doc
						</view>
						<view class="file-size">
							999MB
						</view>
					</view>
				</view>
			</view>
			<view v-show="num=='1'">
				<view class="video-item">
					<view class="topic text-overflow2">
						危化品运输车安全行车注意事项, 你必须了解！危化品运输车安全行车注意事项, 你必须了解！
					</view>
					<view class="cover flex-evenly" :style="{'background':'url(../../../static/banner.png)'}">
						<image src="../../../static/pause-video.png" mode=""></image>
					</view>
				</view>
				<view class="video-item">
					<view class="topic text-overflow2">
						危化品运输车安全行车注意事项, 你必须了解！危化品运输车安全行车注意事项, 你必须了解！
					</view>
					<view class="cover flex-evenly" :style="{'background':'url(../../../static/banner.png)'}">
						<image src="../../../static/pause-video.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import learnTopSlide from '@/components/learnTopSlide/learnTopSlide.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				tabArr: ['文件', '视频'],
				num: '0',
				isFullScreen: false
			};
		},
		components: {
			learnTopSlide,
			uniNavBar
		},
		onLoad() {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
		},
		methods: {
			tabSelected(data) {
				this.num = data.tab
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx 30rpx;
	}

	.item-block {
		margin: 20rpx 0 40rpx;

		image {
			margin-right: 30rpx;
		}

		.pdf-docx-img {
			width: 60rpx;
			height: 73rpx;
		}

		.file-img {
			width: 65rpx;
			height: 56rpx;
		}
	}

	.title {
		color: #333333;
		font-size: 30rpx;
		margin-bottom: 6rpx;
	}

	.file-size {
		color: #FFB415;
		font-size: 24rpx;
	}

	.video-item {
		border-bottom: 2rpx solid #eaeaea;
		padding: 30rpx 0;
	}

	.topic {
		color: #333333;
		font-size: 34rpx;
		font-weight: bold;
		margin-bottom: 12rpx;
	}

	.cover {
		width: 100%;
		height: 308rpx;
		background-size: 100% 100%;

		image {
			width: 148rpx;
			height: 148rpx;
		}
	}
</style>
