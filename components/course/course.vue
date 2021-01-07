<!-- 课程item -->
<template>
	<view class="main" @click="itemClick(datas)">
		<view class="item-content flex-between">
			<view class="img-content">
				<image :src="datas.courseLogo || ''" mode=""></image>
			</view>
			<view class="right-content flex-column-between">
				<view class="title text-overflow2">
					{{datas.courseName || '未知'}}
				</view>
				<view class="time-from">
					<view class="time">
						{{datas.startTime || '未知'}}
					</view>
					<view class="from">
						{{author}}：{{datas.lecturerName || '未知'}}
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
				datas:{},
				author:''
			};
		},
		props:['data','authorzz'],
		created() {
			this.datas = this.data?this.data:{},
			this.author = this.authorzz?this.authorzz:'主持人'
		},
		methods:{
			itemClick(item){
				this.$emit('courseClick',{item:item})
			}
		}
	}
</script>

<style lang="scss">
	.item-content {
		border-bottom: 2rpx solid #EAEAEA;
		padding: 20rpx 0;
	}
	.title{
		width: 100%;
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	.time,.from{
		color: #999;
		font-size: 24rpx;
	}
	.img-content{
		width:40%;
		height: 170rpx;
		background-color: #999999;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.right-content{
		width: 55%;
		margin: 0 20rpx;
	}
</style>
