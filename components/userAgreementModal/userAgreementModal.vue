<!-- 用户协议弹框 -->
<template>
	<view class="mains flex-around">
		

		<view class="modal-content">
			<view class="title">
				用户协议及隐私保护
			</view>
			<view class="word-contents">
				<view>
					感谢您使用宜陆APP!
				</view>
				我们非常重视您的个人信息和隐私保
				护，为了更好地保障您的个人权益，在
				您使用我们的产品前，请务必认真阅读
				<text class="hightcolor" @click="userAgree">《用户协议》</text>与<text class="hightcolor" @click="userAgree">《隐私政策》</text>内的所有条款。您点击“同意并使用”的行为即表示您已阅读完毕并同意以上协议的全部内容。如您对以上协议的任何疑问、意见或建议、可以拨打021-58992985电话与我们联系

			</view>
			<view class="feedback-content flex-between">
				<view class="fuck-you-btn" @click="FuckYou">
					暂不使用
				</view>
				<view class="i-agree-btn" @click="Iargee">
					同意并使用
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			userAgree() {
				uni.navigateTo({
					url: '../userAgreement/userAgreement'
				})
			},
			FuckYou(){
				// 要判断是Android还是iOS平台
				// Android退出应用
				plus.runtime.quit();  
				// iOS退出应用
				// const threadClass = plus.ios.importClass("NSThread");
				
				// const mainThread = plus.ios.invoke(threadClass, "mainThread");
				
				// plus.ios.invoke(mainThread, "exit")
				// or
				// plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
			},
			Iargee(){
				uni.setStorageSync('userAgreementModal', false)
				this.$emit('IArgee')
			}
			
		}
	}
</script>

<style lang="scss">
	.mains {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
		background-color: rgba(0,0,0,.5);

		.modal-content {
			width: 80%;
			background: #FFFFFF;
			opacity: 1;
			padding: 40rpx 30rpx;
			border-radius: 20rpx;
			letter-spacing: 2rpx;

			.title {
				color: #333333;
				font-size: 40rpx;
				font-weight: bold;
				text-align: center;
				margin: 20rpx 0;
			}

			.word-contents {
				color: #666;
				font-size: 32rpx;
				line-height: 1.8;
			}
		}

		.feedback-content {
			margin-top: 60rpx;

			.fuck-you-btn,
			.i-agree-btn {
				padding: 20rpx 56rpx;
				border-radius: $uni-border-radius-half-circle;
				font-size: 32rpx;
				
			}

			.fuck-you-btn {
				border: 1rpx solid #cfcfcf;
				color: #cfcfcf;
			}

			.i-agree-btn {
				color: #FFFFFF;
				background: #3CA7FF;
				border: none;
			}
		}
	}

	.hightcolor {
		color: $uni-color-primary;
	}
</style>
