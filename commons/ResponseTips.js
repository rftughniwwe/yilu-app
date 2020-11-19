import Toast from '@/commons/showToast.js'

export function request_err(err,title){
	console.log('失败',err)
	Toast({
		title:title
	})
}

export function request_success(res){
	Toast({
		title:res.data.msg
	})
}