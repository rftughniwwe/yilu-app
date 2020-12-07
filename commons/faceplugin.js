// 人脸识别插件

export default function useFacePlugin(options) {
	const facePlugin = uni.requireNativePlugin('BD-FacePlugin');
	let facePluginConfig = {
		androidLicenseID: "yiluapp-face-android", // Android授权文件
		// iosLicenseID: "facePlugin-face-ios", // iOS授权文件
		livenessArray: ["Mouth", "HeadLeft", "HeadRight", "HeadLeftOrRight", "HeadUp", "HeadDown"], // 动作列表
		livenessCount: options.count || 0, // 动作个数，0个则是无动作
		isLivenessRandom: options.random || false, // 是否随机选择
		textColor: '#ffaa00', //可选参数
		roundColor: '#ffaa00', //可选参数
		backgroundColor: '#2F2F33', //可选参数
		isSound: true, //可选参数
		visibleSoundBtn: true, //可选参数
		isBackCamera: false, //可选参数
		visibleCameraBtn: false //可选参数
	};
	let image = '';
	return new Promise((resolve, reject) => {
		facePlugin.collectFace(facePluginConfig, result => {
			const data = JSON.parse(JSON.stringify(result));
			if (data.status == 'OK') {
				if (data.base64ImageMap) { // base64ImageMap包含了所有出现的动作的照片
					image = data.base64ImageMap.bestImage0.replace(/\%2B/g, '+'); // base64特殊字符处理
					resolve(image)
				}
			} else {
				reject(data)
			}
		});
	})
}
