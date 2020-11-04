<!-- 我的消息页面 -->
<template>
	<view class="main">
		<view class="item" @click="newsDetail">
			<view class="img">
				<image src="../../../static/system-news.png" mode=""></image>
				<view class="buble">
					1
				</view>
			</view>
			<view class="middle-content">
				<view class="topic">
					系统消息
					
				</view>
				<view class="subtitle">
					消息内容消息内容消息内容消息内容
				</view>
			</view>
			<view class="time">
				03月22日
			</view>
		</view>
		<view class="item" @click="newsDetail">
			<view class="img">
				<image src="../../../static/system-news.png" mode=""></image>
				<view class="buble">
					1
				</view>
			</view>
			<view class="middle-content">
				<view class="topic">
					系统消息
					
				</view>
				<view class="subtitle">
					消息内容消息内容消息内容消息内容
				</view>
			</view>
			<view class="time">
				03月22日
			</view>
		</view>
		<view class="item" @click="newsDetail">
			<view class="img">
				<image src="../../../static/system-news.png" mode=""></image>
				<view class="buble">
					1
				</view>
			</view>
			<view class="middle-content">
				<view class="topic">
					系统消息
					
				</view>
				<view class="subtitle">
					消息内容消息内容消息内容消息内容
				</view>
			</view>
			<view class="time">
				03月22日
			</view>
		</view>
		<view class="item" @click="newsDetail">
			<view class="img">
				<image src="../../../static/system-news.png" mode=""></image>
				<view class="buble">
					1
				</view>
			</view>
			<view class="middle-content">
				<view class="topic">
					系统消息
					
				</view>
				<view class="subtitle">
					消息内容消息内容消息内容消息内容
				</view>
			</view>
			<view class="time">
				03月22日
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
		methods:{
			newsDetail(){
				console.log('sb')
				uni.navigateTo({
					url:'./newsDetail'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #F7F7F7;
}
.main{
	padding: 30rpx;
}
.item{
	padding: 30rpx;
	background-color: #FFFFFF;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 30rpx;
	border-radius: 18rpx;
}
.img{
	border-radius: 50%;
	width: 102rpx;
	height: 102rpx;
	margin-right: 20rpx;
	position: relative;
	image{
		border-radius: 50%;
		width: 100%;
		height: 100%;
	}
}
.middle-content{
	width: 60%;
	
	.topic{
		color: #333;
		font-size: 34rpx;
		font-weight: bold;
		margin-bottom: 12rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		
	}
	.subtitle{
		color: #666;
		font-size: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
.time{
	color: #999;
	font-size: 24rpx;
}
.buble{
	width: 33rpx;
	height: 33rpx;
	background: #FE5A00;
	color: #FFFFFF;
	border-radius: 50%;
	position: absolute;
	right: -10rpx;
	top: -6rpx;
	z-index: 9899;
	padding: 4rpx;
	text-align: center;
	line-height: 33rpx;
	font-size: 24rpx;
}
</style>
