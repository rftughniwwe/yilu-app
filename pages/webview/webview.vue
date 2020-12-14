<template>
	<view>
		<web-view :src="pagePath" @message="fn"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pagePath: ''
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log(options)
			console.log('1111111111111111111111')
			if (options.url) {
				this.setData({
					pagePath: options.url
				});
			} else {
				const data = uni.getStorageSync('liveData');
				this.periodId = data.periodId;
				this.pagePath = data.liveUrl;
			}
			let coursesss = uni.getStorageSync('courseInfoData')
			uni.$on('asifhbwsrei', (res) => {
				if (res.verify) {
					uni.setStorageSync('TrainingId', coursesss.trainId)
					uni.showModal({
						title: '提示',
						content: '签出成功，是否进行考试？',
						confirmText: '前往考试',
						cancelText: '暂不',
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '../../exam/examInfo?id=' + coursesss.trainId
								})
							}
						}
					})
				}
			})
			
		},
		methods: {
			fn(data) {
				console.log('fffffffffffffffffff', data)
				uni.navigateTo({
					url: '/pages/verifyFace/verifyFace?refId=' + this.periodId + '&signType=2&faceSignType=1'
				})
			}
		}
	};
</script>
<style scoped>
	/* pages/webview/webview.wxss */
</style>
