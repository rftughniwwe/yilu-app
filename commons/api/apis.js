import {
	httpRequest,
	getQualification
} from '../../utils/httpRequest.js'

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
	})
}

// 获取热门搜索数据
export function getHotSearchData(){
	return new Promise((resolve,reject)=>{
		httpRequest({
			url:"/course/api/tbHotSearch/list",
			method:"POST",
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		},2)
	})
	
}

// 获取历史搜索数据
export function getHistorySearchData(num){
	return new Promise((resolve,reject)=>{
		httpRequest({
			url:"/course/api/tbHistorySearch/list",
			method:"POST",
			data:{
				userNo:num
			},
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		},2)
	})
}

// 清空历史搜索
export function clearHistorySearch(num){
	return new Promise((resolve,reject)=>{
		httpRequest({
			url:"/course/api/tbHistorySearch/delete",
			method:"POST",
			data:{
				userNo:num
			},
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		},2)
	})
}