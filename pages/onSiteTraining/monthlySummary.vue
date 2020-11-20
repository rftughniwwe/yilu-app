<!-- 月汇总 -->
<template>
	<view>
		<view class="top-content flex-between">
			<view class="left-content flex-evenly">
				<view class="week date">
					周
				</view>
				<view class="month date selected-item">
					月
				</view>
			</view>
			<view class="right-picker">
				<picker class="flex-between" mode="date" @change="dateChange" fields="month">
					<view class="date-txt">{{dateString}}</view>

					<image class="push-down-img" src="../../static/down-push-arrow.png" mode=""></image>
				</picker>
			</view>
		</view>
		<view class="item-block">
			<view class="user-info item flex-row-start">
				<userHeadImg width='80rpx' height='80rpx' />
				<userName/>
			</view>

			<view class="item flex-between" @click="learningClick(1)">

				<view class="head">
					学习天数
				</view>
				<view class="subtitle flex-between">
					<view class="txt">
						10天
					</view>
					<image class="push-down-img" src="../../static/down-push-arrow.png" mode=""></image>
				</view>

			</view>
			<view v-show="tab1">
				<view class="details-items">
					<view class="sigle-item flex-between">
						<view class="head">
							2020-09-01(星期二)
						</view>
						<view class="txt">
							1天
						</view>
					</view>
				</view>
				<view class="details-items">
					<view class="sigle-item flex-between">
						<view class="head">
							2020-09-01(星期二)
						</view>
						<view class="txt">
							1天
						</view>
					</view>
				</view>
				<view class="details-items">
					<view class="sigle-item flex-between">
						<view class="head">
							2020-09-01(星期二)
						</view>
						<view class="txt">
							1天
						</view>
					</view>
				</view>
			</view>

			<view class="item flex-between" @click="learningClick(2)">
				<view class="head">
					学习总时长
				</view>
				<view class="subtitle flex-between">
					<view class="txt">
						100小时
					</view>
					<image class="push-down-img" src="../../static/down-push-arrow.png" mode=""></image>
				</view>
			</view>
			<view v-show="tab2">
				<view class="details-items">
					<view class="sigle-item flex-between">
						<view class="head">
							2020-09-01(星期二)
						</view>
						<view class="txt">
							2小时
						</view>
					</view>
				</view>
				<view class="details-items">
					<view class="sigle-item flex-between">
						<view class="head">
							2020-09-01(星期二)
						</view>
						<view class="txt">
							2小时
						</view>
					</view>
				</view>
				<view class="details-items">
					<view class="sigle-item flex-between">
						<view class="head">
							2020-09-01(星期二)
						</view>
						<view class="txt">
							2小时
						</view>
					</view>
				</view>
			</view>

			<view class="item flex-between" @click="learningClick(3)">
				<view class="head">
					缺卡
				</view>
				<view class="subtitle flex-between">
					<view class="qk">
						1次
					</view>
					<image class="push-down-img" src="../../static/down-push-arrow.png" mode=""></image>
				</view>
			</view>
			<view v-show="tab3">
				<view class="details-items">
					<view class="sigle-item flex-between">
						<view class="head">
							<view class="qk-title">
								道路危险货物运输管理
							</view>
							<view class="time-subtitle">
								2020-09-04(星期四)12:00 <text class="hight-color">签出没有打卡</text>
							</view>
							 
						</view>
						<view class="go-learning">
							去学习
						</view>
					</view>
				</view>
				<view class="details-items">
					<view class="sigle-item flex-between">
						<view class="head">
							<view class="qk-title">
								道路危险货物运输管理
							</view>
							<view class="time-subtitle">
								2020-09-04(星期四)12:00 <text class="hight-color">签出没有打卡</text>
							</view>
							 
						</view>
						<view class="go-learning">
							去学习
						</view>
					</view>
				</view>
				<view class="details-items">
					<view class="sigle-item flex-between">
						<view class="head">
							<view class="qk-title">
								道路危险货物运输管理
							</view>
							<view class="time-subtitle">
								2020-09-04(星期四)12:00 <text class="hight-color">签出没有打卡</text>
							</view>
							 
						</view>
						<view class="go-learning">
							去学习
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import userHeadImg from '@/components/userHeadImg/userHeadImg.vue'
	import userName from '@/components/userName/userName.vue'
	import {
		getMonthSummaryData
	} from '@/commons/api/apis.js'
	export default {
		data() {
			return {
				dateString: '2020-10-10',
				tab1: false,
				tab2: false,
				tab3: false
			};
		},
		onShow() {

		},
		onLoad() {
			this.initialData()
		},
		components: {
			userHeadImg,
			userName
		},
		methods: {
			// 获取数据
			initialData(){
				let date = new Date()
				let initYear = date.getFullYear()
				let initMonth = date.getMonth() +1
				let month = initYear+'-'+initMonth
				getMonthSummaryData({month:month}).then(res=>{
					console.log('月汇总数据',res)
					if(res.data.code == 200){
						
					}else {
						request_success(res)
					}
				})
			},
			
			// 日期变换
			dateChange(e) {
				console.log('zxczxc', e.detail.value)
			},
			learningClick(num) {
				if(num == 1){
					this.tab1 = !this.tab1
				}else if(num == 2){
					this.tab2 = !this.tab2
				}else {
					this.tab3 = !this.tab3
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}

	.top-content {
		background: #FFFFFF;
		padding: 30rpx;
		border-bottom: 20rpx solid #F8F8F8;
	}

	.date {
		background-color: #FFFFFF;
		color: #3CA7FF;
		border: 2rpx solid #3CA7FF;
		padding: 6rpx 34rpx;
	}

	.week {
		border-top-left-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
	}

	.month {
		border-top-right-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
	}

	.item-block {
		background-color: #FFFFFF;
	}

	.right-picker {
		.date-txt {
			color: #333333;
			font-size: 28rpx;
			margin-right: 10rpx;
		}
	}

	.selected-item {
		background-color: #3CA7FF;
		color: #FFFFFF;
	}

	.push-down-img {
		width: 30rpx;
		height: 30rpx;
	}

	.item {
		padding: 34rpx 30rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}

	.head {
		color: #333333;
		font-size: 32rpx;
		letter-spacing: 2rpx;
	}

	.txt {
		font-size: 30rpx;
		color: #999999;
		letter-spacing: 2rpx;
		margin-right: 16rpx;
	}

	.qk {
		font-size: 30rpx;
		color: #FF0000;
		letter-spacing: 2rpx;
		margin-right: 16rpx;
	}

	.details-items {
		background-color: #F8F8F8;
		padding: 24rpx 30rpx;
		border-bottom: 2rpx solid #EAEAEA;
	}
	.time-subtitle{
		font-size: 24rpx;
		color: #333333;
	}
	.hight-color{
		color: #3CA7FF;
		margin-left: 10rpx;
	}
	.go-learning{
		color: #3CA7FF;
		font-size: 30rpx;
		padding: 10rpx 0 10rpx 40rpx;
		border-left: 2rpx solid #999999;
	}
	.qk-title{
		margin-bottom: 16rpx;
		color: #333333;
		font-size: 32rpx;
	}
</style>
