import Toast from '@/commons/showToast.js'
import {
	request_err,
	request_success
} from '@/commons/ResponseTips.js'

// 手机正则
const REG_PHONE = /^1[3456789]\d{9}$/

// 民族数据
const NATION = [
	"汉族", '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '朝鲜族', '满族', '侗族', '瑶族', '白族', '土家族', '哈尼族', '哈萨克族', '傣族',
	'黎族', '僳僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族', '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族',
	'毛南族', '仡佬族', '锡伯族', '阿昌族', '普米族', '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族', '独龙族',
	'鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族'
]
const LEARNING_MODE_DATA = [{
		"id": "1080387521456295937",
		"categoryName": "安全教育",
		"floor": 1,
		"remark": null,
		"listSub": [{
				"id": "1080387575940304898",
				"categoryName": "从业人员技能培训",
				"floor": 2,
				"remark": ""
			},
			{
				"id": "1080748559775240194",
				"categoryName": "安全领导小组学习",
				"floor": 2,
				"remark": ""
			},
			{
				"id": "1080752583811469314",
				"categoryName": "从业人员安全学习",
				"floor": 2,
				"remark": ""
			},
			{
				"id": "1232501813918695426",
				"categoryName": "应急演练",
				"floor": 2,
				"remark": ""
			}
		]
	},
	{
		"id": "1263818106115375105",
		"categoryName": "继续教育",
		"floor": 1,
		"remark": null,
		"listSub": [{
				"id": "1263818166278471681",
				"categoryName": "驾驶员",
				"floor": 2,
				"remark": null
			},
			{
				"id": "1263818224717709313",
				"categoryName": "押运员",
				"floor": 2,
				"remark": null
			},
			{
				"id": "1263818285547700225",
				"categoryName": "装卸管理员",
				"floor": 2,
				"remark": null
			}
		]
	},
	{
		"id": "1320662675097346049",
		"categoryName": "自主学习",
		"floor": 1,
		"remark": null,
		"listSub": []
	}
]

const LIVE_STATUS = ['回放', '直播']


// 获取网络状态
function getNetworkType() {
	return new Promise((resolve, reject) => {
		uni.getNetworkType({
			success(res) {

				if (res.networkType === 'none') {
					uni.showToast({
						title: '无网络状态，请稍后重试',
						icon: 'none',
						duration: 2000
					})
					resolve(false)
				} else if (res.networkType === '2g' || res.networkType === '3g') {
					uni.showToast({
						title: '网络环境不佳',
						icon: 'none',
						duration: 2000
					})
					resolve(true)

				} else {
					resolve(true)
				}
			},
			fail(err) {
				console.error('获取网络状态失败')
				resolve(true)
			}
		})
	})

}

// 获取随机数字
function getRandomDigits(length) {
	let digit = []
	for (let i = 0; i < length; i++) {
		digit.push(Math.floor(Math.random() * 10))
	}
	return digit.join('')
}

// 有效期日期处理
function dateFormat(data, str1, str2) {
	if (!data) {
		return ''
	}
	let arr = data.split('')
	let new_arr = []
	arr.forEach((item, index) => {
		new_arr.push(item)
		if (index === 3) {

			new_arr.push(str1)
		}
		if (index === 5) {
			new_arr.push(str2)
		}
	})
	return new_arr.join('')
}

// 检查是否登录
function isLogin() {

}

// 图片转base64
function toBase64(path, rallback) {
	plus.io.resolveLocalFileSystemURL(path, function(entry) {
		entry.file(function(e) {
			let fileReader = new plus.io.FileReader();
			fileReader.onload = function(r) {
				rallback(r.target.result)
			}
			fileReader.readAsDataURL(e)
		})
	})
}

// 获取当前日期时间
function getCurrentDate(str, delimiter, type) {
	let date = new Date()
	let year = date.getFullYear()
	let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
	let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	let delimit = delimiter ? delimiter : '-'

	if (str === 'year') {
		return `${year}`
	} else if (str === 'month') {
		return `${year}${delimit}${month}`
	} else if (str === 'day') {
		return `${year}${delimit}${month}${delimit}${day}`
	} else if (str === 'hours') {
		return `${year}${delimit}${month}${delimit}${day} ${hours}:${min}`
	} else if (str === 'sec') {
		return `${year}${delimit}${month}${delimit}${day} ${hours}:${min}:${sec}`
	} else if (str === 'onlyHours') {
		return `${hours}:${min}`
	} else {
		return `${year}${delimit}${month}${delimit}${day} ${hours}:${min}:${sec}`
	}

}

// 假数据时间获取
function getNotRealTime(str) {
	let time = str == 'start' ? new Date().getTime() + ((8 * 60) * 1000) : new Date().getTime() - ((5 * 60) * 1000)
	let date = new Date(time)
	let year = date.getFullYear()
	let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
	let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

	return `${year}-${month}-${day} ${hours}:${min}:${sec}`
}

// 设置登录缓存
function setAppStorage(options) {
	uni.setStorageSync('userStorage', options)
}

// 清除缓存
function removeAppStorage(options) {
	// 登录信息
	uni.removeStorageSync('userStorage')
	// 用户是否填写完信息
	uni.removeStorageSync('userCompleteInfo')
	// 学习选择
	uni.removeStorageSync('teachType')
	// 选择的学习一级分类
	uni.removeStorageSync('selectedLearningType')
	// 选择的学习二级分类
	uni.removeStorageSync('LearningSubTypeSubItem')
	uni.removeStorageSync('isShowChooseType')
	uni.removeStorageSync('isHideSafetyModal')
	// 用户基本信息
	uni.removeStorageSync('userBasicInfo')
	// 用户签出后的现场培训id
	// uni.removeStorageSync('TrainingId')
}

