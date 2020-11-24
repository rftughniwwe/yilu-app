<template>
	<view class="main" :style="{'width':width,'height':height}">
		<image :src="headimg" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headimg:''
			};
		},
		props:['width','height'],
		mounted() {
			// 获取用户头像
			let headurl = uni.getStorageSync('userBasicInfo').headImgUrl
			this.headimg = headurl
		},
		updated() {
			let headurl = uni.getStorageSync('userBasicInfo').headImgUrl
			this.headimg = headurl
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
