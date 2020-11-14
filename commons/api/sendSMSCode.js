import { httpRequest } from '../../utils/httpRequest.js'
// 发送手机验证码
export default function sendSMSCode(num){
	if(!num){
		uni.showToast({
			title:'手机号为空',
			icon:'none'
		})
		return
	}
	return new Promise((resolve,reject)=>{
		httpRequest({
			url:'/user/api/user/send/code',
			method:'POST',
			data:{
				mobile:num
			},
			success:function(res){
				resolve(res)
			},
			fail:function(err){
				reject(err)
			}
		},1)
	})
}