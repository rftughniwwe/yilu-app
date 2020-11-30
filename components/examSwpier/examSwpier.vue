<!-- 做题swpier -->
<template>
	<view class="main">
		<swiper  class='swiper' :indicator-dots='false' @change="itemChange">
			<template v-for="(item,index) in datas" >
				<swiper-item>
					<view class="topic">
						{{item.count}}.{{item.title}}
					</view>
					<view class="options">
						<examOptions :item='item.list'/>
					</view>
				</swiper-item>
			</template>
			
		</swiper>
	</view>
</template>

<script>
	import examOptions from '@/components/examOptions/examOptions.vue'
	export default {
		data() {
			return {
				datas: [],
				singleItem:-1,
				currnet:0
			};
		},
		components:{
			examOptions
		},
		props: ['options'],
		created() {
			this.datas = this.options
		},
		updated() {
			this.datas = this.options
		},
		methods: {
			clickItem(index){
				this.singleItem = index
			},
			itemChange(e){
				console.log('eeee啊',e)
				uni.$emit('swiperChange',{current:e.target.current})
			}
		}
	}
</script>

<style lang="scss">
	.topic {
		background-color: #F3F7F6;
		padding: 40rpx 30rpx;
		color: #333333;
		font-size: 32rpx;
	}
	.swiper{
		height: 100vh;
	}
	
	
</style>
