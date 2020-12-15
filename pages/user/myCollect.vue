<!-- 我的收藏 -->
<template>
	<view class="main">
		<view class="wrap-top-tab-bar" :style="{'paddingTop':isFullScreen?'64rpx':'30rpx'}">
			<uni-nav-bar leftIcon="arrowleft" @clickLeft="goBack" :rightText="content=='0'?'':showRemove?'取消':'编辑'" @clickRight="removeContent">
				<learnTopSlide slot='default' type='3' :tabArr='tabArr' @tabChange="tabSelected" />
			</uni-nav-bar>
		</view>

		<view v-show="content=='0'" class="main-content" :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}">
			<template v-if="topicCollect && topicCollect.length > 0">
				<view v-for="(item,index) in topicCollect" :key='index'>
					<specialTopic @clickCollectBtn='collect' @goSpecialTopicDetail='routeJump' selected='true' :data='item' />
				</view>
			</template>
			<template v-else>
				<EmptyData type='serach' />
			</template>

		</view>

		<view v-show="content=='1'" class="article-content" :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}">
			<template v-if="articleCollect && articleCollect.length > 0">

				<view class="flex-between editor" v-for="(item,index) in articleCollect" :key='index' @click="selectedItem(index)">
					<view v-show="showRemove" class="circle-point">
						<view class="point-content flex-between" :style="{'border-color':selectItem == index?'#F45B5A':'#BFBFBF','background-color':selectItem == index?'#F45B5A':'#FFF'}">
							<image v-show="selectItem == index" src="../../static/selected.png" mode=""></image>
						</view>
					</view>
					<!-- <view class="right"> -->
					<newCover @GoArticleDetails='goDetails' position='left' :datas='item' />
					<!-- </view> -->
				</view>
			</template>
			<template v-else>
				<EmptyData type='serach' />
			</template>
		</view>
		<view v-show="showRemove" class="remove-content flex-around">
			<view class="remvoe-all" @click="removeAllCollection">
				全部清空
			</view>
			<view class="delete" :style="{'color':selectItem!=-1?'#F45B5A':'#999999'}" @click="removeSingle">
				删除
			</view>
		</view>
	</view>
</template>

