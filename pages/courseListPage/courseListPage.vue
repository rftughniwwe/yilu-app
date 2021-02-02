<template>
	<view class="main">
		<view class="tab-content">
			<view @click="chooseTab(5)" :class="tab==5?'selected-items':'item'">
				全部
			</view>
			<view @click="chooseTab(0)" :class="tab==0?'selected-items':'item'">
				未开始
			</view>
			<view @click="chooseTab(1)" :class="tab==1?'selected-items':'item'">
				进行中
			</view>
			<view @click="chooseTab(2)" :class="tab==2?'selected-items':'item'">
				已结束
			</view>
		</view>
		<view class="scroll-content">
			<template v-if="autoLearning && autoLearning.length > 0">
				<view v-for="(item,index) in autoLearning" :key='index'>
					<course :data='item' @courseClick='courseItemClick' :isTag='true'/>
				</view>
			</template>
			<template v-else>
				<EmptyData type='serach' />
			</template>
		</view>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		getCurrentDate,
		LEARNING_MODE_DATA,
		scanCodeReturn,
		getNotRealTime,
		getLearningTypeInfo,
		getUserLoginInfo
	} from '@/utils/util.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'

	export default {
		data() {
			return {
				autoLearning: [],
				tab: 5,
			};
		},
		onLoad() {
			this.getAutoLearning()
		},
		methods: {
			chooseTab(e) {
				this.tab = e
				this.getAutoLearning(e)
			},
			getAutoLearning(tab) {
				let typeData = uni.getStorageSync('sdrhdrfthftghftyjh')
				let chooseTypeData = uni.getStorageSync('selectedLearningType')
				if (chooseTypeData.id != typeData[0].id) {
					uni.showToast({
						title: '获取课程列表失败',
						icon: 'none'
					})
					return
				}
				let itemz = uni.getStorageSync('LearningSubTypeSubItem')
				let trainType = 0
				let choosedatasub = chooseTypeData.listSub
				switch (itemz.id) {
					case choosedatasub[0].id:
						trainType = 1
						break
					case choosedatasub[1].id:
						trainType = 2
						break
					case choosedatasub[2].id:
						trainType = 3
						break
					case choosedatasub[3].id:
						trainType = 4
						break
					case choosedatasub[4].id:
						trainType = 5
						break
					case choosedatasub[5].id:
						trainType = 6
						break
					case choosedatasub[6].id:
						trainType = 7
						break
					default:
						trainType = 0
				}
				if (trainType == 0) {
					uni.showToast({
						title: '获取课程失败',
						icon: 'none'
					})
					return
				}
				this.autoLearning = []
				console.log('tab', tab)
				let type = tab
				let userno = getUserLoginInfo('userNo')
				let compId = uni.getStorageSync('userCompanyInfo').compId

				uni.showLoading({
					title: '获取中...'
				})
				let params = {
					"compId": compId,
					"trainType": trainType,
					"type": type,
					"userNo": userno
				}
				console.log('params:',params)
				httpRequest({
					url: 'user/api/tbTraining/trainListByUserNo',
					method: 'POST',
					data:params,
					success: res => {
						uni.hideLoading()
						console.log('zxczxc', res.data.data)
						this.autoLearning = res.data.data
					},
					fail: err => {
						uni.hideLoading()
						console.log('获取课程失败：', err)
						request_err(err, '获取课程失败')
					}
				}, 1)
			},
			courseItemClick(e) {
				let item = e.item
				console.log('点击：', item)
				scanCodeReturn(item)
				uni.navigateTo({
					url: '../onSiteTraining/courseDetails'
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		margin: 0 18rpx;
	}

	.tab-content {
		background-color: #EBEFF2;
		padding: 30rpx;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9999;
		border-bottom: 2rpx solid #F1F1F1;

		.item {
			border-radius: 8rpx;
			background-color: #FFFFFF;
			color: #999999;
			font-size: 28rpx;
			display: inline-block;
			margin-right: 40rpx;
			padding: 20rpx 30rpx;
		}
	}

	.selected-items {
		background-color: #3CA7FF;
		color: #FFFFFF;
		border-radius: 8rpx;
		font-size: 28rpx;
		display: inline-block;
		margin-right: 40rpx;
		padding: 20rpx 30rpx;
	}

	.scroll-content {
		margin-top: 130rpx;
	}
</style>
