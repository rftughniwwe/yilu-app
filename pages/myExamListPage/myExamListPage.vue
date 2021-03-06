<template>
	<view class="main">
		<view class="serach-content flex-row-start">
			<image class="serach-input" src="../../static/serach-img.png" mode=""></image>
			<input class="input-content" type="text" value="" placeholder="试卷名称" @input='serachExamList'/>
		</view>
		<view class="exam-list-content">
			<template v-if="examList && examList.length > 0">
				<view v-for="(item,index) in examList" :key='index' class="exam-item" @click="goDetail(item)">
					<view class="title text-overflow2">
						{{item.examName?item.examName:'未知'}}
					</view>
					<view class="btm-content flex-between">
						<view class="difficulty">
							<!-- <view class="tttxt">
								难度
							</view>
							<image class="start" src="../../static/start.png" mode=""></image>
							<image class="start" src="../../static/start.png" mode=""></image>
							<image class="start" src="../../static/start.png" mode=""></image>
							<image class="start" src="../../static/start.png" mode=""></image>
							<image class="start" src="../../static/start.png" mode=""></image> -->
							<view class="tttxt">
								考试时间：{{item.createTime?item.createTime:'未知'}}
							</view>
						</view>
						<view class="middle tttxt">
							{{item.num?item.num:'0'}}人已做
						</view>
						<view class="edit-content">
							<image src="../../static/user-feedback.png" mode=""></image>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<EmptyData type='serach'></EmptyData>
			</template>
		</view>
	</view>
</template>

<script>
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	
	export default {
		data() {
			return {
				examList:[]
			};
		},
		onLoad() {
			this.getExamList()
		},
		methods: {
			goDetail(item) {
				
				uni.setStorageSync('userselectedexamitem',item)
				uni.navigateTo({
					url: '../user/myExamDetail/myExamDetail'
				})
			},
			getExamList(val = '') {
				let compid = uni.getStorageSync('userCompanyInfo').compId
				let _userNo = getUserLoginInfo('userNo')
				let params = {
					"compId": compid,
					"examName": val,
					"userNo": _userNo
				}
				console.log('参数：',params)
				uni.showLoading({
					title:val?'查询中':'加载中'
				})
				httpRequest({
					url: 'user/api/tbExamPerson/myExamList',
					method: 'POST',
					data: params,
					success: res => {
						uni.hideLoading()
						console.log('获取试卷列表', res)
						if (res.data.code == 200) {
							this.examList = res.data.data
						} else {
							request_success(res)
						}
					},
					fail: err => {
						uni.hideLoading()
						console.log('获取列表失败', err)
					}
				}, 1)
			},
			serachExamList(e){
				let val = e.detail.value
				this.getExamList(val)
			}
		}
	}
</script>

<style lang="scss">
	.main {
		margin: 30rpx 40rpx;
	}

	.serach-content {
		position: fixed;
		top: 0;
		left: 40rpx;
		right: 40rpx;
		z-index: 999;
		border-radius: $uni-border-radius-base;
		background: #F5F5F5;
		padding: 10rpx 20rpx;

		image {
			width: 35rpx;
			height: 35rpx;
			margin-right: 20rpx;
		}
	}

	.tttxt {
		color: #333333;
		font-size: 24rpx;
		margin-right: 14rpx;
	}

	.start {
		width: 24rpx;
		height: 24rpx;
		margin-right: 6rpx;
	}

	.edit-content {
		image {
			width: 44rpx;
			height: 44rpx;
		}
	}

	.exam-item {
		padding: 30rpx 0 20rpx;
		background-color: #FFFFFF;
		border-bottom: 2rpx solid #EAEAEA;
	}

	.exam-list-content {
		margin-top: 60rpx;
	}

	.btm-content {
		margin-top: 10rpx;
	}

	.serach-input {
		width: 10%;
	}

	.input-content {
		width: 80%;
	}
	.title{
		color: #333333;
		font-size: 30rpx;
		font-weight: bold;
	}
</style>
