<!-- 题目底部组件 -->
<template>
	<view class="main flex-evenly">
		<view class="answer-sheet flex-evenly">
			<image src="../../static/answer-sheet-img.png" mode=""></image>
			<view class="txt" @click="answerSheet">
				答题卡
			</view>
		</view>
		<view class="submit-btn" v-if="!isFromError">
			<view class="txt" @click="complete">
				交卷
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props:['isFromError'],
		methods:{
			answerSheet(){
				this.$emit('answerSheet')
			},
			complete(){
				this.$emit('complete')
			}
		}
	}
</script>

<style lang="scss">
	.main {
		background-color: #FFFFFF;
	}

	.answer-sheet {
		border: 2rpx solid #E3E3E3;
		background-color: #FFFFFF;
		border-radius: $uni-border-radius-half-circle;
		padding: 18rpx 0;
		width: 30%;
		margin-right: 20rpx;
		image {
			width: 34rpx;
			height: 34rpx;
		}

		.txt {
			color: #333333;
			font-size: 30rpx;
			text-align: center;
		}
	}

	.submit-btn {
		border-radius: $uni-border-radius-half-circle;
		border: none;
		background-color: #3CA7FF;
		box-shadow: 0 6rpx 10rpx rgba(60, 167, 255, .5);
		padding: 20rpx 0;
		width: 65%;
		.txt {
			font-size: 30rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}
</style>
