import { httpRequest } from '../../utils/httpRequest.js'

// 模糊查询公司
export function queryUnitName(name){
	
	return new Promise((resolve,reject)=>{
		httpRequest({
			url:'/user/api/tbSysServiceUnit/selectByUnitName',
			method:'POST',
			data:{
				unitName:name
			},
			success:function(res){
				resolve(res)
			},
			fail:function(err){
				reject(err)
			}
		})
	})
}
