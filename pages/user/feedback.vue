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
						<image src="../../static/close-img.png" mode=""></image>
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
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import {
		httpRequest,
		uploadImage
	} from '@/utils/httpRequest.js'
	
	
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
		onUnload() {
			uni.hideLoading()
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
						this.uploadImagezz(tempFile)
						
					},
					fail:(err)=> {
						console.log('选择失败')
					}
				})
			},
			uploadImagezz(path){
				uni.showLoading({
					title:'上传图片中...',
					mask:true
				})
				uploadImage('/course/api/upload/pic', 'picFile', path, {}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:'上传成功',
						icon:'none',
						duration:1000
					})
					let img = JSON.parse(res.data).data
					console.log('iiiii',img)
					this.imgArr.push(img)
				},err=>{
					uni.hideLoading()
					console.log('上传图片失败')
				})
			},
			
			removeImg(index){
				this.imgArr.splice(index,1)
			},
			submit(){
				let content = this.contents
				console.log('imgs',this.imgArr)
				if(!content){
					uni.showToast({
						title:'请填写内容',
						icon:'none'
					})
					return
				}
				let userno = getUserLoginInfo('userNo')
				let p = {
					backContent:this.contents,
					backPics:this.imgArr,
					userNo:userno
				}
				let a = ''
				if(this.imgArr.length <= 1){
					a = this.imgArr[0]
				}else {
					this.imgArr.forEach((item,index)=>{
						if(index == 0){
							a = a + item
						}else {
							a = a +',' + item
						}
						
					})
				}
				p.backPics = a
				console.log('ppp',p)
				httpRequest({
					url:'/user/pc/tb/feedback/save',
					method:'POST',
					data:p,
					success:res=>{
						console.log('反馈成功：',res)
						if(res.data.code == 200){
							uni.showToast({
								title:'反馈成功',
								icon:'none',
								duration:1000
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}else {
							uni.showToast({
								title:'反馈失败，请重试',
								icon:'none'
							})
						}
					},
					fail:err=>{
						console.log('反馈失败：',err)
						
					}
				},1)
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
	right: 0;
	top: 0;
	background-color: #FFF;
	opacity: .8;
	border-radius: 50%;
	padding: 10rpx;
	z-index: 9999;
	// border: 2rpx solid #eee;
	image{
		width: 30rpx;
		height: 30rpx;
	}
}
</style>
