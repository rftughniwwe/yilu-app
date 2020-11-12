// 手机正则
const REG_PHONE = /^1[3456789]\d{9}$/

// 民族数据
const NATION = [
	"汉族", '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '朝鲜族', '满族', '侗族', '瑶族', '白族', '土家族', '哈尼族', '哈萨克族', '傣族',
	'黎族', '僳僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族', '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族',
	'毛南族', '仡佬族', '锡伯族', '阿昌族', '普米族', '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族', '独龙族',
	'鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族'
]

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
function getRandomDigits(length){
	let digit = []
	for(let i = 0;i<length;i++){
		digit.push(Math.floor(Math.random() * 10))
	}
	return digit.join('')
}

// 有效期日期处理
function dateFormat(data,str1,str2){
	if(!data){
		return ''
	}
	let arr = data.split('')
	let new_arr = []
	arr.forEach((item,index)=>{
		new_arr.push(item)
		if(index === 3){
			
			new_arr.push(str1)
		}
		if(index === 5){
			new_arr.push(str2)
		}
	})
	return new_arr.join('')
}

// 检查是否登录
function isLogin() {

}

// 图片转base64
function toBase64(path,rallback) {
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
function getCurrentDate(){
	let date = new Date()
	let year = date.getFullYear()
	let month = date.getMonth() +1
	let day = date.getDay()
	
	return `${year}-${month}`
}

// 设置登录缓存
function setAppStorage(options){
	uni.setStorageSync('userStorage',options)
}

// 清除登录缓存
function removeAppStorage(options){
	uni.removeStorageSync('userStorage')
	uni.removeStorageSync('userCompleteInfo')
}

// 获取用户登录信息
function getUserLoginInfo(str){
	const user = uni.getStorageSync('userStorage')
	if(str == 'userNo'){
		return user.userNo
	}else if(str == 'token'){
		return user.token
	}
	console.log('ERROR:你得传点什么')
}

// 返回系统信息
function getSystemInfo(){
	let info = uni.getSystemInfoSync()
	return info
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
	getSystemInfo
}
