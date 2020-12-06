<!-- 视频播放 -->
<template>
	<view>
		<video class="video" :src="videoSrc" controls autoplay></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoSrc:''
			};
		},
		onLoad(options) {
			if(!options.video){
				uni.showToast({
					title:'播放错误',
					icon:'none'
				})
				return
			}
			this.videoSrc = options.video
		}
	}
</script>

<style lang="scss">
.video{
	width: 100%;
	height: 600rpx;
}
</style>