// 获取用户登录信息
function getUserLoginInfo(str) {
	const user = uni.getStorageSync('userStorage')
	if (str == 'userNo') {
		return user.userNo
	} else if (str == 'token') {
		return user.userToken
	}
	console.log('ERROR:你得传点什么')
}

// 返回系统信息
function getSystemInfo() {
	let info = uni.getSystemInfoSync()
	return info
}

// 获取选择的分类信息和公司ID
function getLearningTypeInfo() {
	let obj = {}
	try {
		// 学习模块中选择的一级分类
		obj.categoryId1 = uni.getStorageSync('selectedLearningType').id
		// 学习模块中选择的二级分类
		obj.categoryId2 = uni.getStorageSync('LearningSubTypeSubItem').id
		obj.compId = uni.getStorageSync('userBasicInfo').compId
	} catch (err) {
		console.log('获取ID失败')
		Toast({
			title: '缺少参数'
		})
	}

	return obj
}

// 倒计时
function getCountDown(time) {

	let times = time
	// 小时
	let hours = Math.floor((times / 3600)) < 10 ? '0' + Math.floor((times / 3600)) : Math.floor((times / 3600))

	// 分钟
	let min = Math.floor(times / 60) % 60 < 10 ? '0' + Math.floor(times / 60) % 60 : Math.floor(times / 60) % 60
	// 秒
	let second = Math.floor(times % 60) < 10 ? '0' + Math.floor(times % 60) : Math.floor(times % 60)

	return `${hours}:${min}:${second}`
}

// 获取日期和星期
function dateWeek() {
	let date = new Date()
	let year = date.getFullYear()
	let mon = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) < 10 : date.getMonth() + 1
	let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	let mapping = {
		'0': '日',
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
		'5': '五',
		'6': '六'
	}
	let week = mapping[date.getDay()]
	let obj = {
		'date': `${year}年${mon}/${day}日`,
		'week': `星期${week}`
	}
	return obj
}

// 扫码通用
function scanCodeReturn(resp) {
	uni.hideLoading()
	console.log('解析结果', resp)
	uni.setStorageSync('scanData', resp.data.data)
}


// 第三方
const toZhDigit = (digit) => {
	digit = typeof digit === 'number' ? String(digit) : digit;
	const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
	const unit = ['千', '百', '十', ''];
	const quot = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];

	let breakLen = Math.ceil(digit.length / 4);
	let notBreakSegment = digit.length % 4 || 4;
	let segment;
	const zeroFlag = [];
	const allZeroFlag = [];
	let result = '';

	while (breakLen > 0) {
		if (!result) { // 第一次执行
			segment = digit.slice(0, notBreakSegment);
			const segmentLen = segment.length;
			for (let i = 0; i < segmentLen; i++) {
				if (segment[i] !== 0) {
					if (zeroFlag.length > 0) {
						result += '零' + zh[segment[i]] + unit[4 - segmentLen + i];
						// 判断是否需要加上 quot 单位
						if (i === segmentLen - 1 && breakLen > 1) {
							result += quot[breakLen - 2];
						}
						zeroFlag.length = 0;
					} else {
						result += zh[segment[i]] + unit[4 - segmentLen + i];
						if (i === segmentLen - 1 && breakLen > 1) {
							result += quot[breakLen - 2];
						}
					}
				} else {
					// 处理为 0 的情形
					if (segmentLen === 1) {
						result += zh[segment[i]];
						break;
					}
					zeroFlag.push(segment[i]);
					continue;
				}
			}
		} else {
			segment = digit.slice(notBreakSegment, notBreakSegment + 4);
			notBreakSegment += 4;

			for (let j = 0; j < segment.length; j++) {
				if (segment[j] !== 0) {
					if (zeroFlag.length > 0) {
						// 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
						if (j === 0) {
							result += quot[breakLen - 1] + zh[segment[j]] + unit[j];
						} else {
							result += '零' + zh[segment[j]] + unit[j];
						}
						zeroFlag.length = 0;
					} else {
						result += zh[segment[j]] + unit[j];
					}
					// 判断是否需要加上 quot 单位
					if (j === segment.length - 1 && breakLen > 1) {
						result += quot[breakLen - 2];
					}
				} else {
					// 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
					if (j === 0 && zeroFlag.length > 0 && allZeroFlag.length === 0) {
						result += quot[breakLen - 1];
						zeroFlag.length = 0;
						zeroFlag.push(segment[j]);
					} else if (allZeroFlag.length > 0) {
						// 执行到最后
						if (breakLen === 1) {
							result += '';
						} else {
							zeroFlag.length = 0;
						}
					} else {
						zeroFlag.push(segment[j]);
					}

					if (j === segment.length - 1 && zeroFlag.length === 4 && breakLen !== 1) {
						// 如果执行到末尾
						if (breakLen === 1) {
							allZeroFlag.length = 0;
							zeroFlag.length = 0;
							result += quot[breakLen - 1];
						} else {
							allZeroFlag.push(segment[j]);
						}
					}
					continue;
				}
			}

			--breakLen;
		}

		return result;
	}
}
module.exports = {
	getNetworkType,
	isLogin,
	REG_PHONE,
	NATION,
	toBase64,
	dateFormat,
	getCurrentDate,
	getRandomDigits,
	setAppStorage,
	removeAppStorage,
	getUserLoginInfo,
	getSystemInfo,
	LEARNING_MODE_DATA,
	LIVE_STATUS,
	getLearningTypeInfo,
	getCountDown,
	dateWeek,
	toZhDigit,
	scanCodeReturn,
	getNotRealTime
}
