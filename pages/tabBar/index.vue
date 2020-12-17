<!-- 咨询首页 -->
<template>
	<view class="main">
		<view class="top-content flex-evenly" :style="{'padding': isFullScreen?'100rpx 0 30rpx':'50rpx 0 30rpx'}">
			<view class="camera-qr-code flex-between" @click="scanCode">
				<image src="../../static/camera-code.png" mode=""></image>
			</view>
			<view class="serach-content flex-row-start" @click="goToSerach">
				<image src="../../static/serach-img.png" mode=""></image>
				<text>搜索</text>
			</view>
			<view class="info flex-between" @click="gomyNews">
				<image src="../../static/user-info.png" mode=""></image>
			</view>
		</view>
		<view class="banner-content" :style="{'margin-top':isFullScreen?'194rpx':'142rpx'}">
			<swiper class="swiper-content" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="600" circular="true">
				<swiper-item v-for="(item,index) in bannerDatas" :key='index'>
					<view class="swiper-item">
						<image :src="item.advImg" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="news-content">
			<template v-if="newsArr && newsArr.length > 0">
				<view v-for="(items,index) in newsArr" :key='index'>
					<newCover @GoArticleDetails='goDetails' position='left' :datas='items'></newCover>
				</view>
				<view class="load-more" @click="loadMoreData">
					显示更多
				</view>
			</template>
			<template v-else>
				<EmptyData type='serach' />
			</template>
		</view>
		<view class="special-topic">
			<view class="header flex-between">

				<view class="title flex-between">
					<image src="../../static/speaci-topic.png" mode=""></image>
					专题
				</view>
				<view class="check-more flex-between" @click="goSpeacialTopic">
					<view>
						更多
					</view>
					<image src="../../static/right-arrow.png" mode=""></image>
				</view>
			</view>
			<view class="scroll-content">
				<scroll-view class="scroll-content-items" scroll-x="true">
					<template v-if="topicdata && topicdata.length > 0">
						<view v-for="(item,index) in topicdata" class="item-img" :style="{backgroundImage:`url(${item.coverPic})`}" @click="topicClick(item)">
							<view class="title">
								{{item.labelName}}
							</view>
						</view>
					</template>
					<template v-else>
						<EmptyData type='serach' />
					</template>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import newCover from '@/components/news-cover/news-cover.vue'
	import loadingData from '@/components/loadingData/loadingData.vue'
	import Toast from '@/commons/showToast.js'
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	import {
		httpRequest,
		requestQrCodeUrl
	} from '@/utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		getUserLoginInfo,
		scanCodeReturn,
		getNotRealTime
	} from '@/utils/util.js'
	import {
		getUserBasicInfo,
		getCompanyId
	} from '@/commons/api/apis.js'

	export default {
		data() {
			return {
				isFullScreen: false,
				newsArr: [],
				bannerDatas:[],
				topicdata:[]
			};
		},
		components: {
			newCover,
			loadingData,
			EmptyData
		},
		onLoad() {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
			this.getIndexInfomation()
			this.getUserInfo()
			this.getSwpierBanner()
			this.getTopic()
			getCompanyId()
			// this.getLearningOptions()
		},
		onReachBottom() {
			// this.loadData()
		},
		onPullDownRefresh() {
			this.getIndexInfomation()
			this.getTopic()
			this.getSwpierBanner()
		},
		methods: {
			topicClick(item){
				// let obj = encodeURIComponent(JSON.stringify(item))
				uni.setStorageSync('speacalDetails',item)
				uni.navigateTo({
					url:'../specialTopic/specialTopicDetail'
				})
			},
			// 上拉加载更多
			loadData() {
				this.getIndexInfomation()
			},
			// 获取用户信息
			getUserInfo() {
				let userBasicInfo = uni.getStorageSync('userBasicInfo')
				if (userBasicInfo.compId) {
					return
				}
				let userNo = getUserLoginInfo('userNo')
				getUserBasicInfo(userNo).then(res => {

					console.log('用户基本信息', res)
					if (res.data.code == 200) {
						uni.setStorageSync('userBasicInfo', res.data.data)
					} else {
						request_success(res)
					}
				}, err => {
					console.log('获取用户基本信息失败')
				})
			},
			loadMoreData(){
				uni.navigateTo({
					url:'../allNews/allNews'
				})
				// this.getIndexInfomation()
				// 跳转新闻页
			},
			// 获取主页数据
			getIndexInfomation() {
				uni.showLoading({
					title: '加载资讯中...',
					mask: true
				})
				httpRequest({
					url: '/community/api/blog/list',
					method: 'POST',
					data: {
						articleType: '2',
						pageCurrent:1,
						pageSize:6
					},
					success: resp => {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						console.log('首页数据：',resp)
						if (resp.data.code == 200) {
							let list = resp.data.data.list
							this.newsArr = list
						} else {
							Toast({
								title: resp.data.msg
							})
						}
					},
					fail: err => {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						console.log(err)
						Toast({
							title: '加载数据失败'
						})
					}
				}, 3)
			},
			getTopic(){
				uni.showLoading({
					title:'加载专题中...'
				})
				httpRequest({
					url:'/community/pc/label/list',
					method:'POST',
					data:{
						labelType:3,
						pageCurrent: 1,
						pageSize: 3,
					},
					success:res=>{
						console.log('Topic:',res)
						uni.hideLoading()
						uni.stopPullDownRefresh()
						if(res.data.code == 200){
							let list = res.data.data.list
							this.topicdata = list
						}else {
							request_success(res)
						}
					},
					fail:err=>{
						uni.hideLoading()
						uni.stopPullDownRefresh()
						request_err(err,'获取数据失败')
					}
				},3)
			},
			// 获取学习选项
			getLearningOptions() {
				// uni.showLoading({
				// 	title:'加载中...',
				// 	mask:true
				// })
				// httpRequest({
				// 	url: '/course/api/course/category/categorylist',
				// 	success: resp => {
				// 		console.log('学习选项',resp)
				// 		uni.hideLoading()
				// 		if (resp.data.code == 200) {
				// 			uni.setStorageSync('learningOptions',resp.data.data)
				// 		}else {
				// 			request_success(resp)
				// 		}
				// 	},
				// 	fail: err => {
				// 		uni.hideLoading()
				// 		request_err(err, '获取数据失败')
				// 	}
				// }, 2)
			},

			getSwpierBanner(){
				httpRequest({
					url:'/system/pc/adv/list',
					method:'POST',
					data:{
						advLocation:1,
						mobileTerminalCategory:1
					},
					success:res=>{
						console.log('banner:',res)
						if(res.data.code == 200){
							this.bannerDatas = res.data.data.list
						}else {
							request_success(res)
						}
					},
					fail:err=>{
						request_err(err,'获取数据失败')
					}
				},6)
			},
			
			refreshHandle() {
				this.getIndexInfomation()
			},
			// 前往搜索页
			goToSerach() {
				uni.navigateTo({
					url: '../searchFor/searchFor'
				})
			},
			// 前往咨询详情
			goDetails(e) {
				let item = e.item
				uni.navigateTo({
					url: `../aiticlePage/aiticlePage?id=${item.id}&coverImg=${item.blogImg}`
				})
			},
			goSpeacialTopic() {
				uni.navigateTo({
					url: '../specialTopic/speacialTopicPage'
				})
			},
			gomyNews() {
				uni.navigateTo({
					url: '../user/myNews/myNews'
				})
			},
			scanCode() {
				let sT = getNotRealTime('start')
				let eT = getNotRealTime('end')
				console.log('st', sT)
				console.log('et', eT)
				// 插件扫码
				let obj = {
					"teacher": '王老师',
					"name": "ceshi",
					"limit": 500,
					"lon": "121.506292",
					"startTime": sT,
					"trainIntro": "<p>测试介绍</p>",
					"id": 11,
					"endTime": eT,
					"addr": "浦江科技广场21号楼5",
					"type": 1,
					"lat": "31.0991625",
					"teacherIntro": "<p>介绍</p>"
				}

				uni.scanCode({
					scanType: ['qrCode'],
					onlyFromCamera: true,
					success: res => {
						// 测试用数据
						// 	uni.setStorageSync('scanData', obj)
						// 	uni.navigateTo({
						// 		url: '../onSiteTraining/courseDetails'
						// 	})

						console.log('扫描结果：', res)
						uni.showLoading({
							title: '解析中...'
						})
						requestQrCodeUrl(res.result).then((resp) => {
							scanCodeReturn(resp)
							if (resp.data.code == 200) {
								uni.navigateTo({
									url: '../onSiteTraining/courseDetails'
								})
							} else {
								request_success(resp)
							}
						}, (err) => {
							uni.hideLoading()
							request_err(err, '解析二维码失败')
						})
					},
					fail: err => {
						console.log('扫描失败', err)
					}
				})
			},

		}

	}
