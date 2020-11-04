const permission = require('common/permission.js')

/**
 * 请求Android ios权限
 *    1.支持全部同时请求
 *    2.如果只想请求IOS权限, 请设置androidPermission为[]
 *    3.如果只想请求Android权限,请设置iosPermission为''
 * @param {Object} iosPermission      要申请的IOS权限名称
 * @param {Object} androidPermission  要申请的Android权限列表
 * @param {Object} success			  全部授予将会被回调
 * @param {Object} fail 			  只要有一个不同意的权限就会被回调 并 携带返回没有允许的权限ID
 */
function requestPhonePermission(iosPermission, androidPermission, success, fail) {
	// #ifdef APP-PLUS
	if (plus.os.name == 'Android') {
		if (androidPermission.length == 0) {
			return
		}
		requestAndroidPermission(androidPermission, success, fail)
	} else if (plus.os.name == 'iOS') {
		if (iosPermission == '') {
			return
		}
		requestIOSPermission(iosPermission, success, fail)
	}
	// #endif
}

/**
 * 请求IOS权限并返回申请结果
 * 		true: 用户允许授权
 *      false: 用户拒绝授权并跳转设置权限界面
 * @param {Object} permisionID
 */
function requestIOSPermissionResult(permisionID) {
	let result = false
	result = permission.judgeIosPermission(permisionID)
	if (!result) {
		gotoAppSetting()
	}
	return result
}

/**
 * 请求微信小程序权限
 * @param {Object} permissionID  申请的权限ID
 * @param {Object} success		 申请成功回调
 * @param {Object} fail			 拒绝申请回调并携带返回权限ID
 */
function requestWxPermission(permissionID, success, fail) {
	// #ifdef MP-WEIXIN
	if (permissionID == '') {
		return
	}
	
	uni.getSetting({
		success(res) {
			if (!res.authSetting[permissionID]) {
				uni.authorize({
					scope: permissionID,
					success() {
						success()
					},
					fail() {
						uni.showModal({
							title: '提示',
							content: '您未授权相应权限，功能将无法使用！',
							showCancel: true,
							confirmColor: '立即授权',
							success(res) {
								if (res.confirm) {
									uni.openSetting({
										success(res) {
											if (!res.authSetting['scope.writePhotosAlbum']) {
												wx.showToast({
													title: '您没有允许相应权限，设置后可使用该功能！',
													icon: 'none'
												})
												fail(permissionID)
											} else {
												success()
											}
										}
									})
								}
							}
						})
					}
				})
			} else {
				success()
			}
		}
	})
	// #endif
}

/**
 * 请求Android IOS 推送通知权限
 * @param {function} callBack(result)  result: true表示已允许  false表示未允许
 */
function requestPhoneNotification(callBack) {
	// #ifdef APP-PLUS  
	if (plus.os.name == 'Android') {
		var main = plus.android.runtimeMainActivity();
		var pkName = main.getPackageName();
		var uid = main.getApplicationInfo().plusGetAttribute("uid");
		var NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
		var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
		callBack(areNotificationsEnabled)
		// 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置  
		if (!areNotificationsEnabled) {
			uni.showModal({
				title: '通知权限开启提醒',
				content: '您还没有开启通知权限，无法接受到消息通知，是否前往设置？',
				showCancel: true,
				cancelText: '取消',
				confirmText: '去设置',
				success: res => {
					if (res.confirm) {
						var Intent = plus.android.importClass('android.content.Intent');
						var Build = plus.android.importClass("android.os.Build");
						//android 8.0引导  
						if (Build.VERSION.SDK_INT >= 26) {
							var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
							intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
						} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
							var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
							intent.putExtra("app_package", pkName);
							intent.putExtra("app_uid", uid);
						} else { //(<21)其他--跳转到该应用管理的详情页  
							intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
							var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
							intent.setData(uri);
						}
						// 跳转到该应用的系统通知设置页  
						main.startActivity(intent);
					}
				}
			});
		}
	} else if (plus.os.name == 'iOS') {
		var isOn = undefined;
		var types = 0;
		var app = plus.ios.invoke('UIApplication', 'sharedApplication');
		var settings = plus.ios.invoke(app, 'currentUserNotificationSettings');
		if (settings) {
			types = settings.plusGetAttribute('types');
			plus.ios.deleteObject(settings);
		} else {
			types = plus.ios.invoke(app, 'enabledRemoteNotificationTypes');
		}
		plus.ios.deleteObject(app);
		isOn = (0 != types);
		callBack(isOn)
		if (isOn == false) {
			uni.showModal({
				title: '通知权限开启提醒',
				content: '您还没有开启通知权限，无法接受到消息通知，是否前往设置？',
				showCancel: true,
				cancelText: '取消',
				confirmText: '去设置',
				success: res => {
					if (res.confirm) {
						var app = plus.ios.invoke('UIApplication', 'sharedApplication');
						var setting = plus.ios.invoke('NSURL', 'URLWithString:', 'app-settings:');
						plus.ios.invoke(app, 'openURL:', setting);
						plus.ios.deleteObject(setting);
						plus.ios.deleteObject(app);
					}
				}
			});
		}
	}
	// #endif 
}

function requestIOSPermission(permisionID, success, fail) {
	let denialPermissionList = []
	if (permission.judgeIosPermission(permisionID)) {
		success()
	} else {
		denialPermissionList[0] = permisionID
		gotoAppSetting()
		fail(denialPermissionList)
	}
}

async function requestAndroidPermission(permisionID, success, fail) {
	let successCount = 0		//成功个数
	let denialCount = 0			//拒绝个数
	let alwayDenialCount = 0	//永久拒绝个数(勾选不再提示)
	let denialPermissionList = []

	for (let i = 0; i < permisionID.length; i++) {
		let result = await permission.requestAndroidPermission(permisionID[i])
		
		switch (result) {
			case 1: //允许权限
				successCount++
				break
			case 0: //拒绝本次申请
				denialCount++
				denialPermissionList[denialPermissionList.length] = permisionID[i]
				break
			case -1: //勾选不在提示，永远拒绝
				alwayDenialCount++
				denialPermissionList[denialPermissionList.length] = permisionID[i]
				break
		}
	}
	
	if (successCount == permisionID.length) {  //全部成功
		success()
	} else {								   //没有全部允许
		if (denialCount > 0) {
			uni.showModal({
				title: '',
				content: '您只有允许权限，才能使用该功能',
				showCancel: false,
				confirmText: '取消',
				confirmText: '立即授权',
				success(res) {
					if (res.confirm) {
						requestAndroidPermission(permisionID)
					}
				}
			});
		} else if (alwayDenialCount > 0) {
			gotoAppSetting()
		}
		fail(denialPermissionList)
	}
}

function gotoAppSetting() {
	uni.showModal({
		title: '',
		content: '您只有允许权限，才能使用该功能，请前往设置',
		showCancel: false,
		confirmText: '取消',
		confirmText: '立即授权',
		success(res) {
			if (res.confirm) {
				permission.gotoAppPermissionSetting()
			}
		}
	});
}

module.exports = {
	requestPhonePermission: requestPhonePermission,
	requestIOSPermissionResult: requestIOSPermissionResult,
	requestWxPermission: requestWxPermission,
	requestPhoneNotification: requestPhoneNotification
}