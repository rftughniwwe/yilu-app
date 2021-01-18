<!-- 用户信息 -->
<template>
	<view>
		<view class="item-content">
			<view class="item flex-between">
				<view class="head">
					头像
				</view>
				<view class="right-content flex-between" @click="chooseImage">
					<view class="head-img">
						<!-- <userHeadImg width='98rpx' height='98rpx' :url='userinfomation.headImgUrl' /> -->
						<view class="main">
							<image :src="userinfomation.headImgUrl" mode=""></image>
						</view>
					</view>
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item flex-between">
				<view class="head">
					用户名
				</view>
				<view class="right-content flex-between">
					<view class="head-img user-name">
						<!-- <userName :name='userinfomation.nickname'/> -->
						{{name}}
					</view>
					<!-- <view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view> -->
				</view>
			</view>
			<view class="item flex-between">
				<view class="head">
					性别
				</view>
				<view class="right-content">
					<view class="head-img">
						{{gender}}
					</view>
				</view>
			</view>
			<view class="item flex-between">
				<view class="head">
					服务单位
				</view>
				<view class="right-content">
					<view class="head-img">
						{{userinfomation.compName?userinfomation.compName:'未知'}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userHeadImg from '@/components/userHeadImg/userHeadImg.vue'
	import userName from '@/components/userName/userName.vue'
	import {
		uploadImage,
		httpRequest
	} from '@/utils/httpRequest.js'
	import Toast from '@/commons/ResponseTips.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import {
		getUserBasicInfo
	} from '@/commons/api/apis.js'

	export default {
		data() {
			return {
				headImg: '',
				gender: '男',
				userinfomation: {},
				name:''
			};
		},
		components: {
			userHeadImg,
			userName
		},
		onLoad() {
			this.name =  uni.getStorageSync('userCompanyInfo').userName
			this.getInfo()
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				uni.showLoading({
					title: '加载中...'
				})
				httpRequest({
					url: 'user/auth/user/ext/view',
					method: 'POST',
					data: {
						userNo: getUserLoginInfo('userNo')
					},
					success: res => {
						uni.hideLoading()
						console.log('xb', res)
						if (res.data.code == 200) {
							uni.setStorageSync('userBasicInfo', res.data.data)
							let d = res.data.data
							this.userinfomation = d
							let idcard = d.idCardNo.split('')
							this.gender = idcard[16]%2==0?'女':'男'
						}
					},
					fail: err => {
						uni.hideLoading()
						console.log('失败：', err)
					}
				}, 1)
			},
			// 选择头像
			chooseImage() {
				let that = this
				uni.chooseImage({
					count: 1,
					success: (res) => {
						let temp_img = res.tempFilePaths[0]
						console.log('res', res)
						uni.showLoading({
							title: '上传中...'
						})
						uploadImage('course/api/upload/pic', 'picFile', temp_img, {}).then((respones) => {
							uni.hideLoading()
							let img_data = JSON.parse(respones.data)
							console.log('上传图片：', img_data)
							if (img_data.code == 200) {
								that.editHeadImg(img_data.data)
							} else {
								uni.showToast({
									title: '修改错误',
									icon: 'none'
								})
							}
						}, (err) => {
							uni.hideLoading()
							console.log('上传失败，请重试', err)
							Toast({
								title: "上传失败，请重试"
							})
						})
					},
					fail: (err) => {
						console.error('取消选择')
					}
				})
			},
		
			editHeadImg(img) {
				uni.showLoading({
					title: '修改中...'
				})
				httpRequest({
					url: 'user/auth/user/ext/update',
					method: 'post',
					data: {
						headImgUrl: img,
						userNo: getUserLoginInfo('userNo')
					},
					success: res => {
						uni.hideLoading()
						console.log('修改头像', res)
						if (res.data.code == 200) {
							uni.setStorageSync('userBasicInfo', res.data.data)
							uni.showToast({
								title: '修改成功'
							})
							this.getInfo()
						}
					},
					fail: err => {
						uni.hideLoading()
						console.log('错误', err)
					}
				}, 1)
			},
			goEditName() {
				uni.navigateTo({
					url: './userEditorName?name=' + this.userinfomation.nickname
				})
			},
			changeGender(e) {
				this.gender = e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.item-content {
		background-color: #FFFFFF;
	}

	.item {
		padding: 26rpx 30rpx;

		&:not(:last-child) {
			border-bottom: 2rpx solid #EFEFEF;
		}
	}

	.head {
		color: #666;
		font-size: 34rpx;
		letter-spacing: 2rpx;
	}

	.right-content {
		max-width: 60%;
	}

	.head-img {
		color: #333333;
		font-size: 32rpx;
	}

	.right-arrow-img {
		image {
			width: 12rpx;
			height: 20rpx;
			margin-left: 20rpx;
		}

	}

	.user-name {
		font-size: 36rpx;
		color: #333333;
		margin-left: 20rpx;
	}
	.main{
		border-radius: $uni-border-radius-circle;
		background-image: url(../../static/user2.png);
		background-size: 100% 100%;
		background-color: #eeeeee;
		width:98rpx;
		height:98rpx;
		image{
			width: 100%;
			height: 100%;
			border-radius: $uni-border-radius-circle;
		}
	}
</style>
