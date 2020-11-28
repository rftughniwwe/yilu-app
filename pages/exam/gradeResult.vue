
<template>
	<view>


		<view class="nav">
			<uni-nav-bar statusBar="true" class="nav-bar-zw" @clickLeft="close()" background-color="#2388ec" color="#fff" left-icon="back" title="考试成绩"></uni-nav-bar>
			<uni-nav-bar statusBar="true" class="nav-bar" @clickLeft="close()" background-color="#2388ec" color="#fff" left-icon="back" title="考试成绩"></uni-nav-bar>
		</view>
		<view class="examInfo">
			<view class="examTitle">{{ examData.examName }}</view>
			<view class="examInfoText">
				<view class="examText">
					你本次考试成绩分数：
				</view>
				<view class="score">
					{{ examData.score }}
				</view>
				<view class="examText">
					本次试卷满分为{{ examData.totalScore }}分
				</view>
			</view>
			<view class="examInfoText">
				<view class="examText" v-for="(item, index) in examData.titleScoreList" :key="index">
					{{ item.titleName }}：
					<template v-if="item.lecturerAuditTotalScore == 0">
						<text class="red">{{ item.score }}</text>分
					</template>
					<template v-else-if="item.lecturerAuditTotalScore != 0 && item.score != 0">
						得分<text class="red">{{ item.score }}</text>分
						此类题型需要人工判分{{ item.lecturerAuditTotalScore }} 分，
						系统已经评分{{ item.sysAuditTotalScore }}分
					</template>
					<template v-else>此类题型需要人工判分</template>
					<text class="exam-center-data-tip">（总分：{{ item.lecturerAuditTotalScore + item.sysAuditTotalScore  }} 分）</text>
				</view>
			</view>

			<view class="examInfoText">
				<view class="examText">
					交卷时间：{{ examData.endAnswerTime }}
				</view>
				<view class="examText">
					考试用时：{{ examData.duration }}分钟
				</view>
			</view>
			<view class="footer">
				<button @click="openExplain">查看答案和解析</button>
			</view>
		</view>
	</view>
</template>

<script>
	import * as examApis from "@/commons/api/exam";
	import auth from "@/utils/auth";
	import * as gradeApis from '@/commons/api/grade.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				examData: {},
			};
		},
		components: {
			uniNavBar
		},
		onLoad(options) {
			let data = uni.getStorageSync('userexam-result');
			gradeApis.relationExamScore({
				id: data.recordId
			}).then((res) => {
				res.titleScoreList = res.titleScoreDTOS
				res.totalScore = res.lecturerAuditTotalScore + res.sysAuditTotalScore
				this.examData = res;
				this.examData.recordId = data.recordId;
				this.examData.examName = this.examData.gradeExamName
				console.log(this.examData)
			})
		},
		methods: {
			close() {
				uni.navigateBack({
				    delta: 3
				});
			},
			openExplain() {
				uni.navigateTo({
					url: '/pages/exam/explain?gradeExamId=' + this.examData.id
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	page {
		height: 100%;
		background: #fff;
	}

	.examInfo {
		padding: 20upx 40upx;
		padding-bottom: 120upx;

		.examTitle {
			font-style: normal;
			font-size: 18px;
			line-height: 26px;
			padding: 20upx 0 40upx;
			border-bottom: 1px solid rgba(228, 228, 228, 1);
			font-weight: 800;
		}


		.examInfoText {
			font-weight: 400;
			font-style: normal;
			font-size: 15px;
			line-height: 28px;

			.score {
				font-weight: 400;
				font-style: normal;
				font-size: 36px;
				color: #D51423;
				line-height: 28px;
				padding: 20upx 0;
			}

			.examText {
				padding: 10upx 0;

				&:last-child {
					padding-bottom: 40upx;
					border-bottom: 1px solid rgba(228, 228, 228, 1);
				}

				&:nth-child(1) {
					padding-top: 40upx;
				}
			}
		}

		.examInfoTip {
			.examTipTitle {
				padding: 20upx 0;
				font-weight: 400;
				font-style: normal;
				font-size: 15px;
				line-height: 28px;
			}

			.examTip {
				font-weight: 400;
				font-style: normal;
				font-size: 13px;
				color: #D51423;
				line-height: 24px;
			}
		}

		.red {
			color: red
		}

		.footer {
			position: fixed;
			left: 0;
			bottom: 0;
			height: 58px;
			width: 100%;
			background-color: #fff;
			//border-top: 1px solid #ddd;
			box-shadow: -1px -2px 5px 0px rgba(221, 221, 221, 0.6);

			button {
				width: 690upx;
				height: 82upx;
				background-color: rgba(213, 20, 35, 1);
				border: none;
				border-radius: 20px;
				line-height: 82upx;
				font-weight: 400;
				font-style: normal;
				color: #FFFFFF;
				margin-top: 18upx;
				text-align: center;
				font-size: 14px;
			}
		}
	}

	.nav {
		background-color: #2388ec;
		.nav-bar-zw {
			opacity: 0;
			position: relative;
			z-index: -1;
		}
		.nav-bar {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
		}
	}
</style>
