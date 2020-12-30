<template>
	<view>
		<web-view :src="pagePath" @message="fn"></web-view>
	</view>
</template>

<script>
	import {
		base64ToPath
	} from '../../js_sdk/gsq-image-tools/image-tools/index.js'
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
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import * as apis from "@/commons/api/course";
	import * as auth from "@/commons/api/user";
	
	export default {
		data() {
			return {
				faveVerifyTime:0,
				pagePath: '',
				courseId: '',
				longit: '',
				lat: '',
				place: '',
				signAddress:'',
				liveInfo:{},
				liveStatus:0,
				timerId:null,
				count:0
			};
		},

		components: {},
		props: {},
		onBackPress(e) {
			if(this.isNeedFaceVerify == true){
			console.log('xixix',this.isNeedFaceVerify)
				this.getLiveStatus(this.courseId,true)
			}else {
				console.log('xixix123123123',this.isNeedFaceVerify)
				// setTimeout(()=>{
				// 	uni.navigateBack({
				// 		delta:1
				// 	})
				// },200)
				return false
			}
			return true
		},
		onLoad: function(options) {
			if (options.url) {
				this.setData({
					pagePath: options.url
				});
			} else {
				const data = uni.getStorageSync('liveData');
				this.periodId = data.periodId;
				this.pagePath = data.liveUrl;
			}
			this.courseId = options.id
			this.isNeedFaceVerify = options.needFace
			this.getUserLocation()
			this.getLiveStatus(options.id)
			this.getRandomTimeVerifyFace()
			
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
			// let coursesss = uni.getStorageSync('courseInfoData')

			// uni.$on('asifhbwsrei', (res) => {
			// 	if (res.verify) {
			// 		uni.setStorageSync('TrainingId', coursesss.trainId)
			// 		uni.showModal({
			// 			title: '提示',
			// 			content: '签出成功，是否进行考试？',
			// 			confirmText: '前往考试',
			// 			cancelText: '暂不',
			// 			success: res => {
			// 				if (res.confirm) {
			// 					uni.navigateTo({
			// 						url: '../../exam/examInfo?id=' + coursesss.trainId
			// 					})
			// 				}
			// 			}
			// 		})
			// 	}
			// })

		},
		onUnload() {
			clearInterval(this.timerId)
			this.timerId = null
		},
		methods: {
			getRandomTimeVerifyFace(){
				let livestatus = this.liveStatus
				let min = 30
				// 不是直播不用人脸检测
				if(livestatus != 2) return
				let random = Math.floor(Math.random() * ((200 - min) + 1) + min)
				console.log('random time;',random)
				this.count = random
				this.timerId = setInterval(()=>{
					if(this.count <= 0){
						clearInterval(this.timerId)
						this.timerId = null
						this.faceVerify()
					}
					this.count--
				},100)
			},
			fn(data) {
				console.log('fffffffffffffffffff', data)
				// uni.navigateTo({
				// 	url: '/pages/verifyFace/verifyFace?refId=' + this.periodId + '&signType=2&faceSignType=1'
				// })
				// this.faceVerify()
			},
			getLiveStatus(id,isBack){
				let _id = id?id:this.courseId
				apis.courseInfo({
					courseId: _id
				}).then(res => {
					this.liveInfo = res
					this.liveStatus = res.liveStatus
					if(isBack){
						if(res.liveStatus != 2){
							this.faceVerify()
						}else {
							uni.showToast({
								title:'直播还未结束，请勿退出',
								icon:'none',
								duration:1500
							})
						}
					}
					// this.courseInfo = res
				});
			},
			complete() {
				// uni.navigateTo({
				// 	url:'../course/live/live'
				// })
				let coursesss = uni.getStorageSync('courseInfoData')
				uni.setStorageSync('TrainingId', coursesss.trainId)
				uni.showModal({
					title: '提示',
					content: '签出成功，是否进行考试？',
					confirmText: '前往考试',
					cancelText: '暂不',
					success: res => {
						if (res.confirm) {
							uni.redirectTo({
								url:'../exam/examInfo?id=' + coursesss.trainId
							})
						}
					}
				})

			},
			// 自己的人脸验证
			faceVerify() {
				// 人脸采集
				useFacePlugin({}).then(res => {
					// 人脸验证
					uni.showLoading({
						title: '验证中...',
						mask:true
					})
					faceVerification(res).then(_res => {
						console.log('看直播时的中途人脸验证：', _res)
						uni.hideLoading()
						if (_res.data.code == 200) {
							uni.showToast({
								title: '验证成功',
								icon: 'none'
							})
							this.faceSign(res)
						} else {
							this.tryAgain()
						}
					}, err => {
						uni.hideLoading()
						this.tryAgain()
					})
				}, err => {
					this.tryAgain()
				})
			},

			faceSign(base64) {
				let courseInfo = uni.getStorageSync('courseInfoData')
				let comid = uni.getStorageSync('userCompanyInfo').compId
				base64ToPath(base64).then((path) => {
					uploadImage('course/api/upload/pic', 'picFile', path, {}).then((_resp) => {
						let face_img = JSON.parse(_resp.data)
						let params = {
							courseType: 1,
							numEvent: courseInfo.trainId,
							refName: courseInfo.courseName,
							signonApp: 0,
							statusId: 1,
							compId: comid,
							userNo: userno,
							refId: this.refId,
							longitude: this.longit,
							latitude: this.lat,
							place: this.signAddress,
							userImage: img,
							faceContrasResult: 'Success',
						}
						console.log('参数诶：',params)
						// if (this.type == 2) {
						httpRequest({
							url:'course/api/middleFaceLog/save',
							method:'POST',
							data:params,
							success:res=>{
								console.log('直播中途人脸识别保存成功：',res)
								if(res.data.code == 200){
									console.log('保存成功')
								
								}else {
									uni.showToast({
										title:'保存人脸信息失败',
										icon:'none'
									})
								}
							},
							fail:err=>{
								console.log('保存失败')
							}
						},2)
					}, error => {
						console.log('上传人脸图片失败：', error)
						this.tryAgain()
					})
				}).catch(error => {
					console.error('转换失败', error)
					this.tryAgain()
				})
			},
			tryAgain(){
				uni.showModal({
					title:'提示',
					content:'人脸验证识别，是否重试？',
					confirmText:'重试',
					cancelText:'取消',
					success:res=>{
						if(res.confirm){
							this.faceVerify()
						}
					}
				})
			},
			getUserLocation() {
				uni.getLocation({
					geocode: true,
					success: res => {
						this.longit = res.longitude
						this.lat = res.latitude
						this.place = res.address.province + res.address.city + res.address.district + res.address.street + res.address.streetNum + res.address.poiName
					}
				})
			},
		}
	};
</script>
<style scoped>
	/* pages/webview/webview.wxss */
</style>
