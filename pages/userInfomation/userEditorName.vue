<!-- 修改姓名 -->
<template>
	<view class="main">
		<view class="input-content flex-between">


			<view class="input">
				<input type="text" v-model="name" value="" placeholder="输入昵称" maxlength="20" />
			</view>
			<view class="clear-img" @click="clearInput">
				<image src="../../static/clear-input.png" mode=""></image>
			</view>
		</view>
		<view class="confirm-btn">
			<primaryBtn text='确认' radius='12rpx' @callBackFun='confirmEdit'/>
		</view>
	</view>
</template>

<script>
	import primaryBtn from '@/components/primaryBtn/primaryBtn.vue'
	export default {
		data() {
			return {
				name: ''
			};
		},
		components:{
			primaryBtn
		},
		methods: {
			clearInput() {
				this.name = ''
			},
			confirmEdit(){
				console.log('new name',this.name)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
	}

	.main {
		
		margin: 20rpx 0 100rpx;
	}
	.input-content{
		padding: 30rpx;
		background-color: #FFFFFF;
	}
	.clear-img {
		image {
			width: 30rpx;
			height: 30rpx
		}
	}

	.input {
		width: 65%;
	}
	.confirm-btn{
		padding: 30rpx;
		margin-top: 100rpx;
	}
</style>
