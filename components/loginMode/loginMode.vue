<template>
	<view class="bottom-content">
		<view v-if="mode !=1" class="item" @click="faceLogin">
			<image src="../../static/facelogin.png" mode=""></image>
			<view class="zxc">
				刷脸登录
			</view>
		</view>
		<view v-if="mode !=2" class="item" @click="codeLogin">
			<image src="../../static/codelogin.png" mode=""></image>
			<view class="zxc">
				短信登录
			</view>
		</view>
		<!-- <view v-if="mode !=3"class="item" @click="fastLogin">
			<image src="../../static/fastlogin.png" mode=""></image>
			<view>
				一键登录
			</view>
		</view> -->
		<view v-if="mode !=4" class="item" @click="psdLogin">
			<image src="../../static/passwordlogin.png" mode=""></image>
			<view class="zxc">
				密码登录
			</view>
		</view>
	</view>
</template>

<script>
	import useFacePlugin from '../../commons/faceplugin.js'
	import {
		httpRequest,
		getQualification
	} from '../../utils/httpRequest.js'
	import {
		setAppStorage
	} from '../../utils/util.js'
	import {
		faceVerification
	} from '@/commons/api/apis.js'
	
	export default {
		data() {
			return {

			};
		},
		props: ['mode'],
		methods: {
			// 密码登录
			psdLogin() {
				uni.redirectTo({
					url:'../../pages/login/normalLogin'
				})
			},
			// 一键登录
			fastLogin() {

			},
			
			// 刷脸登录
			faceLogin() {
				useFacePlugin({count:0,random:true}).then((res)=>{
					// 在此对比人脸
					// 是否上传完善了信息
					uni.showLoading({
						title:'登录中....',
						mask:true
					})
				
					faceVerification(res).then((resp)=>{
						uni.hideLoading()
						if(resp.data.code == 200){
							setAppStorage({
								userNo:resp.data.data.userNo,
								userToken:resp.data.data.token
							})
							this.routePage(resp.data.data.userNo)
						}else {
							uni.showModal({
								title:"识别失败",
								content:resp.data.msg+'。请重试',
								cancelText:"取消",
								confirmText:"再次重试",
								success:(res)=>{
									if(res.confirm){
										this.faceLogin()
									}
								}
							})
						}
					},err=>{
						uni.hideLoading()
						console.log('人脸登录失败',err)
						uni.showToast({
							title:'人脸登录失败',
							icon:'none'
						})
					})
					
				},(err)=>{
					console.error('识别失败',err)
				})
			},
			
			// 跳转页面
			routePage(num){
				let that = this
				let userInfoComplete = uni.getStorageSync('userCompleteInfo');
				console.log('userinfo',userInfoComplete)
				if(userInfoComplete == 1){
					// 1：已经完善，跳主页
					uni.reLaunch({
						url: '../tabBar/index'
					})
				}else if(userInfoComplete == 2){
					// 2：未完善，需要完善，直接跳信息完善页面
					uni.navigateTo({
						url:'../../pages/fillInfomation/fillInfomation'
					})
				}else {
					// 查不到缓存就请求
					getQualification({
						userid: num
					}).then(respones => {
						console.log('查询完善信息：', respones)
						if (respones.data.code == 200) {
							if(respones.data.data && respones.data.data.qualificationId && respones.data.data.drivingFront && respones.data.data.qualificationSubjecton){
								// 1：已经完善，跳主页
								// 设置缓存，下次进来就不用请求了
								uni.setStorageSync('userCompleteInfo', 1)
								uni.reLaunch({
									url: '../tabBar/index'
								})
							}else {
								// 2：未完善，需要完善，直接跳信息完善页面
								uni.setStorageSync('userCompleteInfo', 2)
								uni.navigateTo({
									url:'../../pages/fillInfomation/fillInfomation'
								})
							}
							
						} else {
							console.log('查询信息是否完善失败：', respones)
							uni.showToast({
								title: '查询信息是否完善失败',
								icon: 'none'
							})
						}
					}, err => {
						console.log('查询信息是否完善失败：', err)
					})
				}
			},
			
			// 短信登录
			codeLogin() {
				uni.redirectTo({
					url:'../../pages/login/codeLogin'
				})
			}
		}
	}
</script>

<style lang="scss">
	.bottom-content {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 40rpx 0;

		.item {
			image {
				width: 101rpx;
				height: 101rpx;
			}

			view {
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
	.zxc{
		text-align: center;
	}
</style>
