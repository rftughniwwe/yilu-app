<!-- 密码登录 -->
<template>
	<view>
		<!-- <firstJoinPage v-if='!isFirst' /> -->
		<view class="main">
			<userAgreementModal @IArgee="userArgee" v-if='userArgeeModal' />
			<view class="login-title">
				欢迎登录宜陆
			</view>
			<view class="input">
				<input v-model="phone" hold-keyboard class="phone-num-input" type="number" maxlength="11" placeholder="请输入您的手机号"
				 placeholder-style="color:#CCCCCC" />
				<input v-model="password" hold-keyboard hold-keyboard='true' class="psd-input" password placeholder="请输入密码"
				 placeholder-style="color:#CCCCCC" />
			</view>
			<userAgreement></userAgreement>
			<view class="code-btn-box">
				<button class="login-code-btn none-border" @click="login">登录</button>
			</view>
			<view class="resetPwd">
				<text @click="goResetPwd">找回密码</text>
			</view>
			<loginMode mode='4' class='login-mode-bottom'></loginMode>
		</view>

	</view>
</template>

<script>
	import loginMode from '@/components/loginMode/loginMode.vue'
	import userAgreement from '@/components/userAgreement/userAgreement.vue'
	import firstJoinPage from '@/components/firstJoinPage/firstJoinPage.vue'
	import userAgreementModal from '@/components/userAgreementModal/userAgreementModal.vue'
	import {
		REG_PHONE,
		setAppStorage
	} from '../../utils/util.js'
	import Toast from '../../commons/showToast.js'
	import {
		httpRequest,
		getQualification
	} from '../../utils/httpRequest.js'
	import auth from "@/utils/auth";
	import {
		getIdCardInfo
	} from '@/commons/api/apis.js'

	export default {
		data() {
			return {
				phone: '',
				password: '',
				isFirst: null,
				userArgeeModal: null
			}
		},
		components: {
			loginMode,
			userAgreement,
			userAgreementModal,
			firstJoinPage
		},
		onLoad() {
			this.isFirst = uni.getStorageSync('firstIn')
			this.userArgeeModal = uni.getStorageSync('userAgreementModal')


		},
		onUnload() {
			this.phone = ''
			this.password = ''
		},
		methods: {
			login() {
				let that = this
				if (REG_PHONE.test(this.phone) && this.password.length >= 6) {
					let platform = 2
					uni.getSystemInfo({
						success: function(obj) {
							platform = obj.platform == 'ios' ? '3' : '2'
						}
					})
					uni.showLoading({
						title: '登录中...'
					})
					httpRequest({
						url: 'user/api/user/login/password',
						method: 'POST',
						data: {
							clientType: platform,
							mobile: this.phone,
							password: this.password
						},
						success: function(res) {
							uni.hideLoading()
							console.log('密码登录成功：', res)
							if (res.data.code == 200) {
								uni.setStorageSync('userCompleteInfo', 1)
								setAppStorage({
									userNo: res.data.data.userNo,
									userToken: res.data.data.token
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
								uni.reLaunch({
									url: '../tabBar/index'
								})
								// let userInfoComplete = uni.getStorageSync('userCompleteInfo');

								// if(userInfoComplete == 1){
								// 	uni.reLaunch({
								// 		url: '../tabBar/index'
								// 	})
								// }else if(userInfoComplete == 2){
								// 	uni.reLaunch({
								// 		url:`./faceLogin?userPhone=${that.phone}`
								// 	})
								// }else {
								// getIdCardInfo(res.data.data.userNo).then(respones => {
								// 	if (respones.data.code == 200) {
								// 		let _data = respones.data.data
								// 		if (_data && _data.name && _data.idcardNum) {
								// 			uni.setStorageSync('userCompleteInfo', 1)
								// 			uni.reLaunch({
								// 				url: '../tabBar/index'
								// 			})
								// 		} else {
								// 			uni.setStorageSync('userCompleteInfo', 2)
								// 			uni.reLaunch({
								// 				url: `./faceLogin?userPhone=${that.phoneNum}`
								// 			})
								// 		}

								// 	} else {
								// 		console.log('查询信息是否完善失败：', respones)
								// 		uni.showToast({
								// 			title: '查询信息是否完善失败',
								// 			icon: 'none'
								// 		})
								// 	}
								// }, err => {
								// 	console.log('查询信息是否完善失败：', err)
								// })
								// }
							} else {
								console.log('登录错误：', res)
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
							}

						},
						fail: function(err) {
							uni.hideLoading()
							console.log('密码登录失败：', err)
							uni.showToast({
								title: '登录失败'
							})
						}
					}, 1,true)
					// uni.navigateTo({	
					// 	url: '../fillInfomation/fillInfomation'
					// })

				} else {
					uni.showToast({
						title: '手机号或密码错误',
						icon: 'none'
					})
				}
			},
			goResetPwd() {
				uni.navigateTo({
					url: '../resetPassword/resetPassword'
				})
			},
			userArgee() {
				this.userArgeeModal = false
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding: 30rpx;
	}

	.input {
		margin-bottom: 30rpx;

		input {
			padding: 26rpx 8rpx;
			border-bottom: 1px solid #DDDDDD;
			font-size: 32rpx;
		}
	}

	.resetPwd {
		margin: 20rpx 0;
		text-align: right;

		text {
			color: #333;
			font-size: 26rpx;
		}
	}

	.login-code-btn {
		padding: 10rpx 0;
		background: $uni-color-primary;
		border-radius: $uni-border-radius-half-circle;
		color: #FFFFFF;
		margin: 30rpx 0 24rpx;
		width: 100%;
		font-size: $uni-font-size-lg;
	}
</style>
