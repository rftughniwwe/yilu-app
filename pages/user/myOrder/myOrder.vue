<!-- 我的订单页面 -->
<template>
	<view>
		<view class="wrap-top-tab-bar" :style="{'paddingTop':isFullScreen?'64rpx':'30rpx'}">
			<!-- <learnTopSlide :tabArr='tabArr' type='3' @tabChange="tabSelected" /> -->
			<uni-nav-bar leftIcon="arrowleft" @clickLeft="goBack">
				<learnTopSlide slot='default' type='3' :tabArr='tabArr' @tabChange="tabSelected" />
			</uni-nav-bar>
		</view>
		<view class="container" :style="{'marginTop':isFullScreen?'170rpx':'120rpx'}">
			<view class="pay-item">
				<view class="title">
					驾驶员课程
				</view>
				<view class="vaild-date">
					有效期：1年
				</view>
				<view class="price">
					原价：<text class="hight-color">￥300</text>元，优惠<text class="hight-color">￥10</text>元，实付<text class="hight-color">￥290</text>元
				</view>
				<view class="deadline">
					<view v-show="num=='0'" class="buy-date">
						<view>
							购买日期：2020/10/10/ 13:22:21
						</view>
						<view>
							到期日期：2021/10/10/ 13:22:21
						</view>
					</view>
					<view v-show="num=='0'" class="pay-money">
						已支付<text class="hight-color mr">￥290元</text> 支付宝
					</view>
					<view v-show="num=='1'" class="pay-money">
						<text @click="cancelPay">取消支付<text class="hight-color ml">￥290元</text></text>
					</view>
				</view>
			</view>
			<view class="pay-item">
				<view class="title">
					驾驶员课程
				</view>
				<view class="vaild-date">
					有效期：1年
				</view>
				<view class="price">
					原价：<text class="hight-color">￥300</text>元，优惠<text class="hight-color">￥10</text>元，实付<text class="hight-color">￥290</text>元
				</view>
				<view class="deadline">
					<view v-show="num=='0'" class="buy-date">
						<view>
							购买日期：2020/10/10/ 13:22:21
						</view>
						<view>
							到期日期：2021/10/10/ 13:22:21
						</view>
					</view>
					<view v-show="num=='0'" class="pay-money">
						已支付<text class="hight-color mr">￥290元</text> 支付宝
					</view>
					<view v-show="num=='1'" class="pay-money">
						<text @click="cancelPay">取消支付<text class="hight-color ml">￥290元</text></text>
					</view>
				</view>
			</view>
			<view class="pay-item">
				<view class="title">
					驾驶员课程
				</view>
				<view class="vaild-date">
					有效期：1年
				</view>
				<view class="price">
					原价：<text class="hight-color">￥300</text>元，优惠<text class="hight-color">￥10</text>元，实付<text class="hight-color">￥290</text>元
				</view>
				<view class="deadline">
					<view v-show="num=='0'" class="buy-date">
						<view>
							购买日期：2020/10/10/ 13:22:21
						</view>
						<view>
							到期日期：2021/10/10/ 13:22:21
						</view>
					</view>
					<view v-show="num=='0'" class="pay-money">
						已支付<text class="hight-color mr">￥290元</text> 支付宝
					</view>
					<view v-show="num=='1'" class="pay-money">
						<text @click="cancelPay">取消支付<text class="hight-color ml">￥290元</text></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import learnTopSlide from '@/components/learnTopSlide/learnTopSlide.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				tabArr: ['已支付', '未支付'],
				num: '0',
				isFullScreen:false
			};
		},
		components: {
			learnTopSlide,
			uniNavBar
		},
		onLoad() {
			this.isFullScreen = uni.getStorageSync('isFullScreen')
		},
		methods: {
			tabSelected(data) {

				this.num = data.tab
			},
			// 取消支付
			cancelPay() {

			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.top-content {
		margin: 30rpx 0;
	}

	.container {
		padding: 0 30rpx;
	}

	.pay-item {
		border-bottom: 2rpx solid #EAEAEA;
		padding: 10rpx 0 40rpx;
	}

	.title {
		height: 53rpx;
		font-size: 38rpx;
		font-weight: bold;
		margin-bottom: 12rpx;
	}

	.vaild-date,
	.price {
		color: #666;
		font-size: 30rpx;
	}

	.price {
		margin-bottom: 12rpx;
	}

	.hight-color {
		color: #FE6801;
		font-size: 30rpx;
	}

	.mr {
		margin-right: 12rpx;
	}

	.ml {
		margin-left: 12rpx;
	}

	.buy-date {
		color: #999999;
		font-size: 28rpx;

		&:first-child {
			margin-bottom: 8rpx;
		}
	}

	.pay-money {
		text-align: right;
		margin-top: 40rpx;
	}
</style>
