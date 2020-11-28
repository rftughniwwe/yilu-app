

<template>
	<view class="detailsBox" :style="{opacity: loading===false?1:0}">
		<view class="head">
			<view class="bg"></view>
			<view class="headContent">
				<view class="title">{{ examData.examName }}</view>
				<view class="info" v-html="examData.description"></view>
				<view class="tip">
					{{ examData.subjectName || '' }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ examData.totalScore }}分
					<view class="fr">
						<view class="tipItem">
							<image class="icon" src="../../static/images/exam/u29.svg" alt=""></image>{{ examData.studyCount }}
						</view>
						<view class="tipItem">
							<image class="icon" src="../../static/images/exam/u31.svg" alt=""></image>{{ examData.downloadCount }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="exam-list ">
				<template v-for="(item,index) in examData.titleList">
					<view class="issus-item" :key="item.id + index">
						<view class="issus-item-title">{{ (index+ 1) }}、{{ item.titleName }}</view>
					</view>
					<view v-for="(problem,problemindex) in item.problemList" class="issus-item" :key="problem.id +　problemindex">
						<view class="issus-item-title">
							{{ problemindex + 1 }}、
							<view v-html="problem.problemContent " class="issus-item-title-text   w-e-text"></view>
						</view>
						<view class="issus-item-answer-list">
							<view v-for="(Option,Optionindex) in problem.optionList" :key="Option.id + Optionindex" class="issus-item-answer">
								<view class="issus-item-answer-letter"> {{ letter[Optionindex] }}．</view>
								<view class="issus-item-answer-text  w-e-text" v-html="Option.optionContent"></view>
							</view>
							<view v-for="(child,childindex) in problem.childrenList" class="issus-item" :key="child.id">
								<view class="issus-item-title">
									{{ childindex + 1 }}、
									<view v-html="child.problemContent " class="issus-item-title-text  w-e-text"></view>
								</view>
								<view class="issus-item-answer-list">
									<view v-for="(Option,Optionindex) in child.optionList" :key="Option.id + Optionindex" class="issus-item-answer">
										<view class="issus-item-answer-letter"> {{ letter[Optionindex] }}．</view>
										<view class="issus-item-answer-text  w-e-text" v-html="Option.optionContent"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</template>
			</view>
			<view class="payBox" v-if="!examData.isPay && showPrice">
				您未购买此试卷，请先购买
			</view>
		</view>
		<view class="footer">
			<view :class="['collect', examData.isCollect ? 'active' : '']" @click="collect()">
				<image class="icon" v-if="!examData.isCollect" src="../../static/images/no_like.png" alt=""></image>
				<image class="icon" v-else src="../../static/images/is_like.png" alt=""></image>
				收藏
			</view>

			<!--<view class="signBtn" @click="sign()" >
				签到
			</view>-->

			<view class="payBtn" @click="toExamInfo" v-if="examData.isFree !== 0">
				去考试
			</view>
			<view class="payBtn" @click="toPay" v-if="examData.isFree== 0 && !examData.isPay && showPrice">
				购买价:{{ examData.orgPrice ? '￥' + examData.orgPrice : '免费' }}
				<text class="font25 c_gold mgl20" v-if="examData.orgPrice">SVIP:{{examData.fabPrice ? '￥' + examData.fabPrice : '免费'}}</text>
			</view>
			<view class="payBtn" @click="toExamInfo" v-if="examData.isFree== 0 && examData.isPay">
				马上考试
			</view>
		</view>
	</view>
</template>

<script>
	import * as examApis from "@/commons/api/exam";
	import auth from "@/utils/auth";
	
	export default {
		data() {
			return {
				examData: {
					titleList: [],
					isPay: true
				},
				loading: true,
				iscollect: false,
				showPay: false,
				payData: {},
				showAnswer: false,
				showPrice: false,
				signName: '',
				centerDialogVisible: false,
				letter: 'ABCDEFGHIJkLMNOPQRSTUVWXYZ'.split('')
			};
		},
		components:{
		},
		onLoad(options) {
			this.getData(options.id)
			this.showPrice = uni.getStorageSync('showPrice')
			this.signName = options.id +':'+ (new Date()).getTime();
			uni.$on('open-userexam-result', () => {
				setTimeout(()=> {
					uni.navigateTo({
						url: '/pages/exam/result'
					});
				}, 350)
			})
		},
		methods: {
			sign() {
				uni.navigateTo({
					url: '/pages/verifyFace/verifyFace?refId=' + this.examData.id + '&signName=' + this.signName+ '&signType=3&type=2'
				})
			},
			async getData(id) {

				let fn = "getExamViewInfo"
				if (auth.isLogin()) {
					fn = "getAuthExamViewInfo"
				}
				const res = await examApis[fn]({
					examId: id || ''
				})

				setTimeout(()=> {
					this.loading = false;
				}, 200)
				res.titleList = res.titleList || [];
				//未登录 只显示三个问题
				if (!auth.isLogin() && res.titleList.length > 2) {
					res.isPay = false;
					res.titleList.length = 2;
				}
				if (res && res.id) {

					if (res.isFree == 1 || res.fabPrice == 0) {
						res.isPay = true;
					}

					//未购买 只显示三个问题
					if (!res.isPay && res.titleList.length > 2) {
						res.titleList.length = 2;
					}
					res.titleList.forEach((t)=>{
						t.problemList.forEach((p)=>{
							if(p.problemContent) {
								p.problemContent = p.problemContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
							}
							if(p.optionList && p.optionList.length) {
								p.optionList.forEach((o)=>{
									o.optionContent = o.optionContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
								})
							}
							if(p.childrenList && p.childrenList.length) {
								p.childrenList.forEach((c)=>{
									if(c.problemContent) {
										c.problemContent = c.problemContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
									}
									if(c.optionList && c.optionList.length) {
										c.optionList.forEach((o)=>{
											o.optionContent = o.optionContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
										})
									}
								})
							}
 						})
					})
					this.examData = res;
				}
			},
			toExamInfo() {
				if (!auth.isLogin()) {
					uni.showToast({
						title: '请先登录！',
						icon: 'none',
						duration:1500
					});
					setTimeout(auth.login, 1500)
					return;
				}

				/*if (!uni.getStorageSync(this.signName)) {
					uni.showToast({
						title: '请先签到再来考试！',
						icon: 'none'
					});
					return;
				}*/
				examApis.examRecordCheck().then((res) => {
					if (res.isExamination) {
						const examId = res.examId
						if (examId !== this.examData.id) {
							uni.showModal({
							    title: '提示',
							    content: '你正在考' + res.examName + '; 请先考完这个试卷再考其他试卷！',
							    success:  (res) => {
							        if (res.confirm) {
							           uni.navigateTo({
							           	url: '/pages/exam/examInfo?id=' + examId
							           })
							        }
							    }
							});
						} else {
							uni.navigateTo({
								url: '/pages/exam/examInfo?id=' + this.examData.id
							})
						}
					} else {
						uni.navigateTo({
							url: '/pages/exam/examInfo?id=' + this.examData.id
						})
					}
				})
			},
			toPay() {
				if (!auth.isLogin()) {
					uni.showToast({
						title: '请先登录！',
						icon: 'none',
						duration:1500
					});
					setTimeout(auth.login, 1500)
					return;
				}
				uni.navigateTo({
					url: '/pages/exam/pay?id=' + this.examData.id
				});
			},
			collect() {
				if (!auth.isLogin()) {
					uni.showToast({
						title: '请先登录！',
						icon: 'none',
						duration:1500
					});
					setTimeout(auth.login, 1500)
					return;
				}
				if (this.examData.isCollect) {
					this.examData.isCollect = false;
					examApis.deleteCollectExam({
						collectionType: 4,
						collectionId: this.examData.id
					}).then((res) => {
						uni.showToast({
							title: '取消收藏成功',
							icon: 'success'
						});
					})
				} else {
					this.examData.isCollect = true;
					examApis.collectExam(this.examData.id).then((res) => {
						uni.showToast({
							title: '收藏成功',
							icon: 'success'
						});
					})
				}
			}
		}
	}
</script>
<style lang="scss">

	.issus-item-answer-text,
	.issus-item-title-text {
		padding: 0;
		p {
			margin-top: 0px;
		}
	}

	.issus-item-answer-text {
		p {
			margin-top: 0px;
		}
	}
</style>

<style lang="scss" scoped>
	.detailsBox {
		padding-bottom: 100upx;
		opacity: 0;
		width: 100vw;
		overflow-x: hidden;
		.footer {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 116upx;
			background: #fff;

			.collect {
				width: 60px;
				height: 45px;
				padding-top: 14px;
				font-weight: 400;
				font-style: normal;
				text-align: center;
				line-height: 40upx;
				font-size: 9px;
				color: #999999;

				&.active {
					color: #ec7e00
				}

				.icon {
					width: 20px;
					height: 20px;
					display: block;
					margin: 0 auto;
				}
			}

			.signBtn {
				position: absolute;
				left: 140upx;
				width: 180upx;
				top: 20upx;
				height: 82upx;
				line-height: 82upx;
				text-align: center;
				border-radius: 20px;
				background-color: rgba(0, 170, 0, 1.0);
				font-size: 14px;
				color: #FFFFFF;
				font-weight: 400;
			}

			.payBtn {
				position: absolute;
				right: 10px;
				top: 20upx;
				width: 300upx;
				height: 82upx;
				line-height: 82upx;
				text-align: center;
				border-radius: 20px;
				background-color: $uni-color-primary;
				font-size: 14px;
				color: #FFFFFF;
				font-weight: 400;

				.del {
					display: inline-block;
					font-size: 12px;
					color: #6D000E;
					margin-left: 10upx;
					text-decoration: line-through
				}
			}
		}

		.head {
			padding: 40upx 20upx 0;
			position: relative;
			.bg {
				background-color: rgba(35, 136, 236, 1);
				height: 100px;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;

			}

			.headContent {
				background: #fff;
				border-radius: 5px 5px 0 0;
				padding: 20upx;
				position: relative;
				z-index: 2;
			}

			.title {
				font-weight: 800;
				font-style: normal;
				font-size: 20px;
				line-height: 26px;
				color: #333333;
				padding: 20upx 0;
			}

			.info {
				font-weight: 400;
				font-style: normal;
				font-size: 13px;
				color: #AAAAAA;
				line-height: 20px;
				padding-bottom: 10px;
			}

			.tip {
				line-height: 30px;
				color: #666666;
				font-size: 13px;

				.fr {
					.tipItem {
						display: inline-block;
						padding: 0 20upx;

						.icon {
							width: 32upx;
							position: relative;
							top: 4px;
							height: 32upx;
							margin-right: 10upx;
						}
					}
				}
			}
		}

		.container {
			position: relative;
			padding-bottom: 1px;

			.payBox {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 400upx;
				line-height: 400upx;
				text-align: center;
				font-weight: 400;
				font-style: normal;
				font-size: 16px;
				color: #FFFFFF;
				background-color: rgba(0, 0, 0, 0.8)
			}
		}

		.exam-list {
			flex: 1;
			min-height: 400px;
			margin: 40upx 20upx;
			position: relative;


			.issus-item {
				padding: 10px 20px;
				background: #fff;
				margin-bottom: 10px;
				border-radius: 8px;
				overflow: hidden;

				.issus-item-title {
					font-weight: 500;
					font-style: normal;
					font-size: 15px;
					padding: 10upx 0 20upx;
					line-height: 24px;
					display: flex;
					vertical-align: top;

					.issus-item-title-text {
						flex: 1;
						vertical-align: top;
						color:#333
					}
				}

				.issus-item-tip {
					font-weight: 400;
					font-style: normal;
					font-size: 12px;
					color: #AAAAAA;
					line-height: 20px;
				}

				.issus-item-answer {
					font-weight: 400;
					font-style: normal;
					font-size: 13px;
					color: #333333;
					line-height:18px;
					padding: 5px 0;
					min-height:19px;
					display: flex;
					.issus-item-answer-letter {
						width: 40upx;
					}
					.issus-item-answer-text {
						flex: 1;
						overflow-y: auto;
					}
				}
			}
		}
	}
</style>

