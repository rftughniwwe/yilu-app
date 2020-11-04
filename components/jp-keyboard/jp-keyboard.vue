<template>
	<view class="wallet_class" :class="type?'wallet_class_kq':'wallet_class_gb'" v-if="topayPwds">
		<view style="width: 750rpx;height: 100vh;" @tap="toCancel" v-if="keep"></view>
		<view class="wallet_content" :class="type?'wallet_kq':'wallet_gb'" :style="'background-image: url('+keyImg+ ');height:' + height">
			<!-- 头部 -->
			<view class="capsule">
				<view class="jp_hea" :style="keyImg?'':'background-color: #f5f5f5'">
					<view :class="keyType=='one'?'jq_key':'jq_key2'">
						<view @touchend="inputPwd(list[1])" class="keyboard" :style="keyImg?'':'background-color: #fff'" :data-char="list[1]"
						 hover-class="click_hover">{{list[1]}}</view>
						<view @touchend="inputPwd(list[2])" class="keyboard" :style="keyImg?'':'background-color: #fff'" :data-char="list[2]"
						 hover-class="click_hover">{{list[2]}}</view>
						<view @touchend="inputPwd(list[3])" class="keyboard" :style="keyImg?'':'background-color: #fff'" :data-char="list[3]"
						 hover-class="click_hover">{{list[3]}}</view>
					</view>
					<view :class="keyType=='one'?'jq_key':'jq_key2'">
						<view @touchend="inputPwd(list[4])" class="keyboard" :style="keyImg?'':'background-color: #fff'" :data-char="list[4]"
						 hover-class="click_hover">{{list[4]}}</view>
						<view @touchend="inputPwd(list[5])" class="keyboard" :style="keyImg?'':'background-color: #fff'" :data-char="list[5]"
						 hover-class="click_hover">{{list[5]}}</view>
						<view @touchend="inputPwd(list[6])" class="keyboard" :style="keyImg?'':'background-color: #fff'" :data-char="list[6]"
						 hover-class="click_hover">{{list[6]}}</view>
					</view>
					<view :class="keyType=='one'?'jq_key':'jq_key2'">
						<view @touchend="inputPwd(list[7])" class="keyboard" :style="keyImg?'':'background-color: #fff'" :data-char="list[7]"
						 hover-class="click_hover">{{list[7]}}</view>
						<view @touchend="inputPwd(list[8])" class="keyboard" :style="keyImg?'':'background-color: #fff'" :data-char="list[8]"
						 hover-class="click_hover">{{list[8]}}</view>
						<view @touchend="inputPwd(list[9])" class="keyboard" :style="keyImg?'':'background-color: #fff'" :data-char="list[9]"
						 hover-class="click_hover">{{list[9]}}</view>
					</view>
					<view :class="keyType=='one'?'jq_key':'jq_key2'">
						<view class="keyboard" style="font-size: 32rpx;font-weight: 500;" @tap="toCancel" :style="keyImg?'':'background-color: #fff'">关闭</view>
						<view @touchend="inputPwd(list[0])" class="keyboard" :style="keyImg?'':'background-color: #fff'" :data-char="list[0]"
						 hover-class="click_hover">{{list[0]}}</view>
						<view @touchend="backspace()" class="keyboard" :style="keyImg?'':'background-color: #fff'" data-char="×"
						 hover-class="click_hover">×</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'wallet_category',
		props: {
			keyType: { //键盘样式one
				type: String,
				default: 'one'
			},
			keep: { //点击遮挡是否关闭
				type: Boolean,
				default: true
			},
			keyImg: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: '35vh'
			},
			random: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				topayPwds: false,
				type: true,
				list:[0,1,2,3,4,5,6,7,8,9]
			}
		},
		mounted() {
			if(this.random){
				this.list.sort(function() {
				    return (0.5-Math.random());
				});
			}
		},
		watch: {},
		methods: {
			toOpen() {
				if(this.random){
					this.list.sort(function() {
					    return (0.5-Math.random());
					});
				}
				this.type = true
				this.topayPwds = true;
			},
			toCancel() {
				let taht = this
				this.type = false
				setTimeout(function clock() {
					taht.topayPwds = false;
					taht.$emit('toCancel');
				}, 200)
			},
			inputPwd(e) {
				this.$emit('inputPwd', e); /* 小键盘输入 */
			},
			backspace() {
				this.$emit('backspace');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@keyframes downIn {
		from {
			transform: translateY(100%);
			opacity: 1;
		}

		to {
			transform: translateY(0vh);
			opacity: 1;
		}
	}

	@keyframes downInClose {
		from {
			transform: translateY(0vh);
			opacity: 1;
		}

		to {
			transform: translateY(100%);
			opacity: 1;
		}
	}

	.wallet_class {
		position: fixed;
		z-index: 9;
		height: 100vh;
		width: 750rpx;
		top: 0;
		left: 0;

		.wallet_kq {
			animation: downIn 0.3s;
			-webkit-animation: downIn 0.3s;
		}

		.wallet_gb {
			animation: downInClose 0.3s;
			-webkit-animation: downInClose 0.3s;
		}

		.wallet_content {
			background-size: 100% 100%;
			background-position: top left;
			background-repeat: no-repeat;
			position: fixed;
			bottom: 0rpx;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			width: 750rpx;
			background-color: #fff;

			.capsule {
				height: 100%;
				position: relative;

				.jp_hea {
					position: absolute;
					height: 100%;

					.jq_key {
						display: flex;
						justify-content: flex-start;
						height: 25%;

						.keyboard {
							box-sizing: border-box;
							width: 250upx;
							height: 100%;
							line-height: 100%;
							background-color: rgba(255, 255, 255, .3);
							border-top: #f7f4f4 solid 0.1upx;
							border-left: #f7f4f4 solid 0.1upx;
							font-size: 40upx;
							font-weight: 600;
							display: flex;
							justify-content: center;
							align-items: Center;
						}

						.click_hover {
							animation: showPopup 0.1s linear both;
						}
					}

					.jq_key2 {
						display: flex;
						justify-content: flex-start;
						height: 23%;
						padding-top: 1%;
						width: 750rpx;

						.keyboard {
							box-sizing: border-box;
							width: 240upx;
							margin: 0 7rpx;
							border-radius: 20rpx;
							height: 100%;
							line-height: 100%;
							background-color: rgba(255, 255, 255, .3);
							font-size: 40upx;
							font-weight: 600;
							display: flex;
							justify-content: center;
							align-items: Center;
						}

						.click_hover {
							animation: showPopup 0.1s linear both;
						}
					}
				}

				@keyframes showPopup {
					0% {
						opacity: 0;
						background-color: #d8d8d8;
					}

					100% {
						opacity: 1;
					}
				}
			}
		}
	}
</style>
