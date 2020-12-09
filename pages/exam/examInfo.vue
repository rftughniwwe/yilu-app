<template>
	<view class="examInfo">
		<view class="examTitle">{{ examData.examName || '暂无' }}</view>
		<view class="examInfoText">
			<view class="examText">试卷科目： {{ examData.subjectName || '暂无' }}</view>
			<view class="examText">试卷年份： {{ examData.yearName || '暂无' }}</view>
			<view class="examText">试卷总分： {{ examData.totalScore?examData.totalScore:0 }} 分</view>
			<view class="examText">及格分数： {{ examData.totalScore?parseInt(examData.totalScore * 0.6):0 }} 分 </view>
			<view class="examText" v-if="!gradeExamId">答题时间： {{ examData.answerTime?examData.answerTime:0 }}分钟</view>
			<div class="exam-center-data" v-else>
				考试时间： {{ examData.beginTime?examData.beginTime + '-'+ examData.endTime:0 }}
			</div>
		</view>

		<view class="examInfoTip">
			<view class="examTipTitle">考试须知：</view>
			<view class="examTip red" v-if="!gradeExamId">1.考试时间为{{ examData.answerTime?examData.answerTime:0 }}分钟</view>
			<view class="examTip red">2.本考试为闭卷考试，请不要随意切换考试界面</view>
			<view class="examTip red">3.交卷后， 可查看答卷和解析</view>
		</view>
		<view class="footer">
			<primaryBtn @callBackFun='startExam' text='开始考试' />
		</view>
	</view>
</template>

<script>
	import * as examApis from "@/commons/api/exam";
	import * as gradeApis from "@/commons/api/grade";
	import primaryBtn from '../../components/primaryBtn/primaryBtn.vue'
	import auth from "@/utils/auth";
	import useFacePlugin from '@/commons/faceplugin.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		faceVerification,
		getExamDetails,
		getExamIdByTraingId
	} from '@/commons/api/apis.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import {
		httpRequest
	}  from '@/utils/httpRequest.js'
	
	export default {
		data() {
			return {
				examData: {},
				gradeExamId: '',
			};
		},
		onLoad(options) {
			console.log('options:',options)
			if(options.id){
				this.getExamId(options.id)
			}else{
				this.examData = JSON.parse(decodeURIComponent(options.examdatas))
			}
			
			// if(options.gradeExamId) {
			// 	this.gradeExamId = options.gradeExamId
			// }
			// this.getData(options.id)
		},
		onShow() {
			let i = uni.getStorageSync('TrainingId')
			this.getExamId(i)
		},
		comments: {
			primaryBtn
		},
		methods: {
			// 根据培训场次获取试卷ID
			getExamId(id) {
				console.log('培训场次id', id)
				uni.showLoading({
					title:'加载中...'
				})
				getExamIdByTraingId(id).then(res => {
					uni.hideLoading()
					console.log('resssss',res)
					if (res.data.code == 200) {
						this.examData = res.data.data
						this.getExamInfoData()
					} else {
						request_success(res)
					}
				})
			},
			
			
			// 开始考试
			startExam() {
				if (!auth.isLogin()) {
					uni.showToast({
						title: '请先登录！',
						icon: 'none',
						duration: 1000
					});
					setTimeout(auth.login, 1000)
					return;
				}
				if(!this.examData){
					uni.showToast({
						title: '你没有考试',
						icon: 'none',
						duration: 1500
					});
					return;
				}
				uni.showLoading({
					title:'查询中...'
				})
				httpRequest({
					url:'/exam/auth/user/exam/record/examCount',
					method:'POST',
					data:{
						examId:this.examData.id
					},
					success:res=>{
						uni.hideLoading()
						if(res.data.code == 200){
							this.siaudghfs()
						}else {
							request_success(res)
						}
					},
					fail:err=>{
						uni.hideLoading()
						request_err(err,'查询考试失败')
					}
				},5)
			},
			siaudghfs(){
				// 人脸采集
				useFacePlugin({}).then(res => {
					// 人脸验证
					uni.showLoading({
						title: '验证中...'
					})
					faceVerification(res).then(res => {
						console.log('考试前的人脸验证：', res)
						uni.hideLoading()
						if (res.data.code == 200) {
							let url = '/pages/exam/startExam?id=' + this.examData.id;
							if (this.gradeExamId) {
								url += '&gradeExamId=' + this.gradeExamId
							}
							uni.navigateTo({
								url: url
							});
						} else {
							request_success(res)
						}
					}, err => {
						uni.hideLoading()
						request_err(err, '人脸验证失败，稍后重试')
					})
				}, err => {
					request_err(err, '人脸采集失败，稍后重试')
				})
			},
			// 获取试卷数据
			getExamInfoData() {
				let id = this.examData.id
				getExamDetails(id).then(res => {
					console.log("获取的试卷数据：", res)
					if (res.data.code == 200) {
						this.examData = res.data.data || {}
					} else {
						request_success(res)
					}
				})

			},


			async getData(id) {
				let fn = "getExamViewInfo"
				if (auth.isLogin()) {
					fn = "getAuthExamViewInfo"
				}
				let res = '';
				if (this.gradeExamId) {
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
			box-shadow: 0 0 5px 0px rgba(221, 221, 221, 0.6);
			padding: 40rpx 30rpx;
		}
	}
</style>
