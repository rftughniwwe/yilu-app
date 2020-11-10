<!-- 验证码登录 -->
<template>
	<view class="main">
		<view class="login-title">
			欢迎登录宜陆
		</view>
		<view class="input">
			<input type="number" placeholder="请输入手机号" v-model="phone" maxlength="11" placeholder-style="color:#cccccc"/>
			<text class="tip">未注册手机验证后自动注册</text>
			<!-- <inputClear @clearValue='clearPhone'></inputClear> -->
		</view>
		<view class="code-btn-box">
			<button class="login-code-btn none-border" @click="goCode">获取短信验证码</button>
		</view>
		<userAgreement></userAgreement>
		<loginMode mode='2' class='login-mode-bottom'></loginMode>
	</view>
</template>

<script>
	import loginMode from '@/components/loginMode/loginMode.vue';
	import userAgreement from '@/components/userAgreement/userAgreement.vue';
	import { REG_PHONE } from '../../utils/util.js'
	export default {
		data() {
			return {
				phone:''
			};
		},
		components: {
			loginMode,
			userAgreement
		},
		methods: {
			goCode() {
				
				if(REG_PHONE.test(this.phone)){
					uni.navigateTo({
						url: `./getPhoneCode?phone=${this.phone}`
					})
				}else {
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
				}
				
			},
			
			clearPhone(){
				console.log('????')
				this.phone = ''
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding:30rpx;
	}

	.input {
		margin-top: 60rpx;
		position: relative;
		input {
			padding: 20rpx 8rpx;
			border-bottom: 1px solid #DDDDDD;
			font-size: 32rpx;
		}

		.tip {
			font-size: 26rpx;
			color: $uni-text-color;
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
