<!-- 我的课程 -->
<template>
	<view>
		<view class="tab-content">
			<view @click="chooseTab(0)" :class="tab==0?'selected-items':'item'">
				未完成
			</view>
			<view @click="chooseTab(1)" :class="tab==1?'selected-items':'item'">
				已完成
			</view>
		</view>
		<view class="course-contnt">
			<template v-if="courseData && courseData.length > 0">

				<view class="course-item" v-for="(item,index) in courseData" :key='index'>
					<course :data='item' @courseClick='courseItemClick' author='主持人' :isTag='true'/>
					<!-- <view class="title text-overflow-ellipsis">
						{{item.name?item.name:'未知'}}
					</view>
					<view class="subtitle">
						{{item.trainStart?item.trainStart:'未知'}}
					</view>
					<view class="img-content">
						<image :src="item.headurl" mode=""></image>
						<view class="tags">
							{{'回放'}}
						</view>
					</view> -->
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
		getLearningTypeInfo,
		getUserLoginInfo
	} from '@/utils/util.js'

	export default {
		data() {
			return {
				tab: 0,
				num: 0,
				courseData: [],
				pageSize: 10,
				pageCurrent: 1
			};
		},
		components: {
			EmptyData
		},
		onLoad(options) {
			this.getMyCourse()
			// if (options.formUser) {
			// 	this.isFormUser = options.formUser || false
			// 	uni.setNavigationBarTitle({
			// 		title: '我的培训'
			// 	})
			// }

		},
		onUnload() {
			uni.hideLoading()
		},
		methods: {
			courseItemClick(e) {
				let item = e.item
				console.log('点击：', item)
				scanCodeReturn(item)
				uni.navigateTo({
					url: '../onSiteTraining/courseDetails'
				})
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取我的课程
			getMyCourse() {
				let categoryId1 = uni.getStorageSync('selectedLearningType').id
				// 学习模块中选择的二级分类
				let categoryId2 = uni.getStorageSync('LearningSubTypeSubItem').id
				let compId = uni.getStorageSync('userCompanyInfo').compId
				let tab = this.tab
				let userid = getUserLoginInfo('userNo')
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
					"completeType": tab,
					"userNo": userid
				}
				console.log('params：', params)
				httpRequest({
					url: 'user/api/tbTraining/myCourseType',
					method: 'POST',
					data: params,
					success: (res) => {
						uni.hideLoading()
						console.log('我的培训数据:', res)
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
				}, 1)
			},
			chooseTab(e) {
				this.tab = e
				this.getMyCourse()
			},
			goPreview(item) {
				// let d = encodeURIComponent(JSON.stringify(item))
				// uni.setStorageSync('selectCourseItemData',item)
				uni.setStorageSync('courseInfoData', item)
				console.log('zzz',item)
				if(!item.courseId){
					uni.showToast({
						title:'课程不存在',
						icon:'none'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/course/view/view?id=' + item.courseId +'&fromUser=1&trainingId='+item.id
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
