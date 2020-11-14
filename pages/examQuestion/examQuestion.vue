<!--  -->
<template>
	<view class="container">
		<view class="topic-content">
			<view class="subject-mode">

			</view>
			<view class="timeout">

			</view>
			<view class="current-count">

			</view>
		</view>
		<view class="swiper-contnet">

		</view>
		<view class="bottom-content">
			<questionBottom />
		</view>
	</view>
</template>

<script>
	import questionBottom from '@/components/questionBottom/questionBottom.vue'
	export default {
		data() {
			return {

			};
		},
		components: {
			questionBottom
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:'练习题'
			})
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F3F7F6;
		min-height: 100vh;
	}

	.bottom-content {
		padding: 40rpx;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
	}
</style>
