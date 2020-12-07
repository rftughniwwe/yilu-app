<!-- 专题详情页 -->
<template>
	<view class="main">
		<topTabBar text='none' :isCollectTopicId='item.id' @clickCollect='topicCollection'  @onTopicShare='onShareClick' />
		<view class="banner-content" :style='{backgroundImage:`url(${item.coverPic})`}'>
			<view class="title">
				{{item.labelName}}
			</view>
		</view>
		<scroll-view scroll-y="true">
			<view class="guide">
				<view class="guide-title">
					导读
				</view>
				<view class="guide-content">
					{{item.content}}
				</view>
			</view>
			<view class="related-article">
				<view class="title-article flex-row-start">
					<image src="../../static/article-link.png" mode=""></image>
					<view class="guide-title">
						相关文章
					</view>
				</view>
				<template v-if="articleData && articleData.length > 0">
					<view v-for="(item,index) in articleData">
						<newsCover @GoArticleDetails='goArticleDetails' position='left' :datas='item'/>
					</view>
				</template>
				<template v-else>
					<EmptyData type='serach'/>
				</template>
			</view>
		</scroll-view>
		<uni-popup ref="sharepopup" type="bottom">
			<share-btn :sharedataTemp="sharedata"></share-btn>
		</uni-popup>
	</view>
</template>

<script>
	import topTabBar from '@/components/topTabBar/topTabBar.vue'
	import newsCover from '@/components/news-cover/news-cover.vue'
	import {
		httpRequest,
	} from '@/utils/httpRequest.js'
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	import Toast from '@/commons/showToast.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import shareBtn from '@/components/share-btn/share-btn.vue'
	export default {
		data() {
			return {
				item: {},
				articleData:[],
				sharedata:{}
			};
		},
		components: {
			topTabBar,
			newsCover,
			shareBtn,
			uniPopup
		},
		onLoad(options) {
			this.item = JSON.parse(decodeURIComponent(options.item)) || {}
			this.getArticle()
		},
		methods: {
			onShareClick() {
				this.sharedata = {
					type: 0,
					strShareUrl: "http://www.baidu.com",
					strShareTitle: this.item.labelName,
					strShareSummary: this.item.content,
					strShareImageUrl: this.item.coverPic
				}
				 this.$refs.sharepopup.open()
			},
			goArticleDetails(e) {
				let item = e.item
				uni.navigateTo({
					url: `../aiticlePage/aiticlePage?id=${item.id}&coverImg=${item.blogImg}`
				})
			},
			getArticle() {
				uni.showLoading({
					title:'加载中'
				})
				httpRequest({
					url:'/community/api/blog/list',
					method:'POST',
					data:{
						tagsName:this.item.labelName,
						articleType: 2,
					},
					success:res=>{
						uni.hideLoading()
						console.log('zzz',res)
						if(res.data.code ==200){
							this.articleData = res.data.data.list
						}else {
							request_success(res)
						}
					},
					fail:err=>{
						uni.hideLoading()
						request_err(err,'获取数据失败')
					}
				},3)
			},
			topicCollection(e){
				let c = e.collect
				if(c){
					httpRequest({
						url: '/community/api/labelUserRecord/save',
						method: 'POST',
						data: {
							labelId:this.item.id,
							userIp:'127.0.0.1',
							opType: 1,
							userNo: getUserLoginInfo('userNo'),
							userTerminal:'android'
						},
						success:res=>{
							console.log('收藏专题：',res)
							if(res.data.code == 200){
								uni.showToast({
									title:'专题收藏成功',
									icon:'none'
								})
							}else {
								request_success(res)
							}
						},
						fail:err=>{
							request_err(err,'专题收藏失败')
						}
					},3)
				}else {
					httpRequest({
						url: '/community/api/labelUserRecord/deleteLabelRecord',
						method: 'DELETE',
						data: {
							labelId:this.item.id,
							opType: 1,
							userNo: getUserLoginInfo('userNo'),
						},
						success:res=>{
							console.log('取消收藏专题：',res)
							if(res.data.code == 200){
								uni.showToast({
									title:'取消收藏成功',
									icon:'none'
								})
							}else {
								request_success(res)
							}
						},
						fail:err=>{
							request_err(err,'取消收藏失败')
						}
					},3)
				}
			}
		}
	}
</script>

<style lang="scss">
	.banner-content {
		width: 100%;
		height: 445rpx;
		background-image: url(../../static/collect-bg.png);
		background-size: 100% 100%;
		position: relative;
	}

	.title {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: $uni-spacing-row-lg;
		color: #FFFFFF;
		font-size: 40rpx;
	}

	.guide-title {
		color: #333333;
		// margin-bottom: 30rpx;
		font-size: 38rpx;
		font-weight: bold;
	}

	.guide {
		border-bottom: 20rpx solid #F8F8F8;
		padding: 50rpx $uni-spacing-row-lg;

		.guide-content {
			color: #666;
			font-size: 32rpx;
			padding: 20rpx 0;
			line-height: 1.4;
			letter-spacing: 3rpx;
		}
	}

	.related-article {
		padding: 50rpx $uni-spacing-row-lg;

		.title-article {
			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 30rpx;
			}
		}
	}
</style>
