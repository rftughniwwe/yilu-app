<style lang="scss" scoped>
	.scoreBox {
		border-top: 10px solid #ddd;
		border-bottom: 10px solid #ddd;
		padding: 30upx 30upx 20upx;

		.scoreItem {
			line-height: 80upx;
			font-weight: 500;
			font-style: normal;
			font-size: 16px;
			display: flex;
			.content {
				flex: 1
			}
		}
	}

	.explainList {
		padding: 10upx 30upx;

		.explainItem {
			padding: 20upx 0;
			border-bottom: 1px solid #ddd;

			.explainItemTitle {
				font-weight: 700;
				font-style: normal;
				font-size: 16px;
				line-height: 64upx;
				margin-left: -14upx;

			}

			.explainItemContent {
				font-weight: 400;
				font-style: normal;
				font-size: 13px;
				line-height: 20px;
			}
		}
	}

	.green {
		color: #7bcd30;
	}

	.active {
		color: rgba(36, 136, 236, 1);
	}

	.red {
		color: red
	}
	
	.video {
		margin: 40upx auto 0;
		line-height: 80upx;
		text-align: center;
		border-radius: 2px;
		font-size: 14px;
		color:#fff;
		background-color: #2488EC;
	}
</style>


<template>
	<view class="problemExplain">
		<view class="scoreBox">
			<view class="scoreItem" >
				<view class="title">学员答案：</view><view class="content" v-html="problem.userAnswerText"></view>
			</view>
			<view class="scoreItem">
				<view class="title" >标准答案：</view>
				<view class="content" >
					<jyf-parser :html="'<div>' +  problem.problemAnswerText + '</div>'" ref="article"></jyf-parser>
				</view>
			</view>
			<view class="scoreItem" v-if="problem.problemStatus == 2">
				状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<text class="green">答对了</text>
			</view>
			<view class="scoreItem" v-if="problem.problemStatus == 1">
				状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：<text class="red">答错了</text>
			</view>
			<view class="scoreItem" v-if="problem.problemStatus != 3">
				得&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分：<text class="red">{{ problem.userScore || 0 }}</text>分
			</view>
			<view class="scoreItem" v-if="problem.problemStatus == 3">
				得&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分：此题型要人工评分
			</view>
		</view>
		<view class="explainList">
			<view class="explainItem" v-if="problem.analysis">
				<view class="explainItemTitle">【解答】</view>
				<view class="explainItemContent" >
					<jyf-parser :html="'<div>' +  problem.analysis + '</div>'" ref="article"></jyf-parser>
				</view>
			</view>
			<view class="explainItem" v-if="problem.videoId && problem.videoVid ">
				<view class="explainItemTitle">【视频】</view>
				<view class="explainItemContent">
					<button class="video" @click="playVideo">播放</button>
				</view>
			</view>
			<view class="explainItem" v-if="problem.emphasis">
				<view class="explainItemTitle">【考点】</view>
				<view class="explainItemContent">
					<jyf-parser :html="'<div>' +  problem.emphasis + '</div>'" ref="article"></jyf-parser>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		props: {
			problem: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		components: {
			jyfParser
		},
		data() {
			return {
				isMinappAudit:  uni.getStorageSync('isMinappAudit'),
			};
		},
		created() {
			
		},
		methods:{
			playVideo() {
				this.$emit('playVideo', {
					problemId: this.problem.id,
					videoVid: this.problem.videoVid
				})
			}
		}
	}
</script>
