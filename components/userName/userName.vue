<template>
	<view class="user-name" :style="{'color':color?color:'#333'}">
		{{user.nickname?user.nickname:'未知用户'}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{}
			};
		},
		props:['color'],
		created() {
			let userinfo = uni.getStorageSync('userBasicInfo')
			this.user = userinfo
			console.log('userinfo',userinfo)
		},
		updated(){
			let userinfo = uni.getStorageSync('userBasicInfo')
			this.user = userinfo
		}
	}
</script>

<style lang="scss">
.user-name {
		font-size: 36rpx;
		color: #333333;
		margin-left: 20rpx;
	}
</style>
