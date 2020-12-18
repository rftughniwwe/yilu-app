<!-- 我的签到详情 -->
<template>
	<view class="container">
		<view class="top-content">
			<view class="topic">
				<view class="header-img">
					<image :src="obj.headurl" mode=""></image>
				</view>
				<view class="right-content">
					<view class="topic-txt text-overflow2">
						{{obj.faceSignLogListVOS[0].refName}}
					</view>
					<view class="tongji">
						共{{obj.faceSignLogListVOS.length}}次卡，学习总时长{{obj.countStudyTime}}分钟
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
				obj: {},
				xibai: []
			};
		},
		components: {
			uniSteps
		},
		onLoad(options) {
			let data = JSON.parse(decodeURIComponent(options.obj))
			console.log('dataaaaaaa', data)
			this.obj = data
			this.setDatas()
		},
		methods: {
			setDatas() {
				let d = this.obj
				let temp_arr = []

				d.faceSignLogListVOS.forEach((item, index) => {
					let signType = item.signonType == 0 ? '签入时间' : '签出时间'
					let t = item.gmtCreate.split('T')
					let title = signType + t[0] + ' ' + t[1]
					let address = item.place ? item.place : '未知地点'
					let faceimg = item.userImage
					temp_arr.push({
						title: title,
						desc: address,
						headImg: faceimg
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

	.topic {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.topic-txt {
		margin-bottom: 20rpx;
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
	}

	.header-img {
		width: 178rpx;
		height: 202rpx;
		border-radius: 4rpx;
		background-color: #FFFFFF;
		margin-right: 20rpx;
		border-radius: 8rpx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 8rpx;
		}
	}

	.right-content {
		padding: 30rpx 0;
	}

	.tongji {
		color: #666;
		font-size: 26rpx;
	}

	.step-content {
		padding: 50rpx;
	}
</style>
