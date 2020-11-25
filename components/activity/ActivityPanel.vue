<template>
	<view class="activity" v-if="seckillData.id || couponData.id">
		<view class="activityItem" @click="getActivityCoupon()" v-if="couponData.id">
			优惠券：<text class="red">￥{{ couponData.couponPrice }}</text>
			<view class="side" >领取</view>
		</view>
		<view class="activityItem" v-if="seckillData.id">
			秒杀价：<text class="red">￥{{ seckillData.seckillPrice.toFixed(2) }}</text>
			<view class="side">{{ spikeStage +' ： '+ spikeTime }}</view>
		</view>
	</view>
</template>

<script>
	import * as actApi from '@/commons/api/activity.js'
	export default {
		name: 'ActivityPanel',
		props: {
			courseInfo: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				spikeStage: '',
				spikeTime: '',
				seckillData: {},
				activityInfo: {},
				couponData: {}
			}
		},
		mounted() {
			if (this.courseInfo.id) {
				this.getActivityInfo()
			}
		},
		methods: {
			getActivityInfo() {
				actApi.courseACTInfo({
					courseId: this.courseInfo.id
				}).then(res => {
					if (res.actCouponDTO) {
						this.couponData = res.actCouponDTO
					}
					if (res.actSeckillDTOList && res.actSeckillDTOList.length) {
						const now = new Date()
						const nowTime = now.getTime()
						let loadySeckill // 未开始
						res.actSeckillDTOList.map(item => {
							const year = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
							const begin = new Date(year + ' ' + item.beginTime)
							const end = new Date(year + ' ' + item.endTime)
							const beginTime = begin.getTime()
							const endTime = end.getTime()


							if (nowTime > beginTime) {
								if (endTime > nowTime) {
									this.seckillData = {
										status: 2, // 1:未开始，2：进行中，3：已结束
										beginDate: beginTime,
										endDate: endTime,
										...item
									}
									console.log(this.seckillData)
									this.$emit("startSeckill")
								}
							} else if (!loadySeckill) {
								loadySeckill = {
									status: 1, // 未开始
									beginDate: beginTime,
									endDate: endTime,
									...item
								}
							}
						})
						// 如果没有正在进行的，就取最近准备开始的
						if (!this.seckillData) {
							this.seckillData = loadySeckill
						}
						if (this.seckillData) {
							// 计算倒计时
							this.seckillTimeout()
						}
					}
				})
			},
			seckillTimeout() {
				const now = new Date()
				let timeDiff = 0
				if (this.seckillData.status === 1) {
					// 未开始
					this.spikeStage = '距开始'
					timeDiff = this.seckillData.beginDate - now.getTime()
				} else if (this.seckillData.status === 2) {
					this.spikeStage = '距结束'
					timeDiff = this.seckillData.endDate - now.getTime()
				}
				this.spikeTime = this.seckillData.beginTime
				if (timeDiff > 0) {
					this.spikeTime = this.formatDuring(timeDiff)
					setTimeout(() => {
						this.seckillTimeout()
					}, 1000)
				} else {
					// this.getActivityInfo()
				}
			},
			formatDuring(mss) {
				// const days = parseInt(mss / (1000 * 60 * 60 * 24));
				const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = parseInt((mss % (1000 * 60)) / 1000);
				return (hours < 10 ? '0' + hours : hours) + ' : ' + (minutes < 10 ? '0' + minutes : minutes) + ' : ' + (seconds <
					10 ? '0' + seconds : seconds);
			},
			// 领取优惠券
			getActivityCoupon() {
				actApi.bindCoupon({
					actId: this.couponData.actId,
					courseId: this.couponData.courseId
				}).then(res => {
					uni.showToast({
						title: "领取成功！",
						icon: 'success'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activity {
		.activityItem {
			line-height: 80upx;
			height: 80upx;
			padding: 0 30upx;
			font-size: 14px;

			.red {
				color: red;
				margin-left: 8upx;
				;
			}

			.side {
				float: right;
				color: red;
			}
		}
	}
</style>
