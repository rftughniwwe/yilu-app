<!-- 专题详情页 -->
<template>
	<view class="main">
		<topTabBar text='none' />
		<view class="banner-content">
			<view class="title">
				驾驶疲劳
			</view>
		</view>
		<scroll-view scroll-y="true">
			<view class="guide">
				<view class="guide-title">
					导读
				</view>
				<view class="guide-content">
					疲劳驾驶极易引起交通事故，是指驾驶人在长时间连续行车后，产生生理机能和心理机能的失调，而在客观上出现驾驶技能下降的现象。驾驶人睡眠质量差或不足，长时间驾驶车辆，容易缺乏内源氧出现疲劳。
				</view>
			</view>
			<view class="related-article">
				<view class="title-article flex-row-start">
					<image src="../../static/article-link.png" mode=""></image>
					<view class="guide-title">
						相关文章
					</view>
				</view>
				<newsCover @GoArticleDetails='goArticleDetails' position='text'/>
				<newsCover @GoArticleDetails='goArticleDetails' position='left'/>
				<newsCover @GoArticleDetails='goArticleDetails' position='moreimg'/>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import topTabBar from '@/components/topTabBar/topTabBar.vue'
	import newsCover from '@/components/news-cover/news-cover.vue'
	
	export default {
		data() {
			return {

			};
		},
		components: {
			topTabBar,
			newsCover
		},
		methods:{
			goArticleDetails(){
				uni.navigateTo({
					url:'../aiticlePage/aiticlePage'
				})
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
	.title{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: $uni-spacing-row-lg;
		color: #FFFFFF;
		font-size: 40rpx;
	}
	.guide-title{
		color: #333333;
		// margin-bottom: 30rpx;
		font-size: 38rpx;
		font-weight: bold;
	}
	.guide{
		border-bottom: 20rpx solid #F8F8F8;
		padding: 50rpx $uni-spacing-row-lg;
		
		.guide-content{
			color: #666;
			font-size: 32rpx;
			padding: 20rpx 0;
			line-height: 1.4;
			letter-spacing: 3rpx;
		}
	}
	.related-article{
		padding: 50rpx $uni-spacing-row-lg;
		.title-article{
			image{
				width: 30rpx;
				height: 30rpx;
				margin-right: 30rpx;
			}
		}
	}
</style>
