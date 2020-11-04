<!-- 我的收藏 -->
<template>
	<view>
		<view class="wrap-top-tab-bar" :style="{'paddingTop':isFullScreen?'64rpx':'30rpx'}">
			<uni-nav-bar leftIcon="arrowleft" @clickLeft="goBack">
				<learnTopSlide slot='default' type='3' :tabArr='tabArr' @tabChange="tabSelected" />
			</uni-nav-bar>
		</view>
		
		<view v-show="content=='0'" class="main-content" :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}">
			<specialTopic @clickCollectBtn='collect' @goSpecialTopicDetail='routeJump' selected='true' />
			<specialTopic @clickCollectBtn='collect' @goSpecialTopicDetail='routeJump' selected='true' />
			<specialTopic @clickCollectBtn='collect' @goSpecialTopicDetail='routeJump' selected='true' />
		</view>
		<view v-show="content=='1'" class="article-content" :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}">
			<newCover position='left' />
			<newCover position='right' />
			<newCover position='moreimg' />
			<newCover position='text' />
		</view>
	</view>
</template>

<script>
	import learnTopSlide from '@/components/learnTopSlide/learnTopSlide.vue'
	import specialTopic from '@/components/specialTopic/specialTopic.vue'
	import newCover from '@/components/news-cover/news-cover.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				tabArr: ['专题', '文章'],
				content: '0',
				isFullScreen:false
			};
		},
		components: {
			learnTopSlide,
			specialTopic,
			newCover,
			uniNavBar
		},
		onLoad() {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
		},
		methods: {
			tabSelected(data) {
				this.content = data.tab
			},
			collect() {
				console.log('收藏')
			},
			routeJump() {
				uni.navigateTo({
					url: '../specialTopic/specialTopicDetail'
				})
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	

	.article-content {
		padding: 30rpx;
	}
</style>
