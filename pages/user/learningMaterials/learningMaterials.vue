<!-- 学习资料 -->
<template>
	<view>

		<view class="wrap-top-tab-bar">
			<uni-nav-bar leftIcon="arrowleft" @clickLeft="goBack" :style="{'paddingTop':isFullScreen?'64rpx':'30rpx'}">
				<learnTopSlide slot='default' type='3' :tabArr='tabArr' @tabChange="tabSelected" />
			</uni-nav-bar>
		</view>

		<view class="container" :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}">
			<view v-show="num=='0'">
				<template v-if="filesData.list && filesData.list.length >0">
					<view class="item-block flex-row-start" v-for="(item,index) in filesData.list" :key='index' >
						<image class="pdf-docx-img" src="../../../static/files-DOCX.png" mode=""></image>
						<view class="file-content text-overflow2">
							<view class="title">
								{{item.name}}
							</view>
							<!-- <view class="file-size">
								999MB
							</view> -->
						</view>
						<view class="action-content flex-between">
							<image class="preview-img" src="../../../static/preview-file.png" mode="" @click="previewFile(item)"></image>
							<image class="download-img" src="../../../static/download.png" mode="" @click="downloadFile(item)"></image>
						</view>
					</view>
					<!-- <view class="item-block flex-row-start">
						<image class="pdf-docx-img" src="../../../static/files-DOCX.png" mode=""></image>
						<view class="file-content">
							<view class="title">
								驾驶员安全教育.doc
							</view>
							<view class="file-size">
								999MB
							</view>
						</view>
					</view> -->
				</template>
				<template v-else>
					<EmptyData type='serach' />
				</template>

			</view>
			<view v-show="num=='1'">
				<!-- <view class="video-item">
					<view class="topic text-overflow2">
						危化品运输车安全行车注意事项, 你必须了解！危化品运输车安全行车注意事项, 你必须了解！
					</view>
					<view class="cover flex-evenly" :style="{'background':'url(../../../static/learning-banner2.png)'}">
						<image src="../../../static/pause-video.png" mode=""></image>
					</view>
				</view> -->
				<template>
					<EmptyData type='serach' />
				</template>
			</view>
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
				videoSrc:''
			};
		},
		components: {
			learnTopSlide,
			uniNavBar
		},
		onLoad(options) {
			let id = options.trainid ? options.trainid : uni.getStorageSync('TrainingId')
			if (id) {
				this.getaccessoryList(id)
			} else {
				Toast({
					title: '你没有学习资料'
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
				// 选择的一级分类
				// let categoryId1 = getLearningTypeInfo().categoryId1
				// 选择的二级分类
				// let categoryId2 = getLearningTypeInfo().categoryId2
				// 所属公司ID
				// let compId = getLearningTypeInfo().compId

				httpRequest({
					url: '/user/pc/tb/train/learn/attach/list',
					method: 'POST',
					data: {
						"trainId": id,
						"pageSize":10,
						"pageCurrent":1
					},
					success: res => {
						console.log('学习资料：', res)
						if (res.data.code == 200) {
							this.filesData = res.data.data
						} else {
							request_success(res)
						}
					},
					fail: err => {
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
			previewFile(item){
				let path = item.savePath
				let splitLength = path.split('.').length
				let suffix = path.split('.')[splitLength-1]
				if(suffix == 'mp4' || suffix == 'flv' || suffix == 'm3u8'){
					uni.navigateTo({
						url:'../../playVideo/playVideo?video='+this.path
					})
				}else {
					uni.showToast({
						title:'该文件暂不支持预览',
						icon:'none'
					})
				}
				
			},
			downloadFile(item){
				let path = item.savePath
				uni.showLoading({
					title:'下载中...'
				})
				uni.downloadFile({
					url:path,
					timeout:20000,
					success: (res) => {
						uni.hideLoading()
						console.log('下载成功：',res)
						uni.showToast({
							title:'下载成功'
						})
					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title:'下载失败',
							icon:'none'
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

	.title {
		color: #333333;
		font-size: 30rpx;
		margin-bottom: 6rpx;
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

		image {
			width: 148rpx;
			height: 148rpx;
		}
	}

	.file-content {
		width: 75%;
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
</style>
