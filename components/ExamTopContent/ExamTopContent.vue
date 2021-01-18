<!-- 考试顶部组件 -->
<template>
	<view class="main flex-between">
		<view class="subject-mode">
			<text v-if="!isFromError" class="subject-text">
				{{optionType || '选择题'}}
			</text>
			<text v-else class="subject-text">
				{{optionType || '选择题'}}
			</text>
		</view>
		<view class="timeout" v-if="!isFromError">
			{{timecountdown?timecountdown:'00:00:00'}}
		</view>
		<view class="current-count">
			<text class="currTxt">{{current}}</text>/{{datas.total}}
		</view>
	</view>
</template>

<script>
	import {
		getCountDown
	} from '@/utils/util.js'

	export default {
		data() {
			return {
				timer: null,
				timecountdown: '',
				current: 1,
				optionType: '',
				perscore: '',
				mapping: ['未知', '单选题', '多选题', '判断题']

			};
		},
		props: ['datas', 'isFromError'],
		created() {
			let examdatas = uni.getStorageSync('autoExamQuestions')
			console.log('ibelive',examdatas)
			let _proType = examdatas[0].problemType
			this.optionType = this.mapping[_proType]
			if (!this.isFromError) {
				this.countDown(this.datas.time? this.datas.time * 60:3600)
			}

			uni.$on('swiperChange', (res) => {
				let proType = examdatas[res.current].problemType
				this.current = res.current + 1
				this.optionType = this.mapping[proType]
				this.perscore = examdatas[res.current].perScore
			})
		},
		updated() {},
		beforeDestroy() {
			clearInterval(this.timer)
			this.timer = null
		},
		destroyed() {
			// console.log('组件卸载之前2',this.timer)
			// clearInterval(this.timer)
			// this.timer = null
			// console.log('组件卸载之前3',this.timer)
		},
		methods: {
			countDown(d) {
				let t = parseInt(d)
				this.timer = setInterval(() => {
					if (t <= 0) {
						clearInterval(this.timer)
						this.timer = null
						uni.showModal({
							title: '考试结束，自动交卷',
							showCancel: false,
							confirmText: '交卷',
							success: (res) => {
								if (res.confirm) {
									uni.redirectTo({
										url: '../../pages/onSiteTraining/examResult'
									})
								}
							}
						})

						return
					}
					t--
					this.timecountdown = getCountDown(t)
					uni.$emit('timeChange', {
						time: this.timecountdown
					})
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.main {
		background-color: #FFFFFF;
		padding: 20rpx 30rpx;
	}

	.subject-mode {
		width: 30%;
		text-align: left;

		.subject-text {
			background-color: #38A6FD;
			font-size: 28rpx;
			color: #FFFFFF;
			border-radius: 6rpx;
			padding: 8rpx;

		}
	}

	.timeout {
		color: #333;
		font-size: 30rpx;
		text-align: center;
	}

	.current-count {
		color: #999999;
		font-size: 28rpx;
		text-align: right;
		width: 30%;
	}

	.currTxt {
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
	}
</style>