<script>
	import learnTopSlide from '@/components/learnTopSlide/learnTopSlide.vue'
	import specialTopic from '@/components/specialTopic/specialTopic.vue'
	import newCover from '@/components/news-cover/news-cover.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		httpRequest,
	} from '@/utils/httpRequest.js'

	export default {
		data() {
			return {
				tabArr: ['专题', '文章'],
				content: '0',
				isFullScreen: false,
				showRemove: false,
				selectedRemoveItem: '',
				topicCollect: [],
				articleCollect: [],
				selectItem: -1,
				selectItemData: {}
			};
		},
		components: {
			learnTopSlide,
			specialTopic,
			newCover,
			uniNavBar,
			EmptyData
		},
		onLoad() {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
			this.getAllCollection()
			this.getAllCollectionArticle()
		},
		methods: {
			goDetails(e) {
				if (this.showRemove) return
				let item = e.item
				uni.navigateTo({
					url: `../aiticlePage/aiticlePage?id=${item.id}&coverImg=${item.blogImg}`
				})
			},
			getAllCollection() {
				uni.showLoading({
					title: '加载中'
				})
				httpRequest({
					url: '/community/api/labelUserRecord/selectLabellist',
					method: 'POST',
					data: {
						"opType": 1,
						"statusId": 1,
						"userNo": getUserLoginInfo('userNo')
					},
					success: res => {
						uni.hideLoading()
						console.log('zz', res)
						if (res.data.code == 200) {
							let list = res.data.data
							list.forEach((i, index) => {
								list[index].collectType = 1
							})
							this.topicCollect = list
						} else {
							request_success(res)
						}
					},
					fail: err => {
						uni.hideLoading()
					}
				})
			},
			getAllCollectionArticle() {
				httpRequest({
					url: '/community/api/blog/userRecordlist',
					method: 'POST',
					data: {
						articleType: 2,
						opType: 1,
						userNo: getUserLoginInfo('userNo')
					},
					success: res => {
						console.log('收藏文章：',res)
						if (res.data.code == 200) {
							let list = res.data.data
							this.articleCollect = list
						} else {
							request_success(res)
						}
					},
					fail: err => {
						request_err(err, '查询是否收藏失败')
					}
				}, 3)
			},
			tabSelected(data) {
				this.selectedRemoveItem = ''
				this.content = data.tab
				this.showRemove = false
			},
			// 收藏按钮点击
			collect(e) {
				let item = e.item
				if (item.collectType == 1) {
					httpRequest({
						url: '/community/api/labelUserRecord/deleteLabelRecord',
						method: 'DELETE',
						data: {
							labelId: item.id,
							opType: 1,
							userNo: getUserLoginInfo('userNo'),
						},
						success: res => {
							console.log('取消收藏专题：', res)
							if (res.data.code == 200) {
								this.getAllCollection()
								uni.showToast({
									title: '取消收藏成功',
									icon: 'none',
									duration: 1500
								})

							} else {
								request_success(res)
							}
						},
						fail: err => {
							request_err(err, '取消收藏失败')
						}
					}, 3)
				}
			},
			// 跳转
			routeJump(e) {
				let obj = encodeURIComponent(JSON.stringify(e.item))
				uni.navigateTo({
					url: '../specialTopic/specialTopicDetail?item=' + obj
				})
			},
			// 返回 
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 删除
			removeContent() {
				if (this.showRemove) {
					this.selectedRemoveItem = ''
				}
				this.showRemove = !this.showRemove
			},
			// 选中项
			selectedItem(num) {
				if (this.showRemove) {
					this.selectItem = num
					this.selectItemData = this.articleCollect[num]
					// this.selectedRemoveItem = num
				}
			},
			removeSingle() {
				if (this.selectItem == -1) return
				httpRequest({
					url: '/community/auth/blog/user/record/delete',
					method: 'POST',
					data: {
						opType: 1,
						userNo: getUserLoginInfo('userNo'),
						weblogId: this.selectItemData.blogId
					},
					success: res => {
						if (res.data.code == 200) {
							this.selectItem = -1
							uni.showToast({
								title: '删除成功',
								icon: 'none'
							})
							this.getAllCollectionArticle()
						} else {
							request_success(res)
						}
					},
					fail: err => {
						request_err(err, '删除失败')
					}
				}, 3)
			},
			removeAllCollection() {
				uni.showModal({
					title: '提示',
					content: '确认删除全部文章？',
					success: res => {
						if (res.confirm) {
							httpRequest({
								url: '/community/api/blog/user/record/deleteList',
								method: 'DELETE',
								data: {
									"articleType": 2,
									"opType": 1,
									"userNo": getUserLoginInfo('userNo')
								},
								success: res => {
									if (res.data.code == 200) {
										uni.showToast({
											title: '删除成功',
											icon: 'none',
											duration:1500
										})
										this.getAllCollectionArticle()
									} else {
										request_success(res)
									}
								},
								fail: err => {
									request_err(err, '删除失败')
								}
							}, 3)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		position: relative;
	}

	.circle-point {
		padding-right: 30rpx;

	}

	.editor {
		// width: 15%;
	}

	.right {
		width: 80%;
		white-space: nowrap;
	}

	.point-content {
		width: 42rpx;
		height: 42rpx;
		border-radius: 50%;
		background-color: #FFFFFF;
		border: 1rpx solid #BFBFBF;

		image {
			width: 44rpx;
			height: 44rpx;
			border-radius: 50%;
		}
	}

	.article-content {
		padding: 30rpx;
	}

	.main-content,
	.article-content {
		margin-bottom: 50rpx;
	}

	.remove-content {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		padding: 30rpx 0;
		border-top: 2rpx solid #EAEAEA;
	}

	.remvoe-all {
		border-right: 2px solid #EAEAEA;
		font-size: 30rpx;
		color: #333333;
		text-align: center;
		width: 50%;
	}

	.delete {
		font-size: 30rpx;
		text-align: center;
		width: 50%;
	}
</style>
