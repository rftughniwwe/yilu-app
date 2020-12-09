<!-- 我的课程 -->
<template>
	<view>
		<view class="wrap-top-tab-bar">
			<uni-nav-bar leftIcon="arrowleft" @clickLeft="goBack" :style="{'paddingTop':isFullScreen?'64rpx':'30rpx'}">
				<learnTopSlide slot='default' type='3' :tabArr='tabArr' @tabChange="tabSelected" />
			</uni-nav-bar>
		</view>
		<view v-if="num==0" class="tab-content" :style="{'marginTop':isFullScreen?'154rpx':'100rpx'}">
			<view @click="chooseTab(0)" :class="tab==0?'selected-items':'item'">
				全部
			</view>
			<view @click="chooseTab(1)" :class="tab==1?'selected-items':'item'">
				未开始
			</view>
			<view @click="chooseTab(2)" :class="tab==2?'selected-items':'item'">
				直播中
			</view>
		</view>
		<view v-if="num==1" class="tab-content"  :style="{'marginTop':isFullScreen?'154rpx':'100rpx'}">
			<view @click="chooseTab(3)" class="selected-items">
				全部
			</view>
		</view>
		<view class="course-contnt"  :style="{'marginTop':isFullScreen?'264rpx':'200rpx'}">
			<template v-if="courseData && courseData.length > 0">

				<view class="course-item" v-for="(item,index) in courseData" :key='index' @click="goPreview(item)">
					<view class="title text-overflow-ellipsis">
						{{item.courseName?item.courseName:'未知'}}
					</view>
					<view class="subtitle">
						{{item.startTime?item.startTime:'未知'}}
					</view>
					<view class="img-content">
						<image :src="item.courseLogo" mode=""></image>
						<view class="tags">
							{{live_status[item.courseCategory-1]}}
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
				tabArr: ['课程直播', '课程回放'],
				tab: 0,
				num: 0,
				courseData: [],
				isFullScreen: false,
				live_status: [],
				pageSize: 10,
				pageCurrent: 1,
				isFormUser: false
			};
		},
		components: {
			EmptyData
		},
		onLoad(options) {
			this.getMyCourse()
			this.live_status = LIVE_STATUS
			this.isFullScreen = uni.getStorageSync('isFullScreen')
			if (options.formUser) {
				this.isFormUser = options.formUser || false
				uni.setNavigationBarTitle({
					title: '我的培训'
				})
			}

		},
		onUnload() {
			uni.hideLoading()
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			tabSelected(data) {
				this.num = data.tab
				this.getMyCourse()
			},
			// 获取我的课程
			getMyCourse() {
				let categoryId1 = uni.getStorageSync('selectedLearningType').id
				// 学习模块中选择的二级分类
				let categoryId2 = uni.getStorageSync('LearningSubTypeSubItem').id
				let compId = uni.getStorageSync('userBasicInfo').compId
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
				let params = {}

				if (this.num == 0) {
					if (tab == 0) {
						params = {
							courseCategory: 2,
							compId: compId,
							categoryId1: categoryId1,
							categoryId2: categoryId2,
							pageSize: this.pageSize,
							pageCurrent: this.pageCurrent
						}
					} else {
						params = {
							courseCategory: 2,
							liveStatus: tab,
							compId: compId,
							categoryId1: categoryId1,
							categoryId2: categoryId2,
							pageSize: this.pageSize,
							pageCurrent: this.pageCurrent
						}
					}
				} else {
					params = {
						courseCategory: 1,
						compId: compId,
						categoryId1: categoryId1,
						categoryId2: categoryId2,
						pageSize: this.pageSize,
						pageCurrent: this.pageCurrent
					}
				}

				// let params = {
				// 	courseCategory: tab == 2 ? tab : 1,
				// 	liveStatus:
				// 	compId: compId,
				// 	categoryId1: categoryId1,
				// 	categoryId2: categoryId2,
				// 	pageSize:this.pageSize,
				// 	pageCurrent:this.pageCurrent
				// }
				console.log('params：', params)
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
			goPreview(item) {
				// let d = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url: '/pages/course/view/view?id=' + item.id
				});
				// uni.navigateTo({
				// 	url: './coursePreview?item=' + d
				// })
			}
		}
	}
</script>

<style lang="scss">
	.tab-content {
		background-color: #EBEFF2;
		padding: 30rpx;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9998;
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

	.course-contnt {
		margin-top: 120rpx;
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
