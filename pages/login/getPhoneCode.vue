<template>
<!-- 获取验证码 -->
	<view class="main">
		<navigateBack></navigateBack>
		<view class="code-main">
			<view class="getcode">输入验证码</view>
			<view class="subtitle">验证码已发送 15888888888</view>
			<view class="code-content flex-around">
				<jpCoded style="height: 80rpx;margin: 30rpx 0;" borderCheckStyle="border-bottom: #3CA7FF solid 0.1upx;" pawType="two"
				 :width="590" :codes="codes" @inputVal="inputVal"></jpCoded>
			</view>
			<view class="interval-code " @click="reGetCode" :style="flag?'opacity:.3':'opacity:1'">
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
				codes: ''
			};
		},
		onLoad() {
			this.reGetCode()
		},

		onUnload() {
			clearInterval(this.timer)
		},
		methods: {
			inputVal(e) {

				if (e.length === 6) {
					console.log('输入完成')
				}
			},
			

			reGetCode() {
				if (this.count === 60) {
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
				}
			},
		}
	}
</script>

<style lang="scss">
	.main {
		padding: $uni-spacing-col-base $uni-spacing-row-sm;
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
