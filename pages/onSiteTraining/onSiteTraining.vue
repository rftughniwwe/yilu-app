<!-- 现场培训 -->
<template>
	<view class="container">
		<view class="top-tab flex-between">
			<view class="item" @click="signinNow">
				<image src="../../static/on-site-sign.png" mode=""></image>
			</view>
			<view class="item" @click="goLearningMaterials">
				<image src="../../static/learningzl.png" mode=""></image>
			</view>
			<view class="item" @click="goOnlineExam">
				<image src="../../static/online-exam.png" mode=""></image>
			</view>
		</view>
		<view class="sign-in-tips">
			<view class="topic">
				【现场签到步骤】
			</view>
			<view class="content">
				1，点击现场签到,扫描企业二维码进入相关课程页。
			</view>
			<view class="content">
				2，手机进行人脸识别签到，课程结束后也需要进行人脸识别签出，为了保障您的学习时长统计，请不要忘记签到，签出。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad() {

		},
		methods: {
			signinNow() {
				// 需先扫描二维码

				// let mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module")
				// mpaasScanModule.mpaasScan({
				// 	'type': 'qr',
				// 	'scanType': ['qrCode', 'barCode'],
				// 	'hideAlbum': true
				// }, (res) => {
				// 	let d = JSON.parse((JSON.stringify(res)))
				// 	let r = JSON.parse((JSON.stringify(d.resp_result)))
				// 	console.log('扫描结果1',r)
				// 	uni.navigateTo({
				// 		url:'./courseDetails?scanres='+res
				// 	})
				// })
				uni.scanCode({
					scanType: ['qrCode'],
					onlyFromCamera: true,
					success: res => {
						let r = JSON.parse(JSON.stringify(res.result))
						console.log('结果：', r)
						uni.navigateTo({
							url: './courseDetails?scanres='+r
						})
					},
					fail: err => {
						console.log('扫描失败', err)
					}
				})
			},
			// 前往学习资料
			goLearningMaterials() {
				uni.navigateTo({
					url: '../user/learningMaterials/learningMaterials'
				})
			},
			// 前往在线考试
			goOnlineExam() {
				uni.navigateTo({
					url: './examBegin'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 30rpx;
	}

	.top-tab {
		margin: 30rpx 0 40rpx;

		image {
			width: 234rpx;
			height: 234rpx;
		}
	}

	.topic {
		color: #333333;
		font-size: 34rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
	}

	.content {
		color: #333333;
		font-size: 30rpx;
		margin-bottom: 30rpx;
	}
</style>
