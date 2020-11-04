<script>
	import {
		getAcceessToken,
		BD_OCR_KEY,
		BD_OCR_SECRET
	} from '@/utils/httpRequest.js'

	export default {
		onLaunch: function() {

			// 获取token
			getAcceessToken(BD_OCR_KEY, BD_OCR_SECRET).then((res) => {
				uni.setStorageSync('ocr_token', res.data.access_token)
			})



			
			// 判断是否是全面屏，适配自定义的top bar
			if (!uni.getStorageSync('isFullScreen')) {
				let bool = plus.navigator.hasNotchInScreen()
				uni.setStorageSync('isFullScreen', bool)
				uni.setStorageSync('marginTop', '64rpx')
			}

			// 获取全局字体大小，有接口时需从后台获取
			if (!uni.getStorageSync('globalFontSize')) {
				uni.setStorageSync('globalFontSize', 32)
			}



		},
		onShow: function() {

		},
		onHide: function() {

		},
		globalData: {

		}
	}
</script>

<style>
	/*每个页面公共css */

	/* 登录页底部的导航 */
	.login-mode-bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	/* 登录页的标题 */
	.login-title {
		font-size: 42rpx;
		color: $uni-text-color;
		font-weight: bold;
		margin: 90rpx 0 70rpx;
	}

	/* flex布局 */
	.flex-around {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.flex-evenly {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.flex-row-start {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.flex-column-between {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	/* 按钮无边框 */
	.none-border::after {
		border: none;
	}



	.info-item {
		padding: 20rpx 0;
		border-bottom: 1px solid #eaeaea;

		.header {
			color: $uni-text-color;
			font-weight: bold;
			font-size: 34rpx;
		}

		.input-content {
			color: #333333;
		}

	}

	.next {
		width: 100%;
		margin: 80rpx 0 50rpx;
	}

	.bottom-tips {
		color: $uni-text-color-grey;
		font-size: 28rpx;
		margin: 50rpx 0;
		text-align: left;
	}

	.picker-text {
		color: #999;
		font-size: 32rpx;
	}

	.picker-text-normal {
		color: #333;
		font-size: 30rpx;
	}

	/* 文本多行溢出显示省略号 */
	.text-overflow2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.text-overflow5 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		overflow: hidden;
	}
	
	.text-overflow-ellipsis{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/* 自定义顶部导航栏 */
	.wrap-top-tab-bar{
		background: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
</style>
