<!-- 专题组件 -->
<template>
<view class="main">
		<view class="topic-item" @click="goSpeacialDetail">
			<image src="../../static/banner.png" mode=""></image>
			<view class="btm-content flex-between">
				<view class="title-time">
					<view class="titile">
						疲劳驾驶疲劳驾驶疲劳驾驶疲劳驾驶疲劳驾驶疲劳驾驶疲劳驾驶疲劳驾驶疲劳驾驶疲劳驾驶疲劳驾驶疲劳驾驶
					</view>
					<view class="time">
						2020年09月06日
					</view>
				</view>
				<view :class="selected?'collected':'collect-btn'"  @click.stop="collecteClick">
					
					{{selected?'已收藏':'收藏'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['selected'],
		methods:{
			// 收藏按钮点击
			collecteClick(){
				this.$emit('clickCollectBtn')
			},
			// 跳转
			goSpeacialDetail(){
				this.$emit('goSpecialTopicDetail')
			}
		}
	}
</script>

<style lang="scss">
.main {
		padding: 30rpx $uni-spacing-row-lg;
	}
	.topic-item{
		width: 100%;
		
		border-radius: $uni-border-radius-base;
		margin-bottom: 30rpx;
		image{
			height: 298rpx;
			width: 100%;
		}
	}
	.btm-content{
		margin: 30rpx 0;
	}
	.title-time{
		width: 70%;
	}
	.titile{
		margin-bottom: 30rpx;
		color: #333333;
		font-size: 34rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.time{
		color: #999999;
		font-size: 26rpx;
	}
	.collect-btn{
		border-radius: 14rpx;
		border: 2rpx solid #FE6801;
		color: #FE6801;
		background: #FFFFFF;
		padding: 12rpx 44rpx;
	}
	.collected{
		border: 2rpx solid #F5F6F7;
		color: #BFBFBF;
		background: #F5F6F7;
		padding: 12rpx 44rpx;
		border-radius: 14rpx;
	}
</style>
