<template>
	<view class="detail_page b_fff">
		<view class="polyv" v-if="liveStart">
			<web-view :src="liveUrl"></web-view>
		</view>
		<view v-else>
			<view v-show="!videoSrc" class="img_box">
				<image class="course_img" :src="courseInfo.courseLogo"></image>
				<button v-if="courseInfo.liveStatus == 2" @tap="openLive" class="start_btn">进入频道</button>
			</view>
			<view v-show="videoSrc">
				<video v-show="videoSrc" id="polyvVideo" class="img_box" :poster="courseInfo.courseImg" :src="videoSrc" @play="isPlay"
				 @pause="pausevideo" @timeupdate="sendanmu" enable-danmu="true">
					<cover-view class="beisu-box" v-show="!playstatu">
						<cover-view class="clearfix">
							<button class="beisu-btn" @tap="showbei">倍速{{bei == 1.0 ? "" : bei + "X"}}</button>
						</cover-view>
						<cover-view class="bei_list" v-show="showjs">
							<button :class="'btn ' + (bei == 0.8 ? 'on' : '')" @tap="jiasu" data-b="0.8">0.8X</button>
							<button :class="'btn ' + (bei == 1.0 ? 'on' : '')" @tap="jiasu" data-b="1.0">1.0X</button>
							<button :class="'btn ' + (bei == 1.25 ? 'on' : '')" @tap="jiasu" data-b="1.25">1.25X</button>
							<button :class="'btn ' + (bei == 1.5 ? 'on' : '')" @tap="jiasu" data-b="1.5">1.5X</button>
						</cover-view>
					</cover-view>
				</video>
			</view>
			<view class="course_msg b_fff">
				<view class="flex_row_between">
					<like-btn :collectionId="courseInfo.id" :isCollection="courseInfo.isCollectionCourse" :courseCategory="courseInfo.courseCategory"></like-btn>
					<text class="course_title font33 c_333">{{courseInfo.courseName}}</text>
					<button class="share-btn" open-type="share"></button>
				</view>
				<view class="mgt20" v-if="showPrice">
					<view class="font41 c_red" v-if="!courseInfo.isFree">
						<text class="font25">￥</text>{{courseInfo.courseOriginal || '加载中...'}}
					</view>
				</view>
			</view>
			<view class="h5px" v-if="courseInfo.id"></view>
			<activity-panel v-if="courseInfo.id" @startSeckill="startSeckill" :courseInfo="courseInfo"></activity-panel>
			<view class="h5px"></view>
			<view class="teacher_box b_fff c_999 font25">
				<text>讲师：</text>
				<text v-if="courseInfo.lecturer" class="c_333">{{courseInfo.lecturer.lecturerName}}</text>
				<!-- <attention-btn :isAttention="courseInfo.isAttentionLecturer" :lecturerUserNo="courseInfo.lecturerUserNo"></attention-btn> -->
				<button type="primary" class="fr sign_btn" @tap="sign()">签到</button>
			</view>

			<view class="h5px"></view>
			<view class="teacher_box font25 b_fff c_999">
				<text class="w130">开播时间</text>
				<text class="c_333" v-if="courseInfo.startTime">{{courseInfo.startTime}}</text>
				<text class="c_333" v-else>已结束</text>
			</view>
			<view class="teacher_box font25 b_fff c_999">
				<text class="w130">有效时间</text>
				<text class="c_333" v-if="courseInfo.endTime">{{courseInfo.endTime}}</text>
				<text class="c_333" v-else>已结束</text>
			</view>
			<view class="h5px"></view>
			<view class="h5px"></view>
			<view class="course_tabs b_fff">
				<view class="tabs font33 c_333">
					<view v-if="isMinappAudit " :class="tab == 2 ? 'tab active' : 'tab'" @tap="changeTab" data-int="2">课程大纲</view>
					<view :class="tab == 1 ? 'tab active' : 'tab'" @tap="changeTab" data-int="1">课程介绍</view>
					<view :class="tab == 3 ? 'tab active' : 'tab'" @tap="changeTab" data-int="3">学习资料</view>
				</view>
				<view v-if="tab == 2 && isMinappAudit" class="course_brief font25 b_fff mgt30 pdb30">
					<view v-for="(item, index) in chapterList" :key="index" class="c_333">
						<view class="chapter_title pdl30">{{item.chapterName}}</view>
						<view v-for="(item, index2) in item.periodList" :key="index2" class="pdl30 pdr40 h60 o_hide p_relative"
						 :data-vInfo="item">
							<view class="period_panel font25" v-if="item.liveStatus == 1">
								<image src="../../../static/no_vid.svg" class="play_img no_play"></image>
								<text v-if="item.isFree" class="c_blue">(免费)</text>
								<text>{{item.periodName}}</text>
								<text class="live_status mgr20">未开播</text>
							</view>
							<view class="period_panel font25" v-else-if="item.liveStatus == 2" @tap="openLive">
								<image src="../../../static/no_play.svg" class="play_img"></image>
								<text v-if="item.isFree" class="c_blue">(免费)</text>
								<text>{{item.periodName}}</text>
								<view class="live_status mgr20">
									<text class="text">正在直播</text>
									<text class="btn" @tap="openLive">进入频道</text>
								</view>
							</view>
							<view class="period_panel font25" v-else-if="item.liveStatus == 5" :data-vinfo="item" @tap="selectVideo(item)">
								<image src="../../../static/no_play.svg" class="play_img"></image>
								<text v-if="item.isFree" class="c_blue">(免费)</text>
								<text>{{item.periodName}}</text>
								<view class="live_status mgr20">
									<text v-if="!item.videoVid || !item.videoLength || !item.playback" :data-vinfo="item">查看回放</text>
								</view>
							</view>
							<view class="period_panel font25" v-else>
								<image src="../../../static/no_vid.svg" class="play_img no_play"></image>
								<text v-if="item.isFree" class="c_blue">(免费)</text>
								<text>{{item.periodName}}</text>
								<view class="live_status mgr20">
									<text>已结束</text>
								</view>
							</view>
						</view>
					</view>
					<view class="text_center c_333 font33" v-if="loaddingEnd">加载中...</view>
				</view>
				<view v-else-if="tab == 1" class="course_brief font25 b_fff pd20">
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
		</view>
		<!-- <float-tab :shareImg="true" coursetype="1" ></float-tab> -->
		<view v-if="!isFree && showPrice" class="buy_panel">
			<view v-if="!courseInfo.isPutaway" class="buy_btn disabled">课程已下架</view>
			<!-- <view v-else @tap="buyCourse" :class="['buy_btn', isSeckill?'seckillBtn':'']"> {{ isSeckill?'立即秒杀':'立即购买' }}</view> -->
		</view>
	</view>
