<template>
	<view class="main" :style="{'width':width,'height':height}">
		<image :src="headimg" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headimg:''
			};
		},
		props:['width','height','url'],
		mounted() {
			// 获取用户头像
			let headurl = uni.getStorageSync('userBasicInfo').headImgUrl
			if(this.url){
				console.log('传过来的用户头像：',this.url)
				this.headimg = this.url
			}else if(this.url == 'default'){
				this.headimg = '../../static/user2.png'
			}else {
				this.headimg = headurl
			}
			
		},
		updated() {
			let headurl = uni.getStorageSync('userBasicInfo').headImgUrl
			if(this.url){
				this.headimg = this.url
			}else {
				this.headimg = headurl
			}
		}
	}
</script>

<style lang="scss">
.main{
	border-radius: $uni-border-radius-circle;
	background-image: url(../../static/user2.png);
	background-size: 100% 100%;
	background-color: #eeeeee;
	image{
		width: 100%;
		height: 100%;
		border-radius: $uni-border-radius-circle;
	}
}
</style>
