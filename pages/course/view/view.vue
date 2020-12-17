<template>
	<!--pages/course/view/view.wxml-->
	<view class="detail_page b_fff">
		<view class="img_box" ref="playerbox" v-if="!videoSrc && !h5Video">
			<image class="course_img" :src="courseInfo.courseLogo"></image>
		</view>
		<!--  #ifdef  H5 -->
		<view v-show="h5Video" id="player"></view>
		<!--  #endif -->

		<video v-if="videoSrc" id="polyvVideo" class="img_box" :poster="courseInfo.courseImg" :src="videoSrc" @ended="nextVideo"
		 @play="isPlay" @pause="pausevideo" @timeupdate="videoTimeUpdate" enable-danmu="true">
			<cover-view class="beisu-box" v-if="playstatu">
				<cover-view class="clearfix">
					<button class="beisu-btn" @tap="showbei">倍速{{bei == 1.0 ? "" : bei + "X"}}</button>
				</cover-view>
				<cover-view class="bei_list" v-if="showjs">
					<button :class="'btn ' + (bei == 0.8 ? 'on' : '')" @tap="jiasu" data-b="0.8">0.8X</button>
					<button :class="'btn ' + (bei == 1.0 ? 'on' : '')" @tap="jiasu" data-b="1.0">1.0X</button>
					<button :class="'btn ' + (bei == 1.25 ? 'on' : '')" @tap="jiasu" data-b="1.25">1.25X</button>
					<button :class="'btn ' + (bei == 1.5 ? 'on' : '')" @tap="jiasu" data-b="1.5">1.5X</button>
				</cover-view>
			</cover-view>
		</video>
		<view class="course_msg b_fff">
			<view class="flex_row_between">
				<like-btn :collectionId="courseInfo.id" :isCollection="courseInfo.isCollectionCourse" :courseCategory="courseInfo.courseCategory"></like-btn>
				<text class="course_title font33 c_333">{{courseInfo.courseName || '正在加载...'}}</text>
				<button class="share-btn" open-type="share"></button>
			</view>
			<!-- 	<view class="mgt20" v-if="showPrice">
				<view class="font41 c_red" v-if="!courseInfo.isFree">
					<text class="font25">￥</text>{{courseInfo.courseOriginal || '加载中...'}}
					<text class="font25 c_gold mgl20">{{courseInfo.courseDiscount ? '￥' + courseInfo.courseDiscount : '免费'}}</text>
					<view @click="goVip" style="display: inline-block;" class="font25 mgl10 c_fff vip_price">SVIP</view>
				</view>
				<view class="font41 c_red" v-else>免费<view style="display: inline-block;" @click="goVip" class="font25 mgl10 c_fff vip_price">超级会员更多优惠</view>
				</view>
			</view> -->
		</view>
		<view class="h5px" v-if="courseInfo.id"></view>
		<activity-panel v-if="courseInfo.id" @startSeckill="startSeckill" :courseInfo="courseInfo"></activity-panel>
		<view class="h5px"></view>
		<view class="teacher_box b_fff c_999 font25">
			<text>讲师：</text>
			<text class="c_333">{{courseInfo.lecturer.lecturerName}}</text>
			<!-- <attention-btn :isAttention="courseInfo.isAttentionLecturer" :lecturerUserNo="courseInfo.lecturerUserNo"></attention-btn> -->
			<button type="primary" class="fr sign_btn" @tap="sign()">签到</button>
		</view>

		<view class="h5px"></view>
		<view class="course_tabs b_fff">
			<view class="tabs font33 c_333">
				<view v-if="isMinappAudit " :class="tab == 2 ? 'tab active' : 'tab'" @tap="changeTab" data-int="2">课程大纲</view>
				<view :class="tab == 1 ? 'tab active' : 'tab'" @tap="changeTab" data-int="1">课程介绍</view>
				<view :class="tab == 3 ? 'tab active' : 'tab'" @tap="changeTab" data-int="3">学习资料</view>
			</view>
			<view v-if="tab == 2 && isMinappAudit " class="course_brief font25 b_fff mgt30 pdb30">
				<view v-for="(item, index) in chapterList" :key="index" class="c_333">
					<view class="chapter_title pdl30">{{item.chapterName}}</view>
					<view v-for="(item, index2) in item.periodList" :key="index2" class="pdl30 pdr40 h60 o_hide flex-row-start" @tap="selectVideo(item)"
					 :data-vInfo="item">
						<image v-if="item.videoVid" src="../../../static/no_play.svg" class="play_img"></image>
						<image v-else src="../../../static/no_play.svg" class="play_img no_play"></image>
						<!-- <text v-if="item.isFree" class="c_blue">(免费)</text> -->
						<text class="c_999" v-if="!item.videoVid || !item.videoLength">(未更新)</text>
						<text>{{item.periodName}}</text>
					</view>
				</view>
				<view class="text_center c_333 font33" v-if="loaddingEnd">加载中...</view>
			</view>
			<view v-else-if="tab == 1" class="course_brief font25 b_fff learningMat">
				<rich-text :nodes="courseInfo.introduce"></rich-text>
			</view>
			<view v-else-if="tab == 3" class="course_brief font25 b_fff pd20">
				<template v-if="filesData && filesData.length >0">
					<view class="item-block flex-row-start" v-for="(item,index) in filesData" :key='index'>
						<view class="pdf-docx-img">
							<image v-if="item.suffix == 'png' || item.suffix == 'jpg' || item.suffix == 'gif'" :src="item.savePath" mode="" class="sxdcfdiuh" ></image>
							<image v-else-if="item.suffix == 'mp4' || item.suffix == 'flv' || item.suffix == 'm3u8'"  src="../../../static/film.svg" mode="" class="sxdcfdiuh"></image>
							<image v-else-if="item.suffix == 'doc' || item.suffix == 'docx'"  src="../../../static/files-DOCX.png" mode="" class="sxdcfdiuh"></image>
							<image v-else-if="item.suffix == 'pdf'"  src="../../../static/files-PDF.png" mode="" class="sxdcfdiuh"></image>
							<image v-else class="sxdcfdiuh" src="../../../static/file.svg" mode=""></image>
						</view>
						<view class="file-content">
							<view class="title">
								{{item.name}}
							</view>
							<view class="file-size">
								{{item.suffix}}
							</view>
						</view>
						<view class="action-content flex-between">
							<image class="preview-img" src="../../../static/preview-file.png" mode="" @click="previewFile(item)"></image>
							<image class="download-img" src="../../../static/download.png" mode="" @click="downloadFile(item)"></image>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="no-data">
						暂无学习资料
					</view>
				</template>
			</view>
		</view>
		<view class="goexam-btn" @click="getuserCourseinfo">
			去考试
		</view>
		<!-- <float-tab :shareImg="true" coursetype="1" @hidevideo="changeVideoBox" @hideewm="changeVideoBox"></float-tab> -->
		<!-- <view v-if="!isFree && showPrice" class="buy_panel">
			<view v-if="!courseInfo.isPutaway" class="buy_btn disabled">课程已下架</view>
			<view v-else @tap="buyCourse" :class="['buy_btn', isSeckill?'seckillBtn':'']"> {{ isSeckill?'立即秒杀':'立即购买' }}</view>
		</view> -->
	</view>