</template>

<script>
	import * as apis from "@/commons/api/course";
	// import * as config from "@/config";
	import * as auth from "@/commons/api/user";
	import {
		getUserInfo,
		login
	} from "@/utils/auth";
	import {
		getIdCardInfo
	} from '@/commons/api/apis.js'
	import polyv from "@/utils/polyv";
	import likeBtn from "@/components/likebtn/likebtn";
	import ActivityPanel from "@/components/activity/ActivityPanel";
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	import Toast from '@/commons/showToast.js'
	import {
		base64ToPath
	} from '../../../js_sdk/gsq-image-tools/image-tools/index.js'
	import {
		uploadImage,
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		faceVerification,
		getExamDetails,
		getExamIdByTraingId
	} from '@/commons/api/apis.js'
	import useFacePlugin from '@/commons/faceplugin.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'

	export default {
		data() {
			return {
				liveStart: false,
				showPrice: uni.getStorageSync('showPrice'),
				userInfo: {},
				isFree: false,
				videoSrc: '',
				study: '',
				tab: 2,
				playstatu: false,
				bei: 1.0,
				showjs: false,
				isSeckill: false,
				webInfo: uni.getStorageSync('serviceInfo'),
				isMinappAudit: uni.getStorageSync('isMinappAudit'),
				courseInfo: {},
				//课程基本信息
				hideVideo: false,
				chapterList: [],
				//章节列表
				loaddingEnd: false, //章节加载完毕
				liveUrl: "https://www.baidu.com",
				courseId: "",
				pageCurrent: 0,
				signName: '',
				totalPage: 0,
				filesData: [],
				lat: '',
				longit: '',
				place: '',
				isFaceVerify: false,
				userCourseDatas:{}
			};
		},

		components: {
			likeBtn,
			ActivityPanel,
			EmptyData
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let courseId = '';
			if (options.scene) {
				courseId = decodeURIComponent(options.scene);
			} else {
				courseId = options.id;
			}
			if (!this.isMinappAudit) {
				this.tab = 1;
			}
			this.courseId = courseId
			this.userCourseDatas = uni.getStorageSync('courseInfoData')
			this.signName = courseId + ':' + (new Date()).getTime();
			// if (uni.getStorageSync('userInfo')) {
			this.userInfo = uni.getStorageSync('userInfo')
			this.getUserCourse(courseId);
			// } else {
			// 	this.getCourse(courseId);
			// }
			this.getChapterList(1);
			this.getUserLocation()
			this.getaccessoryList()
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			this.videoContext = uni.createVideoContext('polyvVideo');
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			
		},

		methods: {
			getUserLocation() {
				uni.getLocation({
					geocode: true,
					success: res => {
						this.longit = res.longitude
						this.lat = res.latitude
						this.place = res.address.province + res.address.city + res.address.district + res.address.street + res.address
							.streetNum + res.address.poiName
					}
				})
			},
			startSeckill() {
				this.isSeckill = true;
			},
			handleUserBanned(error) {
				console.log(error)
			},
			handlePolyvError(error) {
				console.log(error)
			},
			// goVip() {
			// 	uni.navigateTo({
			// 		url: '../../vip/vip'
			// 	});
			// },

			changeTab(e) {
				const int = e.currentTarget.dataset.int;
				this.tab = int
			},

			// 获取课程详情
			getCourse(id) {
				uni.showLoading({
					title: '加载中...'
				});
				apis.courseInfo({
					courseId: id
				}).then(res => {
					console.log('111111111111111', res)
					res.introduce = res.introduce.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
					this.courseInfo = res
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
					console.log('2222222222222', res);
					res.introduce = res.introduce.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
					this.courseInfo = res
					this.isFree = !!res.isPay
				});
			},
			sign() {
				this.faceVerify(0)
				// uni.navigateTo({
				// 	url: '../../verifyFace/verifyFace?refId=' + this.courseId + '&signName=' + this.signName+ '&signType=2&type=2&faceSignType=0'
				// })
			},

			selectVideo(e) {

				let videoInfo = e;
				if (!e.id) {
					videoInfo = e.currentTarget.dataset.vinfo
				}
				if (videoInfo.videoVid || videoInfo.videoLength) {
					if (this.isFree || videoInfo.isFree) {
						let vid = videoInfo.videoVid;
						this.playVideo(videoInfo, vid);
						uni.pageScrollTo({
							scrollTop: 0
						});
					} else {
						uni.showToast({
							title: '该课程非免费开放,您没有观看权限',
							icon: 'none'
						});
					}
				} else if (e.playback) {
					// 欢拓直播间、回放
					// liveState = (0: 直播 1: 回放)
					// if (!uni.getStorageSync(this.signName)) {
					// 	uni.showToast({
					// 		title: '请先签到再来看直播',
					// 		icon: 'none'
					// 	});
					// 	return;
					// }
					auth.getPlaybackUrl({
						periodId: e.id,
						isPc: 1
					}).then(res => {
						const website = uni.getStorageSync('website')
						// let liveUrl = website.domain + `/watchH5?token=${res}&courseno=` + this.courseInfo.courseNo + '&refId=' + e.id + '&userNo=' + this.userInfo.userNo + '&liveState=1'
						let liveUrl = res
						uni.setStorageSync('liveData', {
							liveUrl: liveUrl,
							periodId: e.id,

						})
						uni.navigateTo({
							url: "/pages/webview/webview?id=" + this.courseId
						})
					});
				} else {

					uni.showToast({
						title: '该视频未更新',
						icon: 'none'
					});
				}
			},
			sendanmu(e) {
				console.log(e)
			},
			// 播放视频
			playVideo(videoInfo, vid) {
				uni.showLoading({
					title: '正在努力加载···'
				});
				const that = this;
				auth.getCourseSign({
					periodId: videoInfo.id,
					videoVid: vid
				}).then(res => {
					polyv.getVideo(vid, function(playInfo) {
						this.videoSrc = playInfo.src[0]
						this.study = videoInfo.id
					}, res.ts, res.sign);
				});
			},

			// 分页获取章节列表
			getChapterList(page) {
				apis.chapterList({
					courseId: this.courseId,
					pageCurrent: page
				}).then(res => {
					this.chapterList = this.chapterList.concat(res.list)
					if (res.pageCurrent === res.totalPage) {
						this.loaddingEnd = false
					} else {
						this.getChapterList(page + 1);
					}
				});
			},

			buyCourse() {

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

			openLive() {

				// 开始直播
				// if (!this.isFree && !this.courseInfo.isFreePeriod) {
				// 	uni.showToast({
				// 		title: '该课程非免费开放,您没有观看权限',
				// 		icon: 'none'
				// 	});
				// 	return false;
				// }
				// this.isFaceContras = this.courseInfo.isFaceContras;
				// if (this.isFaceContras == 1) {
				if (!this.isFaceVerify) {
					uni.showToast({
						title: '请先签到再来看直播',
						icon: 'none'
					});
					return;
				}
				// }
				let isPc = 1;
				// #ifdef MP-WEIXIN || APP-PLUS
				isPc = 0
				// #endif
				auth.getLiveUrl({
					periodId: this.courseInfo.periodId,
					isPc: 1
				}).then(res => {

					let liveUrl = res.liveUrl
					// 欢拓直播进入直播间
					// liveState = (0: 正在直播；1:直播回放)
					if (res.livePlatform === 2) {
						let userno = getUserLoginInfo('userNo')
						const website = uni.getStorageSync('website')
						liveUrl = website.domain + `/watchH5?token=${res.liveParam}&courseno=` + this.courseInfo.id + '&refId=' + this.courseInfo
							.periodId + '&userNo=' + userno
					}
					uni.setStorageSync('liveData', {
						liveUrl: liveUrl,
						periodId: this.courseInfo.periodId,
					})
					console.log('nimade:', this.courseId)
					uni.navigateTo({
						url: "/pages/webview/webview?id=" + this.courseId
					})
				}, (err) => {
					console.log('错误：', err)
				});
			},

			// 播放
			isPlay: function(e) {
				this.playstatu = true
			},
			// 暂停播放
			pausevideo: function() {
				this.playstatu = false
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
				this.showjs = false
			},
			// 获取用户课程信息
			getuserCourseinfo() {
				let idcard = uni.getStorageSync('userCompanyInfo').idCard
				let obj = this.userCourseDatas
				console.log('trainid',obj.trainId)
				console.log('idcard',idcard)
				httpRequest({
					url: '/user/api/tbTrainingPerson/selectTbTrainingPerson',
					method: 'POST',
					data: {
						"idcard": idcard,
						"trainId": obj.trainId
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
			// 学习资料获取
			getaccessoryList() {
				let id = uni.getStorageSync('courseInfoData').trainId
				console.log('live id', id)
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
						url: '../../playVideo/playVideo?video=' + path
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
			},
			// 去考试
			goExamfromUser() {
				let obj = this.userCourseDatas
				console.log('去考试：',obj)
				if (obj && obj.isPassExam == 1) {
					uni.showToast({
						title: '你该场次考试已经通过',
						icon: 'none'
					})
					return
				} else if (obj && obj.isSignon == 0) {
					uni.showToast({
						title: '请先观看视频并签出',
						icon: 'none'
					})
					return
				}
				let id = obj.trainId
				uni.navigateTo({
					url: '../../exam/examInfo?id=' + id
				})
			},

			// 自己的人脸验证
			faceVerify(faceSignType) {
				// 人脸采集
				useFacePlugin({}).then(res => {
					// 人脸验证
					uni.showLoading({
						title: '验证中...'
					})
					faceVerification(res).then(_res => {
						console.log('看直播时的人脸验证：', _res)
						uni.hideLoading()
						if (_res.data.code == 200) {
							uni.showToast({
								title: '验证成功',
								icon: 'none',
								duration: 1500
							})
							this.faceSign(res, faceSignType)
						} else {
							request_success(_res)
						}
					}, err => {
						uni.hideLoading()
						request_err(err, '人脸验证失败，稍后重试')
					})
				}, err => {
					request_err(err, '人脸采集失败，稍后重试')
				})
			},

			faceSign(base64, faceSignType) {
				console.log('课程信息：', this.courseInfo)
				let obj = uni.getStorageSync('courseInfoData')
				console.log('obj', obj)
				// uni.navigateTo({
				// 	url: '../../verifyFace/verifyFace?refId=' + this.courseId + '&signName=' + this.signName+ '&signType=2&type=2&faceSignType=0'
				// })
				// return
				base64ToPath(base64).then((path) => {
					uploadImage('/course/api/upload/pic', 'picFile', path, {}).then((_resp) => {
						let face_img = JSON.parse(_resp.data)
						let comid = uni.getStorageSync('userCompanyInfo').compId
						let _userNo = getUserLoginInfo('userNo')
						let params = {
							courseType: 2,
							numEvent: obj.trainId,
							refName: obj.courseName,
							signonApp: 0,
							statusId: 1,
							compId: comid,
							startTime: obj.startTime,
							endTime: obj.endTime,
							userNo: _userNo,
							signonType: faceSignType,
							refId: this.courseId,
							longitude: this.longit,
							latitude: this.lat,
							place: this.place,
							userImage: face_img.data,
							faceContrasResult: 'Success',
						}
						uni.showToast({
							title: '签到成功',
							icon: 'none'
						})
						// if (this.type == 2) {
						auth.faceSignLog(params).then((res) => {
							this.isFaceVerify = true
							console.log('人脸签入日志：', res)
							uni.showToast({
								title:'签到成功',
								icon:'none',
								duration:1500
							})
						}, err => {
							uni.showToast({
								title: err.msg,
								icon: 'none'
							})
						});
					}, error => {
						console.log('上传人脸图片失败：', error)
					})
				}).catch(error => {
					console.error('转换失败', error)
				})
			}
		}
	};
</script>
<style scoped>
	@import "@/static/css/detail.css";

	.seckillBtn {
		background-color: red;
		color: #fff
	}

	.detail_page {
		padding-bottom: 0;
	}

	.img_box {
		position: relative
	}

	.period_panel {
		width: 600rpx;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.sign_btn {
		height: 52rpx;
		line-height: 52rpx;
		font-size: 26rpx;
		margin-top: 14rpx;
	}


	.start_btn {
		position: absolute;
		top: 180rpx;
		font-size: 1em;
		left: 50%;
		width: 10em;
		margin-left: -5em;
		background: #2488EC;
		color: #fff;
	}

	.live_status {
		top: 0;
	}
	.sxdcfdiuh {
		width: 60rpx;
		height: 73rpx;
	}
	.live_status .text {
		color: red;
		font-size: 24rpx;
		margin-right: 12px;
	}

	.live_status .btn {
		color: #2488EC;
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

	.beisu-box {
		position: relative;
		z-index: 99;
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

	.course_title {
		margin-left: 10rpx;
	}

	.item-block {
		margin: 20rpx 0 40rpx;

		image {
			margin-right: 30rpx;
		}


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
	.pdf-docx-img {
		margin-right: 20rpx;
		width: 10%;
	}

	.file-img {
		width: 65rpx;
		height: 56rpx;
	}


	.titlezxc {
		color: #333333;
		font-size: 30rpx;
		margin-bottom: 6rpx;
	}

	.preview-img {
		width: 38rpx;
		height: 40rpx;
		margin-right: 60rpx;
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
	.no-data{
		text-align: center;
		margin: 30rpx 0;
		font-size: 32rpx;
		color: #000000;
	}
	.file-size {
		color: #FFB415;
		font-size: 24rpx;
	}
</style>
