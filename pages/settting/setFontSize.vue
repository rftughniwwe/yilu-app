<!-- 设置字体大小 -->
<template>
	<view class="main">
		<view class="main-content" :style="{'fontSize':fontsize+'rpx'}">
			拖动下面的滑块，可设置字体大小。设置后，资讯页面，新闻页面，我的页面，消息，聊天页面字体大小，选择—个适合的字体大小吧。
		</view>
		<view class="adjust-size">
			<text>滑动以调整</text>
			<dc-slider
				@changed="fontSizeChanged"
				:value="slideValue"
				:max="10"
				:min="2"
				:blockSize="52"
				:lineSize="7"
				blockColor="#4094ED"
				blockOuterColor="rgba(64, 148, 237, .2)"
				:step="2"
				:disabled="false"
				activeColor="#4094ED"
			></dc-slider>
		</view>
	</view>
</template>

<script>
	import dcSlider from '@/components/ly-drag-slider/dc-slider.vue';
	export default {
		data() {
			return {
				slideValue:4,
				fontsize:34
			};
		},
		components: {
			dcSlider
		},
		onLoad() {
			let globalSize = uni.getStorageSync('globalFontSize')
			this.fontsize = globalSize
			this.slideValue = globalSize - 30
		},
		methods:{
				
			fontSizeChanged(e){
				this.slideValue = e.value
				this.fontsize = 30+this.slideValue
				uni.setStorageSync('globalFontSize', this.fontsize)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.main{
		position: relative;
	}
	.main-content {
		text-align: center;
		padding: 100rpx;
		color: #333333;
	}
	.adjust-size{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #FFFFFF;
		padding: 60rpx 100rpx;
		text-align: center;
		color: #999999;
	}
</style>
