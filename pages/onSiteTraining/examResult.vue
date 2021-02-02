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
					{{examResult.score || '0'}}
				</view>
				<view class="subheading zzz">
					得分
				</view>
				<view class="subheading">
					试卷总分：{{examResult.paperUpscore || '0'}}分
				</view>
			</view>

		</view>
		<view class="exam-info">
			<view class="items">
				<view class="head">
					考生姓名：<text class="ttt">{{nickname || '未知'}}</text>
				</view>
			</view>
			<!-- <view class="items">
				<view class="head">
					考试科目：<text class="ttt">道路危险货物运输</text>
				</view>
			</view> -->
			<view class="items">
				<view class="head">
					考试用时：<text class="ttt">{{examtime || 0}}分钟</text>
				</view>
			</view>
			<view class="items">
				<view class="head">
					考试成绩：<text class="ttt">{{examResult.score || '0'}}分</text>
				</view>
			</view>
			<!-- <view class="items">
				<view class="head">
					考试评分：<text class="unqualified"></text>
				</view>
			</view> -->
		</view>
		<uni-popup ref="sharepopup" type="bottom">
			<share-btn :sharedataTemp="sharedata"></share-btn>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				isFullScreen: false,
				examResult: {},
				examtime: '',
				nickname: '',
				sharedata: {}
			};
		},
		components: {
			uniNavBar
		},
		onLoad(options) {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
			this.examResult = JSON.parse(decodeURIComponent(options.result))
			let ys = this.examResult.examtime.split(':')[1]
			this.examtime = Math.ceil(this.examResult.totalTime - ys) < 1 ? 1 : Math.ceil(this.examResult.totalTime -
				ys)
			this.nickname = uni.getStorageSync('userCompanyInfo').userName
		},
		onBackPress() {
			uni.switchTab({
				url: '../tabBar/learn'
			})
			return true
		},
		methods: {
			// 返回
			navigate() {
				uni.switchTab({
					url: '../tabBar/learn'
				})
			},
			// 分享
			rightClick() {
				this.sharedata = {
					type: 0,
					strShareUrl: 'https://www.ylonlinedu.com/share-page/examresultShare.html?total='+this.examtime + '&score='+this.examResult.score+'&name='+this.nickname+'&time='+this.examtime,
					strShareTitle: '我的成绩',
					strShareSummary: '考试结果',
					strShareImageUrl: 'https://www.ylonlinedu.com/share-page/assets/exam-result-bg.png'
				}
				this.$refs.sharepopup.open();
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
		text-align: left;
		color: #333333;
		font-size: 36rpx;
	}

	.ttt {
		color: #666;
		font-size: 34rpx;
		margin-left: 26rpx;
	}

	.unqualified {
		color: #FA6169;
		font-size: 30rpx;
		margin-left: 26rpx;
	}

	.exam-info {
		padding: 80rpx 0 50rpx;
		width: 50%;
		margin: 0 auto;
	}

	.items {
		margin-bottom: 40rpx;
	}
</style>
