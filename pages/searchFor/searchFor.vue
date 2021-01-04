<!-- 搜索页面 -->
<template>
	<view class="main">
		<view class="top-search-content flex-between" :style="{'padding':isFullScreen?'100rpx 30rpx 20rpx':'60rpx 30rpx 20rpx'}">
			<image src="../../static/arrow-left.png" mode="" @click="goBack"></image>
			<view class="middle-serach-content flex-row-start">
				<image src="../../static/serach-img.png" mode=""></image>
				<input type="text" value="" v-model="serachVal" focus placeholder="搜索" placeholder-class="placeStyle" />
			</view>
			<view class="serach-btn" @click="serachContent">
				搜索
			</view>
		</view>

		<view v-if="showModel === 'normal'" class="normal-serach">
			<view class="hot-serach flex-row-start">
				<view class="title-txt">
					热门搜索
				</view>
				<image src="../../static/hot.png" mode=""></image>
			</view>
			<view class="history-hot">
				<template v-if="hotSearch && hotSearch.length > 0">
					<view v-for="(item,index) in hotSearch" :key='index' class="item-block" @click="hotSerachContent(item)">
						{{item.name}}
					</view>
				</template>
				<template v-else>
					<view class="no-data">暂无热门搜索</view>
				</template>
			</view>
			<view class="history-serach flex-between">
				<view class="title-txt">
					历史搜索
				</view>
				<image src="../../static/delete-serach.png" mode="" @click="removeData"></image>
			</view>
			<view class="history-hot">
				<template v-if="historySearch && historySearch.length > 0">
					<view v-for="(item,index) in historySearch" :key='index' class="item-block" @click="historySearchContent(item)">
						{{item.name==''?'全部':item.name}}
					</view>
				</template>
				<template v-else>
					<view class="no-data">暂无历史搜索</view>
				</template>

			</view>
		</view>


		<view v-if="showModel === 'article'" class="article-serach">
			<view class="tab-content flex-around">
				<view :class="tab===1?'tab-selected':''" @click="checkoutTab(1)">
					文章
				</view>
				<view :class="tab===2?'tab-selected':''" @click="checkoutTab(2)">
					课程
				</view>
			</view>
			<view class="serach-content">
				<view v-show="tab===1" class="news-content">
					<template v-if="newsArr && newsArr.length > 0">
						<view v-for="(items,index) in newsArr" :key='index'>
							<newCover @GoArticleDetails='goDetails' position='left' :datas='items'></newCover>
						</view>
					</template>
					<template v-else>
						<EmptyData type='serach' />
					</template>

				</view>
				<view v-show="tab===2" class="course-content">
					<template v-if="courseArr && courseArr.length > 0">
						<view v-for="(item,index) in courseArr" :key='index'>
							<course :data='item' @courseClick='itemClick'></course>
						</view>
					</template>
					<template v-else>
						<EmptyData type='serach'/>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import course from '@/components/course/course.vue'
	import Toast from '@/commons/showToast.js'
	import newCover from '@/components/news-cover/news-cover.vue'
	import EmptyData from '@/components/emptyPage/emptyPage.vue'
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		getHotSearchData,
		getHistorySearchData,
		clearHistorySearch
	} from '@/commons/api/apis.js'
	import {
		getUserLoginInfo,
		getLearningTypeInfo,
		LEARNING_MODE_DATA
	} from '@/utils/util.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'

	export default {
		data() {
			return {
				serachVal: '',
				showModel: 'normal',
				tab: 1,
				isFullScreen: false,
				hotSearch: [],
				historySearch: [],
				userNo: '',
				newsArr: [],
				courseArr:[]
			};
		},
		onLoad(options) {
			// this.showModel = options.model
			this.isFullScreen = uni.getStorageSync('isFullScreen')
		},
		onShow() {
			this.userNo = getUserLoginInfo('userNo')
			this.getHistoryData()
			this.getHotSearchData()
		},
		components: {
			course,
			newCover
		},
		methods: {
			// 获取热门搜索数据
			getHotSearchData() {
				getHotSearchData().then(res => {
					console.log("热门搜索数据,", res)
					this.getHistoryData()
					if (res.data.code == 200) {
						this.hotSearch = res.data.data
					} else {
						Toast({
							title: res.data.msg
						})
					}
				}, err => {
					console.log('获取数据失败：', err)
					Toast({
						title: "获取数据失败"
					})
				})
			},

			// 获取历史搜索数据
			getHistoryData() {

				getHistorySearchData(this.userNo).then(res => {
					console.log("历史搜索数据,", res)
					if (res.data.code == 200) {
						this.historySearch = res.data.data
					} else {
						Toast({
							title: res.data.msg
						})
					}
				}, err => {
					console.log('获取数据失败：', err)
					Toast({
						title: "获取数据失败"
					})
				})
			},

			// 删除历史数据
			removeData() {
				if (!this.historySearch || this.historySearch.length <= 0) {
					return
				}
				uni.showLoading({
					title: '正在清除...'
				})
				clearHistorySearch(this.userNo).then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.data.code == 200) {
						Toast({
							title: "清除成功"
						})
						this.getHistoryData()
					} else {
						Toast({
							title: res.data.msg
						})
					}
				}, err => {
					console.log('获取数据失败：', err)
					uni.hideLoading()
					Toast({
						title: "获取数据失败"
					})
				})
			},
			// 搜索文章
			serachContent() {
				let val = this.serachVal
				uni.showLoading({
					title: '搜索中...'
				})
				httpRequest({
					url: 'community/api/blog/searchListByTitle',
					method: 'POST',
					data: {
						"articleType": 2,
						"title": val,
						"userNo": this.userNo,
						"pageCurrent": 1,
						"pageSize": 10
					},
					success: res => {
						uni.hideLoading()
						this.showModel = 'article'
						console.log('搜索结果：', res)
						this.serachCourse()
						if (res.data.code == 200) {
							this.newsArr = res.data.data
						} else {
							request_success(res)
						}
					},
					fail: err => {
						uni.hideLoading()
						request_err(err, '搜索失败')
					}
				}, 3)
			},
			// 搜索课程
			serachCourse() {
				let storage = uni.getStorageSync('learningtypemode')
				let id = getLearningTypeInfo().categoryId1 || storage[2].id
				let val = this.serachVal
				httpRequest({
					url: 'course/api/course/searchCourseList',
					method: 'POST',
					data: {
						"category_id1": id,
						"courseName": val
					},
					success:res=>{
						console.log('搜索课程结果：',res)
						if (res.data.code == 200) {
							this.courseArr = res.data.data
						} else {
							request_success(res)
						}
					},
					fail:err=>{
						request_err(err,'获取课程失败')
					}

				}, 2)
			},
			// 搜索课程点击
			itemClick(e){
				let z = e.item;
				uni.setStorageSync('courseInfoData', z)
				uni.navigateTo({
					url:'../course/view/autoView?id=' + z.id
				})
			},
			// 热门搜索点击
			hotSerachContent(item) {
				this.serachVal = item.name
				this.serachContent()
			},
			// 历史搜索点击
			historySearchContent(item) {
				this.serachVal = item.name
				this.serachContent()
			},

			// 前往咨询详情
			goDetails(e) {
				let item = e.item
				uni.navigateTo({
					url: `../aiticlePage/aiticlePage?id=${item.id}&coverImg=${item.blogImg}`
				})
			},
			checkoutTab(e) {
				this.tab = e
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	.top-search-content {
		border-bottom: 1px solid #eee;
		position: fixed;
		top: 0;
		background-color: #FFFFFF;
		left: 0;
		right: 0;
		z-index: 9999;

		image {
			width: 30rpx;
			height: 42rpx;
		}

		.middle-serach-content {
			background: #F6F6F6;
			border-radius: $uni-border-radius-half-circle;
			padding: 10rpx 34rpx;
			width: 65%;

			image {
				width: 35rpx;
				height: 35rpx;
				margin-right: 10rpx;
			}
		}

		.serach-btn {
			font-size: 34rpx;
			color: #333333;
			font-weight: bold;
		}
	}

	.placeStyle {
		color: #999999;
		font-size: 32rpx;
	}

	.normal-serach {
		padding: 20rpx $uni-spacing-row-lg;
		margin-top: 200rpx;

		.hot-serach {

			image {
				width: 24rpx;
				height: 30rpx;
			}
		}


	}

	.history-serach {
		margin: 30rpx 0;

		image {
			width: 40rpx;
			height: 50rpx;
		}
	}

	.history-hot {
		margin: 10rpx;
	}

	.item-block {
		display: inline-block;
		background: #F6F6F6;
		border-radius: $uni-border-radius-half-circle;
		padding: 12rpx 24rpx;
		margin: 8rpx 20rpx 8rpx 0;
		color: #666;
		font-size: 30rpx;
	}

	.title-txt {
		margin-right: 20rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
	}

	.tab-selected {
		color: $uni-color-primary;
		border-bottom: 6rpx solid $uni-color-primary;
		// font-size: 36rpx;
		font-weight: bold;
	}

	.tab-content {
		border-bottom: 3rpx solid #eee;
		color: #333333;
		font-size: 34rpx;
		position: fixed;
		top: 180rpx;
		left: 0;
		background-color: #FFFFFF;
		right: 0;
		z-index: 9998;

		view {
			padding: 30rpx 4rpx 30rpx 2rpx;
		}
	}

	.serach-content {
		margin-top: 290rpx;
	}

	.news-content,
	.course-content {
		padding: 30rpx $uni-spacing-row-lg 20rpx;
	}

	.course-content {}

	.no-data {
		text-align: center;
		margin: 20rpx;
	}

	.mt {
		margin-top: 200rpx;
	}
</style>