</template>

<script>
	import * as apis from "@/commons/api/course";
	import * as auth from "@/commons/api/user";
	import {
		login,
		hideLogin
	} from "@/utils/auth";
	import polyv from "@/utils/polyv";
	import likeBtn from "@/components/likebtn/likebtn";
	import ActivityPanel from "@/components/activity/ActivityPanel";
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		faceVerification,
		getExamDetails,
		getExamIdByTraingId
	} from '@/commons/api/apis.js'
	import useFacePlugin from '@/commons/faceplugin.js'
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	import Toast from '@/commons/showToast.js'

	export default {
		data() {
			return {
				faceContrast: 0, // 活体认证次数
				isFaceContras: 0,
				constrastTimes: null, // 认证时间点
				videoPeriodId: '', // 正在播放课时ID
				playstatu: false, // 开始播放
				playInfo: {
					currentTime: 0, // 当前播放时间
					duration: 0 // 播放总时长
				}, // 播放信息
				showPrice: uni.getStorageSync('showPrice'),
				isFree: true,
				videoSrc: '',
				study: '',
				isSeckill: false,
				isMinappAudit: uni.getStorageSync('isMinappAudit'),
				tab: 2,
				bei: 1.0,
				showjs: false,
				courseInfo: {
					isPutaway: true,
					lecturer: {}
				},
				//课程基本信息
				hideVideo: false,
				h5Video: false,
				player: undefined,
				chapterList: [],
				//活动信息
				loaddingEnd: false,
				//章节加载完毕
				pageSize: 20,
				totalPage: 0,
				pageCurrent: 1,
				userInfo: "",
				signName: '',
				courseId: "",
				isVerifyFace: false,
				randomtimes: 0,
				filesData: [],
				fromUser: false,
				traningId: '',
				userCourseDatas: {},
				"isSignon": 0,
				"isPassExam": 0,
			};
		},

		components: {
			likeBtn,
			// attentionBtn,
			// floatTab,
			EmptyData,
			ActivityPanel
		},
		onShareAppMessage: function(res) {
			// const userInfo = uni.getStorageSync('userInfo');
			// let url = 'pages/course/view/view?id=' + this.courseId;

			// if (userInfo) {
			// 	url += '&referralCode=' + userInfo.referralCode;
			// }

			// return {
			// 	path: url
			// };
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			// 课程id
			let courseId = '';
			courseId = options.id || '';
			if (!this.isMinappAudit) {
				this.tab = 1;
			}
			
			this.userCourseDatas = uni.getStorageSync('courseInfoData')
			// if(options.coursedata){
			// 	coursedatas = JSON.parse(decodeURIComponent(options.coursedata))
			// }
			this.signName = courseId + ':' + (new Date()).getTime();
			this.fromUser = options.fromUser
			this.courseId = courseId 
			// 培训场次id
			this.traningId = options.trainingId || ''
			
			this.getCourse(courseId);
			this.getChapterList(1);
			// 学习资料
			this.getaccessoryList()
			
			let coursesss = uni.getStorageSync('courseInfoData')

			uni.$on('asifhbwsrei', (res) => {
				if (res.verify) {
					uni.setStorageSync('TrainingId', coursesss.trainId)
					// this.getaccessoryList()
					uni.showModal({
						title: '提示',
						content: '签出成功，是否进行考试？',
						confirmText: '前往考试',
						cancelText: '暂不',
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '../../exam/examInfo?id=' + coursesss.trainId
								})
							}
						}
					})
				}
			})
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			// #ifdef MP_WEIXIN || APP-PLUS
			this.videoContext = uni.createVideoContext('polyvVideo')
			// #endif
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			
			
			uni.$on('zxczxczxczxczxc', (res) => {
				if (res.zxczxc) {
					this.isVerifyFace = true
					uni.showToast({
						title: "完成验证"
					})
					this.constrastTimes.splice(0, 1);
					// #ifdef MP-WEIXIN || APP-PLUS
					this.videoContext.play()
					// #endif
				}
			})
		},
		methods: {
			sign() {
				uni.navigateTo({
					url: '../../verifyFace/verifyFace?refId=' + this.courseId + '&signName=' + this.signName +
						'&signType=1&type=2&faceSignType=0'
				})
			},
			startSeckill() {
				this.isSeckill = true;
			},
			changeTab(e) {
				const int = e.currentTarget.dataset.int;
				this.tab = int
			},

			goVip() {
				uni.navigateTo({
					url: '../../vip/vip'
				});
			},

			// 获取课程详情
			getCourse(id) {
				if(!id){
					uni.showToast({
						title:'课程为空',
						icon:'none'
					})
					return
				}
				uni.showLoading({
					title: '加载中...'
				});
				console.log('course id',id)
				apis.courseInfo({
					courseId: id
				}).then(res => {
					console.log('获取课程详情',res)
					res.introduce = res.introduce.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
					this.courseInfo = res
					this.isFree = !!res.isFree
				},err=>{
					console.log('获取课程错误：',err)
					uni.showToast({
						title:err.msg,
						icon:'none'
					})
				});
			},

			// 登录后详情
			getUserCourse(id) {
				uni.showLoading({
					title: '加载中...'
				});
				auth.courseInfo({
					courseId: id
				}).then(res => {
					res.introduce = res.introduce.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
					this.courseInfo = res
					this.isFree = !!res.isPay
				});
			},

			// 自己的人脸验证
			faceVerify() {
				// 人脸采集
				useFacePlugin({}).then(res => {
					// 人脸验证
					uni.showLoading({
						title: '验证中...'
					})
					faceVerification(res).then(res => {
						console.log('看直播时的人脸验证：', res)
						uni.hideLoading()
						if (res.data.code == 200) {
							uni.showToast({
								title: '签到成功',
								icon: 'none'
							})
							uni.setStorageSync(this.signName, true);
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

			selectVideo(e) {
				// if (!uni.getStorageSync('userInfo')) {
				// 	console.log('没登录')
				// 	uni.navigateTo({
				// 		url:'../../login3/login'
				// 	})
				// }
				this.isFaceContras = e.isFaceContras;
				let videoInfo = e;
				if (this.isFaceContras == 1) {
					if (!uni.getStorageSync(this.signName)) {
						uni.showToast({
							title: '请先签到再来看视频',
							icon: 'none'
						});
						return;
					}
				}


				if (!uni.getStorageSync(this.signName)) {
					uni.showToast({
						title: '请先签到再来看视频',
						icon: 'none'
					});
					return;
				}

				if (videoInfo.videoVid && videoInfo.videoLength) {
					if (this.isFree || videoInfo.isFree) {
						let vid = videoInfo.videoVid;
						this.playVideo(videoInfo, vid);
						uni.pageScrollTo({
							scrollTop: 0
						});
					} else {
						uni.showToast({
							title: '您没有观看权限',
							icon: 'none'
						});
					}
				} else {
					uni.showToast({
						title: '该视频未更新',
						icon: 'none'
					});
				}
			},

			// 播放视频
			playVideo(videoInfo, vid) {
				const that = this;
				uni.showLoading({
					title: '加载中...'
				});
				uni.$on("verifyFaceErr:" + videoInfo.id, () => {
					this.isVerifyFace = false;
				})

				// uni.$on("verifyFace:" + videoInfo.id, () => {
				// 	uni.showToast({
				// 		title: "完成验证"
				// 	})
				// 	this.isVerifyFace = false;
				// 	this.constrastTimes.splice(0, 1);
				// 	// #ifdef MP-WEIXIN || APP-PLUS
				// 	this.videoContext.play()
				// 	// #endif
				// })
				auth.getCourseSign({
					periodId: videoInfo.id,
					videoVid: vid
				}).then(res => {
					if (videoInfo.isFaceContras == 1) {
						this.constrastTimes = '';
						this.faceContrast = videoInfo.faceContrasCount;
					}
					this.isFaceContras = videoInfo.isFaceContras;

					this.videoPeriodId = videoInfo.id
					// #ifdef MP-WEIXIN || APP-PLUS
					this.wxGetVideo(vid, res, videoInfo)
					return
					// #endif
					this.getVideo(Object.assign({
						vid: vid
					}, res))
				});
			},
			getVideo(data) {
				const userInfo = uni.getStorageSync('userInfo')
				// let box = this.$refs.playerbox;
				this.h5Video = true
				if (this.videoContext) {
					this.videoContext.changeVid({
						vid: data.vid,
						playsafe: data.token,
						ts: data.ts,
						sign: data.sign,
						autoplay: true
					});
				} else {
					this.videoContext = polyvObject('#player').videoPlayer({
						'width': '100%',
						'height': '203px',
						'forceH5': true,
						'code': data.code,
						'playsafe': data.token,
						'ts': data.ts,
						'sign': data.sign,
						'vid': data.vid,
						'viewerInfo': {
							'viewerId': uni.getStorageSync('userStorage').userNo,
							'viewerName': uni.getStorageSync('userBasicInfo').nickname
						},
						flashvars: {
							skin_type: 'skin_blue',
							ban_set_player: 'off'
						}
					})
				}
			},
			wxGetVideo(vid, res, videoInfo) {
				polyv.getVideo(vid, (playInfo) => {
					this.videoSrc = playInfo.src[0]
					this.study = videoInfo.id
				}, res.ts, res.sign);
			},
			// 分页获取章节列表
			getChapterList(page) {
				apis.chapterList({
					courseId: this.courseId,
					pageCurrent: page
				}).then(res => {
					console.log('列表。。。。。', res)
					this.chapterList = this.chapterList.concat(res.list)
					if (res.pageCurrent === res.totalPage) {
						this.loaddingEnd = false
					} else {
						this.getChapterList(page + 1);
					}
				});
			},

			buyCourse() {
				if (!uni.getStorageSync('userInfo')) {
					console.log('没登录')
					uni.navigateTo({
						url: '../../login3/login'
					})
				}

				if (!this.courseInfo.isPutaway) {
					uni.showToast({
						title: '该课程已下架',
						icon: 'none'
					});
					return false;
				}

				uni.navigateTo({
					url: '../../order/order?no=' + this.courseId + '&t=1'
				});
			},
			// 获取播放时长
			getPlayTime() {
				const playInfo = this.playInfo
				// #ifdef  H5
				playInfo.currentTime = this.videoContext.j2s_getCurrentTime()
				playInfo.duration = this.videoContext.j2s_getDuration()
				// #endif
				// this.playInfo.currentTime

				if (this.faceContrast) { // 校验认证信息
					this.checkContrast(playInfo)
				}

				auth.saveCourseLog({
					noLoading: true,
					periodId: this.videoPeriodId,
					watchLength: playInfo.currentTime,
					duration: playInfo.duration
				}).then(res => {})
				if (this.playstatu) {
					setTimeout(() => {
						this.getPlayTime()
					}, 3000)
				}
			},
			randomTime(max) {
				if (this.randomtimes > 30) return
				let result = 0
				let m = Math.floor(max) - 40
				r()
				let i = 0

				function r() {
					result = Math.floor(Math.random() * m)
					i++
					if (i >= 20) {
						return
					}
					if (result <= 30) {
						r()
					}

				}
				this.randomtimes = Math.floor(result)
				return
			},

			// 活体认证
			checkContrast(playObj) {
				if (this.isFaceContras === 0) {
					return;
				}
				if (playObj.duration === 0) {
					return
				}

				// const d = (playObj.duration / (this.faceContrast - 1))
				// if (!this.constrastTimes) {
				// 	// 判断是否已经生成验证时间点
				// 	const times = [2];
				// 	for (let i = 0; i < this.faceContrast - 2; i++) {
				// 		const randomTime = (d * (i + 1)) + ((16) * (1 + (-2 * Math.random())))
				// 		times.push(randomTime);
				// 	}
				// 	times.push(playObj.duration - 4)
				// 	this.constrastTimes = times;
				// }

				this.randomTime(playObj.duration)
				// const currentContrastTime = this.constrastTimes[0] // 获得当前认证时间点
				console.log(this.randomtimes, '----------', Math.floor(playObj.currentTime));
				console.log('中兄次之乡村振兴', this.isVerifyFace);
				if (Math.floor(playObj.currentTime) >= this.randomtimes) { // 需要活体认证''
					if (!this.isVerifyFace) {
						this.isVerifyFace = true;
						// #ifdef H5
						this.videoContext.j2s_pauseVideo();
						// #endif

						// #ifdef MP-WEIXIN || APP-PLUS
						this.videoContext.pause && this.videoContext.pause()
						// #endif

						// uni.showToast({
						// 	title: '人脸识别'
						// })

						// setTimeout(()=> {
						// 	this.signName && uni.setStorageSync(this.signName, true);
						// 	uni.$emit("verifyFace:" + this.courseId)
						// }, 2000)
						uni.navigateTo({
							url: '../../verifyFace/verifyFace?refId=' + this.videoPeriodId + '&signType=1&xiba=1'
						})
					}
				}
			},

			// 播放
			isPlay: function(e) {
				this.playstatu = true
				this.getPlayTime()
			},
			// 暂停播放
			pausevideo: function() {
				this.playstatu = false
				this.getPlayTime()
			},
			// 暂停播放
			nextVideo: function() {
				this.playstatu = false
				this.getPlayTime()
				uni.navigateTo({
					url: '../../verifyFace/verifyFace?refId=' + this.videoPeriodId + '&signType=1&faceSignType=1'
				})

			},
			// 显示加速列表
			showbei: function() {
				this.showjs = !this.showjs
			},
			// 选择倍速
			jiasu: function(e) {
				let beisu = parseFloat(e.currentTarget.dataset.b);
				this.videoContext.playbackRate(beisu);
				this.bei = beisu
				this.showjs = true
			},
			videoTimeUpdate: function(e) {
				this.playInfo = e.detail
			},
			// 获取用户课程信息
			getuserCourseinfo() {
				let idcard = uni.getStorageSync('userCompanyInfo').idCard
				let trainid = this.userCourseDatas.traningId
				httpRequest({
					url: '/user/api/tbTrainingPerson/selectTbTrainingPerson',
					method: 'POST',
					data: {
						"idcard": idcard,
						"trainId": trainid
					},
					success:res=>{
						console.log('查询状态：',res)
						if(res.data.code == 200){
							if(res.data.data){
								this.userCourseDatas.isPassExam = res.data.data.isPassExam
								this.userCourseDatas.isSignon = res.data.data.isSignon
								this.goExamfromUser()
							}else {
								uni.showToast({
									title:'获取考试详情失败',
									icon:'none'
								})
							}
						}else {
							request_success(res)
						}
					},
					fail:err=>{
						console.log('查询错误：',err)
					}
				},1)
			},
			// 去考试
			goExamfromUser() {
				let obj = this.userCourseDatas
				console.log('ooo',obj)
				if (obj.isPassExam == 1) {
					uni.showToast({
						title: '你该场次考试已经通过',
						icon: 'none'
					})
					return
				} else if (obj.isSignon == 0) {
					uni.showToast({
						title: '请先观看视频并签出',
						icon: 'none'
					})
					return
				}
				let id = obj.traningId
				if(!id){
					uni.showToast({
						title:'该培训没有考试',
						icon:'none'
					})
					return
				}
				uni.navigateTo({
					url: '../../exam/examInfo?id=' + id
				})
			},
			// 学习资料获取
			getaccessoryList() {
				let id = uni.getStorageSync('courseInfoData').trainId
				console.log('iiddiiddid:',id)
				if (!id) {
					uni.showToast({
						title: '获取学习资料失败',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '加载中...'
				})
				httpRequest({
					url: '/user/pc/tb/train/learn/attach/list',
					method: 'POST',
					data: {
						"trainId": id,
						"pageSize": 10,
						"pageCurrent": 1
					},
					success: res => {
						uni.hideLoading()
						console.log('学习资料：', res)
						if (res.data.code == 200) {
							
							let list = res.data.data.list
							list.forEach((item,index)=>{
								let path = item.savePath
								let splitLength = path.split('.').length
								let suffix = path.split('.')[splitLength - 1]
								list[index].suffix = suffix
							})
							this.filesData = list
						} else {
							request_success(res)
						}
					},
					fail: err => {
						uni.hideLoading()
						request_err(err, '获取学习资料失败')
					}
				}, 1)
			},
			previewFile(item) {
				let path = item.savePath
				let splitLength = path.split('.').length
				let suffix = path.split('.')[splitLength - 1]
				console.log('path:', path)
				if (suffix == 'mp4' || suffix == 'flv' || suffix == 'm3u8') {
					uni.navigateTo({
						url: '../../playVideo/playVideo?video=' + this.path
					})
				} else if (suffix == 'doc' || suffix == 'xls' || suffix == 'ppt' || suffix == 'pdf' || suffix == 'docx' || suffix ==
					'xlsx' || suffix == 'pptx') {
					uni.downloadFile({
						url: path,
						timeout: 20000,
						success: (res) => {
							uni.hideLoading()
							console.log('下载成功：', res)
							if (res.statusCode === 200) {
								uni.openDocument({
									filePath: res.tempFilePath,
									success: (x) => {
										console.log('打开文档成功')
									},
									fail: err => {
										console.log('打开失败？', err)
									}
								})
							} else {
								Toast({
									title: '下载文件失败'
								})
							}

							// uni.saveFile({
							// 	tempFilePath:res
							// })
						},
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								title: '下载失败',
								icon: 'none'
							})
						}
					})

				} else if(suffix == 'png' || suffix == 'jpg' || suffix == 'jpeg' || suffix == 'gif'){
					uni.previewImage({
						current:path,
						urls:[path],
						indicator:'default',
						success: (res) => {
							console.log('预览')
						}
					})
				} else {
					Toast({
						title: '该文件暂不支持预览'
					})
				}

			},
			downloadFile(item) {
				let path = item.savePath
				uni.showLoading({
					title: '保存中...'
				})
				uni.downloadFile({
					url: path,
					timeout: 20000,
					success: (res) => {
						console.log('下载成功：', res)
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success: resp => {
								uni.hideLoading()
								uni.showToast({
									title: '保存成功:' + resp.savedFilePath,
									icon: 'none'
								})
							},
							fail: err => {
								uni.hideLoading()
								uni.showToast({
									title: '保存失败',
									icon: 'none'
								})
							}
						})
					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '保存失败',
							icon: 'none'
						})
					}
				})
			}
		}
	};