</script>

<style lang="scss">
	.main {
		background: #FFFFFF;
		position: relative;
	}

	.top-content {
		background: #FFFFFF;
		width: 100%;
		position: fixed;
		z-index: 9999;
		left: 0;
		top: 0;
		right: 0;

		.camera-qr-code {
			margin-right: 4rpx;

			image {
				width: 44rpx;
				height: 44rpx;
			}
		}

		.serach-content {
			width: 65%;
			border-radius: $uni-border-radius-base;
			background: #F5F5F5;
			padding: 10rpx 20rpx;
			color: $uni-subtitle-text-color;
			font-size: 30rpx;
			// display: flex;
			// justify-content: flex-start;
			// align-items: center;

			image {
				width: 35rpx;
				height: 35rpx;
				margin-right: 10rpx;
			}
		}

		.info {
			image {
				width: 44rpx;
				height: 44rpx;
			}
		}
	}

	.banner-content {
		.swiper-content {
			width: 100%;
			height: 380rpx;

			image {
				width: 100%;
				height: 380rpx;
			}
		}
	}

	.news-content {
		padding: 30rpx $uni-spacing-row-lg 20rpx;
	}

	.special-topic {
		padding: 10rpx $uni-spacing-row-lg 60rpx;

		.header {
			.title {
				color: #333333;
				font-size: 38rpx;

				image {
					margin-right: 20rpx;
					width: 44rpx;
					height: 44rpx;
				}
			}

			.check-more {
				color: #999999;
				font-size: 32rpx;

				image {
					width: 14rpx;
					height: 24rpx;
					margin-left: 8rpx;
				}
			}
		}
	}

	.item-img {
		border-radius: $uni-border-radius-base;
		background-size: 100% 100%;
		width: 400rpx;
		height: 214rpx;
		position: relative;
		display: inline-block;
		margin-right: 20rpx;

		.title {
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			background: #999999;
			opacity: .8;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding: 8rpx 20rpx;
			color: #FFFFFF;
			// width: 360rpx;
		}
	}

	.scroll-content {
		padding: 20rpx 0;
		border-bottom: 1px solid #eaeaea;
	}

	.scroll-content-items {
		// height: 220rpx;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}

	.refresh {
		position: fixed;
		right: 16rpx;
		bottom: 40rpx;

		image {
			width: 133rpx;
			height: 133rpx;
		}
	}
	.load-more{
		padding: 30rpx 0;
		text-align: center;
		color: $uni-color-primary;
		font-size: 30rpx;
		background-color: #FFFFFF;
	}
</style>
