<!-- 文章详情页 -->
<template>
	<view class="main">
		<topTabBar text="详情" />
		<view class="article-content">
			<view class="article-topic">
				NBA总裁萧华就莫雷涉港言论发声：我们支持莫雷，也支持蔡崇信
			</view>
			<view class="article-subtitle flex-between">
				<view class="article-from">
					来源：比较大的大提琴
				</view>
				<view class="article-time">
					2020-09-21 13：38：09
				</view>
			</view>
			<view class="content" :style="{'fontSize':globalSize+'rpx'}">
				NBA总裁亚当·萧华终于就莫雷事件发声，他在接受媒体采访的时候表示：“我们是一个平台，是那种人们可以参与自由表达观点的平台，这种参与表达是非常积极的。”
				萧华在接受媒体采访时说：“我支持的是他在这种情况下的言论表达自由，我也支持蔡崇信。我意识到这些都是复杂的问题，它们不容易在社交媒体上出现，我不可能在推特上满足所有人的需求，从而掌控NBA。
				NBA总裁亚当·萧华终于就莫雷事件发声，他在接受媒体采访的时候表示：“我们是一个平台，是那种人们可以参与自由表达观点的平台，这种参与表达是非常积极的。”
				萧华在接受媒体采访时说：“我支持的是他在这种情况下的言论表达自由，我也支持蔡崇信。我意识到这些都是复杂的问题，它们不容易在社交媒体上出现，我不可能在推特上满足所有人的需求，从而掌控NBA。	NBA总裁亚当·萧华终于就莫雷事件发声，他在接受媒体采访的时候表示：“我们是一个平台，是那种人们可以参与自由表达观点的平台，这种参与表达是非常积极的。”
				萧华在接受媒体采访时说：“我支持的是他在这种情况下的言论表达自由，我也支持蔡崇信。我意识到这些都是复杂的问题，它们不容易在社交媒体上出现，我不可能在推特上满足所有人的需求，从而掌控NBA。
			</view>
		</view>
	</view>
</template>

<script>
	import topTabBar from '@/components/topTabBar/topTabBar.vue'
	export default {
		data() {
			return {
				globalSize:34
			};
		},
		onLoad() {
			this.globalSize = uni.getStorageSync('globalFontSize')
		},
		components: {
			topTabBar
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
		font-size: 48rpx;
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
		padding: 30rpx $uni-spacing-row-lg;
	}
</style>
