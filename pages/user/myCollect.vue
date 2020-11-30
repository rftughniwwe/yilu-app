<!-- 我的收藏 -->
<template>
	<view class="main">
		<view class="wrap-top-tab-bar" :style="{'paddingTop':isFullScreen?'64rpx':'30rpx'}">
			<uni-nav-bar leftIcon="arrowleft" @clickLeft="goBack" :rightText="content=='0'?'':showRemove?'取消':'编辑'" @clickRight="removeContent">
				<learnTopSlide slot='default' type='3' :tabArr='tabArr' @tabChange="tabSelected" />
			</uni-nav-bar>
		</view>

		<view v-show="content=='0'" class="main-content" :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}">
			<specialTopic @clickCollectBtn='collect' @goSpecialTopicDetail='routeJump' selected='true' />
			<specialTopic @clickCollectBtn='collect' @goSpecialTopicDetail='routeJump' selected='true' />
			<specialTopic @clickCollectBtn='collect' @goSpecialTopicDetail='routeJump' selected='true' />
		</view>

		<view v-show="content=='1'" class="article-content" :style="{'marginTop':isFullScreen?'150rpx':'120rpx'}">
			<template v-if="false">

				<view class="flex-between editor" @click="selectedItem(1)">
					<view v-show="showRemove" class="circle-point">
						<view class="point-content flex-between" :style="{'border-color':selectedArr == '1'?'#F45B5A':'#BFBFBF'}">
							<image v-show="selectedArr == '1'" src="../../static/selected.png" mode=""></image>
						</view>
					</view>
					<!-- <view class="right"> -->
					<newCover position='left' :datas='{}' />
					<!-- </view> -->
				</view>
				<view class="flex-between editor" @click="selectedItem(2)">
					<view v-show="showRemove" class="circle-point">
						<view class="point-content flex-between" :style="{'border-color':selectedArr == '2'?'#F45B5A':'#BFBFBF'}">
							<image v-show="selectedArr == '2'" src="../../static/selected.png" mode=""></image>
						</view>
					</view>
					<newCover position='text' :datas='{}' />
				</view>
				<view class="flex-between editor" @click="selectedItem(3)">
					<view v-show="showRemove" class="circle-point">
						<view class="point-content flex-between" :style="{'border-color':selectedArr == '3'?'#F45B5A':'#BFBFBF'}">
							<image v-show="selectedArr == '3'" src="../../static/selected.png" mode=""></image>
						</view>
					</view>
					<newCover position='moreimg' :datas='{}' />
				</view>
				<view class="flex-between editor" @click="selectedItem(4)">
					<view v-show="showRemove" class="circle-point">
						<view class="point-content flex-between" :style="{'border-color':selectedArr == '4'?'#F45B5A':'#BFBFBF'}">
							<image v-show="selectedArr == '4'" src="../../static/selected.png" mode=""></image>
						</view>
					</view>
					<newCover position='right' :datas='{}' />
				</view>
			</template>
			<template v-else>
				<EmptyData/>
			</template>
		</view>
		<view v-show="showRemove" class="remove-content flex-around">
			<view class="remvoe-all">
				一键清空
			</view>
			<view class="delete" :style="{'color':selectedArr?'#F45B5A':'#999999'}">
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
	
	export default {
		data() {
			return {
				tabArr: ['专题', '文章'],
				content: '0',
				isFullScreen: false,
				showRemove: false,
				selectedArr: ''
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
		},
		methods: {
			tabSelected(data) {
				this.selectedArr = ''
				this.content = data.tab
				this.showRemove = false
			},
			// 点击了已收藏按钮，应该取消收藏
			collect() {
				console.log('取消收藏')
			},
			// 跳转
			routeJump() {
				uni.navigateTo({
					url: '../specialTopic/specialTopicDetail'
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
					this.selectedArr = ''
				}
				this.showRemove = !this.showRemove
			},
			// 选中项
			selectedItem(num) {
				if (this.showRemove) {

					this.selectedArr = num
				}
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
		border: 2rpx solid #BFBFBF;
		padding: 2rpx;

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
