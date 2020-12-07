<!-- 专题组件 -->
<template>
<view class="main">
		<view class="topic-item" @click="goSpeacialDetail(data)">
			<image :src="data.coverPic" mode=""></image>
			<view class="btm-content flex-between">
				<view class="title-time">
					<view class="titile">
						{{data.labelName}}
					</view>
					<view class="time">
						{{data.gmtCreate}}
					</view>
				</view>
				<view :class="data.collectType==1?'collected':'collect-btn'"  @click.stop="collecteClick(data)">
					{{data.collectType==1?'已收藏':'收藏'}}
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
		props:['selected','data'],
		methods:{
			// 收藏按钮点击
			collecteClick(item){
				this.$emit('clickCollectBtn',{item:item})
			},
			// 跳转
			goSpeacialDetail(data){
				this.$emit('goSpecialTopicDetail',{item:data})
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
