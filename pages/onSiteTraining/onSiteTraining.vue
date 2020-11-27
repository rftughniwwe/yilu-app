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
				// 插件扫码
				let obj = {
					"code": 200,
					"msg": "",
					"data": {
						"lon": "121.508961", 				//经度
						"trainIntro": "<p>测试培训</p>", 	//培训介绍
						"type": 1, 							//1：签入；2：签出
						"courseName": "演示课程-直播", 		//课程名称
						"teacher": "李老师", 				//讲师姓名				
						"name": "测试123123", 				//培训名称
						"limit": 500, 						//打卡限制范围
						"startTime": "2020-11-27 16:10:00", //培训开始时间 
						"id": 10, 							//培训ID
						"endTime": "2020-11-27 17:00:00", 	//培训结束时间 
						"periodList": [ 					//课时集合ID
							{
								"periodId": "1321284834970796034", //课时id
								"periodName": "1-1-1" 		//课时名称
							},
							{
								"periodId": "1321287274973593602",
								"periodName": "1-1-2"
							},
							{
								"periodId": "1322134961365118978",
								"periodName": "1-1-3"
							},
							{
								"periodId": "1322142743178964993",
								"periodName": "1-1-4"
							}
						],
						"chapterList": [ 					//章节集合
							{
								"chapterId": "1322142743178964993", //章节ID
								"chapterName": "1-1-4" 		//章节名称
							}
						],
						"addr": "漕河泾浦江科技广场21号楼B座", //培训地址   
						"courseId": "1273525324477759489", 	//课程ID
						"lat": "31.10006", 					//纬度
						"teacherIntro": "<p>测试讲师</p>" 	//讲师介绍
					}
				}

				// let mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module")
				// mpaasScanModule.mpaasScan({
				// 	'type': 'qr',
				// 	'scanType': ['qrCode', 'barCode'],
				// 	'hideAlbum': true
				// }, (res) => {
					
				// 	uni.navigateTo({
				// 		url: './courseDetails' + obj.data
				// 	})
				// })

				// 系统扫码
				uni.scanCode({
					scanType: ['qrCode'],
					onlyFromCamera: true,
					success: res => {
						uni.setStorageSync('scanData',obj.data)
						uni.navigateTo({
							url: './courseDetails'
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
