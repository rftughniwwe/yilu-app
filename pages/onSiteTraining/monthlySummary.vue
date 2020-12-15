<!-- 月汇总 -->
<template>
	<view>
		<view class="top-content flex-between">
			<view class="left-content flex-evenly">
				<!-- <view class="week date">
					周
				</view> -->
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
				<userName />
			</view>

			<view class="item flex-between" @click="learningClick(1)">

				<view class="head">
					学习天数
				</view>
				<view class="subtitle flex-between">
					<view class="txt">
						{{datas.countList?datas.countList.length:0}}天
					</view>
					<image class="push-down-img" src="../../static/down-push-arrow.png" mode=""></image>
				</view>

			</view>
			<view v-show="tab1">
				<template v-if="datas.countList && datas.countList.length > 0">
					<view class="details-items" v-for="(item,index) in datas.countList" :key='index'>
						<view class="sigle-item flex-between">
							<view class="head">
								{{item.dat}}
							</view>
							<view class="txt">
								1天
							</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="no-data">暂无数据</view>
				</template>
			</view>

			<view class="item flex-between" @click="learningClick(2)">
				<view class="head">
					学习总时长
				</view>
				<view class="subtitle flex-between">
					<view class="txt">
						{{datas.countStudyTime?datas.countStudyTime:0}}小时
					</view>
					<image class="push-down-img" src="../../static/down-push-arrow.png" mode=""></image>
				</view>
			</view>
			<view v-show="tab2">
				<template v-if="datas.countList && datas.countList.length > 0">
					<view class="details-items" v-for="(item,index) in datas.countList" :key='index'>
						<view class="sigle-item flex-between">
							<view class="head">
								{{item.dat}}
							</view>
							<view class="txt">
								{{item.sum?item.sum:0}}分钟
							</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="no-data">暂无数据</view>
				</template>
			</view>

			<view class="item flex-between" @click="learningClick(3)">
				<view class="head">
					缺卡
				</view>
				<view class="subtitle flex-between">
					<view class="qk">
						{{datas.noSignonCount?datas.noSignonCount:0}}次
					</view>
					<image class="push-down-img" src="../../static/down-push-arrow.png" mode=""></image>
				</view>
			</view>
			<view v-show="tab3">
				<template v-if="datas.list && datas.list.length > 0">
					<view class="details-items" v-for="(item,index) in datas.list" :key='index'>
						<view class="sigle-item flex-between">
							<view class="head">
								<view class="qk-title">
									{{item.courseName}}
								</view>
								<view class="time-subtitle">
									{{item.startTime}} <text class="hight-color">签出没有打卡</text>
								</view>
							</view>
							<view class="go-learning" @click="goLearning(item)">
								去学习
							</view>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="no-data">暂无数据</view>
				</template>
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
				dateString: '',
				tab1: false,
				tab2: false,
				tab3: false,
				datas:{}
			};
		},
		onShow() {

		},
		onLoad() {
			this.getCurrentDate()
		},
		components: {
			userHeadImg,
			userName
		},
		methods: {
			getCurrentDate() {
				let date = new Date()
				let initYear = date.getFullYear()
				let initMonth = date.getMonth() + 1
				let day = date.getDate()
				this.dateString = initYear + '-' + initMonth
				this.initialData()
			},
			// 获取数据
			initialData() {
				uni.showLoading({
					title: '查询中'
				})
				let _date = new Date(this.dateString)
				let y = _date.getFullYear()
				let m = _date.getMonth() + 1
				let start =  y + '-' + m + '-' + '01'
				let end = y + '-' + m + '-' + new Date(y, m, 0).getDate() < 10 ? '0' + new Date(y, m, 0).getDate() : new Date(y, m, 0).getDate()
				getMonthSummaryData({
					weekStart: start,
					weekEnd: end
				}).then(res => {
					uni.hideLoading()
					console.log('月汇总数据', res)
					if (res.data.code == 200) {
						this.datas = res.data.data
					} else {
						request_success(res)
					}
				})
			},

			// 日期变换
			dateChange(e) {
				console.log('zxczxc', e.detail.value)
				this.dateString = e.detail.value
				this.initialData()
			},
			learningClick(num) {
				if (num == 1) {
					this.tab1 = !this.tab1
				} else if (num == 2) {
					this.tab2 = !this.tab2
				} else {
					this.tab3 = !this.tab3
				}
			},
			goLearning(item){
				let id = item.id
				uni.navigateTo({
					url:'../course/view/view?id='+id
				})
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
		// border-top-right-radius: 10rpx;
		// border-bottom-right-radius: 10rpx;
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

	.time-subtitle {
		font-size: 24rpx;
		color: #333333;
	}

	.hight-color {
		color: #3CA7FF;
		margin-left: 10rpx;
	}

	.go-learning {
		color: #3CA7FF;
		font-size: 30rpx;
		padding: 10rpx 0 10rpx 40rpx;
		border-left: 2rpx solid #999999;
	}

	.qk-title {
		margin-bottom: 16rpx;
		color: #333333;
		font-size: 32rpx;
	}
	.no-data{
		text-align: center;
		color: #000000;
		font-size: 32rpx;
		padding: 30rpx 0;
	}
</style>
