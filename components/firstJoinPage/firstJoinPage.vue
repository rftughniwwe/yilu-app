<!-- 第一次进入时的引导页面 -->
<template>
	<view class="mainx">
		<swiper indicator-dots='true' indicator-color="RGBA(177, 220, 255, 1)" indicator-active-color="RGBA(23, 144, 248, 1)" class="swiper-content" :autoplay="false" :duration="500">
			<swiper-item>
				<view class="swiper-item item-one">
					<view class="btm-img">
						<view>
							<image class="frist-img" src="../../static/guide-img1-1.png" mode=""></image>

						</view>
						<image class="last-img" src="../../static/guide-img1-2.png" mode=""></image>
					</view>
					<view class="jumpover-btn" @click="jumpOver">
						跳过
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item item-two">
					<view class="btm-img">
						<view>
							<image class="frist-img" src="../../static/guide-img2-1.png" mode=""></image>
						</view>
						<image class="last-img" src="../../static/guide-img2-2.png" mode=""></image>
					</view>
					<view class="jumpover-btn" @click="jumpOver">
						跳过
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item item-three">
					<view class="btm-img">
						<view>
							<image class="frist-img" src="../../static/guide-img3-1.png" mode=""></image>

						</view>
						<image class="last-img" src="../../static/guide-img3-2.png" mode=""></image>
					</view>
					<view class="experience-btn" @click="jumpOver">
						立即体验
					</view>
				</view>

			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			jumpOver() {
				uni.setStorageSync('firstIn', true)
				uni.setStorageSync('userAgreementModal', true)
				// 需判断是否登录过，然后跳过首页或者登录页
				uni.reLaunch({
					url: '../login/normalLogin'
				})
			}
		}
	}
</script>

<style lang="scss">
	.mainx {
		width: 100vw;
		height: 100vh;

		.swiper-content {
			width: 100%;
			height: 100%;
		}

		.item-one {
			background-image: url(../../static/guide-img1.png);
			background-size: 100% 100%;

			.frist-img {
				width: 308rpx;
				height: 58rpx;
			}

			.last-img {
				width: 262rpx;
				height: 28rpx;
			}
		}

		.item-two {
			background-image: url(../../static/guide-img2.png);
			background-size: 100% 100%;

			.frist-img {
				width: 310rpx;
				height: 58rpx;
			}

			.last-img {
				width: 538rpx;
				height: 34rpx;
			}
		}

		.item-three {
			background-image: url(../../static/guide-img3.png);
			background-size: 100% 100%;

			.frist-img {
				width: 420rpx;
				height: 58rpx;
			}

			.last-img {
				width: 393rpx;
				height: 36rpx;
			}
		}
	}

	.swiper-item {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.jumpover-btn {
		background: #000;
		opacity: .3;
		border-radius: $uni-border-radius-half-circle;
		padding: 16rpx 34rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		position: absolute;
		top: 80rpx;
		right: 30rpx;
	}
	.experience-btn{
		position: absolute;
		bottom: 100rpx;
		left: 50%;
		transform: translateX(-50%);
		color: #FFFFFF;
		background: #3CA7FF;
		border-radius: $uni-border-radius-half-circle;
		padding: 24rpx 0;
		width: 400rpx;
		text-align: center;
		font-size: 36rpx;
	}
	.btm-img{
		position: absolute;
		bottom: 250rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
	}
</style>
