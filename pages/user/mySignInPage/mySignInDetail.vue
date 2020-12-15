<!-- 我的签到详情 -->
<template>
	<view class="container">
		<view class="top-content">
			<view class="topic flex-row-start">
				<view class="header-img">
					<image src="../../../static/learning-banner2.png" mode=""></image>
				</view>
				<view class="right-content">
					<view class="topic-txt text-overflow2">
						安全教育学习
					</view>
					<view class="tongji">
						共2次卡，学习总时长2小时
					</view>
				</view>
			</view>
		</view>
		<view class="step-content">
			<uni-steps :options="xibai" direction="column"></uni-steps>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default {
		data() {
			return {
				obj:{},
				xibai:[]
			};
		},
		components:{
			uniSteps
		},
		onLoad(options) {
			let data = JSON.parse(decodeURIComponent(options.obj))
			console.log('dataaaaaaa',data)
			this.obj = data
			this.setDatas()
		},
		methods:{
			setDatas(){
				let d = obj 
				let temp_arr = []
				
				d.faceSignLogListVOS.forEach((item,index)=>{
					let signType = item.signonType==0?'签入时间':'签出时间'
					let signTime = item.gmtCreate
					let title = signType + signTime
					let address = item.place
					let faceimg = item.userImage
					temp_arr.push({
						title:title,
						desc:address,
						headImg:faceimg
					})
				})
				this.xibai = temp_arr
			}
		}
		
	}
</script>

<style lang="scss">
	.top-content {
		padding: 20rpx 30rpx;
		background-color: #F8F8F8;
	}

	.topic-txt {
		margin-bottom: 20rpx;
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
	}
	.header-img{
		width: 178rpx;
		height: 202rpx;
		border-radius: 4rpx;
		background-color: #FFFFFF;
		margin-right: 20rpx;
		image{
			width: 100%;
			height: 100%;
			border-radius: 4rpx;
		}
	}
	.right-content{
		padding: 30rpx 0;
	}
	.tongji{
		color: #666;
		font-size: 24rpx;
	}
	.step-content{
		padding: 50rpx;
	}
</style>
