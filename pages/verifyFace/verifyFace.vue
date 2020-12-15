<template>
	<view class="" v-if="isMinappAudit">
		<!--pages/verifyFace/verifyFace.wxml-->
		<view v-if="startCamera == 1" class="camera_container" :style="'background-color: ' + bgc">
			<view class="camera_panel">
				<view v-if="num" class="mask">{{num}}</view>
				<camera class="camera" style="width: 100%;height:100%;z-index: 9;" device-position="front" flash="auto" @initdone="handleReady"
				 @error="error"></camera>
			</view>
			<view v-if="time > 0" class="camera_time">{{time}}S</view>
			<button v-else-if="time == 0" class="start_btn" type="primary" @tap="handlestart">开始认证</button>
		</view>
		<view v-else-if="startCamera == 2">
			<view class="camera_tips cus">
				认证成功!
			</view>
			<button class="start_btn" type="primary" @tap="handleGoUrl">返回首页</button>
		</view>
		<view v-else>
			<view class="camera_tips">
				当前操作需要先进行活体认证!
			</view>
			<!--  #ifdef  APP-PLUS -->
			<button class="start_btn" type="primary" @tap="handleLoadCamera">开始认证</button>
			<!-- #endif -->
			<!--  #ifdef  MP-WEIXIN -->
			<button class="start_btn" type="primary" @tap="handleLoadCamera">开始认证</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	// pages/verifyFace/verifyFace.js
	import * as auth from '@/commons/api/user.js'
	import {
		getIdCardInfo
	} from '@/commons/api/apis.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import {
		base64ToPath
	} from '../../js_sdk/gsq-image-tools/image-tools/index.js'
	import {
		uploadImage
	} from '@/utils/httpRequest.js'

	export default {
		name: "verifyFace",
		data() {
			return {
				courseId: '', //  课程ID 如果存在则验证完跳转到课程
				periodNo: '',
				userInfo: {},
				tempVideoPath: '',
				isMinappAudit: uni.getStorageSync('isMinappAudit'),
				cameraContext: undefined,
				startCamera: 0,
				num: 0,
				time: -1,
				bgc: '#fff',
				idCardinfo: {},
				faceSignType: '',
				isFaceverify: false,
				xiba: '',
				lat:'',
				longit:'',
				signAddress:''
			}
		},
		onBackPress() {
			if (!this.isFaceverify) {
				uni.showToast({
					title: '请进行人脸验证',
					icon: 'none',
					duration: 1500
				})
				return true
			}
		},
		onLoad: function(options) {
			if (this.isMinappAudit) {
				uni.setNavigationBarTitle({
					title: '人脸识别'
				});
			}
			let scene = options.scene ? decodeURIComponent(options.scene) : 'Y38500'
			this.type = options.type || 1
			this.refId = options.refId || 1
			this.signType = options.signType || '';
			this.signName = options.signName || '';
			this.faceSignType = options.faceSignType || ''
			this.xiba = options.xiba || '0'
			this.userInfo = uni.getStorageSync('userInfo')
			this.periodNo = scene
			this.courseId = options.courseId || ''
			
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
						That.getData();
					}
				});
			}
			fn()
			if (uni.getStorageSync('userInfo')) {
				this.userInfo = uni.getStorageSync('userInfo')
				fn();
			}
			this.getIDCardInfo()

		},
		methods: {
			// 获取身份证信息
			getIDCardInfo() {
				getIdCardInfo().then(res => {

					if (res.data.code == 200) {
						console.log('获取身份证信息a a a ：', res)
						this.idCardinfo = res.data.data
					} else {
						request_success(res)
					}
				}, err => {
					request_err(err, '获取身份失败')
				})
			},
			toError() {
				this.isFaceverify = false
				uni.$emit("verifyFaceErr:" + this.refId)
				uni.$emit("asifhbwsrei", {
					verify: false
				})
			},

			async getData() {
				uni.showLoading({
					title: '加载中...',
					mask: true,
				});
				let _token = getUserLoginInfo('token')
				let _userNo = getUserLoginInfo('userNo')
				// if(!uni.getStorageSync('userInfo')){
				// 	uni.showToast({
				// 		title:'登录过期，请重新登录',
				// 		icon:'none',
				// 		duration:1000
				// 	})
				// 	setTimeout(()=>{
				// 		uni.reLaunch({
				// 			url:'../login/normalLogin'
				// 		})
				// 	},1000)

				// 	return
				// }
				let faceData = await auth.getFaceData({
					userNo: uni.getStorageSync('userStorage').userNo
				})
				const orderNo = (new Date).getTime();
				const userId = faceData.userNo;
				const sign = 'NBO8YDWI0BMN81Q4SPD1YV7NM539FGG7';
				const nonce = faceData.nonce;

				uni.request({
					method: 'POST',
					url: 'https://idasc.webank.com/api/server/getfaceid', //仅为示例，并非真实接口地址。
					data: {
						webankAppId: faceData.wbappid,
						orderNo: orderNo,
						name: this.idCardinfo.name,
						idNo: this.idCardinfo.idcardNum,
						userId: userId,
						version: '1.0.0',
						sign: nonce
					},
					success: (res) => {
						console.log('应该是查询该身份的人脸信息', res)
						if (res && res.data && res.data.result && !res.data.result.faceId) {
							uni.showModal({
								title: '提示',
								showCancel: false,
								content: res.data.msg,
							});
							return;
						}


						uni.hideLoading()

						// 人脸对比
						const face = uni.requireNativePlugin('DC-WBFaceService');
						face.startWbFaceVerifyService({
							userId: userId,
							nonce: nonce,
							sign: faceData.sign,
							appId: faceData.wbappid,
							orderNo: orderNo,
							apiVersion: "1.0.0",
							licence: faceData.licence,
							faceType: "1",
							compareType: "0",
							faceId: res.data.result.faceId,
							sdkConfig: {
								//Android和iOS共有的配置参数                                  
								showSuccessPage: true, //是否展示成功页面
								showFailurePage: true, //是否展示失败页面
								recordVideo: false, //是否录制视频
								playVoice: true, //是否播放语音提示
								detectCloseEyes: false, //是否检测用户闭眼
								theme: '0', //sdk皮肤设置，0黑色，1白色

								//android独有的配置参数
								isEnableLog: true, //是否打开刷脸native日志，请release版本关闭！！！

								//iOS独有的配置参数
								windowLevel: '1', //sdk中拉起人脸活体识别界面中使用UIWindow时的windowLevel配置
								manualCookie: true //是否由SDK内部处理sdk网络请求的cookie
							}
						}, result => {
							if (result.scene != 'wb_face_callback_verify_result' || (result.res && !result.res.success)) {
								uni.showModal({
									title: '提示',
									showCancel: false,
									content: '人脸验证失败！请重新验证或者验证身体证号和真实名字是否正确',
									cancelText:'返回',
									confirmText:'重试',
									success: function(res) {
										if(res.cancel){
											uni.navigateBack({
												delta:1
											})
										}
									}
								});
								this.toError();
								return;
							}
							this.isFaceverify = true
							let fn = () => {
								uni.hideLoading()
								uni.showToast({
									title: '认证成功'
								})
								this.signName && uni.setStorageSync(this.signName, true);
								uni.$emit("verifyFace:" + this.refId)
								uni.navigateBack({
									delta: 1
								});
							}
							let courseInfo = uni.getStorageSync('courseInfoData')
							let comid = uni.getStorageSync('userCompanyInfo').compId
							uni.showLoading({
								title: '处理中...'
							})
							base64ToPath(result.res.userImageString).then((path) => {
								uploadImage('/course/api/upload/pic', 'picFile', path, {}).then((_resp) => {
									let face_img = JSON.parse(_resp.data)
									let params = {
										courseType: this.signType,
										numEvent: courseInfo.trainId,
										refName: courseInfo.courseName,
										signonApp: 0,
										statusId: 1,
										compId: comid,
										startTime: courseInfo.startTime,
										endTime: courseInfo.endTime,
										userNo: _userNo,
										signonType: this.faceSignType,
										refId: this.refId,
										longitude: this.longit,
										latitude: this.lat,
										place: this.signAddress,
										userImage: face_img.data,
										faceContrasResult: 'Success',
									}
									if (this.type == 2) {
										auth.faceSignLog(params).then(() => {
											if (this.faceSignType == 1) {
												uni.$emit('asifhbwsrei', {
													verify: true
												})
											}
											if (this.xiba == 1) {
												uni.$emit('zxczxczxczxczxc', {
													zxczxc: true
												})
											}
											fn();
										}, err => {
											uni.showToast({
												title: err.msg,
												icon: 'none'
											})
										});
									} else {
										auth.faceUserLog({
											userNo: _userNo,
											category: this.signType,
											refId: this.refId,
											longitude: this.longit,
											latitude: this.lat,
											place: this.signAddress,
											userImageBase64: result.res.userImageString,
											faceContrastResult: 'Success',
										}).then(() => {
											if (this.faceSignType == 1) {
												uni.$emit('asifhbwsrei', {
													verify: true
												})
											}
											if (this.xiba == 1) {
												uni.$emit('zxczxczxczxczxc', {
													zxczxc: true
												})
											}
											fn();
										}, err => {
											uni.showToast({
												title: err.msg,
												icon: 'none'
											})
										});
									}
								}, error => {
									console.log('上传人脸图片失败：', error)
								})
							}).catch(error => {
								console.error('转换失败', error)
							})


						});
					},
					fail: (err) => {
						console.log('aaaaaaa', res)
						uni.navigateBack({
							delta:1
						})
					}
				})
			},

			handleReady() {
				let num = this.num
				if (num == 0) {
					num = 3
				} else {
					num--
				}
				this.num = num
				if (num == 0) {
					this.handlestart()
					return
				}
				setTimeout(() => {
					this.handleReady()
				}, 1000)
			},
			handleLoadCamera() {
				// #ifdef APP-PLUS
				this.getData();
				// #endif
				// #ifdef MP-WEIXIN
				this.startCamera = 1
				// #endif
			},
			handlestart() {
				const ctx = uni.createCameraContext()
				this.cameraContext = ctx
				ctx.startRecord({
					quality: 'high',
					success: (res) => {
						this.startTiming(0)
						this.src = res.tempImagePath
					},
					complete: (res) => {
						console.log(22222)
					}
				})
			},
			startTiming(int) {
				const colors = ['#32e', '#f00', '#29e', '#2e5', '#ea2', '#0ff']
				this.time = 3 - int
				this.bgc = colors[int]
				if (int === 3) {
					int = 0
				} else {
					int++
				}
				if (int == 0) {
					this.stopVideo()
					return
				}
				setTimeout(() => {
					this.startTiming(int)
				}, 1000)
			},
			stopVideo() {
				this.cameraContext.stopRecord({
					compressed: true,
					success: (res) => {
						this.tempVideoPath = res.tempVideoPath
						uni.getFileSystemManager().readFile({
							filePath: res.tempVideoPath,
							encoding: 'base64',
							success: (result) => {
								console.log('base64', res)
								uni.getFileSystemManager().readFile({
									filePath: res.tempThumbPath,
									encoding: 'base64',
									success: (result1) => {
										this.verifyVideo(result.data, result1.data)
									}
								})
							}
						})
					},
					complete: (res) => {}
				})
			},
			verifyVideo(data, data1) {
				if (this.userInfo.faceContrasImg) {
					data1 = undefined
				}
				uni.showLoading({
					title: '正在认证...'
				})
				auth.verifyFace({
					userNo: this.userInfo.userNo,
					imageBase64: data1,
					is: true,
					videoBase64: data
				}).then(res => {
					let fn = () => {
						uni.hideLoading()
						uni.showToast({
							title: '认证成功'
						})
						this.signName && uni.setStorageSync(this.signName, true);
						uni.$emit("verifyFace:" + this.courseId)
						uni.navigateBack({
							delta: 1
						});
					}
					if (this.type === 2) {
						let params = {}
						params = {
							userNo: this.userInfo.userNo,
							signType: this.signType,
							refId: this.refId,
							faceContrasResult: 'Success',
						}
						auth.faceSignLog(params).then(() => {
							fn();
						});
					} else {
						let params = {
							userNo: this.userInfo.userNo,
							signType: this.signType,
							refId: this.refId,
							faceContrasResult: 'Success',
						}

						auth.faceUserLog(params).then(() => {
							fn();
						});
					}
				}).catch(err => {
					console.log('err', err)
				})
			},
			handleGoUrl() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			error(e) {
				console.log(e.detail)
			},
		}
	}
</script>

<style scoped>
	/* pages/verifyFace/verifyFace.wxss */
	.camera_panel {
		height: 400rpx;
		width: 400rpx;
		border-radius: 50%;
		margin: 60rpx auto;
		overflow: hidden;
		position: relative;
		background-color: #666;
	}

	.camera_tips {
		padding-top: 140rpx;
		padding-bottom: 40rpx;
		text-align: center;
		color: #666;
	}

	.camera_tips.cus {
		font-size: 60rpx;
	}

	.start_btn {
		width: 400rpx;
	}

	.camera_container {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		background: #fff;
	}

	.camera_time {
		text-align: center;
	}

	.mask {
		width: 400rpx;
		height: 400rpx;
		position: absolute;
		z-index: 999;
		line-height: 400rpx;
		font-size: 120rpx;
		text-align: center;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.3);
		color: #1aad19;
	}

	.camera {
		border-radius: 50%;
	}
</style>
