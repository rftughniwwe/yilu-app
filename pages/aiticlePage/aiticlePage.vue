<!-- 文章详情页 -->
<template>
	<view class="main">
		<topTabBar text="详情" />
		<view class="article-content">
			<view class="article-topic">
				{{data.summary}}
			</view>
			<view class="article-subtitle flex-between">
				<view class="article-from">
					来源：{{data.bloggerNickname?data.bloggerNickname:'未知用户'}}
				</view>
				<view class="article-time">
					{{data.gmtModified}}
				</view>
			</view>
			<view class="content" :style="{'fontSize':globalSize+'rpx'}">
				<rich-text :nodes="data.content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import topTabBar from '@/components/topTabBar/topTabBar.vue'
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import graceRichText from '@/commons/rich-text.js'
	
	export default {
		data() {
			return {
				globalSize:34,
				data:{}
			};
		},
		onLoad(options) {
			this.globalSize = uni.getStorageSync('globalFontSize')
			this.getNewsData(options.id)
		},
		components: {
			topTabBar
		},
		methods:{
			getNewsData(id){
				
				uni.showLoading({
					title:"加载中..."
				})
				httpRequest({
					url:'/community/api/blog/view',
					method:'POST',
					data:{
						id:id
					},
					success:res=>{
						uni.hideLoading()
						console.log('res',res)
						if(res.data.code == 200){
							this.data = res.data.data
						}else {
							request_success(res)
						}
							
					},
					fail:err=>{
						uni.hideLoading()
						request_err(err,'加载失败')
					}
				},3)
			}
		}
	}
</script>

<style lang="scss">
	.main{
		padding-top: 20rpx;
	}
	.article-content{
		margin-top: 160rpx;
	}
	.article-topic {
		padding: 20rpx $uni-spacing-row-lg 0;
		font-size: 40rpx;
		font-weight: bold;
		letter-spacing: 2rpx;
		color: #121314;
		
	}
	.article-subtitle{
		border-bottom: 2rpx solid #999999;
		padding: 30rpx $uni-spacing-row-lg;
		.article-from{
			font-size: 30rpx;
			color: #666;
		}
		.article-time{
			font-size: 30rpx;
			color: #999;
		}
	}
	.content{
		padding: 50rpx $uni-spacing-row-lg 80rpx;
	}
</style>
