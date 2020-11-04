<!-- 密码登录 -->
<template>
	<view>
		<firstJoinPage v-if='!isFirst'/>
		<view v-else class="main">
			<userAgreementModal @IArgee="userArgee" v-if='userArgeeModal'/>
			<view class="login-title">
				欢迎登录宜陆
			</view>
			<view class="input">
				<input v-model="phone" class="phone-num-input" type="number" maxlength="11" placeholder="请输入您的手机号" placeholder-style="color:#CCCCCC" />
				<input v-model="password" class="psd-input" type="text" password placeholder="请输入密码" placeholder-style="color:#CCCCCC" />
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
		REG_PHONE
	} from '../../utils/util.js'
	
	export default {
		data() {
			return {
				phone: '',
				password: '',
				isFirst:null,
				userArgeeModal:null
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
			
			// 要判断是否登录过，并且资料是否填写完毕
			// 登录过没填写资料跳资料页，
		},
		methods: {
			login() {
				if (REG_PHONE.test(this.phone) && this.password.length >= 6) {
					uni.navigateTo({
						url: '../fillInfomation/fillInfomation'
					})
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
			userArgee(){
				this.userArgeeModal = false
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding: 0 $uni-spacing-row-big;
	}

	.input {
		margin-bottom: 30rpx;

		input {
			padding: 28rpx 8rpx;
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
