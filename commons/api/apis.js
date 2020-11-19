import {
	httpRequest,
	getQualification
} from '../../utils/httpRequest.js'
import {
	getSystemInfo,
	getUserLoginInfo,
	getLearningTypeInfo
} from '@/utils/util.js'

// 模糊查询公司
export function queryUnitName(name) {

	return new Promise((resolve, reject) => {
		httpRequest({
			url: '/user/api/tbSysServiceUnit/selectByUnitName',
			method: 'POST',
			data: {
				unitName: name
			},
			success: function(res) {
				resolve(res)
			},
			fail: function(err) {
				reject(err)
			}
		})
	}, 1)
}

// 获取热门搜索数据
export function getHotSearchData() {
	return new Promise((resolve, reject) => {
		httpRequest({
			url: "/course/api/tbHotSearch/list",
			method: "POST",
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		}, 2)
	})

}

// 获取历史搜索数据
export function getHistorySearchData(num) {
	return new Promise((resolve, reject) => {
		httpRequest({
			url: "/course/api/tbHistorySearch/list",
			method: "POST",
			data: {
				userNo: num
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		}, 2)
	})
}

// 清空历史搜索
export function clearHistorySearch(num) {
	return new Promise((resolve, reject) => {
		httpRequest({
			url: "/course/api/tbHistorySearch/delete",
			method: "POST",
			data: {
				userNo: num
			},
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		}, 2)
	})
}

// 人脸登录，人脸验证用其他接口
export function faceLogin(res) {
	return new Promise((resolve, reject) => {
		httpRequest({
			url: '/user/api/baiduFaceAip/auth/facelogin',
			method: 'POST',
			data: {
				base64: res
			},
			success: resp => {
				resolve(resp)
			},
			fail: err => {
				reject(err)
			}
		}, 1)
	})

}

// 人脸验证
export function faceVerification(face) {
	let phone = uni.getStorageSync('userBasicInfo').mobile
	let userNum = getUserLoginInfo('userNo')
	let platform = getSystemInfo().platform
	let datas = {
		base64: face,
		clientType: platform == 'android' ? 2 : 3,
		mobile: phone,
		userNo: userNum
	}
	console.log('UserNumber',userNum)
	return new Promise((resolve, reject) => {
		httpRequest({
			url: '/user/api/baiduFaceAip/auth/faceVeryfy',
			method: 'POST',
			data: datas,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		}, 1)
	})
}

// 获取用基本信息接口
export function getUserBasicInfo(num) {
	return new Promise((resolve, reject) => {
		httpRequest({
			url: '/user/api/user/perfect/getBasicInfo?userNo=' + num,
			method: 'POST',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		}, 1)
	})
}

// 获取身份证信息
export function getIdCardInfo() {
	let usernum = getUserLoginInfo('userNo')
	return new Promise((resolve, reject) => {
		httpRequest({
			url: '/user/api/tbSysIdCard/view?userid=' + usernum,
			method: 'GET',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		}, 1)
	})
}

// 签到根据时间选择获取统计数据
export function getSignOnDateTime() {
	// 选择的一级分类
	let categoryId1 = getLearningTypeInfo().categoryId1
	// 选择的二级分类
	let categoryId2 = getLearningTypeInfo().categoryId2
	// 所属公司ID
	let compId = getLearningTypeInfo().compId
	let userNum = getUserLoginInfo('userNo')
	
	return new Promise((resolve, reject) => {
		httpRequest({
			url: '/user/api/tbCourVideoStudyHistory/signonDateTime',
			method: 'POST',
			data: {
				"categoryId1": categoryId1,
				"categoryId2": categoryId2,
				"compId": compId,
				"userId": userNum,
			},
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		}, 1)
	})
}
