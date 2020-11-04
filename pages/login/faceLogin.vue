<!-- 人脸采集 -->
<template>
	<view class="main">
		<view class="tips">
			<text>根据交通运输部关于在线培训的规范要求，在线学习人员须进行人脸识别功能的设置</text> 
		</view>
		<view class="middle-content">
			<image src="../../static/face-login-img.png" mode=""></image>
		</view>
		<view class="bottom-content flex-evenly">
			<view class="item">
				<image src="../../static/face-login-light.png" mode=""></image>
				<view class="item-txt">避免弱光</view>
			</view>
			<view class="item">
				<image src="../../static/face-login-inter.png" mode=""></image>
				<view class="item-txt">脸在取景框内</view>
			</view>
			<view class="item">
				<image src="../../static/face-login1.png" mode=""></image>
				<view class="item-txt">需正对屏幕</view>
			</view>
		</view>
		<button class="begin-btn none-border" @click="beginFace">开始人脸识别</button>
	</view>
</template>

<script>
	import useFacePlugin from '../../commons/faceplugin.js'
	export default {
		data() {
			return {

			};
		},
		methods:{
			beginFace(){
				useFacePlugin({count:1,random:true}).then((res)=>{
					uni.showToast({
						title:'识别成功',
						icon:'success',
						success() {
							uni.navigateTo({
								url:'../fillInfomation/fillInfomation'
							})
						}
					})
				},(err)=>{
					console.error('识别失败',err)
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding: $uni-spacing-col-base $uni-spacing-row-base;
	}
	.tips{
		text-align: center;
		color: $uni-text-color;
		font-size: 28rpx;
		font-weight: bold;
		width: 77%;
		margin: 40rpx auto;
	}
	.middle-content{
		text-align: center;
		padding: 70rpx 0;
		image{
			width: 420rpx;
			height: 420rpx;
		}
	}
	.bottom-content{
		
		.item{
			text-align: center;
			image{
				width: 58rpx;
				height: 58rpx;
			}
			.item-txt{
				color: $uni-text-color;
				font-size: 26rpx;
				font-weight: bold;
			}
		}
		
	}
	.begin-btn{
		background:$uni-color-primary;
		color: #FFFFFF;
		font-size: 36rpx;
		padding: 8rpx 0;
		border-radius: $uni-border-radius-base;
		margin-top: 40rpx;
		width: 100%;
	}
</style>
