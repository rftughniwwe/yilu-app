<!-- 学习资料 -->
<template>
	<view>

		<!-- 	<view class="wrap-top-tab-bar">
			<uni-nav-bar leftIcon="arrowleft" @clickLeft="goBack" :style="{'paddingTop':isFullScreen?'64rpx':'30rpx'}">
				<learnTopSlide slot='default' type='3' :tabArr='tabArr' @tabChange="tabSelected" />
			</uni-nav-bar>
		</view> -->

		<!-- <view class="container" :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}"> -->
		<view class="container">
			<view v-show="num=='0'">
				<!-- <template v-if="filesData.list && filesData.list.length >0">
					<view class="item-block flex-row-start" v-for="(item,index) in filesData.list" :key='index'>
						<image class="pdf-docx-img" src="../../../static/files-DOCX.png" mode=""></image>
						<view class="file-content text-overflow2">
							<view class="title">
								{{item.name}}
							</view>
						</view>
						<view class="action-content flex-between">
							<image class="preview-img" src="../../../static/preview-file.png" mode="" @click="previewFile(item)"></image>
							<image class="download-img" src="../../../static/download.png" mode="" @click="downloadFile(item)"></image>
						</view>
					</view>
				</template> -->
				<template v-if="filesData && filesData.length >0">
					<view class="item-block flex-row-start" v-for="(item,index) in filesData" :key='index'>
						<view class="pdf-docx-img">
							<image v-if="item.suffix == 'png' || item.suffix == 'jpg' || item.suffix == 'gif'" :src="item.savePath" mode="" class="sxdcfdiuh" ></image>
							<image v-else-if="item.suffix == 'mp4' || item.suffix == 'flv' || item.suffix == 'm3u8'"  src="../../../static/film.svg" mode="" class="sxdcfdiuh"></image>
							<image v-else-if="item.suffix == 'doc' || item.suffix == 'docx'"  src="../../../static/files-DOCX.png" mode="" class="sxdcfdiuh"></image>
							<image v-else-if="item.suffix == 'pdf'"  src="../../../static/files-PDF.png" mode="" class="sxdcfdiuh"></image>
							<image v-else class="sxdcfdiuh" src="../../../static/file.svg" mode=""></image>
						</view>
						<view class="file-content">
							<view class="title">
								{{item.name}}
							</view>
							<view class="file-size">
								{{item.suffix}}
							</view>
						</view>
						<view class="action-content flex-between">
							<image class="preview-img" src="../../../static/preview-file.png" mode="" @click="previewFile(item)"></image>
							<image class="download-img" src="../../../static/download.png" mode="" @click="downloadFile(item)"></image>
						</view>
					</view>
				</template>
				<template v-else>
					<EmptyData type='serach' />
				</template>

			</view>
			<!-- <view v-show="num=='1'">
				
				<template v-if="filesData.list && filesData.list.length >0">
					 
					 <view class="video-item" v-for="(item,index) in filesData.list" :key='index' v-if="item.type == 1">
					 	<view class="topic text-overflow2">
					 		{{item.name}}
					 	</view>
						<view class="cover flex-evenly" @click="previewFile(item)">
					 		<image src="../../../static/pause-video.png" mode=""></image>
					 	</view>
					 </view>
				</template>
				<template v-else>
					<EmptyData type='serach' />
				</template>
			</view> -->
		</view>
	</view>
</template>

