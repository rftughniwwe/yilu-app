<!-- 修改手机号 -->
<template>
	<view>
		<view class="top-content">
			<view class="current-phone">
				当前登录手机号：15777777777
			</view>
			<view class="tips">
				手机号更换成功后，下次登录请使用新手机号
			</view>
		</view>
		<view class="input-content">
			<view class="item">
				<input type="text" value="" v-model="phone" placeholder="输入新手机号" placeholder-class="place" maxlength="11" />
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
	export default {
		data() {
			return {
				phone: '',
				code: '',
				count:60,
				timer:null
			};
		},
		components: {
			primaryBtn
		},
		methods: {
			// 确认修改
			confirmEdit() {
				if(!this.code){
					uni.showToast({
						title:'请填写验证码',
						icon:'none'
					})
					return
				}
				
			},
			// 发送验证码
			sendCode() {
				if(!REG_PHONE.test(this.phone)){
					uni.showToast({
						title:'手机号格式不正确',
						icon:'none'
					})
					return
				}
				if(this.count<60){
					return
				}
				this.timer = setInterval(()=>{
					this.count-= 1
					if(this.count===0){
						this.count = 60
						clearInterval(this.timer)
					}
				},1000)
				
			}
		}
	}
</script>

<style lang="scss">
	page{
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