</script>
<style scoped>
	/* pages/course/view/view.wxss */
	@import "../../../static/css/detail.css";

	.seckillBtn {
		background-color: red;
		color: #fff
	}

	.sign_btn {
		height: 52rpx;
		line-height: 52rpx;
		font-size: 26rpx;
		margin-top: 14rpx;
	}

	.beisu-btn {
		color: #fff;
		float: left;
		margin-left: 12rpx;
		font-size: 24rpx;
		width: 120rpx;
		text-align: left;
		background: rgba(0, 0, 0, 0.2);
	}

	.beisu-box .bei_list {
		width: 100rpx;
	}

	.beisu-box .btn {
		background: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
	}

	.beisu-box .btn.on {
		color: springgreen;
	}

	.share-btn {
		font-size: 26rpx;
		padding: 0;
		color: #333;
		background: none;
		border: none;
	}

	.share-btn:after {
		border: none;
	}

	.img_box {
		display: block;
	}

	.beisu-box {
		position: relative;
		z-index: 99;
	}

	.course_title {
		margin-left: 10rpx;
	}

	.learningMat {
		padding: 20rpx 30rpx;
	}

	.llltext {
		text-align: center;
		margin: 40rpx 0;
	}

	.item-block {
		margin: 20rpx 0 40rpx;

		image {
			margin-right: 30rpx;
		}
	}

	.pdf-docx-img {
		margin-right: 20rpx;
		width: 10%;
	}

	.sxdcfdiuh {
		width: 60rpx;
		height: 73rpx;
	}

	.file-img {
		width: 65rpx;
		height: 56rpx;
	}

	.file-content {
		width: 65%;
	}
	.title{
		color: #333333;
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: left;
		margin-bottom: 4rpx;
	}

	.preview-img {
		width: 38rpx;
		height: 40rpx;
		margin-right: 40rpx;
	}
	.file-size {
		color: #FFB415;
		font-size: 24rpx;
	}

	.download-img {
		width: 50rpx;
		height: 50rpx;
	}

	.goexam-btn {
		width: 60%;
		margin: 40rpx auto 20rpx;
		border-radius: 9999rpx;
		background-color: #2C9FFD;
		text-align: center;
		color: #FFFFFF;
		padding: 20rpx 0;
		font-size: 36rpx`;
	}

	.play_img {
		margin-right: 10rpx;
		color: #5CB6FF;
	}
	.no-data{
		text-align: center;
		margin: 30rpx 0;
		font-size: 32rpx;
		color: #000000;
	}
	.action-content {}
</style>
