<template>
	<view class="main">
		<template v-if="autoLearning && autoLearning.length > 0">
			<view v-for="(item,index) in autoLearning" :key='index'>
				<course :data='item' @courseClick='courseItemClick' author='主持人'/>
			</view>
		</template>
		<template v-else>
			<EmptyData type='serach' />
		</template>
	</view>
</template>

<script>
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	import {
		httpRequest
	} from '@/utils/httpRequest.js'
	import {
		getCurrentDate,
		LEARNING_MODE_DATA,
		scanCodeReturn,
		getNotRealTime,
		getLearningTypeInfo,
		getUserLoginInfo
	} from '@/utils/util.js'
	export default {
		data() {
			return {
				autoLearning: []
			};
		},
		onLoad() {
			this.getAutoLearning()
		},
		methods:{
			getAutoLearning() {
				let id = getLearningTypeInfo().categoryId1
				console.log('id', id)
				uni.showLoading({
					title: '获取中...'
				})
				httpRequest({
					url: 'course/api/course/independentlist',
					method: 'POST',
					data: {
						categoryId1: id
					},
					success: res => {
						uni.hideLoading()
						if (res.data.code == 200) {
							this.autoLearning = res.data.data
						}
					},
					fail: err => {
						uni.hideLoading()
						console.log('获取自主学习课程失败：', err)
					}
				}, 2)
			},
			courseItemClick(e){
				let item = e.item
				console.log('点击：',item)
				scanCodeReturn(item)
				uni.navigateTo({
					url: '../onSiteTraining/courseDetails'
				})
			}
		}
	}
</script>

<style lang="scss">
.main{
	margin: 0 18rpx;
}
</style>
