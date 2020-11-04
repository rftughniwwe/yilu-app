<!-- 试卷详情 -->
<template>
	<view class="container">
		<view class="detail-content">
			<view class="title-content">
				<view class="topic header">
					道路货物运输驾驶员安全培训基础
				</view>
				<view class="exam-subject flex-row-start">
					<image src="../../static/exam-subject.png" mode=""></image>
					<view class="top-txt">
						考试科目：驾驶员资格证
					</view>
				</view>
				<view class="exam-count flex-row-start">
					<image src="../../static/exam-count.png" mode=""></image>
					<view class="top-txt">
						试题数量：<text class="red-color">90</text>题
					</view>
				</view>
				<view class="exam-time flex-row-start">
					<image src="../../static/exam-time.png" mode=""></image>
					<view class="top-txt">
						考试时间：<text class="red-color">90</text>分钟
					</view>
				</view>
				<view class="exam-fraction flex-row-start">
					<image src="../../static/exam-fraction.png" mode=""></image>
					<view class="top-txt">
						合格标注：满分<text class="red-color">100</text>分，及格<text class="red-color">80</text>分
					</view>
				</view>
			</view>

			<view class="exam-introduction">
				<view class="topic">
					题型介绍
				</view>
				<view class="jb">
					<view class="intro-txt">
						一、单选题(20题，四个选项，一个正确选项，选对得1.00分，错选0分)
					</view>
					<view class="intro-txt">
						二、多选题（10题，五个选项，至少有两个正确选项，全选对得2.00分，漏选选对部分选项每个0.5分，错选、多选、不选得0分)
					</view>
					<view class="intro-txt">
						三、判断题（5题）
					</view>
				</view>
			</view>
			<view class="begin-btn">
				<primaryBtn text='开始考试' />
			</view>
			<view class="exam-desc">
				<view class="topic">
					考试说明:
				</view>
				<view class="jb">
					<view class="subtitle">
						1、考生可通过本页面进行考试，考级及格后不能进行再考。
					</view>
					<view class="subtitle">
						2、考试期间不能暂停考试，中途退出系统将为你自动交卷。
					</view>
					<view class="subtitle">
						3，考试途中随时检测人脸，请确保本人进行考试。
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import primaryBtn from '@/components/primaryBtn/primaryBtn.vue'
	export default {
		data() {
			return {

			};
		},
		components: {
			primaryBtn
		}
	}
</script>

<style lang="scss">
	.container {
		background: #7FBFFC;
		padding: 50rpx 30rpx;
	}

	.detail-content {
		background-color: #FFFFFF;
		padding: 30rpx;
		border-radius: 12rpx;
	}
	.header{
		margin-bottom: 50rpx;
		text-align: center;
	}
	.topic {
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
	}

	.title-content {
		margin-bottom: 50rpx;

		.flex-row-start {
			margin-bottom: 20rpx;

			image {
				width: 56rpx;
				height: 56rpx;
				margin-right: 24rpx;
			}
		}
	}

	.top-txt {
		color: #666;
		font-size: 30rpx;
		letter-spacing: 2rpx;
	}

	.red-color {
		color: #FA6169;
	}

	.intro-txt {
		color: #333333;
		font-size: 30rpx;
		letter-spacing: 2rpx;
		margin-bottom: 20rpx;
	}

	.jb {
		margin: 30rpx 0 20rpx;
	}

	.begin-btn {
		padding: 40rpx 50rpx;
	}
	.subtitle{
		font-size: 28rpx;
		color: #333333;
		margin-bottom: 20rpx;
		letter-spacing: 2rpx;
	}
</style>
