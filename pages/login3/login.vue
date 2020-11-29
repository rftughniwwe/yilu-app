<template>
	<!--pages/login/login.wxml-->
	<view>
		<view class="nav">
			<uni-nav-bar @clickLeft="close()" background-color="#2388ec" color="#fff" left-icon="back" title="登录"></uni-nav-bar>
		</view>
		<view>
			<image @tap="handleTap" class="logo_img" :src="webInfo.logo"></image>
		</view>
		<view>
			<view class="p_relative">
				<image class="login_icon" src="/static/images/phone.svg"></image>
				<input name="username" v-model="userData.username" class="text_item" placeholder="请输入登录手机号"></input>
			</view>
			<view class="p_relative">
				<image class="login_icon" src="/static/images/rock.svg"></image>
				<input name="password" v-model="userData.password" class="text_item" password="true" placeholder="请输入登录密码"></input>
			</view>
			<button formType="submit" @keyup.enter="formSubmit()" @click="formSubmit()" class="login_btn font33">登录</button>
		</view>
	</view>
</template>

<script>
	// pages/login/login.js
	import * as apis from "@/commons/api/website";
	import auth from "@/utils/auth";
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				webInfo: uni.getStorageSync('serviceInfo'),
				ipInfo: {},
				userData: {
					username: '15779094049',
					password: '111111',
				}
			};
		},

		components: {
			uniNavBar
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.webInfo = uni.getStorageSync('serviceInfo')
			// #ifdef H5
			function generateJsonpCallback() {
				return `jsonpcallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
			}

			function jsonp(url, callback) {
				const funcName = generateJsonpCallback();
				window[funcName] = callback;
				const script = document.createElement('script');
				script.src = `${url}?callback=${funcName}`;
				script.type = 'text/javascript';
				document.body.appendChild(script);
			}


			jsonp('//gateway.doityun.com/ip/info', (res) => {
				this.ipInfo = res;
			});
			// #endif

			// #ifdef  APP-PLUS
			uni.request({
				url: 'https://gateway.doityun.com/ip/info', //仅为示例，并非真实接口地址。
				success: (res) => {
					this.ipInfo = res.data;
				}
			});
			// #endif
			this.ipInfo = uni.getStorageSync('IPInfo');
		},
		methods: {
			handleTap() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			formSubmit(e) {
				const data = {
					username: this.userData.username,
					password: this.userData.password,
				};
				const website = uni.getStorageSync('serviceInfo');
				let msg = '';
				data.username = data.username.trim();


				// #ifdef H5 || APP-PLUS

				data.mobile = data.username.trim();
				data.province = this.ipInfo.pro;
				data.loginIp = this.ipInfo.ip;
				data.city = this.ipInfo.city;
				// #ifdef H5
				let osName = this.getOsInfo().name;
				data.clientType = osName.indexOf('Iphone') != -1 ? 3 : 2
				data.os = this.getOsInfo().name + ':' + this.getOsInfo().version
				data.browser =
					this.getBrowserInfo().name + ':' + this.getBrowserInfo().version
				// #endif

				// #ifdef APP-PLUS
				uni.getSystemInfo({
					success: function(res) {
						data.os = res.platform + '-' + res.system,
							data.clientType = res.platform == 'ios' ? 2 : 3;
					}
				});
				data.browser = 'APP'
				// #endif

				apis.userLogin(data).then(res => {
					
					uni.setStorage({
						'key': 'userToken',
						'data': res.token,
						success: () => {
							auth.getUserInfo((data) => {
								uni.$emit('_userLogin', data)
								uni.navigateBack({
									delta: 1
								});
							})
						}
					});
				}, (err) => {
					console.log('错误；；；', err)
				});
				// #endif

				// #ifdef MP-WEIXIN
				apis.binding(data).then(res => {
					auth.login();
					uni.showModal({
						title: '提示',
						content: '账户绑定成功',
						showCancel: false,
						success: function() {
							uni.switchTab({
								url: '/pages/account/index/index'
							});
						}
					});
				});
				// #endif
			},
			getBrowserInfo: function() {
				/* eslint-disable */
				const Sys = {}
				const ua = navigator.userAgent.toLowerCase()
				let s;
				(s = ua.match(/rv:([\d.]+)\) like gecko/)) ?
				(Sys.ie = s[1]) :
				(s = ua.match(/msie ([\d]+)/)) ?
				(Sys.ie = s[1]) :
				(s = ua.match(/edge\/([\d]+)/)) ?
				(Sys.edge = s[1]) :
				(s = ua.match(/firefox\/([\d]+)/)) ?
				(Sys.firefox = s[1]) :
				(s = ua.match(/(?:opera|opr).([\d]+)/)) ?
				(Sys.opera = s[1]) :
				(s = ua.match(/chrome\/([\d]+)/)) ?
				(Sys.chrome = s[1]) :
				(s = ua.match(/version\/([\d]+).*safari/)) ?
				(Sys.safari = s[1]) :
				0
				// 根据关系进行判断
				if (Sys.ie) return {
					name: 'IE',
					version: Sys.ie
				}
				if (Sys.edge) return {
					name: 'EDGE',
					version: Sys.edge
				}
				if (Sys.firefox) return {
					name: 'Firefox',
					version: Sys.firefox
				}
				if (Sys.chrome) return {
					name: 'Chrome',
					version: Sys.chrome
				}
				if (Sys.opera) return {
					name: 'Opera',
					version: Sys.opera
				}
				if (Sys.safari) return {
					name: 'Safari',
					version: Sys.safari
				}
				return {
					name: 'Unkonwn',
					version: '0.0.0'
				}
			},
			// 获取系统信息
			getOsInfo: function() {
				const userAgent = navigator.userAgent.toLowerCase()
				let name = 'Unknown'
				let version = 'Unknown'
				if (userAgent.indexOf('win') > -1) {
					name = 'Windows'
					if (userAgent.indexOf('windows nt 5.0') > -1) {
						version = 'Windows 2000'
					} else if (
						userAgent.indexOf('windows nt 5.1') > -1 ||
						userAgent.indexOf('windows nt 5.2') > -1
					) {
						version = 'Windows XP'
					} else if (userAgent.indexOf('windows nt 6.0') > -1) {
						version = 'Windows Vista'
					} else if (
						userAgent.indexOf('windows nt 6.1') > -1 ||
						userAgent.indexOf('windows 7') > -1
					) {
						version = 'Windows 7'
					} else if (
						userAgent.indexOf('windows nt 6.2') > -1 ||
						userAgent.indexOf('windows 8') > -1
					) {
						version = 'Windows 8'
					} else if (userAgent.indexOf('windows nt 6.3') > -1) {
						version = 'Windows 8.1'
					} else if (
						userAgent.indexOf('windows nt 6.2') > -1 ||
						userAgent.indexOf('windows nt 10.0') > -1
					) {
						version = 'Windows 10'
					} else {
						version = 'Unknown'
					}
				} else if (userAgent.indexOf('iphone') > -1) {
					name = 'Iphone'
				} else if (userAgent.indexOf('mac') > -1) {
					name = 'Mac'
				} else if (
					userAgent.indexOf('x11') > -1 ||
					userAgent.indexOf('unix') > -1 ||
					userAgent.indexOf('sunname') > -1 ||
					userAgent.indexOf('bsd') > -1
				) {
					name = 'Unix'
				} else if (userAgent.indexOf('linux') > -1) {
					if (userAgent.indexOf('android') > -1) {
						name = 'Android'
					} else {
						name = 'Linux'
					}
				} else {
					name = 'Unknown'
				}
				return {
					name,
					version
				}
			},
			close() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	};
</script>
<style scoped>
	.nav {
		/* #ifndef H5*/
		padding-top: 50upx;
		background-color: #2388ec;
		/*#endif */
	}

	/* pages/login/login.wxss */
	.logo_img {
		width: 400upx;
		height: 108upx;
		margin: 100rpx auto;
		display: block;
	}

	.p_relative {
		position: relative;
		width: 656rpx;
		margin: 10rpx auto;
	}

	.login_icon {
		position: absolute;
		width: 20rpx;
		height: 30rpx;
		left: 15rpx;
		top: 35rpx;
	}

	.text_item {
		padding-left: 50rpx;
		height: 100rpx;
		background: #fff;
		width: 606rpx;
		border-radius: 6px;
		font-size: 14px;
	}

	.link_box {
		font-size: 33rpx;
		width: 656rpx;
		margin: 20rpx auto 0;
		display: flex;
		justify-content: space-between;
	}
</style>
