<template>
	<view class="examBox">
		<view class="head">
			<view class="leftBtn" @click="toggleSheet">
				<image src="../../static/images/exam/u1673.svg" mode="scaleToFill"></image>
				{{ isShowSheet ? '点击关闭' : '答题卡'}}
			</view>
			<view class="time">{{ answerTimeText }}</view>
			<view class="rightBtn" @click="userSubmitFn()">
				<image src="../../static/images/exam/u1675.svg" mode="scaleToFill"></image>交卷
			</view>
		</view>
		<view class="swiperBox">
			<view :class="['sheet', isShowSheet ? 'active' : '']">
				<veiw class="bg" @tap="toggleSheet()"></veiw>
				<view class="sheetList">
					<view class="sheetItem" v-for="(item, index) in examData.titleList" :key="index">
						<view class="sheetItemTitle">{{ (index+ 1) | ChineseToNumber }}、{{ item.titleName }}{{ item.problemList.length }}
							<!-- {{ item.problemList.length }} -->
						</view>
						<view class="sheetItemProblem">
							<template v-for="(problem, tindex) in item.problemList">
								<div v-if="problem.problemType == 6" style="height:0px; font-size: 0px;;">
									{{ problem.childrenList.length }}
								</div>
								<view @click="to(problem.index)" :class="['sheetItemProblemItem', (problem.value&&problem.value.length) ? 'active' : '']"
								 v-if="problem.problemType != 6">
									{{tindex + 1}}
								</view>
								<view :class="['sheetItemProblemItem',  (child.value&&child.value.length) ? 'active' : '']" v-else v-for="(child, cindex) in problem.childrenList"
								 :key="cindex" @click="to(child.index)">
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
							<view v-if="problem.index > (swiperIndex - 3) && problem.index < (swiperIndex + 3)">
								<view class="problemTitles">
									<view class="problemTitleTexts">{{ (index+ 1) | ChineseToNumber }}、{{ item.titleName }}</view>
									<view class="num">
										<text class="newNum">{{ swiperIndex }}</text>/{{ total }}
									</view>
								</view>
								<problem-item @updateUserAnswer="updateUserAnswer" :titleId="item.id" :recordId="recordId" :problem="problem"
								 :index="swiperIndex"></problem-item>
							</view>
						</swiper-item>
					</template>
				</template>
			</swiper>
		</view>
	</view>
</template>

