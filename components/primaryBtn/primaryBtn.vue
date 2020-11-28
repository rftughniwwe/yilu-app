<!-- 主色调的按钮 -->
<template>
	<view class="main-btn" @click="clickHandle" :style="{'borderRadius':radius?radius:'9999rpx'}">
		{{text}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['text','radius'],
		methods:{
			clickHandle(){
				this.$emit('callBackFun')
			}
		}
	}
</script>

<style lang="scss">
.main-btn{
	color: #FFFFFF;
	background-color: $uni-color-primary;
	width: 100%;
	padding: 20rpx 0;
	letter-spacing: 2rpx;
	text-align: center;
	letter-spacing: 2rpx;
}
</style>
