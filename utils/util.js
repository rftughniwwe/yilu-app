import Toast from '@/commons/showToast.js'

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

const LIVE_STATUS = ['未开播','正在直播','待回放','待转存','回放']


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
function getCurrentDate(str,delimiter,type) {
	let date = new Date()
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDay()
	let hours = date.getHours()
	let min = date.getMinutes()
	let sec = date.getSeconds()
	let delimit = delimiter?delimiter:'-'
	
	if(str === 'year'){
		return `${year}`
	}else if(str==='month'){
		return `${year}${delimit}${month}`
	}else if(str==='day'){
		return `${year}${delimit}${month}${delimit}${day}`
	}else if(str==='hours'){
		return `${year}${delimit}${month}${delimit}${day} ${hours}:${min}`
	}else if (str==='sec'){
		return `${year}${delimit}${month}${delimit}${day} ${hours}:${min}:${sec}`
	}else {
		return `${year}${delimit}${month}${delimit}${day} ${hours}:${min}:${sec}`
	}
	
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
}

// 获取用户登录信息
function getUserLoginInfo(str) {
	const user = uni.getStorageSync('userStorage')
	if (str == 'userNo') {
		return user.userNo
	} else if (str == 'token') {
		return user.token
	}
	console.log('ERROR:你得传点什么')
}

// 返回系统信息
function getSystemInfo() {
	let info = uni.getSystemInfoSync()
	return info
}

// 获取选择的分类信息和公司ID
function getLearningTypeInfo(){
	let obj = {}
	try{
		// 学习模块中选择的一级分类
		obj.categoryId1 = uni.getStorageSync('selectedLearningType').id
		// 学习模块中选择的二级分类
		obj.categoryId2 = uni.getStorageSync('LearningSubTypeSubItem').id
		obj.compId = uni.getStorageSync('userBasicInfo').compId
	}catch(err){
		console.log('获取ID失败')
		Toast({
			title:'缺少参数'
		})
	}
	
	return obj
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
	getLearningTypeInfo
}