<script>
	import learnTopSlide from '@/components/learnTopSlide/learnTopSlide.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
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
		getLearningTypeInfo
	} from '@/utils/util.js'

	export default {
		data() {
			return {
				tabArr: ['文件', '视频'],
				num: '0',
				isFullScreen: false,
				filesData: {},
				videoSrc: ''
			};
		},
		components: {
			learnTopSlide,
			uniNavBar
		},
		onLoad(options) {
			let id = options.trainid
			if (id) {
				this.getaccessoryList(id)
			} else {
				Toast({
					title: '获取学习资料失败'
				})
			}
			this.isFullScreen = uni.getStorageSync('isFullScreen')

		},
		onUnload() {
			uni.hideLoading()
		},
		methods: {
			// 获取现场培训学习资料
			getaccessoryList(id) {
				uni.showLoading({
					title: '加载中...'
				})
				httpRequest({
					url: 'user/pc/tb/train/learn/attach/list',
					method: 'POST',
					data: {
						"trainId": id,
						"pageSize": 100,
						"pageCurrent": 1
					},
					success: res => {
						uni.hideLoading()
						console.log('学习资料：', res)
						if (res.data.code == 200) {
							let list = res.data.data.list
							list.forEach((item,index)=>{
								let path = item.savePath
								let splitLength = path.split('.').length
								let suffix = path.split('.')[splitLength - 1]
								list[index].suffix = suffix
							})
							this.filesData = list
						} else {
							request_success(res)
						}
					},
					fail: err => {
						uni.hideLoading()
						request_err(err, '获取学习资料失败')
					}
				}, 1)
			},
			tabSelected(data) {
				this.num = data.tab
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			previewFile(item) {
				let path = item.savePath
				let splitLength = path.split('.').length
				let suffix = path.split('.')[splitLength - 1]
				console.log('path:', path)
				if (suffix == 'mp4' || suffix == 'flv' || suffix == 'm3u8') {
					uni.navigateTo({
						url: '../../playVideo/playVideo?video=' + path
					})
				} else if (suffix == 'doc' || suffix == 'xls' || suffix == 'ppt' || suffix == 'pdf' || suffix == 'docx' || suffix ==
					'xlsx' || suffix == 'pptx') {
					uni.downloadFile({
						url: path,
						timeout: 20000,
						success: (res) => {
							uni.hideLoading()
							console.log('下载成功：', res)
							if (res.statusCode === 200) {
								uni.openDocument({
									filePath: res.tempFilePath,
									success: (x) => {
										console.log('打开文档成功')
									},
									fail: err => {
										console.log('打开失败？', err)
									}
								})
							} else {
								Toast({
									title: '下载文件失败'
								})
							}
			
							// uni.saveFile({
							// 	tempFilePath:res
							// })
						},
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								title: '下载失败',
								icon: 'none'
							})
						}
					})
			
				} else if(suffix == 'png' || suffix == 'jpg' || suffix == 'jpeg' || suffix == 'gif'){
					uni.previewImage({
						current:path,
						urls:[path],
						indicator:'default',
						success: (res) => {
							console.log('预览')
						}
					})
				} else {
					Toast({
						title: '该文件暂不支持预览'
					})
				}
			
			},
			downloadFile(item) {
				let path = item.savePath
				uni.showLoading({
					title: '保存中...'
				})
				uni.downloadFile({
					url: path,
					timeout: 20000,
					success: (res) => {
						console.log('下载成功：', res)
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success: resp => {
								uni.hideLoading()
								uni.showToast({
									title: '保存成功:' + resp.savedFilePath,
									icon: 'none'
								})
							},
							fail: err => {
								uni.hideLoading()
								uni.showToast({
									title: '保存失败',
									icon: 'none'
								})
							}
						})
					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '保存失败',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx 30rpx;
	}

	.item-block {
		margin: 20rpx 0 40rpx;

		image {
			margin-right: 30rpx;
		}

		.pdf-docx-img {
			width: 60rpx;
			height: 73rpx;
		}

		.file-img {
			width: 65rpx;
			height: 56rpx;
		}
	}
	.file-content {
		width: 65%;
	}
	.title{
		color: #333333;
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: left;
		margin-bottom: 4rpx;
	}

	.file-size {
		color: #FFB415;
		font-size: 24rpx;
	}

	.video-item {
		border-bottom: 2rpx solid #eaeaea;
		padding: 30rpx 0;
	}

	.topic {
		color: #333333;
		font-size: 34rpx;
		font-weight: bold;
		margin-bottom: 12rpx;
	}

	.cover {
		width: 100%;
		height: 308rpx;
		background-size: 100% 100%;
		background-color: #DFDFDF;

		image {
			width: 148rpx;
			height: 148rpx;
		}
	}

	

	.preview-img {
		width: 38rpx;
		height: 40rpx;
		margin-right: 60rpx;
	}

	.download-img {
		width: 50rpx;
		height: 50rpx;
	}
	.sxdcfdiuh {
		width: 60rpx;
		height: 73rpx;
	}
</style>
