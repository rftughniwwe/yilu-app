<!-- 修改手机号 -->
<template>
	<view>
		<view class="top-content">
			<view class="current-phone">
				当前登录手机号：{{phone}}
			</view>
			<view class="tips">
				手机号更换成功后，下次登录请使用新手机号
			</view>
		</view>
		<view class="input-content">
			<view class="item">
				<input type="text" value="" v-model="phone" placeholder="输入旧手机号" placeholder-class="place" maxlength="11" />
			</view>
			<view class="item flex-between">
				<view class="code">
					<input type="text" value="" placeholder-class="place" v-model="code" placeholder="验证码" />
				</view>
				<view class="send-content" @click="sendCode" :style="{'opacity':count < 60?'.6':'1'}">
					<view class="send-btn">
						{{count<60?count+'s后发送':'发送验证码'}}
					</view>
				</view>
			</view>
			<view class="item">
				<input type="text" value="" v-model="newPhone" placeholder="输入新手机号" placeholder-class="place" maxlength="11" />
			</view>
		</view>
		<view class="confirm-btn">
			<primaryBtn text='确认' @callBackFun='confirmEdit' />
		</view>
	</view>
</template>

<script>
	import primaryBtn from '@/components/primaryBtn/primaryBtn.vue'
	import {
		REG_PHONE
	} from '@/utils/util.js'
	import sendSMSCode from '@/commons/api/sendSMSCode.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	export default {
		data() {
			return {
				phone: '',
				code: '',
				count: 60,
				timer: null,
				newPhone:''
			};
		},
		components: {
			primaryBtn
		},
		onLoad() {
			this.phone = uni.getStorageSync('userBasicInfo').mobile
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
		},
		methods: {
			// 确认修改
			confirmEdit() {
				if (!this.code) {
					uni.showToast({
						title: '请填写验证码',
						icon: 'none'
					})
					return
				}
				if (!REG_PHONE.test(this.newPhone)) {
					uni.showToast({
						title: '新手机号格式不正确',
						icon: 'none'
					})
					return
				}
				let code = this.code
				let new_phone = this.newPhone
				
				uni.showLoading({
					title: '修改中...'
				})
				httpRequest({
					url: '/user/auth/user/ext/update',
					method: 'post',
					data: {
						code: code,
						userNo: getUserLoginInfo('userNo'),
						newMobile:new_phone
					},
					success: res => {
						uni.hideLoading()
						console.log('修改手机号', res)
						if (res.data.code == 200) {
							uni.setStorageSync('userBasicInfo', res.data.data)
							uni.showToast({
								title: '修改成功',
								duration:1000
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}
					},
					fail: err => {
						uni.hideLoading()
						console.log('错误', err)
					}
				}, 1)
			},
			// 发送验证码
			sendCode() {
				if (!REG_PHONE.test(this.phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					})
					return
				}
				if (this.count < 60) {
					return
				}
				
				
				
				uni.showLoading({
					title:'发送中...'
				})
				
				sendSMSCode(this.phone).then((res)=>{
					uni.hideLoading()
					if(res.data.code == 200){
						uni.showToast({
							title: '验证码已发送',
							icon:'success'
						})
						this.timer = setInterval(() => {
							this.count -= 1
							if (this.count === 0) {
								this.count = 60
								clearInterval(this.timer)
							}
						}, 1000)
					}else {
						console.log('短信发送错误',res)
						uni.showToast({
							title:'短信发送错误'
						})
					}
				},(err)=>{
					console.log('短信发送失败',err)
					uni.hideLoading()
					uni.showToast({
						title:'短信发送失败'
					})
				})

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}

	.top-content {
		padding: 30rpx;
		background-color: #F8F8F8;

		.current-phone,
		.tips {
			text-align: center;
			color: #666;
			font-size: 24rpx;

		}
	}

	.input-content {
		padding: 30rpx;
		background-color: #FFFFFF;
	}

	.place {
		color: #999999;
		font-size: 32rpx;
	}

	.item {
		padding: 20rpx 0;
		border-bottom: 2rpx solid #EFEFEF;
	}

	.confirm-btn {
		margin-top: 100rpx;
		padding: 0 30rpx;
	}

	.send-btn {
		border-radius: $uni-border-radius-half-circle;
		background: #3CA7FF;
		font-size: 26rpx;
		color: #FFFFFF;
		padding: 10rpx 18rpx;
	}
</style>
