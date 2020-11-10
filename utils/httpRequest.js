import {
	getNetworkType,
	isLogin
} from './util.js'

const BASE_URL = 'http://172.168.1.45:8720'

// const ID_CARD_OCR = 'https://api05.aliyun.venuscn.com/ocr/id-card'
const ID_CARD_OCR = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard'
const DVIVING_CARD_OCR = 'https://aip.baidubce.com/rest/2.0/ocr/v1/driving_license'

const ID_CARD_OCR_KEY = '203867213'
const ID_CARD_OCR_SECRET = '1lKltWmYmtGVIZxtrSqFdU5wQjO6ZdD6'
const ID_CARD_OCR_APP_CODE = '8b69f54d8bc14384a2fb9f1d94d4ac5a'

// 百度获取tokenURL
const BD_TOKEN_URL = 'https://aip.baidubce.com/oauth/2.0/token'
// 百度OCR相关变量
const BD_OCR_KEY = '5BG6eDCb0zxoR0cVEcGuIP1k'
const BD_OCR_SECRET = '9oPaR15FGH1XA3oN1R8hQ3LuV20e5MUE'

// 百度获取accesstoken授权
function getAcceessToken(key, secret) {

	return new Promise((resolve, reject) => {
		httpRequest({
			url: BD_TOKEN_URL,
			data: {
				grant_type: 'client_credentials',
				client_id: key,
				client_secret: secret
			},
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
		})
	})
}

// 请求
function httpRequest(options) {

	getNetworkType().then((res) => {

		if (res) {
			uni.request({
				// 必选
				url: BASE_URL + options.url,
				success: options.success,
				fail: options.fail,
				// 非必选
				method: options.method || 'GET',
				data: options.data || {},
				header: options.header || {},
				timeout: options.timeout || 30000,
				sslVerify: false,
				complete: options.complete || function() {}

			})
		}
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
	BASE_URL
}
