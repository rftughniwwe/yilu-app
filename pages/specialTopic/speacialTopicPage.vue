<!-- 专题页 -->
<template>
	<view class="main">
		<template v-if="topicdata || topicdata.length > 0">
			<view v-for="(item,index) in topicdata">
				<specialTopic @clickCollectBtn='collect' @goSpecialTopicDetail='routeJump' :data='item' />
			</view>
		</template>
		<template v-else>
			<EmptyData type='serach' />
		</template>
	</view>
</template>

<script>
	import specialTopic from '@/components/specialTopic/specialTopic.vue'
	import {
		httpRequest,
	} from '@/utils/httpRequest.js'
	import EmptyData from '@/components/EmptyData/EmptyData.vue'
	import Toast from '@/commons/showToast.js'
	import {
		request_err,
		request_success
	} from '@/commons/ResponseTips.js'
	import {
		getUserLoginInfo
	} from '@/utils/util.js'

	export default {
		data() {
			return {
				topicdata: []
			};
		},
		components: {
			EmptyData
		},
		onLoad() {
			this.getTopic()
		},
		methods: {
			// 收藏按钮点击
			collect(e) {
				let item = e.item
				if (item.collectType == 0) {
					httpRequest({
						url: '/community/api/labelUserRecord/save',
						method: 'POST',
						data: {
							labelId: item.id,
							userIp: '127.0.0.1',
							opType: 1,
							userNo: getUserLoginInfo('userNo'),
							userTerminal: 'android'
						},
						success: res => {
							console.log('收藏专题：', res)
							if (res.data.code == 200) {
								this.getTopic()
								uni.showToast({
									title: '专题收藏成功',
									icon: 'none',
									duration: 1500
								})
								
							} else {
								request_success(res)
							}
						},
						fail: err => {
							request_err(err, '专题收藏失败')
						}
					}, 3)
				} else {
					httpRequest({
						url: '/community/api/labelUserRecord/deleteLabelRecord',
						method: 'DELETE',
						data: {
							labelId: item.id,
							opType: 1,
							userNo: getUserLoginInfo('userNo'),
						},
						success: res => {
							console.log('取消收藏专题：', res)
							if (res.data.code == 200) {
								this.getTopic()
								uni.showToast({
									title: '取消收藏成功',
									icon: 'none',
									duration: 1500
								})

							} else {
								request_success(res)
							}
						},
						fail: err => {
							request_err(err, '取消收藏失败')
						}
					}, 3)
				}
			},
			getTopic() {
				uni.showLoading({
					title: '加载中...'
				})
				httpRequest({
					url: '/community/pc/label/list',
					method: 'POST',
					data: {
						labelType: 3,
						pageCurrent: 1,
						pageSize: 10,
					},
					success: res => {
						uni.hideLoading()
						console.log('Topic:', res)
						if (res.data.code == 200) {
							let list = res.data.data.list
							this.topicdata = list
						} else {
							request_success(res)
						}
					},
					fail: err => {
						uni.hideLoading()
						request_err(err, '获取数据失败')
					}
				}, 3)
			},
			routeJump(e) {
				let obj = encodeURIComponent(JSON.stringify(e.item))
				uni.navigateTo({
					url: './specialTopicDetail?item=' + obj
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