<script>
	import * as examApis from "@/commons/api/exam";
	import problemItem from "@/components/exam/problemItem";
	import _auth from "@/utils/auth";
	import * as gradeApis from '@/commons/api/grade.js'
	import {
		toZhDigit,
		getRandomQuestions,
		getUserLoginInfo
	} from '@/utils/util.js'
	import useFacePlugin from '@/commons/faceplugin.js'
	import {
		faceVerification
	} from '@/commons/api/apis.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		base64ToPath
	} from '../../js_sdk/gsq-image-tools/image-tools/index.js'
	import {
		httpRequest,
		uploadImage
	} from '@/utils/httpRequest.js'
	import * as auth from '@/commons/api/user.js'

	export default {
		data() {
			return {
				examData: {},
				swiperIndex: 1,
				total: 1,
				current: 0,
				isFaceContras: 0,
				recordId: '',
				isShowSheet: false,
				isVerifyFace: false,
				faceContrast: 0, // 活体认证次数
				constrastTimes: null, // 认证时间点
				answerTimeText: '',
				submitFlag: false,
				faceVerifyCount: -1,
				isMiddleFaceVerify: false,
				longit: '',
				lat: '',
				signAddress: ''
			};
		},
		components: {
			problemItem
		},
		onLoad(options) {
			this.examId = uni.getStorageSync('userexamsid')
			this.getData(this.examId, options.gradeExamId || '')
			let fn = () => {
				var That = this;
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						That.longit = res.longitude;
						That.lat = res.latitude;
						let place = ''
						if (res.address) {
							const a = res.address;
							a.country && (place += a.country);
							a.province && (place += a.province);
							a.city && (place += a.city);
							a.district && (place += a.district);
							a.street && (place += a.street);
							a.streetNum && (place += a.streetNum);
						}
						That.signAddress = place;
					}
				});
			}
			fn()
			setInterval(() => {
				this.$forceUpdate(); //强制刷新，解决页面不会重新渲染的问题
				fn()
			}, 5000)
		},
		filters: {
			ChineseToNumber(chnStr) {
				return toZhDigit(chnStr);
			}
		},
		onShow() {
			// if(this.time === '' && this.answerTime) {
			// 	this.timer = setTimeout(this.initTime, 3000)
			// }
		},
		onUnload() {
			clearInterval(this.time)
			// clearTimeout(this.timer)
			uni.hideLoading()
			if (!this.submitFlag) {
				this.submit(true)
			}

		},
		onBackPress() {
			uni.showModal({
				title: '提示',
				content: '中途退出考试无效，确认退出？',
				confirmText: '确定',
				cancelText: '取消',
				success: res => {
					if (res.confirm) {
						this.submit(true,true)
					}
				},
			})
			return true
		},
		methods: {
			// 获取随机人脸认证
			getRandomFaceVerify() {
				let num = getRandomQuestions(this.total)
				console.log('随机数：', num)
				this.faceVerifyCount = num
			},
			to(index) {
				this.current = index - 1;
				this.swiperIndex = index;
				this.toggleSheet();
			},
			toggleSheet() {
				this.isShowSheet = !this.isShowSheet
			},
			updateUserAnswer(d) {
				this.examData.titleList.forEach((e) => {
					if (e.id == d.titleId) {
						e.problemList.forEach((p) => {
							if (p.id == d.problemId) {
								p.value = d.userAnswer;
							}
							if (p.childrenList && p.childrenList.length) {
								e.childrenList.forEach((c) => {
									if (c.id == d.problemId) {
										c.value = d.userAnswer;
									}
								})
							}
						})
					}
				})
				this.examData.titleList = this.examData.titleList.concat([])
			},
			swiperChange(e) {
				this.swiperIndex = e.detail.current + 1;
				if ((this.swiperIndex == this.faceVerifyCount) && !this.isMiddleFaceVerify) {
					this.faceVierhudghr(true)
				}

			},

			faceVierhudghr(middleVerify) {
				useFacePlugin({}).then((res) => {
					uni.showLoading({
						title: '验证中...',
						mask: true
					})

					faceVerification(res).then(resp => {
						uni.hideLoading()
						if (resp.data.code == 200) {
							// 识别成功
							console.log('识别结果：',res)
							if (middleVerify) {
								this.isMiddleFaceVerify = true
								this.middleVerifyFace(res)
							} else {
								this.aikujsfbhnsjdkef(res)
							}
						} else {
							// request_success(res)
							// uni.showToast({
							// 	title: resp.data.msg,
							// 	duration: 1500,
							// 	icon: 'none'
							// })
							uni.showModal({
								title:'识别失败',
								content:resp.data.msg,
								showCancel:false,
								confirmText:'重试',
								success:res=>{
									if(res.confirm){
										this.faceVierhudghr(true)
									}
								}
							})
						
							// if (this.isGradeExam) {
							// 	const d = {
							// 		id: this.recordId
							// 	}
							// 	gradeApis.submitExam(d).then((e) => {
							// 		e.examId = this.examId;
							// 		e.recordId = this.recordId;
							// 		uni.setStorageSync('userexam-result', e);

							// 		uni.redirectTo({
							// 			url: '/pages/exam/gradeResult'
							// 		})
							// 	})
							// } else {
							// 	const d = {
							// 		recordId: this.recordId
							// 	}
							// 	examApis.examFinish(d).then((e) => {
							// 		e.examId = this.examId;
							// 		e.recordId = this.recordId;
							// 		uni.setStorageSync('userexam-result', e);

							// 		uni.redirectTo({
							// 			url: '/pages/exam/result'
							// 		})
							// 	})
							// }
						}
					}, err => {
						uni.hideLoading()
						request_err(err, '系统错误，稍后重试')
					})
				})
			},
			
			tryAgain(){
				uni.showModal({
					title: '提示',
					content: '认证失败，请重试',
					confirmText: '重试',
					showCancel: false,
					success: res => {
						if (res.confirm) {
							this.faceVierhudghr()
						}
					}
				})
			},
			
			middleVerifyFace(base64) {
				uni.showLoading({
					title: '上传中...'
				})
				base64ToPath(base64).then(_rep => {
					uploadImage('course/api/upload/pic', 'picFile', _rep, {}).then(_resp => {
						let face_img = JSON.parse(_resp.data)
						this.xixixixix(face_img)
					}, err => {
						uni.hideLoading()
						this.tryAgain()
					})
				}, err => {
					uni.hideLoading()
					this.tryAgain()
				})
			},

			aikujsfbhnsjdkef(base64, signOut) {
				uni.showLoading({
					title: '上传中...'
				})
				base64ToPath(base64).then(_rep => {
					uploadImage('course/api/upload/pic', 'picFile', _rep, {}).then(_resp => {
						let face_img = JSON.parse(_resp.data)
						this.iuywsertkfjg(face_img, signOut)
					}, err => {
						uni.hideLoading()
						this.tryAgain()
					})
				}, err => {
					uni.hideLoading()
					this.tryAgain()
				})
			},
			xixixixix(img) {
				// let userno = getUserLoginInfo('userNo')
				// let comid = uni.getStorageSync('userCompanyInfo').compId
				// let i = uni.getStorageSync('TrainingId')
				// let params = {
				// 	courseType: 3,
				// 	numEvent: i,
				// 	refName: '考试',
				// 	signonApp: 0,
				// 	statusId: 1,
				// 	compId: comid,
				// 	userNo: userno,
				// 	refId: this.examId,
				// 	longitude: this.longit,
				// 	latitude: this.lat,
				// 	place: this.signAddress,
				// 	userImage: img.data,
				// 	faceContrasResult: 'Success',
				// }
				// httpRequest({
				// 	url:'course/api/middleFaceLog/save',
				// 	method:'POST',
				// 	data:params,
				// 	success:res=>{
				// 		console.log('nnn',res)
				// 		if(res.data.code == 200){
				// 			console.log('保存成功')
				// 		}
				// 	},
				// 	fail:err=>{
				// 		console.log('保存失败')
				// 	}
				// },2)
				let etype = uni.getStorageSync('userexamtype')
				let userno = getUserLoginInfo('userNo')
				let comid = uni.getStorageSync('userCompanyInfo').compId
				let examid = uni.getStorageSync('userexamsid')
				let params = {
					"compId": comid,
					"examId": examid,
					"examType": etype,
					"faceContrasResult": "Success",
					"latitude": this.lat,
					"longitude": this.longit,
					"place": this.signAddress,
					"signonType": 2,
					"userImage": img.data,
					"userNo": userno
				}
				console.log('中途人脸验证参数：', params)
				httpRequest({
					url: 'exam/api/examFaceSignLog/save',
					method: "POST",
					data: params,
					success: res => {
						console.log('上传考试记录：', res)
						uni.showToast({
							title:'上传成功',
							icon:'none'
						})
					},
					fail: err => {
						this.tryAgain()
						console.log('上传考试记录失败：', err)
					}
				}, 5)
			},

			iuywsertkfjg(img, signOut) {
				// let i = uni.getStorageSync('TrainingId')
				// let params = {
				// 	courseType: 3,
				// 	numEvent: i,
				// 	refName: '考试',
				// 	signonApp: 0,
				// 	statusId: 1,
				// 	compId: comid,
				// 	userNo: userno,
				// 	signonType: signOut?1:0,
				// 	refId: this.examId,
				// 	longitude: this.longit,
				// 	latitude: this.lat,
				// 	place: this.signAddress,
				// 	userImage: img.data,
				// 	faceContrasResult: 'Success',
				// }
				// auth.faceSignLog(params).then(() => {
				// let url = '/pages/exam/startExam?id=' + this.examData.id;
				// if (this.gradeExamId) {
				// 	url += '&gradeExamId=' + this.gradeExamId
				// }
				// uni.navigateTo({
				// 	url: url
				// });
				// });
				let etype = uni.getStorageSync('userexamtype')
				let userno = getUserLoginInfo('userNo')
				let comid = uni.getStorageSync('userCompanyInfo').compId
				let examid = uni.getStorageSync('userexamsid')
				let params = {
					"compId": comid,
					"examId": examid,
					"examType": etype,
					"faceContrasResult": "Success",
					"latitude": this.lat,
					"longitude": this.longit,
					"place": this.signAddress,
					"signonType": 1,
					"userImage": img.data,
					"userNo": userno
				}
				console.log('交卷参数：', params)
				httpRequest({
					url: 'exam/api/examFaceSignLog/save',
					method: "POST",
					data: params,
					success: res => {
						console.log('上传考试记录：', res)
					},
					fail: err => {
						console.log('上传考试记录失败：', err)
						this.tryAgain()
					}
				}, 5)
			},

			submit(flag,middleLogout = false) {
				clearInterval(this.time)
				console.log('flagflagflagflag:', flag)
				if (!flag) {
					useFacePlugin({}).then((res) => {
						uni.showLoading({
							title: '验证中...'
						})
						faceVerification(res).then(resp => {
							console.log('交卷人脸识别：', resp)
							uni.hideLoading()
							const d = {
								recordId: this.recordId
							}
							if (resp.data.code == 200) {
								this.submitFlag = true
								this.aikujsfbhnsjdkef(res, true)
								
								console.log('交卷2222：', d)
								d.discernType = 1
								examApis.examFinish(d).then((e) => {
									e.examId = this.examId;
									e.recordId = this.recordId;
									uni.setStorageSync('userexam-result', e);
									uni.redirectTo({
										url: '/pages/exam/result'
									})
								})
							} else {
								// uni.showToast({
								// 	title: resp.data.msg,
								// 	icon: 'none',
								// 	duration: 1500
								// })
								uni.showModal({
									title:'识别失败',
									content:'识别失败，是否重试',
									cancelText:'交卷',
									confirmText:'重试',
									success: (res) => {
										if(res.cancel){
											d.discernType = 2
											examApis.examFinish(d).then((e) => {
												e.examId = this.examId;
												e.recordId = this.recordId;
												uni.setStorageSync('userexam-result', e);
												uni.redirectTo({
													url: '/pages/exam/result'
												})
											})
										}else {
											this.submit(flag)
										}
									}
								})
							}
						}, err => {
							uni.hideLoading()
							request_err(err, '人脸验证失败，稍后重试')
						})
					})
				} else {
					this.submitFlag = true
					// if (this.isGradeExam) {
					// 	const d = {
					// 		id: this.recordId
					// 	}
					// 	gradeApis.submitExam(d).then((e) => {
					// 		e.examId = this.examId;
					// 		e.recordId = this.recordId;
					// 		console.log('交卷3：',e)
					// 		uni.setStorageSync('userexam-result', e);

					// 		uni.redirectTo({
					// 			url: '/pages/exam/gradeResult'
					// 		})
					// 	})
					// } else {
					const d = {
						recordId: this.recordId
					}
					console.log('交卷4：', d)
					if(middleLogout){
						d.discernType = 2
					}
					examApis.examFinish(d).then((e) => {
						e.examId = this.examId;
						e.recordId = this.recordId;
						
						uni.setStorageSync('userexam-result', e);
						if(middleLogout){
							uni.redirectTo({
								url: '/pages/exam/result?isInvalid=true'
							})
						}else {
							uni.redirectTo({
								url: '/pages/exam/result'
							})
						}
						
					})
					// }
				}


			},

			userSubmitFn() {
				uni.showModal({
					title: '提示',
					content: '确定交卷吗？',
					success: (res) => {
						if (res.confirm) {
							this.submit();
						}
					}
				});
			},
			initTime() {
				function adds(n) {
					return n > 9 ? n : '0' + n
				}
				const settime = () => {
					this.answerTime--;
					if (this.answerTime <= 0) {
						this.submit(true);
						clearInterval(this.time)
						uni.showModal({
							title: '提示',
							content: '考试时间已经结束',
							success: function(res) {}
						});
					}
					this.answerTimeText = adds(parseInt(this.answerTime / 60)) + ':' + adds(parseInt(this.answerTime % 60));

					// 第三方设置人脸检测时间
					// this.checkContrast({
					// currentTime: this.totalTime - this.answerTime,
					// duration: this.totalTime
					//  })
				}
				this.time = setInterval(settime, 1000);
				settime();
			},
			checkContrast(playObj) {
				/* console.log(playObj, this.constrastTimes, this.faceContrast ) */
				if (this.isFaceContras === 0) {
					return;
				}
				if (playObj.duration === 0) {
					return
				}

				const d = (playObj.duration / (this.faceContrast - 1))
				if (!this.constrastTimes) {
					// 判断是否已经生成验证时间点
					const times = [0];
					for (let i = 0; i < this.faceContrast - 2; i++) {
						const randomTime = (d * (i + 1)) + ((16) * (1 + (-2 * Math.random())))
						times.push(randomTime);
					}
					times.push(playObj.duration - 30)
					this.constrastTimes = times;
				}


				const currentContrastTime = this.constrastTimes[0] // 获得当前认证时间点
				// console.log(this.faceContrast, playObj.currentTime, currentContrastTime, this.isVerifyFace)
				// 需要活体认证''
				// if (playObj.currentTime > currentContrastTime && !this.isVerifyFace) { 
				// 	this.isVerifyFace = true;
				// uni.$emit("verifyFace:" + this.recordId);
				// uni.showToast({
				// 	title: '人工识别'
				// })
				// return;
				// clearInterval(this.time);
				// this.time = ''
				// uni.navigateTo({
				// 	url: '/pages/verifyFace/verifyFace?refId=' + this.recordId + '&signType=3'
				// })
				// }
			},

			faceFn() {
				uni.$on("verifyFaceErr:" + this.recordId, () => {
					setTimeout(() => {
						this.isVerifyFace = false;
					}, 3000)
				})
				uni.$on("verifyFace:" + this.recordId, () => {
					this.isVerifyFace = false;
					this.constrastTimes.splice(0, 1);
				})
			},
			async getData(id = '', gradeExamId = '') {
				if (!_auth.isLogin()) {
					uni.showToast({
						title: '请先登录！',
						icon: 'none',
						duration: 1500
					});
					setTimeout(_auth.login, 1500)
					return;
				}
				let record = {};
				let res = {};
				res = await examApis.getAuthExamViewInfo({
					examId: id || ''
				})

				console.log('试卷详情：', res)
				if (res && res.id) {
					// if (gradeExamId) { 
					// this.recordId = res.id
					// if (res.examStatus === 2) { // 如果用户有考试记录 就直接继续考试 没有就开始一个新的考试记录
					// 	record = await gradeApis.continueExam({
					// 		id: res.id
					// 	})
					// if (record.code === 200) {
					// 	record = record;
					// 	res.titleList = record.titleList
					// } else{
					// 	record = await gradeApis.beginExam({
					// 		id: res.id
					// 	})
					// 	if (record && record.titleList && record.titleList.length) {
					// 		record = record;
					// 		res.titleList = record.titleList
					// 	}
					// }
					// } else {
					this.recordId = res.recordId
					// if (res.recordId) { // 如果用户有考试记录 就直接继续考试 没有就开始一个新的考试记录
					// 	record = await examApis.recordExam({
					// 		recordId: res.recordId
					// 	})
					// } else {
					record = await examApis.examexamOnline({
						examId: id
					})
					if (record && record.recordId) {
						this.recordId = record.recordId;
					}
					// }
					// }

					this.answerTime = record.answerTime;
					this.totalTime = this.answerTime
					this.initTime();

					uni.setNavigationBarTitle({
						title: res.examName
					});
					let total = 0;
					if (res.isFaceContras == 1) {
						this.constrastTimes = '';
						this.faceContrast = res.faceContrasCount;
						this.faceFn();
					}
					this.isFaceContras = res.isFaceContras;
					// 处理答案的东西
					record.titleList.forEach((t) => {
						t.problemList.forEach((p) => {
							p.gradeExamId = gradeExamId || ''
							if (p.problemContent) {
								p.problemContent = p.problemContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
							}

							if (p.optionList && p.optionList.length) {
								p.optionList.forEach((o) => {
									if (o.optionContent && o.optionContent.replace) {
										o.optionContent = o.optionContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
									}
								})
							}
							if (p.childrenList && p.childrenList.length) {
								p.childrenList.forEach((c) => {
									c.index = index;
									index++;
									c.gradeExamId = gradeExamId || ''
									if (c.problemContent) {
										c.problemContent = c.problemContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
									}
									if (c.optionList && c.optionList.length) {
										c.optionList.forEach((o) => {
											if (o.optionContent && o.optionContent.replace) {
												o.optionContent = o.optionContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
											}
										})
									}
								})
							}
						})
					})


					if (!res.titleList || !res.titleList.length) {
						res.titleList = record.titleList || [];
					}


					let index = 1;
					// 设置用户的答案显示 
					res.titleList.forEach((e, tindex) => {
						e.problemList.forEach((e, qindex) => {
							e.gradeExamId = gradeExamId || ''
							if (e.childrenList && e.childrenList.length) {
								total += e.childrenList.length
							} else {
								total++;
							}
							let userAnswer = '';
							let problem = null;
							if (record.titleList && record.titleList[tindex]) {
								const t = record.titleList[tindex]
								if (t.problemList && t.problemList[qindex]) {
									problem = record.titleList[tindex].problemList[qindex];
									if (problem.userAnswer) {
										userAnswer = problem.userAnswer.split('|')
									}
								}
							}
							if (e.problemType === 2 || e.problemType === 4) {
								e.value = userAnswer || []
							} else {
								if (userAnswer && userAnswer.join) {
									e.value = userAnswer.join('|') || ''
								} else {
									e.value = userAnswer || ''
								}
							}
							if (e.childrenList && e.childrenList.length) {
								e.childrenList.forEach((c, cIndex) => {
									c.gradeExamId = gradeExamId || ''
									c.index = index;
									index++;
									let userAnswer = '';
									if (problem && problem.childrenList && problem.childrenList[cIndex]) {
										if (problem.childrenList[cIndex].userAnswer) {
											userAnswer = problem.childrenList[cIndex].userAnswer.split('|')
										}
									}
									if (c.problemType === 2 || c.problemType === 4) {
										c.value = userAnswer || []
									} else {
										if (userAnswer && userAnswer.join) {
											c.value = userAnswer.join('|') || ''
										} else {
											c.value = userAnswer || ''
										}
										c.isEdit = false
									}
								})
							} else {
								e.index = index;
								index++;
							}
						})
					})

					// 因为3级问题的 app会出展示不出来 所以要这个改成2级问题
					let arr = [];
					res.titleList.forEach(t => {
						if (t && t.problemList && t.problemList.length) {
							t.problemList.forEach(p => {
								if (p.childrenList && p.childrenList.length) {
									t.problemList = p.childrenList;
								}
							})
							arr.push(t)
						}
					})
					res.titleList = arr;
					this.total = total
					this.examData = res;
					this.getRandomFaceVerify()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;

	}

	.examBox {
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
					overflow-y: auto;

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
									background-color: rgb(36, 136, 236);
									color: #fff;
									border-color: rgb(36, 136, 236);
								}
							}
						}
					}
				}
			}
		}
	}
</style>
