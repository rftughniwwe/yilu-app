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
		uploadImage
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
				pagePath: '',
				courseId: '',
				longit: '',
				lat: '',
				place: '',
				liveInfo:{}
			};
		},

		components: {},
		props: {},
		onBackPress() {
			this.getLiveStatus(this.courseId,true)
			return true
		},
		onLoad: function(options) {
			console.log('1111111111111111111111')
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
			this.getUserLocation()
			this.getLiveStatus(options.id)
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
		methods: {
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
						title: '验证中...'
					})
					faceVerification(res).then(_res => {
						console.log('看直播时的人脸验证：', _res)
						uni.hideLoading()
						if (_res.data.code == 200) {
							uni.showToast({
								title: '验证成功',
								icon: 'none'
							})
							this.faceSign(res)
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

			faceSign(base64) {
				let obj = uni.getStorageSync('courseInfoData')
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
							signonType: 1,
							refId: this.courseId,
							longitude: this.longit,
							latitude: this.lat,
							place: this.place,
							userImage: face_img.data,
							faceContrasResult: 'Success',
						}
						console.log('参数诶：',params)
						// if (this.type == 2) {
						auth.faceSignLog(params).then((res) => {
							this.complete()
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
