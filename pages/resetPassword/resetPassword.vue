<!-- 重置密码 -->
<template>
	<view class="main">
		<navigateBack></navigateBack>
		<view class="content">
			<view class="login-title">
				找回密码
			</view>
			<view class="form-content">
				<input v-model="phone" class="phone-num-input" type="number" maxlength="11" placeholder="请输入手机号" placeholder-style="color:#CCCCCC" />
				<input type="number" maxlength="6" v-model="vrcode" placeholder="请输入验证码" placeholder-style="color:#CCCCCC" />
				<input type="number" password maxlength="12" v-model="password" placeholder="请输入新密码" placeholder-style="color:#CCCCCC" />
				<view @click="getVrcode" class="get-code-box" :style="flag?'opacity:.3':'opacity:1'">
					{{flag?count+'秒后重新获取':'获取验证码'}}
				</view>
			</view>
			<button class="login-code-btn none-border" @click="setPwd">设置密码</button>
		</view>

	</view>
</template>

<script>
	import navigateBack from '@/components/customBack/customBack.vue';
	import {
		REG_PHONE
	} from '../../utils/util.js';
	
	export default {
		data() {
			return {
				vrcode: '',
				phone: '',
				password: '',
				timer: null,
				count: 60,
				flag: false
			};
		},
		components: {
			navigateBack
		},
		methods: {
			// 发送验证码
			getVrcode() {
				if (this.count != 60) return
				if(!REG_PHONE.test(this.phone)){
					uni.showToast({
						title:'手机号格式不正确',
						icon:'none'
					})
					return
				}
				uni.showToast({
					title: '验证码已发送',
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
			},
			// 修改密码
			setPwd() {
				// 请求前的简单判断
				if(!REG_PHONE.test(this.phone)){
					uni.showToast({
						title:'手机号格式不正确',
						icon:'none'
					})
					return
				}else if(this.vrcode.length < 6){
					uni.showToast({
						title:'验证码不正确',
						icon:'none'
					})
					return
				}else if(this.password.length < 6){
					uni.showToast({
						title:'密码最少6位数',
						icon:'none'
					})
					return
				}
				
				// 正式请求
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding: $uni-spacing-col-base $uni-spacing-row-sm;
	}

	.content {
		padding: 0 $uni-spacing-row-big;
	}

	.form-content {
		position: relative;
		margin-bottom: 30rpx;

		input {
			padding: 22rpx 8rpx;
			border-bottom: 1px solid #DDDDDD;
			font-size: 32rpx;
		}

		.get-code-box {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 30rpx;
			background: $uni-color-primary;
			color: #FFFFFF;
			font-size: 28rpx;
			padding: 10rpx;
			border-radius: $uni-border-radius-base;
		}
	}

	.login-code-btn {
		padding: 10rpx 0;
		background: $uni-color-primary;
		border-radius: $uni-border-radius-half-circle;
		color: #FFFFFF;
		margin: 50rpx 0 24rpx;
		width: 100%;
		font-size: $uni-font-size-lg;
	}
</style>
