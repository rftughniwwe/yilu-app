<!-- 考试结果页 -->
<template>
	<view>
		<view class="zxczxc" :style="{'padding-top': isFullScreen?'100rpx':'40rpx'}">
			<uni-nav-bar xibai='noborder' leftIcon="arrowleft" fixed="true" background-color='transparent' @clickLeft='navigate'
			 @clickRight='rightClick' rightIcon="redo" />
		</view>
		<view class="top-content flex-evenly">
			<view class="score">
				<view class="score-txt">
					99分
				</view>
				<view class="subheading zzz">
					得分
				</view>
				<view class="subheading">
					试卷总分：100分
				</view>
			</view>

		</view>
		<view class="exam-info">
			<view class="items">
				<view class="head">
					考生姓名：<text class="ttt">guochang</text>
				</view>
			</view>
			<view class="items">
				<view class="head">
					考试科目：<text class="ttt">货运资格证</text>
				</view>
			</view>
			<view class="items">
				<view class="head">
					考试用时：<text class="ttt">99分钟22秒</text>
				</view>
			</view>
			<view class="items">
				<view class="head">
					考试成绩：<text class="ttt">59分</text>
				</view>
			</view>
			<view class="items">
				<view class="head">
					考试评分：<text class="unqualified">不合格</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				isFullScreen: false
			};
		},
		components: {
			uniNavBar
		},
		onLoad() {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
		},
		methods: {
			// 返回
			navigate() {
				uni.switchTab({
					url: '../tabBar/index'
				})
			},
			// 分享
			rightClick() {

			}
		}
	}
</script>

<style lang="scss">
	.zxczxc {
		position: fixed;
		background: transparent;
	}

	.top-content {
		background: url(../../static/exam-result-bg.png);
		background-size: 100% 100%;
		// height: 642rpx;
		padding: 76rpx 0;
	}

	.score-txt {
		color: #96580F;
		font-weight: bold;
		font-size: 60rpx;
		margin-bottom: 10rpx;
		text-align: center;
	}

	.score {
		margin-top: 160rpx;
	}

	.zzz {
		margin-bottom: 100rpx;
	}

	.subheading {
		font-size: 30rpx;
		color: #9C5B09;
		text-align: center;
	}

	.head {
		text-align: center;
		color: #333333;
		font-size: 30rpx;
	}

	.ttt {
		color: #666;
		font-size: 30rpx;
		margin-left: 26rpx;
	}

	.unqualified {
		color: #FA6169;
		font-size: 30rpx;
		margin-left: 26rpx;
	}

	.exam-info {
		padding: 80rpx 0 50rpx;
		width: 70%;
		margin: 0 auto;
	}

	.items {
		margin-bottom: 40rpx;
	}
</style>
