
<template>
	<view class="examInfo">
		<view class="examTitle">{{ examData.examName }}</view>
		<view class="examInfoText">
			<view class="examText">试卷科目： {{ examData.subjectName || '' }}</view>
			<view class="examText">试卷年份： {{ examData.yearName || '' }}</view>
			<view class="examText">试卷总分： {{ examData.totalScore }} 分</view>
			<view class="examText">及格分数： {{ parseInt(examData.totalScore * 0.6) }} 分	</view>
			<view class="examText" v-if="!gradeExamId">答题时间： {{ examData.answerTime }}分钟</view>
			<div class="exam-center-data" v-else>
			  考试时间： {{ examData.beginTime + '-'+ examData.endTime }}
			</div>
		</view>

		<view class="examInfoTip">
			<view class="examTipTitle">考试须知：</view>
			<view class="examTip red" v-if="!gradeExamId">1.考试时间为{{ examData.answerTime }}分钟</view>
			<view class="examTip red">2.本考试为闭卷考试，请不要随意切换考试界面</view>
			<view class="examTip red">3.交卷后， 可查看答卷和解析</view>
		</view>
		<view class="footer">
			<primaryBtn @callBackFun='startExam' text='开始考试'/>
		</view>
	</view>
</template>

<script>
	import * as examApis from "@/commons/api/exam";
	import * as gradeApis from "@/commons/api/grade";
	import primaryBtn from '../../components/primaryBtn/primaryBtn.vue'
	import auth from "@/utils/auth";
	export default {
		data() {
			return {
				examData: {},
				gradeExamId: ''
			};
		},
		onLoad(options) {
			if(options.gradeExamId) {
				this.gradeExamId = options.gradeExamId
			}
			this.getData(options.id)
		},
		comments:{
			primaryBtn
		},
		methods: {
			startExam() {
				if (!auth.isLogin()) {
					uni.showToast({
					  title: '请先登录！',
					  icon: 'none',
					  duration:1500
					});
					setTimeout(auth.login, 1500)
					return;
				}
				let url = '/pages/exam/startExam?id=' + this.examData.id;
				if(this.gradeExamId) {
					url += '&gradeExamId=' + this.gradeExamId
				}
				uni.navigateTo({
				    url: url
				});
			},
			
			async getData(id) {
				let fn = "getExamViewInfo"
				if (auth.isLogin()) {
					fn = "getAuthExamViewInfo"
				}
				let res = '';
				if(this.gradeExamId) {
					res = await gradeApis.examRelationView({
						id: this.gradeExamId
					})
					res.examName = res.gradeExamName
				} else {
					res = await examApis[fn]({
						examId: id || ''
					})
				}
				if (res && res.id) {
					uni.setNavigationBarTitle({
					    title: res.examName
					});
					this.examData = res;
				}
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
			right: 0;
			bottom: 0;
			height: 58px;
			// width: 100%;
			//border-top: 1px solid #ddd;
			box-shadow: 0 0 5px 0px rgba(221,221,221,0.6);
			padding: 40rpx 30rpx;
		}
	}
</style>

