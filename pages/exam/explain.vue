

<template>
	<view class="examBoxs">
		<view class="head">
			<view class="leftBtn" @click="toggleSheet">
				<image src="../../static/images/exam/u1673.svg" mode="scaleToFill"></image>
				{{ isShowSheet ? '点击关闭' : '答题卡'}}
			</view>
			<view class="time">得分{{ totalScore }}分</view>
			<view class="rightBtn" @click="topHome()">
				<image src="../../static/images/exam/u2044.svg" mode="scaleToFill"></image>主页
			</view>
		</view>
		<view class="swiperBox">
			<view :class="['sheet', isShowSheet ? 'active' : '']">
				<view class="bg" @tap="toggleSheet()"></view>
				<view class="sheetList">
					<view class="sheetItem" v-for="(item, index) in examData.titleList" :key="index">
						<view class="sheetItemTitle">{{ (index+ 1) | ChineseToNumber }}、{{ item.titleName }}</view>
						<view class="sheetItemProblem">
							<template v-for="(problem, tindex) in item.problemList">
								<view @click="to(problem.problemIndex)" :class="['sheetItemProblemItem', ['red', 'green', 'active'][problem.problemStatus - 1]]"
								 v-if="problem.problemType != 6">
									{{tindex + 1}}
								</view>
								<view @click="to(child.problemIndex)" :class="['sheetItemProblemItem',  ['red', 'green', 'active'][child.problemStatus - 1]]"
								 v-else v-for="(child, cindex) in problem.childrenList" :key="cindex">
									{{ cindex + 1 }}
								</view>
							</template>
						</view>
					</view>
				</view>
			</view>

			<swiper @change="swiperChange" class="swiper" :current="current" :autoplay="false" :duration="300">
				<template v-for="(item, index) in examData.titleList">
					<template v-for="(problem, tindex) in item.problemList">
						<swiper-item class="problemItem" v-if="problem.problemType != 6">
							<template v-if="problem.problemIndex > (swiperIndex - 4) && problem.problemIndex < (swiperIndex + 4)">
								<view class="problemTitles">
									<view class="problemTitleTexts">{{ (index+ 1) | ChineseToNumber }}、{{ item.titleName }}</view>
									<view class="num">
										<text class="newNum">{{ swiperIndex }}</text>/{{ total }}
									</view>
								</view>
								<problem-item @playVideo="playVideo" :isExplain="true" :titleId="item.id" :recordId="recordId" :problem="problem"
								 :index="swiperIndex"></problem-item>
							 </template>
						</swiper-item>
						<swiper-item class="problemItem" v-else v-for="(child, cindex) in problem.childrenList" :key="cindex">
							<template v-if="child.problemIndex > (swiperIndex - 4) && child.problemIndex < (swiperIndex + 4)">
								<view class="problemTitles">
									<view class="problemTitleTexts">{{ (index+ 1) | ChineseToNumber }}、{{ item.titleName }}</view>
									<view class="num">
										<text class="newNum">{{ swiperIndex }}</text>/{{ total }}
									</view>
								</view>
								<problem-item @playVideo="playVideo" :isExplain="true" :titleId="item.id" :recordId="recordId" :problem="child"
								 :index="swiperIndex"></problem-item>
							 </template>
						</swiper-item>
					</template>
				</template>
			</swiper>
		</view>
		<videoPlay @close="closePlayVideo" v-if="isPlayVideo" :videoData="videoData"></videoPlay>
	</view>
</template>

