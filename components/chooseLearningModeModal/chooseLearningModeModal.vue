<!-- 改变学习类型的模态框 -->
<template>
	<view class="modal-content-mask" @click.stop.prevent="closeModal(-1)"  @touchmove.stop.prevent="moveStop">
		<view class="modal-content">
			<view class="close-img">
				<image src="../../static/close-img.png" mode="" @click="closeModal(-1)"></image>
			</view>
			<view class="title">
				请选择类型
			</view>
			<view class="model-content">
				<view class="model-content-title">
					安全教育
				</view>
				<view class="models-content">
					<view class="item" v-for="(item,index) in datas" :key='index'  @click.stop="closeModal(index,item)">
						{{item.categoryName}}
					</view>
					<!-- <view class="item">
						从业人员安全学习
					</view>
					<view class="item" @click.stop="closeModal(2)">
						从业人员技能培训
					</view>
					<view class="item" @click.stop="closeModal(3)">
						安全领导小组学习
					</view>
					<view class="item" @click.stop="closeModal(4)">
						应急演练
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp().globalData
	export default {
		data() {
			return {
				datas:[]
			};
		},
		mounted() {
			this.datas = uni.getStorageSync('selectedLearningType').listSub
		},
		methods:{
			closeModal(num,item){
				uni.setStorageSync('isHideSafetyModal',true)
				uni.setStorageSync('LearningSubType',item)
				// app.LearningSubType = item
				uni.$emit('closeModalMask',{index:num})
			},
			moveStop(){},
			
		}
	}
</script>

<style lang="scss">
	.modal-content-mask{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		// width: 100%;
		// height: 100%;
		z-index: 99999;
		background-color: rgba(0,0,0,.4);
		
		.modal-content{
			position: fixed;
			padding: 40rpx 30rpx;
			left: 0;
			right: 0;
			bottom: 0;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			height: 500rpx;
			background-color: #FFFFFF;
		}
	}
	.close-img{
		text-align: right;
		padding: 0 30rpx;
		image{
			width: 34rpx;
			height: 34rpx;
		}
	}
	.title{
		font-size: 38rpx;
		color: #333333;
		text-align: center;
		font-weight: bold;
	}
	.model-content-title{
		font-size: 34rpx;
		color: #333333;
		font-weight: bold;
	}
	.models-content{
		margin: 50rpx 0;
	}
	.item{
		display: inline-block;
		background-color: #F6FAFD;
		color: #333333;
		border-radius: $uni-border-radius-half-circle;
		padding: 10rpx 30rpx;
		margin:0 30rpx 30rpx 0;
		font-size: 32rpx;
	}
</style>
