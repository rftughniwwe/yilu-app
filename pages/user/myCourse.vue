<!-- 我的课程 -->
<template>
	<view>
		<view class="tab-content">
			<view @click="chooseTab(0)" :class="tab==0?'selected-items':'item'">
				全部
			</view>
			<view @click="chooseTab(1)" :class="tab==1?'selected-items':'item'">
				未开始
			</view>
			<view @click="chooseTab(2)" :class="tab==2?'selected-items':'item'">
				直播中
			</view>
			<view @click="chooseTab(5)" :class="tab==5?'selected-items':'item'">
				回放
			</view>
		</view>
		<view class="course-contnt">
			<template v-if="courseData && courseData.length > 0">

				<view class="course-item" v-for="(item,index) in courseData" :key='index' @click="goPreview(item.id)">
					<view class="title text-overflow-ellipsis">
						{{item.courseName?item.courseName:'未知'}}
					</view>
					<view class="subtitle">
						{{item.startTime?item.startTime:'未知'}}
					</view>
					<view class="img-content">
						<image :src="item.courseLogo" mode=""></image>
						<view class="tags">
							{{live_status[item.liveStatus-1]}}
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<EmptyData type='serach' />
			</template>
		</view>
	</view>
</template>

<script>
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import Toast from '@/commons/showToast.js'
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	import {
		LIVE_STATUS,
		getLearningTypeInfo,
		getUserLoginInfo
	} from '@/utils/util.js'

	export default {
		data() {
			return {
				tab: 0,
				courseData: [],
				live_status: []
			};
		},
		components: {
			EmptyData
		},
		onLoad() {
			this.getMyCourse()
			this.live_status = LIVE_STATUS
		},
		methods: {
			// 获取我的课程
			getMyCourse() {
				// 选择的一级分类
				let categoryId1 = getLearningTypeInfo().categoryId1
				// 选择的二级分类
				let categoryId2 = getLearningTypeInfo().categoryId2
				// 所属公司ID
				let compId = getLearningTypeInfo().compId
				let tab = this.tab
				if (!categoryId1 || !categoryId2 || !compId) {
					Toast({
						title: '获取数据失败'
					})
					return
				}
				uni.showLoading({
					title: '加载中...'
				})
				let params = {
					liveStatus: tab == 1 ? tab : 2,
					courseCategory: tab == 2 ? tab : 1,
					lecturerUserNo: compId,
					categoryId1: categoryId1,
					categoryId2: categoryId2
				}
				console.log('params：',params)
				httpRequest({
					url: '/course/api/course/courselist',
					method: 'POST',
					data: params,
					success: (res) => {
						uni.hideLoading()
						console.log('课程数据:', res)
						if (res.data.code == 200) {
							this.courseData = res.data.data

						} else {
							request_success(res)
						}
					},
					fail: err => {
						uni.hideLoading()
						request_err(err, '获取课程失败')
					}
				}, 2)
			},
			chooseTab(e) {
				this.tab = e
				this.getMyCourse()
			},
			goPreview(id) {
				uni.navigateTo({
					url: './coursePreview?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab-content {
		background-color: #EBEFF2;
		padding: 30rpx;

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

	.course-contnt {
		padding: 0 30rpx 30rpx;
		background-color: #FFFFFF;
	}

	.course-item {
		border-bottom: 2rpx solid #DDDDDD;
		padding: 40rpx 0 30rpx;

		.title {
			color: #333333;
			font-size: 34rpx;
			width: 100%;
			font-weight: bold;
			letter-spacing: 2rpx;
		}

		.subtitle {
			color: #999999;
			margin: 10rpx 0 30rpx;
			font-size: 26rpx;
		}

		.img-content {
			height: 300rpx;
			width: 100%;
			background: #eeeeee;
			position: relative;

			image {
				width: 100%;
				height: 100%;
				border: 2rpx solid #eaeaea;
			}

			.tags {
				background-color: #F92E6D;
				color: #FFFFFF;
				font-size: 28rpx;
				padding: 4rpx 34rpx;
				border-bottom-left-radius: 22rpx;
				position: absolute;
				right: 0;
				top: 0;
			}
		}
	}
</style>
