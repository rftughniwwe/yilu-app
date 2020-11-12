export default function Toast(options){
	options.icon = options.icon? options.icon:'none'
	uni.showToast({...options})
}