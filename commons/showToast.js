export default function Toast(options){
	uni.showToast({
		title:options.title,
		icon:options.icon || 'none',
		duration:options.duration || 1500
	})
}