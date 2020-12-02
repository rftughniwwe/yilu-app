import * as apis from "@/commons/api/website";
import * as userApi from "@/commons/api/user";
import md5 from "./md5";

const getUserInfo = cb => {
	const userToken = uni.getStorageSync('userToken') || '';

	userApi.getUserInfo({
		noLoading: true
	}).then(res => {
		res.token = userToken;
		
		if (!res.nickname) {
			res.nickname = res.mobile.substr(0, 4) + '****' + res.mobile.substr(-4);
		}
		console.log('userinfo???',res)
		uni.setStorage({
			'key': 'userInfo',
			'data': res,
			success: () => {
				console.log(242)
			}
		});

		if (cb) {
			cb(res);
		}
	});
}; // 清楚用户信息


const clearUserInfo = function() {
	uni.removeStorage({
		key: 'userInfo',
		success: () => { // app.loginRoncoo();
		}
	});
}; // 静默登录,不提示用户


const hideLogin = cb => {
	login().then(res => {
		cb(res);
	}).catch(msg => {
		console.log(msg);
		clearUserInfo();
	});
};
const logout = (cb) => {
	uni.removeStorage({
		key: 'userInfo',
		success: () => { // app.loginRoncoo();
		}
	});
	uni.removeStorage({
		key: 'userToken',
		success: () => { // app.loginRoncoo();
		}
	});
	if (cb) cb()
};
// 登录
const wxlogin = cb => {
	login().then(res => {
		cb(res);
	}).catch(msg => {
		clearUserInfo();

		if (msg.code === 100) {
			uni.setStorage({
				'key': 'wxUniCode',
				'data': msg.data.uniconId
			});
			uni.showModal({
				title: '提示',
				content: '你还没有绑定帐户!',
				confirmText: '立即绑定',
				success: res => {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					} else if (res.cancel) {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}
				},
				fail: () => {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			});
		} else {
			if (!!msg.msg) {
				uni.showToast({
					title: msg.msg,
					icon: 'none'
				});
			}
		}
	});
}; // 静默登录,不提示用户


const login = () => {
	const promise = new Promise((resolve, reject) => {
		const ipInfo = uni.getStorageSync('IPInfo');
		// #ifdef H5 || APP-PLUS
		if (uni.getStorageSync('userToken')) {
			getUserInfo(res => {
				resolve(res)
			})
		} else {
			uni.navigateTo({
				url: '/pages/login/normalLogin'
			});
		}

		uni.$on('_userLogin', function(data) {
			resolve(data)
		})
		return
		// #endif
		
	});
	return promise;
};

const isLogin = () => {
	return uni.getStorageSync('userToken') || '';
}

module.exports = {
	getUserInfo: getUserInfo,
	clearUserInfo: clearUserInfo,
	login: wxlogin,
	logout: logout,
	hideLogin: hideLogin,
	isLogin: isLogin
};
