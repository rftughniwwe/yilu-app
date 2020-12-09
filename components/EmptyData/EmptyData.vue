<!-- 空数据组件 -->
<template>
	<view class="container">
		<view class="img-content">
			<image v-if="type =='serach'" src="../../static/serach-no-data.png" mode=""></image>
			<image v-else-if="type == 'chat'" src="../../static/chat-no-data.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showType:''
			};
		},
		props:['type','text'],
		created() {
			this.showType = this.type
		}
	}
</script>

<style lang="scss">
.img-content{
	height: 600rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.txt-content{
	font-size: 26rpx;
	color: #999;
	margin: 30rpx 0;
	text-align: center; 
}
</style>
