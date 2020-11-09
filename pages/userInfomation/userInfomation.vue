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
						<userHeadImg width='98rpx' height='98rpx' :url='headImg' />
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
				<view class="right-content flex-between" @click="goEditName">
					<view class="head-img">
						王大锤
					</view>
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item flex-between">
				<view class="head">
					性别
				</view>
				<view class="right-content">
					<view class="head-img">
						男
					</view>
				</view>
			</view>
			<view class="item flex-between">
				<view class="head">
					服务单位
				</view>
				<view class="right-content flex-between">
					<view class="head-img">
						上海宜陆信息科技有限公司
					</view>
					<view class="right-arrow-img">
						<image src="../../static/right-arrow.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import userHeadImg from '@/components/userHeadImg/userHeadImg.vue'
	export default {
		data() {
			return {
				headImg: '',
				genderArr:['男','女'],
				gender:0
			};
		},
		components: {
			userHeadImg
		},
		methods: {
			// 选择头像
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log('zxczxc', res)
						this.headImg = res.tempFilePaths[0]
					},
					fail: (err) => {
						console.error('取消选择')
					}
				})
			},
			goEditName() {
				uni.navigateTo({
					url: './userEditorName'
				})
			},
			changeGender(e){
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
</style>
