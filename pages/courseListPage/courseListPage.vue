<template>
	<view class="main">
		<view class="tab-content">
			<view @click="chooseTab(0)" :class="tab==0?'selected-items':'item'">
				全部
			</view>
			<view @click="chooseTab(1)" :class="tab==1?'selected-items':'item'">
				未开始
			</view>
			<view @click="chooseTab(2)" :class="tab==2?'selected-items':'item'">
				进行中
			</view>
			<view @click="chooseTab(3)" :class="tab==3?'selected-items':'item'">
				已结束
			</view>
		</view>
		<view class="scroll-content">
			<template v-if="autoLearning && autoLearning.length > 0">
				<view v-for="(item,index) in autoLearning" :key='index'>
					<course :data='item' @courseClick='courseItemClick' author='主持人' :isTag='true'/>
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
	export default {
		data() {
			return {
				autoLearning: [],
				tab:0
			};
		},
		onLoad() {
			this.getAutoLearning()
		},
		methods: {
			chooseTab(e) {
				this.tab = e
				this.getMyCourse()
			},
			getAutoLearning() {
				let id = getLearningTypeInfo().categoryId1
				console.log('id', id)
				uni.showLoading({
					title: '获取中...'
				})
				httpRequest({
					url: 'course/api/course/independentlist',
					method: 'POST',
					data: {
						categoryId1: id
					},
					success: res => {
						uni.hideLoading()
						if (res.data.code == 200) {
							this.autoLearning = res.data.data
						}
					},
					fail: err => {
						uni.hideLoading()
						console.log('获取自主学习课程失败：', err)
					}
				}, 2)
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
	.scroll-content{
		margin-top: 130rpx;
	}
</style>
