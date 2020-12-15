<template>
	<view>
		<view class="news-content">
			<template v-if="newsArr && newsArr.length > 0">
				<view v-for="(items,index) in newsArr" :key='index'>
					<newCover @GoArticleDetails='goDetails' position='left' :datas='items'></newCover>
				</view>
				<view v-if="noMore" class="no-more-data">
					没有更多数据了
				</view>
			</template>
			<template v-else>
				<EmptyData type='serach' />
			</template>
		</view>
	</view>
</template>

<script>
	import Toast from '@/commons/showToast.js'
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	import newCover from '@/components/news-cover/news-cover.vue'
	import {
		httpRequest,
		requestQrCodeUrl
	} from '@/utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'

	export default {
		data() {
			return {
				newsArr: [],
				noMore: false,
				pageCurrent: 1
			};
		},
		onLoad() {
			this.getIndexInfomation()
		},
		components: {
			newCover,
			EmptyData
		},
		onReachBottom() {
			// this.pageCurrent += 1
			// this.getIndexInfomation()
		},
		methods: {
			goDetails(e) {
				let item = e.item
				uni.navigateTo({
					url: `../aiticlePage/aiticlePage?id=${item.id}&coverImg=${item.blogImg}`
				})
			},
			// 获取主页数据
			getIndexInfomation() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				httpRequest({
					url: '/community/api/blog/list',
					method: 'POST',
					data: {
						articleType: '2',
						pageCurrent: 1,
						pageSize: 200
					},
					success: resp => {
						uni.hideLoading()
						console.log('首页数据：', resp)
						if (resp.data.code == 200) {
							let list = resp.data.data.list
							if (!list || list.length <= 0) {
								this.noMore = true
								uni.showToast({
									title:'没有更多数据了',
									icon:'none'
								})
							} else {
								this.noMore = false
								// let a = this.newsArr.concat(list)
								this.newsArr = list
							}
						} else {
							Toast({
								title: resp.data.msg
							})
						}
					},
					fail: err => {
						uni.hideLoading()
						console.log(err)
						Toast({
							title: '加载数据失败'
						})
					}
				}, 3)
			},
		}
	}
</script>

<style lang="scss">
	.no-more-data {
		padding: 30rpx 0;
		text-align: center;
		color: $uni-color-primary;
		font-size: 30rpx;
		background-color: #d6d6d6;
	}

	.news-content {
		padding: 0 $uni-spacing-row-lg 40rpx;
	}
</style>
