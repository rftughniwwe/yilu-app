<!-- 我的课程 -->
<template>
	<view>
		<view class="tab-content">
			<view @click="chooseTab(1)" :class="tab==1?'selected-items':'item'">
				全部
			</view>
			<view @click="chooseTab(2)" :class="tab==2?'selected-items':'item'">
				未开始
			</view>
			<view @click="chooseTab(3)" :class="tab==3?'selected-items':'item'">
				直播中
			</view>
			<view @click="chooseTab(4)" :class="tab==4?'selected-items':'item'">
				回放
			</view>
		</view>
		<view class="course-contnt">
			<view class="course-item" @click="goPreview">
				<view class="title text-overflow-ellipsis">
					五月安全培训危货
				</view>
				<view class="subtitle">
					2020/09/09 19:30-20:30
				</view>
				<view class="img-content">
					<image src="../../static/banner.png" mode=""></image>
					<view class="tags">
						预告
					</view>
				</view>
			</view>
			<view class="course-item">
				<view class="title text-overflow-ellipsis">
					五月安全培训危货
				</view>
				<view class="subtitle">
					2020/09/09 19:30-20:30
				</view>
				<view class="img-content">
					<image src="../../static/banner.png" mode=""></image>
					<view class="tags">
						直播中
					</view>
				</view>
			</view>
			<view class="course-item">
				<view class="title text-overflow-ellipsis">
					五月安全培训危货
				</view>
				<view class="subtitle">
					2020/09/09 19:30-20:30
				</view>
				<view class="img-content">
					<image src="../../static/banner.png" mode=""></image>
					<view class="tags">
						回放
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab:1
			};
		},
		methods:{
			chooseTab(e){
				console.log(e)
				this.tab = e
			},
			goPreview(){
				uni.navigateTo({
					url:'./coursePreview'
				})
			}
		}
	}
</script>

<style lang="scss">
.tab-content{
	background-color: #EBEFF2;
	padding: 30rpx;
	.item{
		border-radius: 8rpx;
		background-color: #FFFFFF;
		color: #999999;
		font-size: 28rpx;
		display: inline-block;
		margin-right: 40rpx;
		padding: 20rpx 30rpx;
	}
}
.selected-items{
	background-color: #3CA7FF;
	color: #FFFFFF;
	border-radius: 8rpx;
	font-size: 28rpx;
	display: inline-block;
	margin-right: 40rpx;
	padding: 20rpx 30rpx;
}
.course-contnt{
	padding:0 30rpx 30rpx;
	background-color: #FFFFFF;
}
.course-item{
	border-bottom: 2rpx solid #DDDDDD;
	padding:40rpx 0 30rpx;
	.title{
		color: #333333;
		font-size: 34rpx;
		width: 100%;
		font-weight: bold;
		letter-spacing: 2rpx;
	}
	.subtitle{
		color: #999999;
		margin: 10rpx 0 30rpx;
		font-size: 26rpx;
	}
	.img-content{
		height: 300rpx;
		width: 100%;
		background: #eeeeee;
		position:relative;
		image{
			width: 100%;
			height: 100%;
		}
		.tags{
			background-color: #F92E6D;
			color: #FFFFFF;
			font-size: 28rpx;
			padding: 4rpx 34rpx;
			border-bottom-left-radius: 22rpx;
			position: absolute;
			right: 0;
			top: 0;
		}
	}
}
</style>
