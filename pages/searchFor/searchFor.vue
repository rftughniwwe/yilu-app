<!-- 搜索页面 -->
<template>
	<view class="main">
		<view class="top-search-content flex-between" :style="{'padding':isFullScreen?'100rpx 30rpx 20rpx':'60rpx 30rpx 20rpx'}">
			<image src="../../static/arrow-left.png" mode="" @click="goBack"></image>
			<view class="middle-serach-content flex-row-start">
				<image src="../../static/serach-img.png" mode=""></image>
				<input type="text" value="" v-model="serachVal" placeholder="搜索" placeholder-class="placeStyle" />
			</view>
			<view class="serach-btn">
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
				<view class="item-block">
					危化品运输安全行车
				</view>
				<view class="item-block">
					道路危险货物
				</view>
				<view class="item-block">
					国际反洗钱专业认证
				</view>
				<view class="item-block">
					道路危险货物运输
				</view>
			</view>
			<view class="history-serach flex-between">
				<view class="title-txt">
					历史搜索
				</view>
				<image src="../../static/delete-serach.png" mode=""></image>
			</view>
			<view class="history-hot">
				<view class="item-block">
					危化品运输安全行车
				</view>
				<view class="item-block">
					道路危险货物
				</view>
				<view class="item-block">
					国际反洗钱专业认证
				</view>
				<view class="item-block">
					道路危险货物运输
				</view>
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
			<view v-show="tab===1" class="news-content">
				<newsCover @GoArticleDetails='goDetails' position='left'></newsCover>
				<newsCover @GoArticleDetails='goDetails' position='text'></newsCover>
				<newsCover @GoArticleDetails='goDetails' position='right'></newsCover>
			</view>
			<view v-show="tab===2" class="course-content">
				<course></course>
				<course></course>
				<course></course>
				<course></course>
			</view>
		</view>
	</view>
</template>

<script>
	import newsCover from '@/components/news-cover/news-cover.vue'
	import course from '@/components/course/course.vue'
	export default {
		data() {
			return {
				serachVal: '',
				showModel:'normal',
				tab:1,
				isFullScreen:false
			};
		},
		onLoad(options) {
			// this.showModel = options.model
			this.isFullScreen = uni.getStorageSync('isFullScreen')
		},
		components:{
			newsCover,
			course
		},
		methods:{
			checkoutTab(e){
				this.tab = e
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			goDetails(){
				uni.navigateTo({
					url:'../aiticlePage/aiticlePage'
				})
			}
		}
	}
</script>

<style lang="scss">
	.top-search-content {
		
		border-bottom: 1px solid #eee;

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
	
	.tab-selected{
		color: $uni-color-primary;
		border-bottom:6rpx solid $uni-color-primary;
		// font-size: 36rpx;
		font-weight: bold;
	}
	.tab-content{
		border-bottom: 3rpx solid #eee;
		color:#333333;
		font-size: 34rpx;
		view{
			padding: 30rpx 4rpx 30rpx 2rpx;
		}
	}
	.news-content,.course-content{
		padding: 30rpx $uni-spacing-row-lg 20rpx;
	}
	.course-content{
	
	}
</style>
