import {
	getNetworkType,
	isLogin
} from './util.js'


const BASE_URL = 'http://172.168.1.229'


// 身份证OCR地址
const ID_CARD_OCR = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard'
// 驾驶证识别OCR地址
const DVIVING_CARD_OCR = 'https://aip.baidubce.com/rest/2.0/ocr/v1/driving_license'

const ID_CARD_OCR_KEY = '203867213'
const ID_CARD_OCR_SECRET = '1lKltWmYmtGVIZxtrSqFdU5wQjO6ZdD6'
const ID_CARD_OCR_APP_CODE = '8b69f54d8bc14384a2fb9f1d94d4ac5a'

// 百度获取tokenURL
const BD_TOKEN_URL = 'https://aip.baidubce.com/oauth/2.0/token'

// 百度OCR相关变量
const BD_OCR_KEY = '5BG6eDCb0zxoR0cVEcGuIP1k'
const BD_OCR_SECRET = '9oPaR15FGH1XA3oN1R8hQ3LuV20e5MUE'


// 请求
function httpRequest(options, url_type) {

	let base_url = ''
	
	if(url_type == 1){
		// 登录注册地址
		base_url = BASE_URL+':8720'
	}else if(url_type == 2){
		base_url = BASE_URL+':8730'
	}else if(url_type = 3){
		base_url = BASE_URL+':8740'
	}
	getNetworkType().then((res) => {

		if (res) {
			uni.request({
				// 必选
				url: base_url + options.url,
				success: options.success,
				fail: options.fail,
				// 非必选
				method: options.method || 'GET',
				data: options.data || {},
				header: options.header || {},
				timeout: 10000,
				sslVerify: false,
				complete: options.complete || function() {}
			})
		}
	})

}

// 百度获取accesstoken授权
function getAcceessToken(key, secret) {

	return new Promise((resolve, reject) => {

		httpRequest({
			url: '/user/pc/api/user/getToken',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
				uni.showToast({
					title: '获取Token失败',
					icon: 'none'
				})
			}
		},1)
	})
}


// OCR请求
function OCR_Request(url, options) {
	let ocrtoken = uni.getStorageSync('ocr_token')
	return new Promise((resolve, reject) => {
		getNetworkType().then((res) => {

			if (res) {
				uni.request({
					// 必选
					url: url + '?access_token=' + ocrtoken,
					success: (res) => {
						resolve(res)
					},
					fail: (err) => {
						reject(err)
					},
					// 非必选
					method: 'POST',
					data: options,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				})
			}
		})
	})


}

// 查询从业资格证信息
function getQualification(options) {

	return new Promise((resolve, reject) => {
		httpRequest({
			url: '/user/api/tbSysQualification/view',
			method: 'GET',
			data: options,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		},1)
	})
}


// 上传图片
function uploadImage(url, fileType = 'picFile', filePath, params) {
	let token = uni.getStorageSync('userStorage').userToken

	const data = {
		url: BASE_URL2 + url,
		name: fileType,
		filePath: filePath,
		formData: {

		},
		header: {
			token: token
		}
	};
	uni.showLoading({
		title: '上传中...'
	})

	return new Promise((resolve, reject) => {
		uni.uploadFile({
			...data,
			success: (res) => {
				uni.hideLoading()
				resolve(res)
			},
			fail: (err) => {
				uni.hideLoading()
				reject(err)
			}
		})
	})
}

module.exports = {
	httpRequest,
	getAcceessToken,
	ID_CARD_OCR,
	ID_CARD_OCR_APP_CODE,
	ID_CARD_OCR_SECRET,
	ID_CARD_OCR_KEY,
	BD_OCR_KEY,
	BD_OCR_SECRET,
	DVIVING_CARD_OCR,
	BASE_URL,
	OCR_Request,
	uploadImage,
	getQualification
}
