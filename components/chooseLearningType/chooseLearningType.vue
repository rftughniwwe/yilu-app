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
			<template v-if="dataArr && dataArr.length > 0">
				<view class="item" v-for="(items,index) in dataArr" :key='index' @click="selectItem(index,items)" :class="num===index?'selected-item':''">
					{{items.categoryName}}
				</view>
				<view class="confirm-btn-content">
					<primaryBtn @callBackFun='confirm' text="确定" />
				</view>
			</template>

		</view>
	</view>
</template>

<script>
	import primaryBtn from '../primaryBtn/primaryBtn.vue'
	import Toast from '@/commons/showToast.js'
	import {
		LEARNING_MODE_DATA
	} from '@/utils/util.js'
	const app = getApp()
	export default {
		data() {
			return {
				num: -1,
				dataArr: []
			};
		},
		components: {
			primaryBtn
		},
		mounted() {
			// let data = uni.getStorageSync('learningOptions')
			// if (!data || data.length <= 0) {
			// 	Toast({
			// 		title: "获取数据失败"
			// 	})
			// }
			// console.log('data:', data)
			this.dataArr = LEARNING_MODE_DATA
		},
		methods: {
			confirm() {
				if (this.num !== -1) {
					uni.setStorageSync('isShowChooseType', true)
					uni.setStorageSync('teachType', this.num)
					uni.$emit('chooesedTypezz', {
						num: this.num
					})
				}
			},
			selectItem(num, item) {
				console.log('选择：', item)
				uni.setStorageSync('selectedLearningType', item)
				uni.setStorageSync('LearningSubTypeSubItem',item.listSub[0])
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