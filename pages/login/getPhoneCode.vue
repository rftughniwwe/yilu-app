<template>
	<!-- 获取验证码 -->
	<view class="main">
		<navigateBack></navigateBack>
		<view class="code-main">
			<view class="getcode">输入验证码</view>
			<view class="subtitle">验证码已发送 {{phoneNum}}</view>
			<view class="code-content flex-around">
				<jpCoded style="height: 80rpx;margin: 30rpx 0;" borderCheckStyle="border-bottom: #3CA7FF solid 0.1upx;" pawType="two"
				 :width="590" :codes="codes" @inputVal="inputVal"></jpCoded>
			</view>
			<view class="interval-code " @click="GetCode" :style="flag?'opacity:.3':'opacity:1'">
				<text>
					{{flag?count+'秒后重新获取验证码':'重新获取验证码'}}
				</text>
			</view>
		</view>

	</view>
</template>

<script>
	import navigateBack from '@/components/customBack/customBack.vue';
	import jpCoded from '@/components/jp-coded/jp-coded.vue';
	import sendSMSCode from '../../commons/api/sendSMSCode.js'
	import {
		httpRequest,
		getQualification
	} from '../../utils/httpRequest.js'
	import Toast from '../../commons/showToast.js'
	import {
		getRandomDigits,
		setAppStorage
	} from '../../utils/util.js'
	import {
		getIdCardInfo
	} from '@/commons/api/apis.js'
	import auth from "@/utils/auth";


	export default {
		components: {
			navigateBack,
			jpCoded,
		},
		data() {
			return {
				timer: null,
				count: 60,
				flag: true,
				codes: '',
				phoneNum: ''
			};
		},
		onLoad(options) {
			this.phoneNum = options.phone
			this.GetCode(options.phone)
		},

		onUnload() {
			clearInterval(this.timer)
		},
		methods: {

			// 输入验证码
			inputVal(e) {

				if (e.length === 6) {
					
					let initialPwd = getRandomDigits(6)
					console.log('initialPwd:',initialPwd)
					uni.showLoading({
						title:'处理中...'
					})
					httpRequest({
						url: 'user/api/user/registerApp',
						method: 'POST',
						data: {
							code: e,
							mobile: this.phoneNum,
							password: initialPwd,
							repassword: initialPwd,
							clientType:2
						},
						success: (res) => {
							uni.hideLoading()
							console.log("注册/登录回调:", res)
							if (res.data.code == 200) {
								setAppStorage({
									userNo:res.data.data.userNo,
									userToken:res.data.data.token
								})
								uni.setStorage({
									'key': 'userToken',
									'data': res.data.data.token,
									success: () => {
										// auth.getUserInfo((data) => {
										// 	uni.$emit('_userLogin', data)
										// })
									}
								});
								this.codeLogin(res.data.data.userNo)
							}else {
								console.log('注册错误：',res)
								Toast({
									title:res.data.msg,
									duration:2000
								})
							}
						},
						fail: (err) => {
							uni.hideLoading()
							console.error('注册登录失败', err)
							Toast({
								title: '注册登录失败'
							})
						}
					},1,true)
				}
			},
			
			// 验证码登录
			codeLogin(num) {
				let that = this
				// let userInfoComplete = uni.getStorageSync('userCompleteInfo');
				// if(userInfoComplete == 1){
				// 	uni.reLaunch({
				// 		url: '../tabBar/index'
				// 	})
				// }else if(userInfoComplete == 2){
				// 	uni.reLaunch({
				// 		url:`./faceLogin?userPhone=${that.phoneNum}`
				// 	})
				// }else {
					getIdCardInfo(num).then(respones => {
						console.log('查询信息：', respones)
						if (respones.data.code == 200) {
							let _data = respones.data.data
							if(_data && _data.name && _data.idcardNum){
								// 1：已经完善了身份信息，跳主页
								uni.setStorageSync('userCompleteInfo', 1)
								uni.reLaunch({
									url: '../tabBar/index'
								})
							}else {
								// 2：未完善，需要完善，直接跳人脸注册页面
								uni.setStorageSync('userCompleteInfo', 2)
								uni.reLaunch({
									url:`./faceLogin?userPhone=${that.phoneNum}`
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
				// }
			},

			// 获取验证码
			GetCode(phone) {
				if (this.count === 60) {
					this.sendTheCode(phone ? phone : this.phoneNum)
				}
			},
			// 发送验证码
			sendTheCode(phone) {
				uni.showLoading({
					title: '发送中...'
				})
				sendSMSCode(phone).then((res) => {
					
					uni.hideLoading()
					if (res.data.code == 200) {
						Toast({
							title: '发送成功',
							icon: 'success'
						})
						this.flag = true
						this.timer = setInterval(() => {
							this.count--
							if (this.count === 0) {
								this.flag = false
								this.count = 60
								clearInterval(this.timer)
								this.timer = null
							}
						}, 1000)
					} else {
						console.log('发送错误',res)
						Toast({
							title: '发送错误'
						})
					}

				}, (err) => {
					console.error('发送失败', err)
					uni.hideLoading()
					Toast({
						title: '发送失败'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding: 30rpx;
	}



	.code-main {
		// margin-top: 10rpx;
		padding: 0 $uni-spacing-row-big;
	}

	.getcode {
		font-size: $uni-text-size-big;
		color: $uni-text-color;
		font-weight: bold;
		margin: 100rpx 0 10rpx;
	}

	.subtitle {
		color: $uni-subtitle-text-color;
		font-size: 30rpx;
	}

	.interval-code {
		color: $uni-color-primary;
		font-size: $uni-font-size-base;
		margin-top: 30rpx;
		padding: 0 10rpx;
	}
</style>
