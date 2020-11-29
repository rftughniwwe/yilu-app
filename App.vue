<script>
	import {
		getAcceessToken,
		BD_OCR_KEY,
		BD_OCR_SECRET,

	} from '@/utils/httpRequest.js'

	import {
		getUserLoginInfo,
	} from '@/utils/util.js'

	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'

	import {
		getUserBasicInfo
	} from '@/commons/api/apis.js'

	import website from "@/utils/website.js";

	export default {
		globalData: {},
		onLaunch: function() {

			// 检查是否登录
			// #ifdef APP-PLUS
			// 已登录并且完善了用户资料
			if (uni.getStorageSync('userStorage').userNo && uni.getStorageSync('userCompleteInfo') == 1) {
				// plus.navigator.closeSplashscreen()
				uni.switchTab({
					url: 'pages/tabBar/index'
				})
				setTimeout(() => {
					plus.navigator.closeSplashscreen()
				}, 1000)
			} else {
				plus.navigator.closeSplashscreen()
			}
			// #endif

			

			// 获取token
			getAcceessToken(BD_OCR_KEY, BD_OCR_SECRET).then((res) => {
				console.log('token获取成功：', res)
				uni.setStorageSync('ocr_token', res.data.data)
			}, (err) => {
				console.log('获取token失败:', err)
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
		onLoad:()=> {
			// 获取用户信息
			let userBasicInfo = uni.getStorageSync('userBasicInfo')
			if (!userBasicInfo) {
				let userNo = getUserLoginInfo('userNo')
				getUserBasicInfo(userNo).then(res => {
			
					console.log('用户基本信息获取：', res)
					if (res.data.code == 200) {
						uni.setStorageSync('userBasicInfo', res.data.data)
					} else {
						request_success(res)
					}
				}, err => {
					console.log('获取用户基本信息失败')
			
				})
			}
		},
		onShow: function() {
			website.serviceInfo(result => {
				uni.setStorageSync('website', result)
				uni.setStorageSync('isMinappAudit', true)
				// #ifdef MP-WEIXIN
				uni.setStorageSync('isMinappAudit', result.isMinappAudit == 0)
				uni.getSystemInfo({
					success: res => {
						let system = res.system.toUpperCase(); // console.log(system)
						if (system.includes('IOS')) {
							uni.setStorageSync('systemType', 'IOS');
							temData.showPrice = !!result.isShowPrice; // console.log(temData)
						} else {
							uni.setStorageSync('systemType', 'Android');
						}
						uni.setStorageSync('showPrice', temData.showPrice);

					}
				});
				// #endif
			})
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

	.text-overflow-ellipsis {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* 自定义顶部导航栏 */
	.wrap-top-tab-bar {
		background: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
	}

	.no-data {
		text-align: center;
		margin: 20rpx;
		font-size: 32rpx;
	}
	
	/* 第三方 */
	.c_fff {
		color: #fff;
	}
	
	.c_333 {
		color: #333;
	}
	
	.c_666 {
		color: #666;
	}
	
	.c_999 {
		color: #999;
	}
	
	.c_eee {
		color: #eee;
	}
	
	.c_red {
		color: #d51423;
	}
	
	.c_gold {
		color: #ca9e70;
	}
	
	.c_blue {
		color: #2488ec;
	}
	
	.c_green {
		color: #00cc33;
	}
	
	.b_fff {
		background: #fff;
	}
	
	.b_000 {
		background: #000;
	}
	
	.font19 {
		font-size: 19rpx;
	}
	
	.font20 {
		font-size: 20rpx;
	}
	
	.font25 {
		font-size: 25rpx;
	}
	
	.font27 {
		font-size: 27rpx;
	}
	
	.font30 {
		font-size: 30rpx;
	}
	
	.font32 {
		font-size: 32rpx;
	}
	
	.font33 {
		font-size: 33rpx;
	}
	
	.font32 {
		font-size: 32rpx;
	}
	
	.font36 {
		font-size: 36rpx;
	}
	
	.font41 {
		font-size: 41rpx;
	}
	
	.font48 {
		font-size: 48rpx;
	}
	
	.font50 {
		font-size: 50rpx;
	}
	
	.font90 {
		font-size: 90rpx;
	}
	
	.font33_bold {
		font-size: 33rpx;
		font-weight: 700;
	}
	
	.font_b {
		font-weight: 700;
	}
	
	.mgb10 {
		margin-bottom: 10rpx;
	}
	
	.mgb30 {
		margin-bottom: 30rpx;
	}
	
	.mgt10 {
		margin-top: 10rpx;
	}
	
	.mgt20 {
		margin-top: 20rpx;
	}
	
	.mgt30 {
		margin-top: 30rpx;
	}
	
	.mgt40 {
		margin-top: 40rpx;
	}
	
	.mgt50 {
		margin-top: 50rpx;
	}
	
	.mgt60 {
		margin-top: 60rpx;
	}
	
	.mgt70 {
		margin-top: 70rpx;
	}
	
	.mgt100 {
		margin-top: 100rpx;
	}
	
	.mgt5px {
		margin-top: 5px;
	}
	
	.mgt8px {
		margin-top: 8px;
	}
	
	.mgl10 {
		margin-left: 10rpx;
	}
	
	.mgl20 {
		margin-left: 20rpx;
	}
	
	.mgl30 {
		margin-left: 30rpx;
	}
	
	.mgr20 {
		margin-right: 20rpx;
	}
	
	.pd20 {
		padding: 20rpx;
	}
	
	.pdb10 {
		padding-bottom: 10rpx;
	}
	
	.pdb30 {
		padding-bottom: 30rpx;
	}
	
	.pdr20 {
		padding-right: 20rpx;
	}
	
	.pdr30 {
		padding-right: 30rpx;
	}
	
	.pdr40 {
		padding-right: 40rpx;
	}
	
	.pdr80 {
		padding-right: 80rpx;
	}
	
	.pdl20 {
		padding-left: 20rpx;
	}
	
	.pdl30 {
		padding-left: 30rpx;
	}
	
	.pdl50 {
		padding-left: 50rpx;
	}
	
	.pdl85 {
		padding-left: 85rpx;
	}
	
	.pdr180 {
		padding-right: 180rpx;
	}
	
	.h60 {
		height: 60rpx;
		line-height: 60rpx;
	}
	
	.h80 {
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.h94 {
		height: 94rpx;
		line-height: 94rpx;
	}
	
	.h108 {
		height: 108rpx;
	}
	
	.w130 {
		display: inline-block;
		width: 130rpx;
	}
	
	.w430 {
		display: inline-block;
		width: 430rpx;
	}
	
	.w487 {
		display: inline-block;
		width: 487rpx;
	}
	
	.text_center {
		text-align: center;
	}
	
	.center_box {
		margin: 0 auto;
	}
	
	.fr {
		float: right;
	}
	
	.fl {
		float: left;
	}
	
	.hr_row {
		width: 100%;
		height: 5px;
		background: rgba(247, 245, 248, 1);
	}
	
	.border_b {
		border-bottom: 1rpx solid rgb(235, 235, 235);
	}
	
	.login_btn {
		margin-top: 30rpx;
		width: 656rpx;
		height: 100rpx;
		border-radius: 6px;
		background: #2388ec;
		color: #fff;
		line-height: 100rpx;
		font-size: 16px;
	}
	
	.no_more {
		height: 80rpx;
		line-height: 80rpx;
	}
	
	.p_relative {
		position: relative;
		box-sizing: border-box;
	}
	
	.inline_box {
		display: inline-block;
	}
	
	.flex_box {
		display: flex;
	}
	
	.flex_column_around {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	
	.flex_row_between {
		display: flex;
		justify-content: space-between;
	}
	
	.arrows {
		position: relative;
		height: 94rpx;
	}
	
	.arrows::before {
		content: '';
		display: inline-block;
		width: 6px;
		height: 6px;
		border-top: 1px solid #999;
		border-right: 1px solid #999;
		transform: rotate(45deg);
		position: absolute;
		top: 50%;
		margin-top: -3px;
		right: 0;
	}
	
	.buy_btn {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 104rpx;
		line-height: 104rpx;
		color: #fff;
		font-size: 33rpx;
		background: #2488ec;
		border-radius: 0;
	}
	
	.o_hide {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.qizi {
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAAXNSR0IArs4c6QAAAc5JREFUaAXtmTFLw2AQhu9atUIRLBZEEYpx1ILO7eKim04FjT/BP+TeKuIgOOjg4qKbCBUFF6WDLtJoRVBbmpxXUYRQ9KJXpXBdyvflzZvne/IlS/A8PUHQhb9YFzK/IRv4X985M27GhQZsqwhFqcXMuJpKYZEZF4pSi5lxNZXCIjMuFKUWM+NqKoVFZlwoSi1mxtVUCovMuFCUWsyMq6kUFplxoSi1mBlXUyksMuNCUWoxM66mUlhkxoWi1GKdM05wQwRNNdJQkSo4Ed0B0Rr5kJ/0LsdeGs8jPLdKQEc8r/p1DxU+F9aZaTeAoBj3KnuTAI2QnLfhyeB4JhFHlwcuIE61y0SZ+xl4yx7CIQCWGk1/a6ZWqUW56GnKycZisIIAS7yITJRzP7KRwJn3gm97qenTOsNWPkp+8Y/nKScHvAiWUGAZQ9Kub8EZ9BaJNgPEYrZ6dSwtjprj4t5EypnDeGsRsICAya862oIz7BOftBP4UPLur/ZnoXNvh3ZwZRhO9qSTi3zMJcJ5ROgJ5z7BiQI+eMCbt1jDh+18tfoYDv/H+HhgNJ3o6y8wvIsEOX4m+NHgjXWWdsoMW/KpvjHtXd/8B5z0mu9vpmXOu6/vHIhQLqp1lQAAAABJRU5ErkJggg==) no-repeat center;
		position: absolute;
		top: 0rpx;
		left: 10rpx;
		width: 80rpx;
		height: 80rpx;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
	}
	
	.text_del {
		text-decoration: line-through;
	}
	
	
</style>
