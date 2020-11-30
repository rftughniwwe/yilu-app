<!-- 考试顶部组件 -->
<template>
	<view class="main flex-between">
		<view class="subject-mode">
			<text class="subject-text">
				{{datas.mode}}({{datas.scope}}分)
			</text>
		</view>
		<view class="timeout">
			{{timecountdown?timecountdown:'00:00:00'}}
		</view>
		<view class="current-count">
			<text class="currTxt">{{tab}}</text>/{{datas.total}}
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
				tab: 1
			};
		},
		props: ['datas'],
		created() {
			
			this.countDown(this.datas.time)
			uni.$on('swiperChange',(res)=>{
				this.tab = res.current+1
			})
		},
		updated() {
		},
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
			padding: 8rpx 6rpx;

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
