<template>
	<view class="main">
		<view class="top-content">
			<view class="topic text-overflow2">
				2020年运输危险品_危化品运输中常见的危险品 新进员工考核
			</view>
		</view>
		<view class="main-content">
			<view class="top-card-content flex-around">
				<view class="top-left">
					<view class="title">
						15
					</view>
					<view class="subtitle">
						分钟
					</view>
					<view class="desc">
						考试用时
					</view>
				</view>
				<view class="top-right">
					<view class="title">
						2
					</view>
					<view class="subtitle">
						次
					</view>
					<view class="desc">
						考试次数
					</view>
				</view>
			</view>
			<view class="btm-card-content flex-around">
				<view class="btm-left">
					<view class="title">
						60
					</view>
					<view class="subtitle">
						分
					</view>
					<view class="desc">
						考试分数
					</view>
				</view>
				<view class="btm-right">
					<view class="flex-around">
						<view :class="isJige?'jige':'bujige'">
							{{isJige?'及格':'不及格'}}
						</view>
					</view>
					<view class="soldfikhgj desc">
						考试情况
					</view>
				</view>
			</view>
		</view>
		<view class="tranlate-up">
			<view class="face-log-content-main">
				<view class="face-log-content flex-between">
					<view class="face-log-title">
						人脸日志
					</view>
					<view class="checkout flex-between" @click="checklogface">
						<view class="check-txt">
							查看
						</view>
						<image class="chervon-img" :src="showLog?'../../../static/chevron-up.svg':'../../../static/chevron-down.svg'" mode=""></image>
					</view>
				</view>
				<view v-show="showLog" class="face-sign-log">
					<uni-steps :options="xibai" direction="column"></uni-steps>
				</view>
			</view>
			<view v-if="!isJige" class="goexam-btn">
				<primary-btn text='去考试' @callBackFun='goExamxiba' radius='16rpx'></primary-btn>
			</view>
		</view>
	</view>
</template>

<script>
	import primaryBtn from '@/components/primaryBtn/primaryBtn.vue'
	import uniSteps from '@/components/uni-steps/uni-steps.vue'

	export default {
		data() {
			return {
				showLog: false,
				isJige:false,
				xibai: [
					{
						title: '2020-11-11 09:11',
						desc: '上海市浦东新区松林路357号-1楼',
						headImg: ''
					},
					{
						title: '2020-11-11 09:11',
						desc: '上海市浦东新区松林路357号-1楼',
						headImg: ''
					}
				]
			};
		},
		components: {
			primaryBtn
		},
		onLoad() {

		},
		methods: {
			goExamxiba() {

			},
			checklogface() {
				this.showLog = !this.showLog
			}
		}
	}
</script>

<style lang="scss">
	.main {}

	.top-content {
		height: 400rpx;
		padding: 40rpx 30rpx 0;
		background-image: url(../../../static/exam-detail-bg.png);
		background-size: 100% 100%;
	}

	.topic {
		color: #FFFFFF;
		font-size: 38rpx;
		font-weight: bold;
		text-align: center;
	}

	.main-content {
		background-color: #FFFFFF;
		padding: 70rpx 0;
		box-shadow: 0 0 14rpx #e8e8e8;
		margin: 0 30rpx;
		border-radius: 20rpx;
		transform: translateY(-220rpx);
	}

	.subtitle,
	.title,
	.desc {
		text-align: center;
	}

	.title {
		color: #333333;
		font-size: 52rpx;
	}

	.subtitle {
		color: #666666;
		font-size: 24rpx;
	}

	.desc {
		color: #333333;
		font-size: 28rpx;
		margin-top: 20rpx;
	}

	.jige {
		width: 95rpx;
		height: 95rpx;
		border-radius: 50%;
		background-color: #3CA7FF;
		color: #FFFFFF;
		font-size: 26rpx;
		text-align: center;
		line-height: 95rpx;
	}

	.bujige {
		width: 95rpx;
		height: 95rpx;
		border-radius: 50%;
		background-color: #F92E6D;
		color: #FFFFFF;
		font-size: 26rpx;
		text-align: center;
		line-height: 95rpx;
	}

	.btm-card-content {
		padding-top: 40rpx;
	}

	.face-log-content-main {
		margin: 40rpx 30rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}

	.face-log-content {
		padding: 20rpx 0;


		.face-log-title {
			color: #333333;
			font-size: 32rpx;
			letter-spacing: 2rpx;
		}

		.checkout {
			.check-txt {
				color: #999999;
				font-size: 30rpx;
				margin-right: 10rpx;
			}

		}
	}
	.chervon-img{
		width: 44rpx;
		height: 36rpx;
	}
	.goexam-btn {
		margin: 60rpx 30rpx 40rpx;
	}

	.tranlate-up {
		transform: translateY(-220rpx);
	}

	.face-sign-log {
		margin: 10rpx 20rpx;
	}
	.soldfikhgj{
		padding-top: 20rpx;
	}
</style>
