<!-- 做题swpier -->
<template>
	<view class="main">
		<swiper class='swiper' :indicator-dots='false' @change="itemChange">
			<template v-for="(item,index) in datas">
				<swiper-item>
					<view class="topic">
						{{index+1}}.{{item.problemContent}}
					</view>
					<view class="options">
						<examOptions :item='item.children' @optionsClick='clickItem($event,index)' />
					</view>
					<view v-if="item.userAnswer" class="answer-content">
						<view v-if="item.userAnswer !== item.problemAnswer" class="error-answer-content flex-between" :style="{'backgroundColor': '#F75D42'}">
							<image src="../../static/answer-error-img.png" mode=""></image>
							<view class="text">
								回答错误
							</view>
						</view>
						<view v-else-if='item.userAnswer === item.problemAnswer' class="error-answer-content" :style="{'backgroundColor': '#3ED3AA'}">
							<view class="text">
								回答正确
							</view>
						</view>
						<view class="answer-contrast flex-evenly">
							<view class="right-answer-content">
								<view class="answer-txt">
									正确答案：
								</view>
								<view class="option">
									{{item.problemAnswer}}
								</view>
							</view>
							<view class="my-answer-content">
								<view class="answer-txt">
									我的答案：
								</view>
								<view class="option">
									{{item.userAnswer}}
								</view>
							</view>
						</view>
						<view class="answer-parse">
							<view class="title-parse">
								答案解析：
							</view>
							<view class="parse-content">
								{{item.analysis}}
							</view>
						</view>
					</view>
				</swiper-item>
			</template>

		</swiper>
	</view>
</template>

<script>
	import examOptions from '@/components/examOptions/examOptions.vue'
	export default {
		data() {
			return {
				datas: [],
				singleItem: -1,
				currnet: 0
			};
		},
		components: {
			examOptions
		},
		props: ['options'],
		created() {
			let examdatas = uni.getStorageSync('autoExamQuestions')
			this.datas = examdatas
		},
		updated() {

		},
		methods: {
			clickItem(e, index) {
				let examdatas = uni.getStorageSync('autoExamQuestions')
				let selected = e.option
				console.log('当前选项：', selected)
				console.log('当前的item：', examdatas[index])
				examdatas[index].userAnswer = examdatas[index].children[selected].optionContent
				this.datas = examdatas
				uni.setStorageSync('autoExamQuestions', examdatas)
				uni.$emit('optionsChange',{})
			},
			itemChange(e) {
				console.log('eeee啊', e)
				uni.$emit('swiperChange', {
					current: e.target.current
				})
			}
		}
	}
</script>

<style lang="scss">
	.topic {
		background-color: #F3F7F6;
		padding: 40rpx 30rpx;
		color: #333333;
		font-size: 32rpx;
	}

	.swiper {
		height: 100vh;
	}

	.answer-content {
		margin: 130rpx 0 30rpx;
		position: relative;
	}

	.error-answer-content {
		position: absolute;
		top: -66rpx;
		left: 30rpx;
		padding:14rpx 22rpx;
		
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;

		image {
			width: 36rpx;
			height: 36rpx;
			margin-right: 10rpx;
		}
		
		.text{
			color: #FFFFFF;
			font-size: 28rpx;
		}
		
	}

	.answer-contrast {
		padding: 30rpx 0;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
	}

	.right-answer-content,
	.my-answer-content {
		width: 50%;
	}

	.answer-txt,
	.option {
		text-align: center;
	}

	.answer-txt {
		color: #000000;
		font-size: 26rpx;
	}

	.option {
		color: #000000;
		font-size: 36rpx;
		font-weight: bold;
	}
	.answer-parse{
		padding: 30rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
	}
	.title-parse{
		margin: 4rpx 0 10rpx;
		color: #333333;
		font-size: 28rpx;
	}
	.parse-content{
		padding: 20rpx 0 30rpx;
		color: #333333;
		font-size: 28rpx;
		letter-spacing: 2rpx;
	}
</style>
