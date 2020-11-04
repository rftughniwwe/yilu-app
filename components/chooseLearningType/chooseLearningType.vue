<!-- 学习页面中的选择学习类型 -->
<template>
	<view class="main">
		<view class="top-content">
			<view class="subtitle">
				请选择
			</view>
			<view class="title">
				您的学习类型
			</view>
			<view class="delimiter">
				<image src="../../static/delimter.png" mode=""></image>
			</view>
			<view class="tips">
				点击选择类型
			</view>
		</view>
		<view class="main-content">
			<view :class="num===0?'selected-item':''" class="item" @click="selectItem(0)">
				安全教育
			</view>
			<view :class="num===1?'selected-item':''" class="item" @click="selectItem(1)">
				继续教育
			</view>
			<view :class="num===2?'selected-item':''" class="item" @click="selectItem(2)">
				自主学习
			</view>
			<view class="confirm-btn-content">
				<primaryBtn @callBackFun='confirm' text="确定" />
			
			</view>
		</view>
	</view>
</template>

<script>
	// import primaryBtn from '../primaryBtn/primaryBtn.vue'
	const app = getApp()
	export default {
		data() {
			return {
				num: -1
			};
		},
		components: {

		},
		methods: {
			confirm() {
				
				if (this.num !== -1) {
					uni.setStorageSync('isShowChooseType',true)
					uni.setStorageSync('teachType',this.num)
					
					uni.$emit('chooesedTypezz', {
						num: this.num
					})
				}

			},
			selectItem(num) {
				this.num = num
				
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f6f7;
	}

	.top-content {
		// width: 100%;
		height: 540rpx;
		background-image: url(../../static/chooseType-bg.png);
		background-size: 100% 100%;
		padding: 100rpx 40rpx 0;

		.subtitle {
			color: #FFFFFF;
			font-size: 40rpx;
		}

		.title {
			color: #FFFFFF;
			font-size: 50rpx;
			font-weight: bold;
			margin: 20rpx 0;
		}

		.delimiter {
			image {
				width: 48rpx;
				height: 5rpx;
			}
		}

		.tips {
			color: #FFFFFF;
			font-size: 30rpx;
			margin: 30rpx 0;
		}
	}

	.main-content {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: -200rpx 30rpx 0;
		padding: 100rpx 50rpx;
		border: 2rpx solid #eee;

		// .wrap-content{
		// 	padding: ;
		// }
		.item {
			padding: 40rpx 0;
			color: #666;
			font-size: 32rpx;
			text-align: center;
		}
	}

	.selected-item {
		color: #333333;
		font-size: 40rpx;
		font-weight: bold;
		border-top: 2rpx solid #EAEAEA;
		border-bottom: 2rpx solid #EAEAEA;
	}

	.confirm-btn-content {
		margin: 50rpx 0 0;
	}
</style>
