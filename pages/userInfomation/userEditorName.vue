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
			<primaryBtn text='确认' radius='12rpx' @callBackFun='confirmEdit' />
		</view>
	</view>
</template>

<script>
	import primaryBtn from '@/components/primaryBtn/primaryBtn.vue'
	import {
		uploadImage,
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	
	export default {
		data() {
			return {
				name: ''
			};
		},
		components: {
			primaryBtn
		},
		onLoad(options) {
			this.name = options.name
		},
		methods: {
			clearInput() {
				this.name = ''
			},
			confirmEdit() {
				if(!this.name) return
				uni.showLoading({
					title: '修改中...'
				})
				console.log('zz',this.name)
				httpRequest({
					url: '/user/auth/user/ext/update',
					method: 'post',
					data: {
						nickname: this.name,
						userNo: getUserLoginInfo('userNo')
					},
					success: res => {
						uni.hideLoading()
						console.log('rr',res)
						if (res.data.code == 200) {
							uni.setStorageSync('userBasicInfo', res.data.data)
							uni.showToast({
								title: '修改成功',
								duration:1000
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}
					},
					fail: err => {
						uni.hideLoading()
						console.log('错误', err)
					}
				}, 1)
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

	.input-content {
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

	.confirm-btn {
		padding: 30rpx;
		margin-top: 100rpx;
	}
</style>