<script>
	import * as examApis from "@/commons/api/exam";
	import problemItem from "@/components/exam/problemItem";
	import videoPlay from "@/components/exam/video";
	import * as gradeApis from '@/commons/api/grade.js'
	import auth from "@/utils/auth";
	import {
		toZhDigit
	} from '@/utils/util.js'

	export default {
		data() {
			return {
				examData: {},
				swiperIndex: 1,
				total: 1,
				recordId: '',
				isShowSheet: false,
				isPlayVideo: false,
				answerTimeText: '',
				current: 0,
				videoData: {}
			};
		},
		components: {
			problemItem,
			videoPlay
		},
		computed: {
			totalScore() {
				let total = 0;
				if (this.examData.titleList && this.examData.titleList.forEach) {
					this.examData.titleList.forEach((t) => {
						let userScore = 0;
						t.problemList && t.problemList.forEach(e => {
							if (e.childrenList && e.childrenList.length) {
								e.childrenList.forEach((c, cIndex) => {
									userScore += (+c.userScore) || 0
								})
							} else {
								userScore = (+e.userScore) || 0
							}
							total += userScore
						})
					})
				}
				return total;
			}
		},
		// onBackPress() {
		// 	setTimeout(()=>{
		// 		uni.switchTab({
		// 			url:'../tabBar/learn'
		// 		})
		// 	},300)
		// 	return true
		// },
		onLoad(options) {
			if(options.recordId) {
				this.getData(options.recordId)
			}
			if(options.gradeExamId) {
				this.getGradeData(options.gradeExamId)
			}
		},
		filters: {
			ChineseToNumber(chnStr) {
				return toZhDigit(chnStr);
			}
		},
		methods: {
			to(index) {
				this.current = index;
				this.toggleSheet();
			},
			closePlayVideo() {
				this.isPlayVideo = false
			},
			playVideo(data) {
				data.examId = this.examData.examId
				this.videoData = data;
				this.isPlayVideo = true
			},
			toggleSheet() {
				this.isShowSheet = !this.isShowSheet
			},
			swiperChange(e) {
				this.swiperIndex = e.detail.current + 1;
			},
			topHome() {
				uni.showModal({
					title: '提示',
					content: '确定返回首页吗？',
					success: (res) => {
						console.log(res)
						if (res.confirm) {
							uni.switchTab({
								url:'../tabBar/index'
							})
						}
					}
				});
			},
			getGradeData(id) {
				gradeApis.getStudentAnswer({
					relationId: id
				}).then((res) => {
					if (res && res.examId) {
						this.examId = res.examId;
						res.titleList.forEach((t) => {
							t.problemList.forEach(e => {
								if (e.childrenList && e.childrenList.length) {
									e.childrenList.forEach((c, cIndex) => {
										c.userScore += (+c.score) || 0
									})
								} else {
									e.userScore = (+e.score) || 0
								}
							})
						})
						this.init(res);
					}
				})
			},
			getData(id = '1258292087463776259') {
				if (!auth.isLogin()) {
					uni.showToast({
						title: '请先登录！',
						icon: 'none',
						duration:1500
					});
					setTimeout(auth.login, 1500)
					return;
				}
				examApis.getExamAnswer(id).then((res) => {
					this.init(res);
				})
			},
			init(data = []) {
				const setUserAnswer = (e) => {
					// 设置答案的
					if (e.problemType < 4) {
						if (e.problemType === 2) {
							if (e.userAnswer && e.userAnswer.split) {
								e.value = e.userAnswer.split('|');
							} else {
								e.value = [];
							}
						} else {
							e.value = e.userAnswer || '';
							e.isEdit = false
						}
						e.userAnswerText = e.userAnswer ? e.userAnswer.replace(/\|/g, '，') : '';
						e.problemAnswerText = e.problemAnswer ? e.problemAnswer.replace(/\|/g, '，') : '';
					}
					if (e.problemType === 4) {
						e.problemAnswerText = e.problemAnswer ? e.problemAnswer.replace(/\|/g, '，') : '';
						if (e.userAnswer) {
							e.userAnswerText = e.userAnswer ? e.userAnswer.replace(/\|/g, '，') : '';
							e.value = e.userAnswer.split ? e.userAnswer.split('|') : e.userAnswer;
							e.optionCount = e.value.length - 1;
						} else {
							e.userAnswerText = '';
						}
					}
					if (e.problemType === 5) {
						e.userAnswerText = e.userAnswer || '';
						e.value = e.userAnswer || '';
						e.problemAnswerText = e.problemAnswer
					}
					
					// 讲师的设置
					if(data.answerShow == 1) {
						e.problemAnswerText = '不展示答案'
					}
					if(data.answerShow == 3) {
						e.problemAnswerText = '考试结束后展示，'
					}
					if(data.answerShow == 4) {
						e.problemAnswerText = data.answerShowTime + '后展示，'
					}
					
					
					if (e.userAnswerText) {
						e.userAnswerText = initHtml(e.userAnswerText);
					}
					
					if (e.problemAnswerText) {
						e.problemAnswerText = initHtml(e.problemAnswerText);
					}
				}


				function initHtml(s) {
					return s.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
				}
				let problemIndex = 0;
				// 设置图片width 100%
				data.titleList.forEach((t) => {
					t.problemList && t.problemList.forEach((p) => {
						if (p.problemContent) {
							p.problemContent = initHtml(p.problemContent);
						}
						
						if (p.optionList && p.optionList.length) {
							p.optionList.forEach((o) => {
								o.optionContent = initHtml(o.optionContent); 
							})
						}
						if (p.childrenList && p.childrenList.length) {
							p.childrenList.forEach((c) => {
								c.problemIndex = problemIndex;
								problemIndex++
								if (c.problemContent) {
									c.problemContent = initHtml(c.problemContent);  
								}
				
								if (c.optionList && c.optionList.length) {
									c.optionList.forEach((o) => {
										o.optionContent = initHtml(o.optionContent);  
									})
								}
							})
						} else {
							p.problemIndex = problemIndex
							problemIndex++
						}
					})
				})
				var total = 0;
				data.titleList.forEach((e) => {
					e.problemList && e.problemList.forEach(e => {
						if (e.childrenList && e.childrenList.length) {
							total += e.childrenList.length
						} else {
							total++;
						}
						setUserAnswer(e);
						if (e.childrenList && e.childrenList.length) {
							e.childrenList.forEach((c, cIndex) => {
								setUserAnswer(c);
							})
						}
					})
				})
				this.total = total;
				this.examData = data;
			}
		}
	}
