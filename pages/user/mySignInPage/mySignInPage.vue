<!-- 我的签到页面 -->
<template>
	<view class="container">
		<view class="top-content">
			<picker class="picker-content" :value='dateValue' mode="date" fields="month" @change="changeDate">
				<view class="topic flex-row-start">
					<view class="topic-txt">
						{{month}}月汇总
					</view>
					<image src="../../../static/down-push-arrow.png" mode=""></image>
				</view>
			</picker>
			<view class="tongji">
				<text class="signined">已打卡 {{datas.faceSignNum}}次</text>
				<text>未打卡 {{datas.notFaceSignNum}}次</text>
			</view>
		</view>
		<view class="main-content">
			<template v-if="datas.tbTrainingDTOList && datas.tbTrainingDTOList.length > 0">
				<view class="item flex-between" v-for="(item,index) in datas.tbTrainingDTOList">
					<view class="cover-content">
						<image :src="item.headurl" mode=""></image>
					</view>
					<view class="sign-desc">
						<view class="sign-topic text-overflow2">
							{{item.name || '未知'}}
						</view>
						<view class="sign-time">
							{{item.trainStart}} {{item.trainEnd}}
						</view>
						<view class="sign-bottom flex-row-start">
							<view :class="[item.faceSignonType==0?'no-sign-txt':'sign-txt','ttt']">
								{{item.faceSignonType==0?'未打卡':'已打卡'}}
							</view>
							<view class="detail-btn" @click="goDetails(item)">
								{{item.faceSignonType==0?'去学习':'查看详情'}}
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<EmptyData type='serach'/>
			</template>
		</view>
	</view>
</template>

<script>
	import {
		getCurrentDate
	} from '@/utils/util.js'
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		getUserLoginInfo,
		getLearningTypeInfo
	} from '@/utils/util.js'
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	
	export default {
		data() {
			return {
				month: '',
				dateValue: '',
				datas:[]
			};
		},
		components:{
			EmptyData
		},
		onLoad() {
			this.dateValue = getCurrentDate('month')
			this.month = getCurrentDate('month').split('-')[1]
			this.getSignInfo()
		},
		methods: {
			goDetails(item) {
				console.log('选中：',item)
				if(item.faceSignonType == 0){
					uni.navigateTo({
						url:'../../course/view/view?id='+item.id
					})
					return
				}
				let obj = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url: './mySignInDetail?obj='+obj
				})
			},
			changeDate(e) {
				let val = e.detail.value
				this.month = val.split('-')[1]
				this.dateValue = val
				this.getSignInfo()
			},
			getSignInfo() {
				let userno = getUserLoginInfo('userNo')
				let compid = getLearningTypeInfo().compId
				let date = this.dateValue
				let s_date = date + '-01'
				let e_date = date + '-' + new Date(date.split('-')[0],date.split('-')[1],0).getDate()
				let params = {
					"compId": compid,
					"monthEnd": e_date,
					"monthStart": s_date,
					"userNo": userno
				}
				uni.showLoading({
					title:'加载中...'
				})
				console.log('zxczxc',params)
				httpRequest({
					url: '/user/api/tbTraining/myMonthCount',
					method: 'POST',
					data: params,
					success:res=>{
						console.log('查询签到记录',res)
						uni.hideLoading()
						if(res.data.code == 200){
							this.datas = res.data.data
						}
					},
					fail:err=>{
						uni.hideLoading()
						console.log('查询失败：',err)
					}
				},1)
			}
		}
	}
</script>

<style lang="scss">
	.top-content {
		padding: 24rpx 30rpx;
		background-color: #F8F8F8;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: 9998;

		.topic {

			.topic-txt {
				margin-right: 16rpx;
				color: #333333;
				font-size: 32rpx;
				font-weight: bold;
			}

			image {
				width: 30rpx;
				height: 30rpx;
			}
		}

		.tongji {
			color: #666;
			font-size: 24rpx;

			.signined {
				margin-right: 30rpx;
			}
		}
	}

	.main-content {
		padding: 50rpx 30rpx;
		margin-top: 120rpx;

		.item {
			margin-bottom: 34rpx;

			.cover-content {
				width: 40%;
				height: 230rpx;
				border-radius: 8rpx;
				background-color: #eaeaea;
				margin-right: 24rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}

			}

			.sign-desc {
				width: 55%;

				.sign-topic {
					color: #333333;
					font-size: 32rpx;
					letter-spacing: 2rpx;
				}

				.sign-time {
					color: #666666;
					font-size: 24rpx;
					margin: 20rpx 0 50rpx;
				}
			}
		}
	}

	.ttt {
		font-size: 24rpx;
		margin-right: 50rpx;
	}

	.sign-txt {
		color: #3CA7FF;
	}

	.no-sign-txt {
		color: #FA6169;
	}

	.detail-btn {
		border: none;
		border-radius: $uni-border-radius-half-circle;
		background-color: rgba(60, 167, 255, 0.1);
		padding: 8rpx 24rpx;
		font-size: 24rpx;
		color: #3CA7FF;
	}

	.picker-content {
		width: 254rpx;
	}
</style>
