<template>
	<view class="user-name" :style="{'color':color?color:'#333'}">
		{{nicknamez?nicknamez:'未知用户'}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nicknamez:''
			};
		},
		props:['color','name'],
		created() {
			let userinfo = uni.getStorageSync('userBasicInfo')
			this.nicknamez = userinfo.nickname
			console.log('userinfo',userinfo)
			if(this.name){
				this.nicknamez = this.name
			}
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