</script>
<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.examBoxs {
		display: flex;
		height: 100vh;
		/* #ifdef  H5 */
		height: calc(100vh - 98upx);
		/* #endif */
		flex-direction: column;

		.head {
			width: 100%;
			height: 116upx;
			background-color: rgba(245, 245, 245, 1);
			box-sizing: border-box;
			border: 1px solid rgba(228, 228, 228, 1);
			display: flex;

			.rightBtn,
			.leftBtn {
				width: 180upx;
				font-weight: 400;
				font-style: normal;
				line-height: 116upx;
				text-align: center;
				color: #333333;
				font-size: 13px;

				image {
					width: 28upx;
					height: 28upx;
					margin-right: 12upx;
					display: inline-block;
					position: relative;
					top: 4upx;
				}
			}

			.rightBtn {
				width: 160upx;
				padding-left: 20upx;
				color: #2388EC;
			}

			.time {
				flex: 1;
				text-align: center;
				line-height: 116upx;
				font-weight: 400;
				font-style: normal;
				font-size: 16px;
				color: #333333;
			}
		}

		.swiperBox {
			flex: 1;
			overflow: hidden;
			background-color: #fff;
			position: relative;
			

			.swiper {
				height: 100%;

				.problemItem {
					height: 100%;
					overflow-y: auto;
					overflow-x: hidden;

					.problemTitles {
						display: flex;
						height: 100upx;
						font-weight: 400;
						font-style: normal;
						font-size: 14px;
						color: #333333;
						padding: 0 30upx;
						line-height: 100upx;
						border-bottom: 1px solid #ddd;

						.problemTitleTexts {
							flex: 1;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}

						.num {
							.newNum {
								font-size: 28px;
								font-weight: 200;
								color: #2388EC;
							}
						}
					}
				}
			}


			.sheet {
				position: absolute;
				left: 0;
				right: 0;
				top: -100%;
				bottom: 0;
				z-index: 100;
				max-height: 100%;
				transition: top 0.3s;
				overflow-y: auto;

				&.active {
					top: 0;
				}

				.bg {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					background-color: rgba(0, 0, 0, 0.5);
				}

				.sheetList {
					background-color: #fff;
					position: relative;
					padding: 1px 0;
					z-index: 10;

					.sheetItem {
						margin: 20upx 40upx;
						border-bottom: 1px solid #ddd;

						.sheetItemTitle {
							font-weight: 400;
							font-style: normal;
							font-size: 15px;
							line-height: 28px;
						}

						.sheetItemProblem {
							padding: 20upx 0;

							.sheetItemProblemItem {
								width: 60upx;
								height: 60upx;
								border: 1px solid #999;
								border-radius: 50%;
								font-size: 13px;
								color: #999999;
								text-align: center;
								line-height: 60upx;
								display: inline-block;
								margin-right: 20upx;
								margin-bottom: 20upx;

								&.active {
									color: #FFFFFF;
									background-color: rgba(36, 136, 236, 1);
									border-color: rgba(36, 136, 236, 1)
								}

								&.green {
									border-color: #7bcd30;
									background-color: #7bcd30;
									color: #fff;
								}

								&.red {
									color: #FFFFFF;
									background-color: red;
									border-color: red
								}
							}
						}
					}
				}
			}
		}
	}
</style>