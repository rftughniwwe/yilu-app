<template>
	<view class="main" :style="{'width':width,'height':height}">
		<image :src="url" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['width','height','url'],
		mounted() {
			// 获取用户头像
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
