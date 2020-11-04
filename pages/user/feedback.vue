<!-- 意见反馈 -->
<template>
	<view class="container">
		<view class="feedback-content">
			<view class="topic">
				反馈内容
			</view>
			<view class="contents">
				<textarea class="text-area" v-model="contents" value="" placeholder="请简要描述您的问题,以便我们提供更好地帮助"/>
			</view>
		</view>
		<view class="upload-img">
			<view class="topic">
				图片上传
			</view>
			<view class="upload">
	
				<view v-if="imgArr && imgArr.length > 0" v-for="(item,index) in imgArr" :key="index" class="upload-item uploaded">
					<image class="xxx" :src="item" mode=""></image>
					<view class="remove-img flex-evenly" @click="removeImg(index)">
						<image src="../../static/x.svg" mode=""></image>
					</view>
				</view>
				<view class="upload-item increase flex-evenly" @click="chooseImage">
					<image src="../../static/plus.svg" mode=""></image>
				</view>
			</view>
		</view>
		<view class="submit-btn">
			<primaryBtn text='提交' @callBackFun='submit'/>
		</view>
	</view>
</template>

<script>
	import primaryBtn from '@/components/primaryBtn/primaryBtn.vue'
	export default {
		data() {
			return {
				imgArr:[],
				contents:''
			};
		},
		components:{
			primaryBtn
		},
		methods:{
			chooseImage(){
				if(this.imgArr.length >= 4){
					uni.showToast({
						title:'最多上传四张',
						icon:'none'
					})
					return
				}
				
				uni.chooseImage({
					count:1,
					success:(res)=> {
						let tempFile = res.tempFilePaths[0]
						this.imgArr.push(tempFile)
					},
					fail:(err)=> {
						console.log('选择失败')
					}
				})
			},
			removeImg(index){
				
				this.imgArr.splice(index,1)
			},
			submit(){
				let content = this.contents
				if(!content){
					uni.showToast({
						title:'请填写内容',
						icon:'none'
					})
					return
				}
				
			}
		}
	}
</script>

<style lang="scss">
.container{
	padding: 40rpx 30rpx;
}
.topic{
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 36rpx;
}
.contents{
	margin-bottom: 20rpx;
}
.upload{
	// float: left;
	overflow: hidden;
}
.upload-item{
	// display: inline-block;
	width: 200rpx;
	height: 200rpx;
	margin-right: 24rpx;
	margin-bottom: 30rpx;
	border-radius: 14rpx;
	float: left;
	.xxx{
		width: 100%;
		height: 100%;
		border-radius: 14rpx;
	}
}
.increase{
	border: 2rpx dotted #d8d8d8;
	text-align: center;
	background-color: #FFFFFF;
	image{
		width: 120rpx;
		height: 120rpx;
	}
}
.submit-btn{
	margin: 100rpx 0 30rpx;
}
.text-area{
	width:100%
}
.uploaded{
	position: relative;
	border: 2rpx solid #d8d8d8;
}
.remove-img{
	position: absolute;
	right: -8rpx;
	top: -26rpx;
	width: 60rpx;
	height: 60rpx;
	background-color: #FFFFFF;
	border-radius: 50%;
	border: 2rpx solid #eee;
	image{
		width: 50rpx;
		height: 50rpx;
	}
}
</style>
