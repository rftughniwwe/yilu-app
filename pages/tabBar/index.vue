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
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/index-banner1.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/index-banner2.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/index-banner3.png" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="news-content">
			<template v-if="newsArr && newsArr.length > 0">
				<view v-for="(items,index) in newsArr" :key='index'>
					<newCover @GoArticleDetails='goDetails' position='left' :datas='items'></newCover>
				</view>
			</template>
			<template v-else>
				<EmptyData type='serach'/>
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
					<view class="item-img">
						<view class="title">
							专题专题专题专题专题专题
						</view>
					</view>
					<view class="item-img">
						<view class="title">
							专2题专题2专题2专题2专题2专题2
						</view>
					</view>
				</scroll-view>
				<newCover position='text'></newCover>
				<newCover position='right'></newCover>
			</view>
		</view>
		<!-- <loadingData v-if="reachBtm"></loadingData> -->
		<view class="refresh" @click="refreshHandle">
			<image src="../../static/refresh.png" mode=""></image>
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
	} from '@/utils/util.js'
	import {
		getUserBasicInfo
	} from '@/commons/api/apis.js'
	
	export default {
		data() {
			return {
				isFullScreen: false,
				newsArr: []
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
			// this.getLearningOptions()
		},
		onReachBottom() {
			this.loadData()
		},
		onPullDownRefresh() {
			this.getIndexInfomation()
		},
		methods: {
			// 上拉加载更多
			loadData() {
				this.getIndexInfomation()

			},
			// 获取用户信息
			getUserInfo(){
				let userBasicInfo = uni.getStorageSync('userBasicInfo')
				if(userBasicInfo.compId){
					return
				}
				let userNo = getUserLoginInfo('userNo')
				getUserBasicInfo(userNo).then(res=>{
					
					console.log('用户基本信息',res)
					if(res.data.code == 200){
						uni.setStorageSync('userBasicInfo',res.data.data)
					}else {
						request_success(res)
					}
				},err=>{
					console.log('获取用户基本信息失败')
					
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
					data:{
						articleType:'2'
					},
					success: resp => {
						uni.hideLoading()
						uni.stopPullDownRefresh()
						if (resp.data.code == 200) {
							this.newsArr = resp.data.data.list
						} else {
							Toast({
								title: resp.data.msg
							})
						}
					},
					fail: err => {
						uni.stopPullDownRefresh()
						uni.hideLoading()
						console.log(err)
						Toast({
							title: '加载数据失败'
						})
					}
				}, 3)
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
				let id = e.newsId
				uni.navigateTo({
					url: '../aiticlePage/aiticlePage?id=' + id
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
				// let mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module")
				// mpaasScanModule.mpaasScan({
				// 	'type': 'qr',
				// 	'scanType': ['qrCode', 'barCode'],
				// 	'hideAlbum': true
				// }, (res) => {
				// 	console.log('首页扫描结果1',res)
				// 	console.log('首页扫描结果2',JSON.parse(res))
				// 	uni.navigateTo({
				// 		url:'../onSiteTraining/courseDetails?scanres='+res
				// 	})
				// })
				uni.scanCode({
					scanType: ['qrCode'],
					onlyFromCamera: true,
					success: res => {
						console.log('扫描结果：',res.result)
						uni.showLoading({
							title:'解析中...'
						})
						requestQrCodeUrl(res.result).then((res)=>{
							uni.hideLoading()
							console.log('解析结果',res)
							uni.setStorageSync('scanData',res.data.data)
							
						},(err)=>{
							uni.hideLoading()
							request_err(err,'解析二维码失败')
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
		background-image: url(../../static/banner2.png);
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
</style>
